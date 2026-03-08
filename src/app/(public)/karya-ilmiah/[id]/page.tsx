import React from 'react';
import { notFound } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import Link from 'next/link';

export default async function KaryaDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let karya: any = null;

  try {
    const resDetail = await apiClient.getKarya(id);
    karya = resDetail.data;
  } catch (error) {
    if ((error as any).message?.includes('404')) {
      return notFound();
    }
    console.error("Gagal memuat detail karya:", error);
  }

  if (!karya) {
    return notFound();
  }

  const fmtDate = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  };

  const getKategoriColor = (cat: string) => {
    switch(cat) {
      case 'ArtikelKoran': return '#2563eb'; // blue-600
      case 'Artikel': return '#2563eb';
      case 'KaryaBuku': return '#16a34a'; // green-600
      case 'Khotbah': return '#ca8a04'; // yellow-600
      case 'Materi': return '#9333ea'; // purple-600
      default: return 'var(--primary)';
    }
  };

  const formatKategori = (cat: string) => {
    switch (cat) {
      case 'ArtikelKoran': return 'Artikel Koran';
      case 'Artikel': return 'Artikel Umum';
      case 'KaryaBuku': return 'Karya Buku';
      case 'Khotbah': return 'Naskah Khutbah';
      case 'Materi': return 'Materi Pendamping';
      default: return cat;
    }
  };

  // Extract cover image logic if the url is a direct image
  const isImageFile = karya.fileUrl && karya.fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i);
  const isPdfFile = karya.fileUrl && karya.fileUrl.match(/\.(pdf|doc|docx)$/i);

  return (
    <>
      <article style={{ backgroundColor: '#fff', paddingTop: '120px', paddingBottom: '60px', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <Link href={`/karya-ilmiah?kategori=${karya.category}`} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              &larr; Kembali ke Daftar {formatKategori(karya.category)}
            </Link>
          </div>
          
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--dark)', marginBottom: '20px', lineHeight: 1.3 }}>
            {karya.title}
          </h1>
          
          {/* Metadata */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: '#64748b', marginBottom: '32px', fontSize: '0.95rem', flexWrap: 'wrap' }}>
            <span>📅 {fmtDate(karya.createdAt)}</span>
            {karya.sumber && (<span>📰 Sumber: <strong>{karya.sumber}</strong></span>)}
            {karya.category && (
              <span style={{ backgroundColor: '#f1f5f9', color: getKategoriColor(karya.category), padding: '6px 12px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem' }}>
                {formatKategori(karya.category)}
              </span>
            )}
          </div>

          {/* Optional Attachments Display */}
          {isImageFile && (
            <div style={{ 
              width: '100%', 
              height: '450px', 
              borderRadius: '20px', 
              overflow: 'hidden', 
              marginBottom: '40px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={karya.fileUrl} alt={karya.title} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#f8fafc' }} />
            </div>
          )}

          {isPdfFile && (
            <div style={{ 
              padding: '24px', 
              backgroundColor: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              borderRadius: '12px',
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Lampiran Tersedia</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Dokumen naskah/materi dapat diunduh untuk dibaca secara luring.</p>
              </div>
              <a href={karya.fileUrl} target="_blank" rel="noreferrer" style={{ 
                backgroundColor: 'var(--primary)', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap'
              }}>
                📄 Unduh Dokumen
              </a>
            </div>
          )}

          <div 
            className="post-content"
            style={{ 
              fontSize: '1.15rem', 
              lineHeight: 1.8, 
              color: '#334155',
              fontFamily: 'system-ui, sans-serif'
            }}
            dangerouslySetInnerHTML={{ __html: karya.fullcontent || "<p><i>Karya ini tidak memiliki isi teks tambahan.</i></p>" }} 
          />
        </div>
      </article>
    </>
  );
}
