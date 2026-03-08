"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";

interface Karya {
  id: string;
  category: string;
  sumber?: string;
  title: string;
  shortcontent?: string;
  fileUrl?: string;
  createdAt: string;
}

export default function FokusEkonomi() {
  const [karyas, setKaryas] = useState<Karya[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.getKaryasPublik();
        setKaryas(res.data || []);
      } catch (err) {
        console.error("Failed to fetch karya:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter karya to get the latest exactly 1 'Artikel' and 1 'Materi'
  const latestArtikel = karyas.find(k => k.category === "Artikel");
  const latestMateri = karyas.find(k => k.category === "Materi");

  const displayItems = [latestArtikel, latestMateri].filter(Boolean) as Karya[];

  if (loading) {
     return <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>Memuat konten Ekonomi Syariah...</div>;
  }

  if (displayItems.length === 0) {
    return (
       <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
         Belum ada Artikel & Materi terbaru.
       </div>
    );
  }

  return (
    <div className="grid grid-2" style={{ marginBottom: "3rem" }}>
      {displayItems.map((karya) => (
        <div key={karya.id} className="opini-card" style={{ margin: 0 }}>
          <span
            className="opini-badge"
            style={{ background: "var(--secondary-dark)" }}
          >
            {karya.category === "Artikel" ? "Artikel" : "Materi"}
          </span>
          <div className="opini-detail" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h4 style={{ flexGrow: 1 }}>{karya.title}</h4>
            <p style={{ marginBottom: '1rem' }}>
              {karya.shortcontent || "Penjelasan materi dan edukasi terkait isu kontemporer."}
            </p>
            <div>
              <Link href={`/karya-ilmiah/${karya.id}`} className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", display: "inline-block" }}>
                Baca
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '1rem' }}>
        <Link href="/ekonomi" className="btn btn-primary">
          Lihat Semua Fokus Ekonomi
        </Link>
      </div>
    </div>
  );
}
