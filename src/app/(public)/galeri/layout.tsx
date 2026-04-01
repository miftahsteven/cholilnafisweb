import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri Dokumentasi',
  description:
    'Kumpulan foto dan video dokumentasi kegiatan KH. Muhammad Cholil Nafis — dakwah, ceramah, seminar, dan berbagai kegiatan kemasyarakatan.',
  alternates: { canonical: 'https://cholilnafis.id/galeri' },
  openGraph: {
    title: 'Galeri Dokumentasi | KH. Cholil Nafis',
    description:
      'Foto dan video dokumentasi kegiatan KH. Muhammad Cholil Nafis — ulama, akademisi, dan pendakwah Indonesia.',
    url: 'https://cholilnafis.id/galeri',
    type: 'website',
  },
};

export default function GaleriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
