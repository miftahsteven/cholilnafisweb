"use client";
import Link from "next/link";
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

      {/* Lihat Semua button */}
      {!loading && ((activeTab === "foto" && photos.length > 0) || (activeTab === "video" && videos.length > 0)) && (
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/galeri" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "4px" }}>
            Lihat Semua Galeri &rarr;
          </Link> 
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
            <div className="gallery-grid">
              {videos.slice(0, 6).map((v) => (
                <a
                  key={v.id}
                  href={v.url}
                  target="_blank"
                  rel="noreferrer"
                  className="gallery-item"
                  style={{ textDecoration: "none", display: "block", overflow: "hidden", position: "relative" }}
                >
                  {v.alt ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={v.alt}
                      alt={v.filename}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div
                      className="video-placeholder"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#0f172a",
                        color: "#fff",
                      }}
                    >
                      ▶ Video
                    </div>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(0,0,0,0.7)",
                      color: "#fff",
                      padding: "0.5rem",
                      fontSize: "0.85rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center"
                    }}
                  >
                    ▶ {v.filename}
                  </div>
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
