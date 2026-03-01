"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

type Question = {
  id: string;
  text: string;
  answer: string;
};

const chatbotData = {
  greeting:
    "Assalamu'alaikum. Saya **ki.ai**, asisten virtual ruang konsultasi KH. Muhammad Cholil Nafis. Silakan pilih topik pertanyaan di bawah ini yang ingin Anda ketahui.",
  questions: [
    {
      id: "q1",
      text: "Hukum Investasi Saham",
      answer:
        "Investasi pada saham yang masuk dalam Daftar Efek Syariah (DES) diperbolehkan menurut fatwa DSN-MUI. Pastikan perusahaan tidak bergerak di bidang haram (seperti miras, perjudian, perbankan konvensional) dan rasio keuangannya memenuhi batas syariah.",
    },
    {
      id: "q2",
      text: "Hukum Paylater & Pinjol",
      answer:
        "Penggunaan Paylater atau Pinjaman Online (Pinjol) pada dasarnya mubah asalkan terbebas dari unsur riba (bunga tambahan/bunga keterlambatan) yang memberatkan. Sangat disarankan untuk menghindarinya jika terdapat syarat denda yang tidak syar'i.",
    },
    {
      id: "q3",
      text: "Promo di E-Wallet",
      answer:
        "Menggunakan dompet digital (e-wallet) diperbolehkan. Mengenai diskon atau promo, hal tersebut halal selama diskon diberikan dari anggaran promosi perusahaan, bukan bersumber dari perputaran dana talangan yang mensyaratkan bunga (riba).",
    },
    {
      id: "q4",
      text: "Zakat Profesi",
      answer:
        "Zakat profesi wajib dikeluarkan jika total penghasilan profesi Anda telah mencapai nisab (setara dengan 85 gram emas per tahun). Kadarnya adalah 2,5% dan dapat dibayarkan setiap bulan saat menerima gaji agar lebih ringan.",
    },
    {
      id: "q5",
      text: "Konsultasi Lainnya",
      answer:
        "Untuk konsultasi yang lebih spesifik atau privat terkait masalah keluarga, waris, atau isu tertentu, Anda dapat mengirimkan pertanyaan tertulis melalui email resmi yang tertera di profil.",
    },
  ],
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    setMessages([
      { id: "msg-0", sender: "bot", text: chatbotData.greeting },
    ]);
  }, []);

  useEffect(() => {
    // Hanya auto-scroll jika ada lebih dari 1 pesan (pesan sapaan tidak memicu scroll on load) atau bot sedang mengetik
    if (messagesEndRef.current && (messages.length > 1 || isTyping)) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleQuestionClick = (q: Question) => {
    setShowOptions(false);
    
    // Add user message
    const newMessageId = Date.now().toString();
    setMessages((prev) => [...prev, { id: newMessageId, sender: "user", text: q.text }]);
    
    // Simulate typing
    setTimeout(() => {
      setIsTyping(true);
      
      // Delay bot response
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: newMessageId + "bot", sender: "bot", text: q.answer },
        ]);
        
        // Show options again after a short delay
        setTimeout(() => setShowOptions(true), 1000);
      }, 1800);
    }, 400);
  };

  const formatText = (text: string) => {
    // Simple markdown replacement for **bold**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="konsultasi-wrap">
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-avatar">
            <Image
              src="/assets/images/profil2.jpeg"
              width={45}
              height={45}
              alt="ki.ai Avatar"
            />
          </div>
          <div className="chat-header-info">
            <div className="chat-title">ki.ai</div>
            <div className="chat-status">Online - Siap membantu</div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}-message`}>
              <div className="message-content">{formatText(msg.text)}</div>
            </div>
          ))}
          
          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {showOptions && (
          <div className="chat-options">
            {chatbotData.questions.map((q) => (
              <button
                key={q.id}
                className="chat-option-btn"
                onClick={() => handleQuestionClick(q)}
              >
                {q.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
