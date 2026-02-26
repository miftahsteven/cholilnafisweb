"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput !== captchaText) {
      setError("Captcha salah, silakan coba lagi.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }
    
    // Simulate login success
    router.push("/administrator/dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1rem",
        background: "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)",
        position: "relative",
      }}
    >
      {/* Subtle Islamic pattern overlay */}
      <div 
        style={{
          content: '""',
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.6,
          zIndex: 0
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "3rem 2.5rem",
          background: "var(--white)",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          position: "relative",
          zIndex: 1
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ 
            color: "var(--primary-dark)", 
            margin: "0 0 0.5rem 0",
            fontFamily: "var(--font-heading)",
            fontSize: "2rem",
            fontWeight: 700
          }}>
            Portal Admin
          </h1>
          <p style={{ 
            color: "var(--text-muted)", 
            fontSize: "0.95rem",
            margin: 0,
            fontFamily: "var(--font-body)",
            fontWeight: 500
          }}>
            KH. Muhammad Cholil Nafis
          </p>
          <div style={{
            width: "40px",
            height: "3px",
            background: "var(--secondary)",
            margin: "1.5rem auto 0 auto",
            borderRadius: "2px"
          }} />
        </div>

        {error && (
          <div
            style={{
              background: "#FEF2F2",
              borderLeft: "4px solid #EF4444",
              color: "#B91C1C",
              padding: "0.75rem 1rem",
              borderRadius: "4px",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
              fontFamily: "var(--font-body)"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              fontSize: "0.9rem", 
              fontWeight: 600,
              color: "var(--text-main)",
              fontFamily: "var(--font-body)"
            }}>
              Nama Pengguna
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan nama pengguna"
              style={{
                width: "100%",
                padding: "0.875rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                transition: "var(--transition)",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              fontSize: "0.9rem", 
              fontWeight: 600,
              color: "var(--text-main)",
              fontFamily: "var(--font-body)"
            }}>
              Kata Sandi
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi"
              style={{
                width: "100%",
                padding: "0.875rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                transition: "var(--transition)",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              fontSize: "0.9rem", 
              fontWeight: 600,
              color: "var(--text-main)",
              fontFamily: "var(--font-body)"
            }}>
              Verifikasi Keamanan
            </label>
            <div style={{ 
              display: "flex", 
              gap: "1rem", 
              alignItems: "stretch", 
              marginBottom: "0.75rem" 
            }}>
              <div
                style={{
                  background: "var(--bg-color)",
                  padding: "0.5rem 1rem",
                  letterSpacing: "4px",
                  fontSize: "1.1rem",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  color: "var(--text-main)",
                  borderRadius: "8px",
                  border: "1px dashed var(--border)",
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1
                }}
              >
                {captchaText}
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: "0 1rem",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-body)",
                  transition: "var(--transition)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "var(--primary)";
                  e.currentTarget.style.borderColor = "var(--primary)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                Ganti
              </button>
            </div>
            <input
              type="text"
              required
              placeholder="Ketik kode di atas"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              style={{
                width: "100%",
                padding: "0.875rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                outline: "none",
                transition: "var(--transition)",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              width: "100%", 
              marginTop: "1.5rem",
              padding: "1rem",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "8px",
              boxShadow: "0 4px 14px rgba(15, 118, 110, 0.3)"
            }}
          >
            Masuk ke Dasbor
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a href="/" style={{
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            ← Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
}
