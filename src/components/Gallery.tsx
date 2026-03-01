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

export default function Gallery() {
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
        // silent fail — keep empty arrays
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
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
    <>
      <div className="tabs-nav">
        <button
          className={`tab-btn ${activeTab === "foto" ? "active" : ""}`}
          onClick={() => setActiveTab("foto")}
        >
          Koleksi Foto
        </button>
        <button
          className={`tab-btn ${activeTab === "video" ? "active" : ""}`}
          onClick={() => setActiveTab("video")}
        >
          Arsip Video
        </button>
      </div>

      {activeTab === "foto" && (
        <div className="tab-pane active" suppressHydrationWarning>
          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
              ⏳ Memuat galeri...
            </div>
          ) : photos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
              Belum ada foto di galeri.
            </div>
          ) : (
            <div className="gallery-grid">
              {photos.slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  className="gallery-item"
                  onClick={() => setLightboxImage(resolveUrl(p.url))}
                  style={{ cursor: "pointer", overflow: "hidden" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveUrl(p.url)}
                    alt={p.filename}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lihat Semua button — only on foto tab when not empty */}
      {activeTab === "foto" && !loading && photos.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href="/galeri"
            style={{
              display: "inline-block",
              padding: "0.7rem 2rem",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(124,58,237,0.3)",
            }}
          >
            Lihat Semua Galeri →
          </a>
        </div>
      )}

      {activeTab === "video" && (
        <div className="tab-pane active" suppressHydrationWarning>
          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
              ⏳ Memuat video...
            </div>
          ) : videos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
              Belum ada video di galeri.
            </div>
          ) : (
            <div className="grid grid-2">
              {videos.map((v) => (
                <a
                  key={v.id}
                  href={v.url}
                  target="_blank"
                  rel="noreferrer"
                  className="video-card"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  {v.alt ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={v.alt}
                      alt={v.filename}
                      className="video-placeholder"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <div className="video-placeholder">▶ Video</div>
                  )}
                  <h4 className="video-title">{v.filename}</h4>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div className="lightbox show" onClick={() => setLightboxImage(null)}>
          <button
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImage(null);
            }}
          >
            &times;
          </button>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImage}
              alt="Galeri"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
