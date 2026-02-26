import React from "react";
import Image from "next/image";
import Chatbot from "@/components/Chatbot";
import Gallery from "@/components/Gallery";
import Opinions from "@/components/Opinions";
import FAQ from "@/components/FAQ";

export default function PublicPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="beranda">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>KH. Muhammad Cholil Nafis</h1>
            <span className="hero-subtitle">Ulama, Dosen, dan Penulis</span>
            <p className="hero-desc">
              Mendedikasikan ilmu dan pemikiran untuk kemajuan umat Islam
              Indonesia melalui dakwah kultural, pendidikan, dan pemikiran
              ekonomi syariah yang progresif.
            </p>
            <div className="hero-cta">
              <a href="#profil" className="btn btn-primary">
                Lihat Profil
              </a>
              <a href="#konsultasi" className="btn btn-secondary">
                Ajukan Konsultasi
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-placeholder">
              <Image
                src="/assets/images/profil2.jpeg"
                alt="KH. Muhammad Cholil Nafis"
                width={400}
                height={500}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Profil Section */}
      <section id="profil" className="container">
        <div className="text-center">
          <h2 className="section-title">Profil Akademik & Dakwah</h2>
          <p className="section-subtitle">
            Mengenal lebih dekat perjalanan keilmuan dan dedikasi di jalur dakwah
            dan akademik.
          </p>
        </div>

        <div className="profile-content">
          <div className="profile-image-wrap">
            <div className="profile-photo">Foto Portret (Placeholder)</div>
            <div className="profile-decor"></div>
          </div>
          <div className="profile-bio">
            <h3>Biografi Singkat</h3>
            <p>
              KH. Muhammad Cholil Nafis, Lc., Ph.D. adalah seorang cendekiawan
              muslim, akademisi, dan pendakwah terkemuka di Indonesia. Kiprahnya
              tak hanya terbatas di mimbar masjid, namun juga di ranah akademik,
              pemikiran ekonomi syariah, dan literasi keislaman tingkat nasional.
            </p>
            <p>
              Beliau aktif merajut simpul-simpul keumatan dengan pendekatan
              wasathiyah (moderat), mempromosikan Islam yang ramah, intelektual,
              dan membawa solusi bagi persoalan bangsa kontemporer.
            </p>

            <ul className="skills-list">
              <li>Pakar Fikih & Ushul Fikih</li>
              <li>Dewan Pengawas Syariah</li>
              <li>Narasumber TV Nasional</li>
              <li>Penulis Buku Keislaman</li>
              <li>Dosen Pascasarjana</li>
              <li>Pengasuh Pesantren</li>
            </ul>

            <div className="achievement-cards">
              <div className="card-achieve">
                <h4>MUI Pusat</h4>
                <p>Wakil Ketua Umum</p>
              </div>
              <div className="card-achieve">
                <h4>Akademisi</h4>
                <p>Dosen UIN Syarif Hidayatullah Jakarta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Section */}
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
            {/* Card 1 */}
            <article className="news-card">
              <div className="news-thumb">Thumbnail Berita (600x400)</div>
              <div className="news-content">
                <span className="news-date">12 Oktober 2023</span>
                <h3 className="news-title">
                  <a href="#">
                    Menjaga Kesatuan Umat di Tahun Politik Menurut Pandangan Islam
                  </a>
                </h3>
                <p className="news-excerpt">
                  Pesan penting mengenai ukhuwah islamiyah dan wathaniyah dalam
                  mengantisipasi dinamika sosial politik jelang pemilu menurut
                  kacamata ulama.
                </p>
                <a href="#" className="news-readmore">
                  Baca Selengkapnya
                </a>
              </div>
            </article>

            {/* Card 2 */}
            <article className="news-card">
              <div className="news-thumb">Thumbnail Berita (600x400)</div>
              <div className="news-content">
                <span className="news-date">05 September 2023</span>
                <h3 className="news-title">
                  <a href="#">
                    Peran Ekonomi Syariah dalam Pemulihan Ketahanan Nasional
                  </a>
                </h3>
                <p className="news-excerpt">
                  Dalam forum seminar nasional, dipaparkan bagaimana instrumen
                  keuangan syariah seperti zakat dan wakaf dapat memperkuat fondasi
                  ekonomi mikro.
                </p>
                <a href="#" className="news-readmore">
                  Baca Selengkapnya
                </a>
              </div>
            </article>

            {/* Card 3 */}
            <article className="news-card">
              <div className="news-thumb">Thumbnail Berita (600x400)</div>
              <div className="news-content">
                <span className="news-date">28 Agustus 2023</span>
                <h3 className="news-title">
                  <a href="#">Hadir Sebagai Pembicara Utama Islamic Finance Summit</a>
                </h3>
                <p className="news-excerpt">
                  Tinjauan kritis dan solutif terhadap tantangan perbankan syariah
                  di era digitalisasi keuangan global dan inovasi fintech syariah.
                </p>
                <a href="#" className="news-readmore">
                  Baca Selengkapnya
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Konsultasi Section */}
      <section id="konsultasi" className="container">
        <div className="text-center">
          <h2 className="section-title">Ruang Konsultasi Keagamaan</h2>
          <p className="section-subtitle">
            Sampaikan pertanyaan seputar hukum Islam, keluarga, atau problematika
            umat dengan asisten virtual cerdas <b>ki.ai</b>.
          </p>
        </div>

        <Chatbot />
      </section>

      {/* Galeri Section */}
      <section id="galeri" className="galeri-bg">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Galeri Dokumentasi</h2>
          </div>

          <Gallery />
        </div>
      </section>

      {/* Opini Section */}
      <section id="opini" className="container">
        <div className="text-center">
          <h2 className="section-title">Kumpulan Opini & Karya</h2>
        </div>

        <Opinions />
      </section>

      {/* Ekonomi Syariah Section */}
      <section id="ekonomi" className="ekonomi-bg">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title" style={{ color: "var(--secondary-dark)" }}>
              Fokus: Ekonomi Syariah
            </h2>
            <p className="section-subtitle">
              Kumpulan pencerahan seputar muamalah maliyah kontemporer, perbankan,
              dan instrumen keuangan Islam.
            </p>
          </div>

          <div className="grid grid-2" style={{ marginBottom: "3rem" }}>
            <div className="opini-card" style={{ margin: 0 }}>
              <span
                className="opini-badge"
                style={{ background: "var(--secondary-dark)" }}
              >
                Artikel
              </span>
              <div className="opini-detail">
                <h4>Hukum Paylater dan Pinjol dalam Tinjauan Fikih</h4>
                <p>
                  Penjelasan ringkas batasan-batasan transaksi menunda pembayaran
                  masa kini antara mubah dan riba.
                </p>
              </div>
            </div>
            <div className="opini-card" style={{ margin: 0 }}>
              <span
                className="opini-badge"
                style={{ background: "var(--secondary-dark)" }}
              >
                Materi
              </span>
              <div className="opini-detail">
                <h4>Optimalisasi Wakaf Uang Produktif</h4>
                <p>
                  Konsep dan implementasi wakaf uang sebagai katalisator
                  kesejahteraan umat tanpa kehilangan pokok harta.
                </p>
              </div>
            </div>
          </div>

          {/* Tanya Jawab Accordion */}
          <div className="text-center">
            <h3 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
              Tanya Jawab Populer Muamalah
            </h3>
          </div>

          <FAQ />
        </div>
      </section>
    </>
  );
}
