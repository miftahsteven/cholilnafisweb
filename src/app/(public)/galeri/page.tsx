"use client";
import React, { useState, useEffect } from "react";

interface GalleryMedia {
  id: string;
  filename: string;
  url: string;
  type: string;
  alt: string | null;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function GaleriPage() {
  const [activeTab, setActiveTab] = useState<"foto" | "video">("foto");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<GalleryMedia[]>([]);
  const [videos, setVideos] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const baseUrl =
          typeof window !== "undefined" && window.location.hostname !== "localhost"
            ? BACKEND_URL.replace("localhost", window.location.hostname)
            : BACKEND_URL;
        const res = await fetch(`${baseUrl}/api/media/gallery`);
        const data = await res.json();
        const all: GalleryMedia[] = data.data || [];
        setPhotos(all.filter((m) => m.type === "image"));
        setVideos(all.filter((m) => m.type === "video"));
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  useEffect(() => {
    if (lightboxImage) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [lightboxImage]);

  const resolveUrl = (url: string) => {
    if (
      typeof window !== "undefined" &&
      url.includes("localhost") &&
      window.location.hostname !== "localhost"
    ) {
      return url.replace("localhost", window.location.hostname);
    }
    return url;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #2d1b69, #7c3aed)",
          padding: "3rem 2rem 2rem",
          textAlign: "center",
        }}
      >
        {/* <a
          href="/#galeri"
          style={{
            display: "inline-block",
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.9rem",
            marginBottom: "1rem",
            textDecoration: "none",
          }}
        >
          ← Kembali ke Beranda
        </a> */}
        <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, margin: 0 }}>
          Galeri Dokumentasi
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "0.5rem", fontSize: "0.95rem" }}>
          Kumpulan foto dan video dokumentasi kegiatan KH. Muhammad Cholil Nafis
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0",
          borderBottom: "2px solid #e2e8f0",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {(["foto", "video"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "1rem 2.5rem",
              border: "none",
              background: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              color: activeTab === tab ? "#7c3aed" : "#64748b",
              borderBottom: activeTab === tab ? "3px solid #7c3aed" : "3px solid transparent",
              marginBottom: "-2px",
              transition: "all 0.2s",
            }}
          >
            {tab === "foto" ? "📷 Koleksi Foto" : "🎬 Arsip Video"}
            <span
              style={{
                marginLeft: "8px",
                background: activeTab === tab ? "#ede9fe" : "#f1f5f9",
                color: activeTab === tab ? "#7c3aed" : "#94a3b8",
                borderRadius: "12px",
                padding: "2px 8px",
                fontSize: "0.78rem",
              }}
            >
              {tab === "foto" ? photos.length : videos.length}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem", color: "#94a3b8" }}>
            ⏳ Memuat galeri...
          </div>
        ) : activeTab === "foto" ? (
          photos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem", color: "#94a3b8" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
              Belum ada foto di galeri.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "10px",
              }}
            >
              {photos.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setLightboxImage(resolveUrl(p.url))}
                  style={{
                    aspectRatio: "1",
                    overflow: "hidden",
                    borderRadius: "10px",
                    cursor: "pointer",
                    background: "#e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveUrl(p.url)}
                    alt={p.filename}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              ))}
            </div>
          )
        ) : videos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem", color: "#94a3b8" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
            Belum ada video di galeri.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {videos.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  background: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  display: "block",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)";
                }}
              >
                {v.alt ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={v.alt}
                    alt={v.filename}
                    style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "160px",
                      background: "linear-gradient(135deg, #1e1b4b, #4c1d95)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2.5rem",
                    }}
                  >
                    ▶️
                  </div>
                )}
                <div style={{ padding: "0.85rem 1rem" }}>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      color: "#1e293b",
                      fontSize: "0.9rem",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {v.filename}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &times;
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImage}
              alt="Galeri"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "12px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
