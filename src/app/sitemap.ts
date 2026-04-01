import { MetadataRoute } from 'next';
import { apiClient } from '@/lib/api-client';

const baseUrl = 'https://cholilnafis.id';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/karya-ilmiah`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/karya-ilmiah?kategori=KaryaBuku`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/karya-ilmiah?kategori=Khotbah`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ekonomi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/galeri`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic routes: Berita (posts)
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await apiClient.getPosts();
    const posts: any[] = res.data || [];
    postRoutes = posts
      .filter((p: any) => p.slug && p.publishedAt)
      .map((p: any) => ({
        url: `${baseUrl}/berita/${p.slug}`,
        lastModified: new Date(p.updatedAt || p.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }));
  } catch (e) {
    console.error('[sitemap] Gagal fetch posts:', e);
  }

  // Dynamic routes: Karya Ilmiah
  let karyaRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await apiClient.getKaryasPublik();
    const karyas: any[] = res.data || [];
    karyaRoutes = karyas
      .filter((k: any) => k.id)
      .map((k: any) => ({
        url: `${baseUrl}/karya-ilmiah/${k.id}`,
        lastModified: new Date(k.updatedAt || k.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
  } catch (e) {
    console.error('[sitemap] Gagal fetch karya:', e);
  }

  return [...staticRoutes, ...postRoutes, ...karyaRoutes];
}
