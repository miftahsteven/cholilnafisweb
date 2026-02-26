"use client";
import React, { useState } from "react";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<"foto" | "video">("foto");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const photos = [
    { id: 1, src: "Image Placeholder 1" },
    { id: 2, src: "Image Placeholder 2" },
    { id: 3, src: "Image Placeholder 3" },
    { id: 4, src: "Image Placeholder 4" },
    { id: 5, src: "Image Placeholder 5" },
    { id: 6, src: "Image Placeholder 6" },
  ];

  const videos = [
    { id: 1, title: "Ceramah Tarawih Masjid Istiqlal" },
    { id: 2, title: "Dialog Interaktif TVOne: Fikih Kontemporer" },
    { id: 3, title: "Seminar Ekonomi Syariah Nasional" },
    { id: 4, title: "Khutbah Jumat: Menjaga Lisan" },
  ];

  // Prevent scrolling when lightbox is open
  React.useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    }
  }, [lightboxImage]);

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
          <div className="gallery-grid">
            {photos.map((p) => (
              <div
                key={p.id}
                className="gallery-item"
                onClick={() => setLightboxImage(p.src)}
              >
                {p.src}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "video" && (
        <div className="tab-pane active" suppressHydrationWarning>
          <div className="grid grid-2">
            {videos.map((v) => (
              <div key={v.id} className="video-card">
                <div className="video-placeholder">Thumbnail Video</div>
                <h4 className="video-title">{v.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div
          className="lightbox show"
          onClick={() => setLightboxImage(null)}
        >
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
            style={{
              width: 600,
              height: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#CBD5E1",
              color: "var(--text-muted)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            High-Res Preview: {lightboxImage}
          </div>
        </div>
      )}
    </>
  );
}
