import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://cholilnafis.id';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/administrator', '/administrator/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
