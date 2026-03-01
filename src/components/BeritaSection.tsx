import React from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";

export default async function BeritaSection() {
  let posts: any[] = [];
  try {
    const res = await apiClient.getPosts();
    posts = res.data || [];
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
  }

  // Batasi hanya 3 berita terbaru di homepage
  const recentPosts = posts.slice(0, 3);

  const fmtDate = (iso: string | null) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getThumbnail = (coverImage: string | null) => {
    if (!coverImage) return null;
    try {
      const parsed = JSON.parse(coverImage);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
      return coverImage;
    } catch {
      return coverImage; // Plain URL
    }
  };

  return (
    <section id="berita" style={{ backgroundColor: "var(--white)" }}>
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Kabar & Berita</h2>
          <p className="section-subtitle">
            Update terbaru liputan aktivitas, pernyataan publik, dan rangkuman
            kegiatan dakwah.
          </p>
        </div>

        <div className="berita-grid">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => {
              const thumbUrl = getThumbnail(post.coverImage);
              return (
                <article className="news-card" key={post.id}>
                  <div className="news-thumb">
                    {thumbUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={thumbUrl}
                        alt={post.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "Tanpa Gambar"
                    )}
                  </div>
                  <div className="news-content">
                    <span className="news-date">
                      {fmtDate(post.publishedAt)}
                    </span>
                    <h3 className="news-title">
                      <Link href={`/berita/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="news-excerpt">
                      {post.excerpt ||
                        "Tidak ada ringkasan untuk berita ini..."}
                    </p>
                    <Link
                      href={`/berita/${post.slug}`}
                      className="news-readmore"
                    >
                      Baca Selengkapnya
                    </Link>
                  </div>
                </article>
              );
            })
          ) : (
            <div style={{ textAlign: "center", width: "100%", color: "#64748b" }}>
              Belum ada berita yang diterbitkan.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
