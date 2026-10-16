import { defineCollection, z } from 'astro:content';

/**
 * Apps 系列 — 每个 App 一篇 markdown，自带中英两个版本
 * 通过 frontmatter 的 `locale: zh | en` 区分
 */
const apps = defineCollection({
  type: 'content',
  schema: z.object({
    locale: z.enum(['zh', 'en']),
    title: z.string(),
    /** 英文 / 副标题 / 展示名（如 "WilLume"），用于 header 中显示 */
    subtitle: z.string().optional(),
    description: z.string(),
    icon: z.string(),
    category: z.string(),
    /** 系列分组：'微光' / '时间' / 等。新系列后续扩展自由字段；不填则不分组。 */
    series: z.string().optional(),
    tags: z.array(z.string()).default([]),
    /** 上线状态：live = 已上线；coming-soon = 即将发布；draft = 草稿 */
    status: z.enum(['live', 'coming-soon', 'draft']).default('live'),
    platforms: z.array(z.enum(['ios', 'android', 'web'])).default([]),
    links: z
      .object({
        appStore: z.string().url().optional(),
        playStore: z.string().url().optional(),
        web: z.string().url().optional(),
      })
      .optional(),
    features: z.array(z.string()).default([]),
    /** App Store 官方图标（站内路径，如 /apps/wilume/icon.png） */
    iconImage: z.string().optional(),
    /** App Store 数字 ID（来自公开页面） */
    appStoreId: z.string().optional(),
    /** 价格展示（来自 App Store 公开页面，查询日期见 priceCheckedAt） */
    price: z
      .object({
        cn: z.string().optional(),
        us: z.string().optional(),
      })
      .optional(),
    priceCheckedAt: z.coerce.date().optional(),
    /** 商店相关补充说明（如「暂未在中国大陆 App Store 上架」） */
    storeNote: z.string().optional(),
    /** 卡片封面图（可选 /api/first-screen 静态图），不填则用 AppCover 渐变占位 */
    cover: z.string().optional(),
    /** 详情页 gallery 截图（3-5 张推荐），不填则用 3 张渐变占位 */
    gallery: z.array(z.string()).default([]),
    /** 系列强调色（HEX，如 '#9CAF88'），不填则按 series 默认配色 */
    accentColor: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    publishedAt: z.coerce.date(),
  }),
});

const knowledge = defineCollection({
  type: 'content',
  schema: z.object({
    locale: z.enum(['zh', 'en']),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    readingTime: z.number().optional(),
    /** 是否 AI 辅助撰写（为 true 时文末自动加说明） */
    aiAssisted: z.boolean().default(false),
    publishedAt: z.coerce.date(),
  }),
});

const wellness = defineCollection({
  type: 'content',
  schema: z.object({
    locale: z.enum(['zh', 'en']),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    duration: z.string(),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
    /** 用于归入需求场景（见 src/data/scenes.ts） */
    tags: z.array(z.string()).default([]),
    aiAssisted: z.boolean().default(false),
    publishedAt: z.coerce.date(),
  }),
});

export const collections = { apps, knowledge, wellness };