import React from 'react';
import { apiClient } from '@/lib/api-client';
import SharedContentList, { UnifiedItem } from '@/components/SharedContentList';

export default async function BeritaListPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  
  let posts: any[] = [];
  try {
    const res = await apiClient.getPosts();
    posts = res.data || [];
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
  }

  const fmtDate = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  const getThumbnail = (coverImage: string | null) => {
    if (!coverImage) return null;
    try {
      const parsed = JSON.parse(coverImage);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
      return coverImage;
    } catch {
      return coverImage;
    }
  };

  // Map to unified format
  const unifiedData: UnifiedItem[] = posts.map(p => ({
    id: p.id,
    title: p.title,
    slugOrId: p.slug,
    dateStr: fmtDate(p.publishedAt),
    excerpt: p.excerpt || "",
    imageUrl: getThumbnail(p.coverImage),
    badgeText: p.categories?.[0]?.category?.name || "Berita",
    readText: "Baca Selengkapnya"
  }));

  return (
    <SharedContentList 
      data={unifiedData}
      currentPage={currentPage}
      basePath="/berita"
      pageTitle="Kumpulan Kabar & Berita"
      pageSubtitle="Update terbaru liputan aktivitas, pernyataan publik, dan rangkuman kegiatan dakwah."
    />
  );
}
