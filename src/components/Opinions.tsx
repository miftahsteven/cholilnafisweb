"use client";
import React, { useState } from "react";

export default function Opinions() {
  const [activeTab, setActiveTab] = useState<"artikel" | "buku" | "khutbah">("artikel");

  return (
    <>
      <div className="tabs-nav">
        <button
          className={`tab-btn ${activeTab === "artikel" ? "active" : ""}`}
          onClick={() => setActiveTab("artikel")}
        >
          Artikel Koran
        </button>
        <button
          className={`tab-btn ${activeTab === "buku" ? "active" : ""}`}
          onClick={() => setActiveTab("buku")}
        >
          Karya Buku
        </button>
        <button
          className={`tab-btn ${activeTab === "khutbah" ? "active" : ""}`}
          onClick={() => setActiveTab("khutbah")}
        >
          Teks Khutbah
        </button>
      </div>

      <div className="opini-list">
        {activeTab === "artikel" && (
          <div className="tab-pane active" suppressHydrationWarning>
            <div className="opini-card">
              <span className="opini-badge">Republika</span>
              <div className="opini-detail">
                <h4>Membangun Moderasi Beragama di Era Digital</h4>
                <p>
                  Mengurai tantangan literasi keislaman di dunia maya dan pentingnya
                  tabayyun dalam sirkulasi informasi keagamaan.
                </p>
                <a href="#" className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                  Baca Tulisan
                </a>
              </div>
            </div>
            <div className="opini-card">
              <span className="opini-badge">Kompas</span>
              <div className="opini-detail">
                <h4>Fikih Lingkungan: Solusi Krisis Iklim</h4>
                <p>
                  Tinjauan syariat tentang kewajiban menjaga alam semesta
                  (hifzh al-bi'ah) sebagai bagian integral dari keimanan.
                </p>
                <a href="#" className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                  Baca Tulisan
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === "buku" && (
          <div className="tab-pane active" suppressHydrationWarning>
            <div className="opini-card">
              <div
                style={{
                  width: 100,
                  height: 140,
                  background: "#CBD5E1",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                Cover
                <br />
                Buku
              </div>
              <div className="opini-detail">
                <h4>Teori Hukum Islam Kontemporer</h4>
                <p>
                  Sebuah mahakarya yang mendedah metodologi istinbath hukum
                  dalam menjawab persoalan-persoalan baru di masyarakat modern.
                </p>
                <a href="#" className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                  Detail Buku
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === "khutbah" && (
          <div className="tab-pane active" suppressHydrationWarning>
            <div className="opini-card">
              <span className="opini-badge" style={{ background: "var(--text-muted)" }}>
                PDF Unduhan
              </span>
              <div className="opini-detail">
                <h4>Khutbah Idul Fitri: Menenun Kembali Ukhuwah</h4>
                <p>
                  Naskah lengkap khutbah Idul Fitri yang menekankan kembali pada
                  fitrah kemanusiaan dan merajut persaudaraan sebangsa.
                </p>
                <a href="#" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                  Unduh Naskah
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
