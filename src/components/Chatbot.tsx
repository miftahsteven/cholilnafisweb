"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
  User,
} from "firebase/auth";

interface Message {
  id: number;
  chatId?: string;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
  sources?: any[];
  mode?: string;
  confidence?: number;
  feedback?: boolean | null;
}

const suggestedQuestions = [
  "Apa pandangan KH Cholil Nafis tentang investasi saham syariah?",
  "Bagaimana hukum penggunaan Paylater dalam Islam?",
  "Apa itu zakat profesi dan siapa yang wajib membayarnya?",
  "Bagaimana Islam memandang keharmonisan beragama di Indonesia?",
  "Apakah transaksi e-wallet halal menurut syariat?",
];

interface ChatbotProps {
  whatsappStatus: string;
}

export default function Chatbot({ whatsappStatus }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dailyUsage, setDailyUsage] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── Auth listener ──────────────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        // Set personalized greeting
        setMessages([
          {
            id: 0,
            role: "ai",
            text: `Assalamu'alaikum, **${currentUser.displayName || "Sahabat"}**! Saya **ki.ai**, asisten virtual berbasis pemikiran KH. Muhammad Cholil Nafis. Silakan ajukan pertanyaan Anda seputar keislaman, fikih, atau ekonomi syariah.`,
            timestamp: new Date(),
          },
        ]);
        fetchTodayUsage(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // ── Fetch today's daily usage (no history sidebar needed) ─────────────────
  const fetchTodayUsage = async (userId: string) => {
    try {
      const res = await fetch(`/api/ki-ai/sessions?user_id=${userId}`);
      if (res.ok) {
        const body = await res.json();
        if (typeof body.dailyCount === "number") {
          setDailyUsage(Math.min(body.dailyCount, 5));
        }
        if (body.isBlocked) setIsBlocked(true);
      }
    } catch (e) {
      console.error("Failed to fetch usage", e);
    }
  };

  // ── Auto scroll chat ───────────────────────────────────────────────────────
  useEffect(() => {
    if (scrollRef.current && messages.length > 1) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // ── Google Login ──────────────────────────────────────────────────────────
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.warn("Popup failed, trying redirect...", error.message);
      try {
        await signInWithRedirect(auth, googleProvider);
      } catch (redirectError: any) {
        alert("Gagal login Google: " + redirectError.message);
      }
    }
  };

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || !user) return;

    let sessionId = activeSessionId || Math.random().toString(36).substring(2, 15);
    if (!activeSessionId) setActiveSessionId(sessionId);

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ki-ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
          user_id: user.uid,
          user_name: user.displayName,
          user_email: user.email,
        }),
      });

      if (!response.ok) {
        // Try to get specific error message from JSON
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.message || "Maaf, terjadi gangguan pada sistem kami.";
        throw new Error(errorMessage);
      }

      setLoading(false);
      const aiMsgId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          role: "ai",
          text: "",
          timestamp: new Date(),
        },
      ]);

      // Stream SSE response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      if (!reader) return;

      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith("data:")) {
            const dataStr = trimmedLine.substring(5).trim();
            if (dataStr === "[DONE]") break;
            try {
              const data = JSON.parse(dataStr);
              if (data.text) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMsgId
                      ? { ...msg, text: msg.text + data.text }
                      : msg
                  )
                );
                // Auto-refresh quota if the response contains specific patterns
                if (
                  data.text.includes("diblokir secara permanen") ||
                  data.text.includes("akun Anda telah kami BLOKIR PERMANEN")
                ) {
                  setIsBlocked(true);
                }
              }
              if (data.metadata) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMsgId
                      ? {
                        ...msg,
                        chatId: data.metadata.chat_id,
                        sources: data.metadata.sources,
                        mode: data.metadata.mode,
                        confidence: data.metadata.confidence,
                      }
                      : msg
                  )
                );
              }
            } catch (e) { }
          }
        }
      }
    } catch (error: any) {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: error.message || "Maaf, kuota harian Anda mungkin sudah habis (Maks 5) atau terjadi gangguan jaringan.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      // Always refresh daily count after each attempt if user exists
      if (user) fetchTodayUsage(user.uid);
    }
  };

  // ── Feedback ───────────────────────────────────────────────────────────────
  const handleFeedback = async (chatId: string | undefined, isHelpful: boolean) => {
    if (!chatId) return;
    setMessages((prev) =>
      prev.map((msg) =>
        msg.chatId === chatId ? { ...msg, feedback: isHelpful } : msg
      )
    );
    try {
      await fetch("/api/ki-ai/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, isHelpful }),
      });
    } catch (e) {
      console.error("Feedback error", e);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => {
      const formatted = line.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      );
      return (
        <p
          key={i}
          className="kiai-line"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  const isLimitReached = dailyUsage >= 5;

  // ── Loading state ──────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="kiai-loading">
        <div className="kiai-spinner" />
      </div>
    );
  }

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="kiai-login-wrap">
        <div className="kiai-login-card">
          <div className="kiai-login-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2 className="kiai-login-title">Ruang Konsultasi ki.ai</h2>
          <p className="kiai-login-desc">
            Tanya jawab keislaman berbasis pemikiran<br />
            <strong>KH. Muhammad Cholil Nafis</strong><br />
            Masuk untuk mulai berkonsultasi — gratis, hingga 5 pertanyaan/hari.
          </p>
          <button className="kiai-google-btn" onClick={loginWithGoogle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.81 15.69 17.59V20.34H19.26C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
              <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.69 17.59C14.71 18.25 13.46 18.66 12 18.66C9.17 18.66 6.78 16.75 5.86 14.18H2.18V17.03C4.01 20.65 7.7 23 12 23Z" fill="#34A853" />
              <path d="M5.86 14.18C5.62 13.46 5.49 12.7 5.49 11.91C5.49 11.12 5.62 10.36 5.86 9.64V6.79H2.18C1.43 8.28 1 9.98 1 11.91C1 13.84 1.43 15.54 2.18 17.03L5.86 14.18Z" fill="#FBBC05" />
              <path d="M12 5.16C13.62 5.16 15.08 5.71 16.22 6.8L19.34 3.68C17.46 1.93 14.97 1 12 1C7.7 1 4.01 3.35 2.18 6.79L5.86 9.64C6.78 7.07 9.17 5.16 12 5.16Z" fill="#EA4335" />
            </svg>
            Masuk dengan Google
          </button>

          {whatsappStatus === 'active' && (
            <button
              className="kiai-wa-btn"
              onClick={() => window.open('https://wa.me/628558876544?text=Assalamu%27alaikum%20saya%20mau%20tanya%20ki..', '_blank')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Konsultasi dengan WhatsApp
            </button>
          )}
          <p className="kiai-login-note">
            Tidak perlu daftar. Login cukup satu kali dan percakapan hari ini tersimpan otomatis.
          </p>
        </div>
      </div>
    );
  }

  // ── Main chat UI ──────────────────────────────────────────────────────────
  return (
    <div className="kiai-wrap">
      {/* Chat Card */}
      <div className="kiai-chat-card">
        {/* Header */}
        <div className="kiai-header">
          <div className="kiai-header-left">
            <div className="kiai-avatar">
              <Image
                src="/assets/images/profil2.jpeg"
                width={42}
                height={42}
                alt="ki.ai"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="kiai-header-info">
              <span className="kiai-name">ki.ai</span>
              <span className="kiai-online">Online · Berbasis pemikiran Ust. Cholil Nafis</span>
            </div>
          </div>
          <div className="kiai-header-right">
            <div className="kiai-quota-wrap">
              <span className={`kiai-quota-text ${isLimitReached ? "kiai-quota-full" : ""}`}>
                {dailyUsage}/5
              </span>
              <div className="kiai-quota-bar">
                <div
                  className={`kiai-quota-fill ${isLimitReached ? "kiai-quota-fill-full" : ""}`}
                  style={{ width: `${(dailyUsage / 5) * 100}%` }}
                />
              </div>
              <span className="kiai-quota-label">pertanyaan hari ini</span>
            </div>
            <button
              className="kiai-signout-btn"
              onClick={() => auth.signOut()}
              title="Keluar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="kiai-messages" ref={scrollRef}>
          {/* Welcome screen with suggestions */}
          {messages.length <= 1 && (
            <div className="kiai-welcome">
              <div className="kiai-info-banner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <p>
                  Percakapan hari ini tersimpan otomatis dan direset setiap hari.
                  Maks. <strong>5 pertanyaan/hari</strong> per akun.
                </p>
              </div>
              <p className="kiai-suggest-label">Pertanyaan Populer:</p>
              <div className="kiai-suggestions">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    className="kiai-suggest-btn"
                    onClick={() => sendMessage(q)}
                    disabled={isLimitReached || isBlocked}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message list */}
          <div className="kiai-msg-list">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`kiai-msg ${msg.role === "user" ? "kiai-msg-user" : "kiai-msg-ai"}`}
              >
                {msg.role === "ai" && (
                  <div className="kiai-msg-avatar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                )}
                <div className="kiai-msg-content-wrap">
                  <div className={`kiai-bubble ${msg.role === "user" ? "kiai-bubble-user" : "kiai-bubble-ai"}`}>
                    <div className="kiai-bubble-text">
                      {formatText(msg.text)}
                    </div>

                    {/* Sources */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="kiai-sources">
                        <p className="kiai-sources-label">Rujukan:</p>
                        {msg.sources.map((src: any, idx: number) => {
                          const linkHref = src.url || src.sourceUrl || "#";
                          const linkType = src.type || src.sourceType || "system";
                          const linkLabel = src.title
                            ? src.title
                            : linkType === "internal"
                              ? "Pemikiran KH Cholil Nafis (mcnid.net)"
                              : "Dokumen Rujukan";
                          return (
                            <a
                              key={idx}
                              href={linkHref}
                              target={linkHref !== "#" ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              className="kiai-source-link"
                            >
                              <span className="kiai-source-type">[{linkType}]</span> {linkLabel}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="kiai-msg-meta">
                    <span className="kiai-msg-time">
                      {msg.timestamp.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {msg.role === "ai" && msg.chatId && (
                      <div className="kiai-feedback">
                        <button
                          className={`kiai-feedback-btn ${msg.feedback === true ? "kiai-feedback-yes" : ""}`}
                          onClick={() => handleFeedback(msg.chatId, true)}
                          title="Bermanfaat"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill={msg.feedback === true ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                          </svg>
                        </button>
                        <button
                          className={`kiai-feedback-btn ${msg.feedback === false ? "kiai-feedback-no" : ""}`}
                          onClick={() => handleFeedback(msg.chatId, false)}
                          title="Kurang Bermanfaat"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill={msg.feedback === false ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
                            <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Typing indicator */}
          {loading && (
            <div className="kiai-msg kiai-msg-ai">
              <div className="kiai-msg-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="kiai-bubble kiai-bubble-ai kiai-typing">
                <span className="kiai-dot" />
                <span className="kiai-dot" />
                <span className="kiai-dot" />
              </div>
            </div>
          )}

          <div className="kiai-scroll-anchor" />
        </div>

        {/* Input area */}
        <div className="kiai-input-area">
          {isBlocked && (
            <div className="kiai-alert kiai-alert-blocked">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Akun Anda Telah Diblokir Permanen
            </div>
          )}
          {isLimitReached && !isBlocked && (
            <div className="kiai-alert kiai-alert-limit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Kuota harian Anda sudah habis (5/5). Kembali lagi besok.
            </div>
          )}
          <div className={`kiai-input-box ${isLimitReached || isBlocked ? "kiai-input-disabled" : ""}`}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={isLimitReached || loading || isBlocked}
              maxLength={500}
              placeholder={
                isBlocked
                  ? "Akses diblokir"
                  : isLimitReached
                    ? "Kuota harian Anda sudah habis"
                    : "Tanyakan seputar fikih, ekonomi syariah, atau dakwah... (Maks. 500 karakter)"
              }
              rows={1}
              className="kiai-textarea"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading || isLimitReached || isBlocked}
              className="kiai-send-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <div className="kiai-input-footer">
            <span className="kiai-user-info">
              Masuk sebagai <strong>{user.displayName}</strong> ·{" "}
              <button className="kiai-logout-link" onClick={() => auth.signOut()}>Keluar</button>
            </span>
            {!isBlocked && !isLimitReached && (
              <span className={`kiai-char-count ${input.length >= 500 ? "kiai-char-limit" : ""}`}>
                {input.length}/500
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
