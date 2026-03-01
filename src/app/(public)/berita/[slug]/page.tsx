import React from 'react';
import { notFound } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import Link from 'next/link';

export default async function BeritaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: any = null;
  let otherPosts: any[] = [];

  try {
    const [resDetail, resAll] = await Promise.all([
      apiClient.getPost(slug),
      apiClient.getPosts(),
    ]);
    post = resDetail.data;
    // exclude current post and take top 3
    otherPosts = (resAll.data || []).filter((p: any) => p.slug !== slug).slice(0, 3);
  } catch (error) {
    if ((error as any).message?.includes('404')) {
      return notFound();
    }
    console.error(error);
  }

  if (!post) {
    return notFound();
  }

  const fmtDate = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'long', year: 'numeric'
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

  const thumbUrl = getThumbnail(post.coverImage);

  return (
    <>
      <article style={{ backgroundColor: '#fff', paddingTop: '120px', paddingBottom: '60px', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              &larr; Kembali ke Beranda
            </Link>
          </div>
          
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--dark)', marginBottom: '20px', lineHeight: 1.3 }}>
            {post.title}
          </h1>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: '#64748b', marginBottom: '32px', fontSize: '0.95rem', flexWrap: 'wrap' }}>
            <span>📅 {fmtDate(post.publishedAt || post.createdAt)}</span>
            <span>✍️ {post.author?.name || 'Admin'}</span>
            {post.categories?.[0]?.category?.name && (
              <span style={{ backgroundColor: '#ede9fe', color: 'var(--primary)', padding: '6px 12px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem' }}>
                {post.categories[0].category.name}
              </span>
            )}
          </div>

          {thumbUrl && (
            <div style={{ 
              width: '100%', 
              height: '450px', 
              borderRadius: '20px', 
              overflow: 'hidden', 
              marginBottom: '40px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </article>

      {otherPosts.length > 0 && (
        <section style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '50px' }}>
              <h2 className="section-title">Berita Lainnya</h2>
              <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)', margin: '10px auto', borderRadius: '4px' }}></div>
            </div>
            
            <div className="berita-grid">
              {otherPosts.map((p) => {
                const thumb = getThumbnail(p.coverImage);
                return (
                  <article className="news-card" key={p.id}>
                    <div className="news-thumb">
                      {thumb ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={thumb} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f1f5f9', color: '#94a3b8' }}>
                          Tanpa Gambar
                        </div>
                      )}
                    </div>
                    <div className="news-content">
                      <span className="news-date">{fmtDate(p.publishedAt)}</span>
                      <h3 className="news-title">
                        <Link href={`/berita/${p.slug}`}>{p.title}</Link>
                      </h3>
                      <p className="news-excerpt">{p.excerpt || 'Tidak ada ringkasan yang tersedia untuk berita ini.'}</p>
                      <Link href={`/berita/${p.slug}`} className="news-readmore">
                        Baca Selengkapnya
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/#berita" className="btn btn-secondary">
                Lihat Semua Berita
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
