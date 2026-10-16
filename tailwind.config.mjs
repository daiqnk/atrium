/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  // 深色模式：由 BaseLayout 的初始化脚本把 data-theme 写到 <html> 上，
  // 这样 `dark:` 工具类与 [data-theme='dark'] 选择器共用同一套触发源。
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      // 全部颜色都走 CSS 变量（在 global.css 的 :root / [data-theme=dark] 里定义），
      // 这样 theme('colors.*') 和 bg-/text- 工具类都会自动跟随主题切换，
      // 无需在每个组件里为深色模式单独写一套。
      colors: {
        cream: {
          50: 'var(--cream-50)',
          100: 'var(--cream-100)',
          200: 'var(--cream-200)',
        },
        rose: {
          50: 'var(--rose-50)',
          100: 'var(--rose-100)',
          200: 'var(--rose-200)',
          300: 'var(--rose-300)',
        },
        sage: {
          100: 'var(--sage-100)',
          200: 'var(--sage-200)',
          300: 'var(--sage-300)',
        },
        lavender: {
          100: 'var(--lavender-100)',
          200: 'var(--lavender-200)',
          300: 'var(--lavender-300)',
        },
        ink: {
          700: 'var(--ink-700)',
          800: 'var(--ink-800)',
          900: 'var(--ink-900)',
        },
        // 语义化补充：卡片/玻璃表面（白 → 深色下变深）
        surface: 'var(--surface)',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', '"Songti SC"', 'Georgia', 'serif'],
        sans: ['Inter', '"Helvetica Neue"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
      borderRadius: {
        soft: '1.25rem',
        xl2: '1.75rem',
        // 有机形状：不对称圆角，营造"手绘有机"质感
        blob: '60% 40% 55% 45% / 55% 45% 60% 40%',
        'blob-2': '45% 55% 42% 58% / 58% 45% 55% 42%',
      },
      boxShadow: {
        // 柔和暖调投影（随主题微调）
        warm: '0 6px 20px -10px var(--shadow), 0 1px 2px -1px var(--shadow)',
        glow: '0 0 0 6px rgba(224, 164, 157, 0.18)',
        // 长投影：悬停卡片时更"浮起"
        lift: '0 1px 0 rgba(255,255,255,0.5) inset, 0 22px 44px -18px var(--shadow-strong), 0 38px 80px -36px var(--shadow-strong)',
        // 主按钮的彩色弥散光
        'glow-rose': '0 12px 32px -12px rgba(192, 131, 124, 0.55)',
      },
      letterSpacing: {
        // 英文 eyebrow 用的宽字距
        wide2: '0.18em',
      },
      maxWidth: {
        prose: '70ch',
      },
    },
  },
  plugins: [],
};
