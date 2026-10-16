/**
 * App 系列目录 —— 母品牌「心庭」下的多个 App 系列。
 *
 * 「微光」只是第一个系列；未来会有「云佛」（佛系减压）等。
 * 这里作为唯一来源，apps 列表页按此分组渲染，未上线 / 暂无 App 的系列显示占位空位。
 *
 * 关联方式：App 的 frontmatter `series` 字段是自由字符串（zh 用中文名、en 用英文名），
 * 通过 `match` 数组命中对应的系列。
 */

export interface Series {
  /** 唯一 slug（用于稳定排序、路由无关的标识） */
  slug: string;
  /** 中文名 */
  zh: string;
  /** 英文名 */
  en: string;
  /** 一句话中文描述 */
  zhDesc: string;
  /** 一句话英文描述 */
  enDesc: string;
  /** emoji 占位（后续换插画） */
  icon: string;
  /** live = 已有 App；planned = 预留、暂无 App */
  status: 'live' | 'planned';
  /** 命中 App frontmatter `series` 字段的名字（中文/英文都可） */
  match: string[];
}

export const seriesList: Series[] = [
  {
    slug: 'gleam',
    zh: '微光',
    en: 'Gleam',
    zhDesc: '正念与觉察的小练习，允许自己慢下来。',
    enDesc: 'Mindful micro-practices that let you slow down.',
    icon: '🕯️',
    status: 'live',
    match: ['微光', 'Gleam'],
  },
  {
    slug: 'yunfo',
    zh: '云佛',
    en: 'Cloud Buddha',
    zhDesc: '借一点佛学智慧，安顿纷乱的心。',
    enDesc: 'A little Buddhist wisdom to settle a restless mind.',
    icon: '☁️',
    status: 'planned',
    match: ['云佛', 'Cloud Buddha'],
  },
];

/** 根据 App 的 series 字段找到对应系列 */
export function seriesOf(seriesName?: string): Series | undefined {
  if (!seriesName) return undefined;
  return seriesList.find((s) => s.match.includes(seriesName));
}
