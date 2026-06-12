import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://mubashiir.in/sitemap.xml',
    host: 'https://mubashiir.in',
  };
}
