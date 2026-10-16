// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { stripTodoBlocks } from './scripts/remark-strip-todo.mjs';

// 中英双语 + 静态站构建。
// 默认部署到 GitHub Pages 项目路径：https://daiqnk.github.io/atrium/
// 换域名 / 根部署时用环境变量覆盖：SITE_URL=https://example.com SITE_BASE=/ npm run build
const SITE_URL = process.env.SITE_URL ?? 'https://daiqnk.github.io';
const SITE_BASE = process.env.SITE_BASE ?? '/atrium';

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      // 中文默认无前缀（/），英文加 /en 前缀
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    tailwind({ applyBaseStyles: true }),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: { zh: 'zh-CN', en: 'en-US' },
      },
    }),
  ],
  // content/ 下全是 .md（不是 .mdx），所以 remark 插件必须挂在顶层 markdown 配置上。
  // 挂在 mdx() 集成里只对 .mdx 生效，content/*.md 不会被处理。
  markdown: {
    remarkPlugins: [stripTodoBlocks],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    resolve: {
      alias: { '@': '/src' },
    },
  },
});