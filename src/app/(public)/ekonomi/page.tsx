import React from 'react';
import { apiClient } from '@/lib/api-client';
import SharedContentList, { UnifiedItem } from '@/components/SharedContentList';

export default async function EkonomiListPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  
  let karyas: any[] = [];
  try {
    const res = await apiClient.getKaryasPublik();
    karyas = res.data || [];
  } catch (err) {
    console.error("Gagal mengambil data karya:", err);
  }

  // Filter based on Ekonomi categories
  const filteredKaryas = karyas.filter(k => k.category === 'Artikel' || k.category === 'Materi');

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
    excerpt: k.shortcontent || "Penjelasan materi dan edukasi terkait isu kontemporer.",
    imageUrl: null, // Usually Ekonomi doesn't have images in the card
    badgeText: k.category,
    readText: "Baca",
    fileUrl: k.fileUrl
  }));

  return (
    <SharedContentList 
      data={unifiedData}
      currentPage={currentPage}
      basePath="/ekonomi"
      pageTitle="Fokus Ekonomi Syariah"
      pageSubtitle="Kumpulan karya dan pencerahan seputar muamalah maliyah kontemporer, perbankan, dan instrumen keuangan Islam."
    />
  );
}
