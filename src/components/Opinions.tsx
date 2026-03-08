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

export default function Opinions() {
  const [activeTab, setActiveTab] = useState<"artikel" | "buku" | "khutbah">("artikel");
  const [karyas, setKaryas] = useState<Karya[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.getKaryasPublik();
        setKaryas(res.data);
      } catch (err) {
        console.error("Failed to fetch karya:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter karya by category based on active tab
  const filteredKaryas = karyas.filter((k) => {
    if (activeTab === "artikel") return k.category === "ArtikelKoran" || k.category === "Artikel";
    if (activeTab === "buku") return k.category === "KaryaBuku";
    if (activeTab === "khutbah") return k.category === "Khotbah";
    return false;
  });

  // Limit to 3 items
  const displayKaryas = filteredKaryas.slice(0, 3);
  const showLihatLainnya = filteredKaryas.length >= 3;

  const tabCategoryMap: Record<"artikel" | "buku" | "khutbah", string> = {
    artikel: "ArtikelKoran",
    buku: "KaryaBuku",
    khutbah: "Khotbah",
  };

  const getReadButtonText = (tab: typeof activeTab) => {
    if (tab === "buku") return "Detail Buku";
    if (tab === "khutbah") return "Unduh Naskah";
    return "Baca Tulisan";
  };

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
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>Memuat karya...</div>
        ) : displayKaryas.length > 0 ? (
          <div className="tab-pane active" suppressHydrationWarning>
            {displayKaryas.map((karya) => (
              <div key={karya.id} className="opini-card">
                {activeTab === "buku" ? (
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
                      overflow: "hidden"
                    }}
                  >
                    {karya.fileUrl && karya.fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={karya.fileUrl} alt={karya.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <>Cover<br />Buku</>
                    )}
                  </div>
                ) : (
                  <span className="opini-badge" style={activeTab === "khutbah" ? { background: "var(--text-muted)" } : {}}>
                    {activeTab === "khutbah" ? (karya.fileUrl ? "PDF Unduhan" : "Teks Khutbah") : (karya.sumber || "Situs Resmi")}
                  </span>
                )}
                <div className="opini-detail">
                  <h4>{karya.title}</h4>
                  <p>{karya.shortcontent || "Tidak ada deskripsi singkat."}</p>
                  
                  {activeTab === "khutbah" && karya.fileUrl ? (
                    <a href={karya.fileUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                      {getReadButtonText(activeTab)}
                    </a>
                  ) : (
                    <Link href={`/karya-ilmiah/${karya.id}`} className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", display: "inline-block" }}>
                      {getReadButtonText(activeTab)}
                    </Link>
                  )}
                </div>
              </div>
            ))}
            
            {showLihatLainnya && (
              <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                <Link 
                  href={`/karya-ilmiah?kategori=${tabCategoryMap[activeTab]}`}
                  className="btn btn-outline"
                >
                  Lihat Lainnya →
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
            Belum ada karya untuk kategori ini.
          </div>
        )}
      </div>
    </>
  );
}
