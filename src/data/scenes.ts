/**
 * 需求场景（Scene）定义 —— 首页「按需求组织入口」的唯一来源。
 *
 * 借鉴 Headspace：不按「App/知识/调适」平铺，而是按用户此刻的真实状态
 * （少点压力、睡个好觉、集中注意力…）组织入口。
 *
 * 每个场景有：
 *   - slug / 中英文名 / 一句面向用户的话
 *   - icon（emoji，占位用，后续换插画）
 *   - 情绪色（对应 tailwind 的 rose / sage / lavender，各自低饱和）
 *   - 匹配 tags：场景页据此聚合 app / knowledge / wellness（内容先空着）
 */

export interface Scene {
  slug: string;
  zh: string;
  en: string;
  icon: string;
  /** 一句面向用户的话（中文） */
  zhLine: string;
  enLine: string;
  /** 情绪色：rose=情绪 / sage=平静专注 / lavender=睡眠深度 / cream=自我接纳 */
  tone: 'rose' | 'sage' | 'lavender' | 'cream';
  /** 场景页据此匹配内容（tags 命中即归入该场景） */
  tags: string[];
}

export const scenes: Scene[] = [
  {
    slug: 'anxiety',
    zh: '管理焦虑',
    en: 'Manage anxiety',
    icon: '🌫️',
    zhLine: '焦虑不是要被消灭，是要被看见。',
    enLine: 'Anxiety asks to be seen, not silenced.',
    tone: 'rose',
    tags: ['焦虑', 'anxiety', '担忧', 'worry'],
  },
  {
    slug: 'stress',
    zh: '少点压力',
    en: 'Stress less',
    icon: '🍃',
    zhLine: '给紧绷的神经，一个松开的理由。',
    enLine: 'Give a tight mind one good reason to let go.',
    tone: 'sage',
    tags: ['压力', 'stress', '紧张', 'tension'],
  },
  {
    slug: 'sleep',
    zh: '睡个好觉',
    en: 'Sleep soundly',
    icon: '🌙',
    zhLine: '今晚，让思绪慢慢靠岸。',
    enLine: 'Tonight, let your thoughts come ashore.',
    tone: 'lavender',
    tags: ['睡眠', 'sleep', '失眠', 'insomnia'],
  },
  {
    slug: 'focus',
    zh: '集中注意力',
    en: 'Find focus',
    icon: '🎯',
    zhLine: '把涣散的注意力，重新收回来。',
    enLine: 'Bring scattered attention back to one thing.',
    tone: 'sage',
    tags: ['专注', 'focus', '注意', 'attention'],
  },
  {
    slug: 'acceptance',
    zh: '接纳自己',
    en: 'Accept yourself',
    icon: '🤍',
    zhLine: '你不需要变成另一个人，才值得被爱。',
    enLine: 'You do not need to become someone else to be worthy.',
    tone: 'cream',
    tags: ['接纳', 'acceptance', '自我', 'self-compassion', '自我关怀'],
  },
];

export function getScene(slug: string): Scene | undefined {
  return scenes.find((s) => s.slug === slug);
}

/** 情绪色 → 实际 CSS 颜色（引用 global.css 里的场景变量，随深浅主题自动切换） */
export const SCENE_TONES: Record<Scene['tone'], { bg: string; accent: string; glow: string }> = {
  rose: { bg: 'var(--scene-rose-bg)', accent: 'var(--scene-rose-accent)', glow: 'var(--scene-rose-glow)' },
  sage: { bg: 'var(--scene-sage-bg)', accent: 'var(--scene-sage-accent)', glow: 'var(--scene-sage-glow)' },
  lavender: { bg: 'var(--scene-lavender-bg)', accent: 'var(--scene-lavender-accent)', glow: 'var(--scene-lavender-glow)' },
  cream: { bg: 'var(--scene-cream-bg)', accent: 'var(--scene-cream-accent)', glow: 'var(--scene-cream-glow)' },
};
