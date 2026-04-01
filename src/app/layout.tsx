import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

const BASE_URL = "https://cholilnafis.id";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "KH. Muhammad Cholil Nafis - Profil Resmi",
    template: "%s | KH. Cholil Nafis",
  },
  description:
    "Profil resmi KH. Muhammad Cholil Nafis, Lc., Ph.D. — Ulama, Akademisi, Wakil Ketua MUI Pusat, dan pakar ekonomi syariah Indonesia.",
  keywords: [
    "Cholil Nafis",
    "KH Muhammad Cholil Nafis",
    "MUI",
    "ulama Indonesia",
    "ekonomi syariah",
    "dakwah",
    "fikih",
    "cendekiawan muslim",
    "cholilnafis.id",
  ],
  authors: [{ name: "KH. Muhammad Cholil Nafis", url: BASE_URL }],
  creator: "KH. Muhammad Cholil Nafis",
  publisher: "KH. Muhammad Cholil Nafis",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "KH. Cholil Nafis",
    title: "KH. Muhammad Cholil Nafis - Profil Resmi",
    description:
      "Profil resmi KH. Muhammad Cholil Nafis, Lc., Ph.D. — Ulama, Akademisi, Wakil Ketua MUI Pusat, dan pakar ekonomi syariah Indonesia.",
    images: [
      {
        url: "/assets/images/profil2.jpeg",
        width: 1200,
        height: 630,
        alt: "KH. Muhammad Cholil Nafis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KH. Muhammad Cholil Nafis - Profil Resmi",
    description:
      "Profil resmi KH. Muhammad Cholil Nafis, Lc., Ph.D. — Ulama, Akademisi, dan Wakil Ketua MUI Pusat.",
    images: ["/assets/images/profil2.jpeg"],
  },
  verification: {
    // Tambahkan kode verifikasi Google Search Console di sini
    // google: "PASTE_KODE_VERIFIKASI_GOOGLE_DI_SINI",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "KH. Muhammad Cholil Nafis",
  alternateName: ["Cholil Nafis", "Prof. Dr. Cholil Nafis"],
  description:
    "Ulama, akademisi, dan pendakwah terkemuka di Indonesia. Wakil Ketua Umum MUI Pusat dan Dosen Pascasarjana UIN Syarif Hidayatullah Jakarta.",
  url: BASE_URL,
  image: `${BASE_URL}/assets/images/profil2.jpeg`,
  jobTitle: "Wakil Ketua Umum MUI Pusat",
  worksFor: {
    "@type": "Organization",
    name: "Majelis Ulama Indonesia (MUI)",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Universitas Islam Internasional" },
  ],
  knowsAbout: [
    "Fikih Islam",
    "Ushul Fikih",
    "Ekonomi Syariah",
    "Perbankan Islam",
    "Dakwah",
  ],
  nationality: "Indonesia",
  sameAs: [
    "https://cholilnafis.id",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
