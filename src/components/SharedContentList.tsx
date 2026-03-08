import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface UnifiedItem {
  id: string;
  title: string;
  subtitle?: string;
  slugOrId: string;
  dateStr: string;
  excerpt: string;
  imageUrl?: string | null;
  badgeText?: string;
  readText?: string;
  fileUrl?: string;
}

interface Props {
  data: UnifiedItem[];
  currentPage: number;
  basePath: string; // e.g. "/berita" or "/karya-ilmiah?kategori=ArtikelKoran&"
  itemsPerPage?: number;
  pageTitle: string;
  pageSubtitle?: string;
}

export default function SharedContentList({ 
  data, 
  currentPage, 
  basePath, 
  itemsPerPage = 10,
  pageTitle,
  pageSubtitle 
}: Props) {
  
  const totalItems = data.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const hasNextPage = endIndex < totalItems;
  const hasPrevPage = currentPage > 1;

  // Helper to build pagination link ensuring query params format
  const getPageLink = (pageNum: number) => {
    if (basePath.includes('?')) {
      return `${basePath}&page=${pageNum}`;
    }
    return `${basePath}?page=${pageNum}`;
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", paddingTop: "120px", paddingBottom: "80px", minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        
        <div style={{ marginBottom: "24px" }}>
          <Link href="/" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            &larr; Kembali ke Beranda
          </Link>
        </div>

        <div className="text-center" style={{ marginBottom: "50px" }}>
          <h1 className="section-title">{pageTitle}</h1>
          {pageSubtitle && <p className="section-subtitle">{pageSubtitle}</p>}
          <div style={{ width: "60px", height: "4px", backgroundColor: "var(--primary)", margin: "15px auto", borderRadius: "4px" }}></div>
        </div>

        <div className="berita-grid" style={{ marginBottom: "50px" }}>
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <article className="news-card" key={item.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="news-thumb">
                  {item.imageUrl ? (
                    <Image 
                      src={item.imageUrl} 
                      alt={item.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }} 
                    />
                  ) : item.badgeText && item.badgeText.includes("Buku") ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", background: "#CBD5E1", color: "#475569", fontWeight: 'bold' }}>
                      Cover Buku
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", background: "#f1f5f9", color: "#94a3b8" }}>
                      Tanpa Gambar
                    </div>
                  )}
                  {item.badgeText && (
                    <span style={{ position: 'absolute', top: 12, left: 12, background: 'var(--primary)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600}}>
                      {item.badgeText}
                    </span>
                  )}
                </div>
                
                <div className="news-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <span className="news-date">{item.dateStr}</span>
                  
                  <h3 className="news-title" style={{ marginBottom: '12px' }}>
                    <Link href={`${basePath.split('?')[0]}/${item.slugOrId}`}>{item.title}</Link>
                  </h3>
                  
                  <p className="news-excerpt" style={{ flexGrow: 1, color: '#475569', marginBottom: '20px' }}>
                    {item.excerpt || "Tidak ada ringkasan yang tersedia."}
                  </p>
                  
                  {item.fileUrl && item.badgeText === 'Teks Khutbah' ? (
                    <a href={item.fileUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: "0.5rem 1.25rem", fontSize: "0.9rem" }}>
                      {item.readText || "Baca Selengkapnya"}
                    </a>
                  ) : (
                    <Link href={`${basePath.split('?')[0]}/${item.slugOrId}`} className="news-readmore" style={{ alignSelf: 'flex-start' }}>
                      {item.readText || "Baca Selengkapnya"}
                    </Link>
                  )}
                </div>
              </article>
            ))
          ) : (
             <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem 2rem", background: "#fff", borderRadius: "16px", color: "#64748b" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📝</div>
                Belum ada konten pada halaman ini.
             </div>
          )}
        </div>

        {/* Pagination Controls */}
        {(hasPrevPage || hasNextPage) && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px", borderTop: "1px solid #e2e8f0", paddingTop: "30px" }}>
            {hasPrevPage ? (
              <Link href={getPageLink(currentPage - 1)} className="btn btn-outline" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                 &larr; Sebelumnya
              </Link>
            ) : (
              <div /> // placeholder for flex-between spacing
            )}
            
            <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
               Halaman {currentPage} dari {Math.ceil(totalItems / itemsPerPage)}
            </span>

            {hasNextPage ? (
              <Link href={getPageLink(currentPage + 1)} className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                 Selanjutnya &rarr;
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}

      </div>
    </div>
  );
}
