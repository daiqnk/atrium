import type { APIRoute } from 'astro';
import { absUrl } from '@/utils/paths';

// 按 site + base 生成 robots.txt，换部署路径时无需手改
export const GET: APIRoute = ({ site, url }) => {
  const sitemap = absUrl('/sitemap-index.xml', site, url.origin);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
