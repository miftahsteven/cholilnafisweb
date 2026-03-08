import React from 'react';
import { apiClient } from '@/lib/api-client';
import SharedContentList, { UnifiedItem } from '@/components/SharedContentList';
import Link from 'next/link';

export default async function KaryaListPage({ searchParams }: { searchParams: Promise<{ kategori?: string, page?: string }> }) {
  const params = await searchParams;
  const kategoriQuery = params.kategori || 'ArtikelKoran';
  const currentPage = parseInt(params.page || '1', 10);
  
  let karyas: any[] = [];
  try {
    const res = await apiClient.getKaryasPublik();
    karyas = res.data || [];
  } catch (err) {
    console.error("Gagal mengambil data karya:", err);
  }

  // Filter based on URL query
  const filteredKaryas = karyas.filter(k => k.category === kategoriQuery);

  const formatKategori = (cat: string) => {
    switch (cat) {
      case 'ArtikelKoran': return 'Artikel Koran';
      case 'Artikel': return 'Artikel Koran';
      case 'KaryaBuku': return 'Karya Buku';
      case 'Khotbah': return 'Teks Khutbah';
      case 'Materi': return 'Materi Terbitan';
      default: return cat;
    }
  };

  const getReadButtonText = (cat: string) => {
    if (cat === 'KaryaBuku') return 'Detail Buku';
    if (cat === 'Khotbah') return 'Unduh Naskah';
    return 'Baca Tulisan';
  };

  const fmtDate = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  // Map to unified format
  const unifiedData: UnifiedItem[] = filteredKaryas.map(k => ({
    id: k.id,
    title: k.title,
    slugOrId: k.id,
    dateStr: fmtDate(k.createdAt),
    excerpt: k.shortcontent || "Tidak ada deskripsi singkat untuk karya ini.",
    imageUrl: (k.category === "KaryaBuku" && k.fileUrl && k.fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i)) ? k.fileUrl : null,
    badgeText: k.category === "Khotbah" ? (k.fileUrl ? "PDF Unduhan" : "Teks Khutbah") : k.category === "KaryaBuku" ? "Buku Terbitan" : (k.sumber || "Situs Resmi"),
    readText: getReadButtonText(k.category),
    fileUrl: k.fileUrl
  }));

  const tabSelectionUI = (
    <div style={{ backgroundColor: "#f8fafc", paddingTop: "120px" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        <div className="tabs-nav" style={{ justifyContent: 'center' }}>
          <Link href="/karya-ilmiah?kategori=ArtikelKoran" className={`tab-btn ${kategoriQuery === 'ArtikelKoran' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            Artikel Koran
          </Link>
          <Link href="/karya-ilmiah?kategori=KaryaBuku" className={`tab-btn ${kategoriQuery === 'KaryaBuku' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            Karya Buku
          </Link>
          <Link href="/karya-ilmiah?kategori=Khotbah" className={`tab-btn ${kategoriQuery === 'Khotbah' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            Teks Khutbah
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {tabSelectionUI}
      <div style={{ marginTop: '-120px' }}>
        <SharedContentList 
          data={unifiedData}
          currentPage={currentPage}
          basePath={`/karya-ilmiah?kategori=${kategoriQuery}`}
          pageTitle={`Kumpulan ${formatKategori(kategoriQuery)}`}
          pageSubtitle="Menelusuri pustaka tulisan, pemikiran, dan karya-karya lengkap dari KH. Cholil Nafis."
        />
      </div>
    </>
  );
}
