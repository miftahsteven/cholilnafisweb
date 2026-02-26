"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
        <h1 style={{ color: "var(--primary-dark)" }}>Dashboard Administrator</h1>
        <button className="btn btn-outline" onClick={() => router.push("/")}>
          Kembali ke Web
        </button>
      </header>

      <div className="grid grid-3">
        <div className="card-achieve">
          <h4>Total Berita</h4>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary)" }}>24</p>
        </div>
        <div className="card-achieve">
          <h4>Konsultasi Baru</h4>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--secondary)" }}>8</p>
        </div>
        <div className="card-achieve">
          <h4>Total Opini</h4>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary)" }}>15</p>
        </div>
      </div>

      <div style={{ marginTop: "4rem", background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "var(--shadow-sm)" }}>
        <h3 style={{ marginBottom: "1rem" }}>Aktivitas Terbaru</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Belum ada aktivitas baru hari ini.</p>
      </div>
    </div>
  );
}
