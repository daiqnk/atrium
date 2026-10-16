// 中英双语字典：所有面向用户的字符串集中管理，便于维护与切换

export const navItems = {
  zh: [
    { href: '/', label: '首页' },
    { href: '/scenes', label: '场景' },
    { href: '/apps', label: 'App 系列' },
    { href: '/knowledge', label: '心理学知识' },
    { href: '/wellness', label: '日常调适' },
    { href: '/about', label: '关于' },
  ],
  en: [
    { href: '/en', label: 'Home' },
    { href: '/en/scenes', label: 'Scenes' },
    { href: '/en/apps', label: 'App Series' },
    { href: '/en/knowledge', label: 'Knowledge' },
    { href: '/en/wellness', label: 'Daily Wellness' },
    { href: '/en/about', label: 'About' },
  ],
};

/** 页脚法律 / 支持链接 */
export const legalItems = {
  zh: [
    { href: '/privacy', label: '隐私政策' },
    { href: '/support', label: '支持' },
  ],
  en: [
    { href: '/en/privacy', label: 'Privacy' },
    { href: '/en/support', label: 'Support' },
  ],
};

export const languages = {
  zh: { code: 'zh', label: '中文', short: '中' },
  en: { code: 'en', label: 'English', short: 'EN' },
};

// 通用文案
export const ui = {
  zh: {
    siteName: '心庭',
    tagline: '温和的科学，陪你看清自己',
    heroTitle: '欢迎来到心庭',
    heroSubtitle:
      '这里收录了我开发的心理学工具、系统的心理学知识，以及可以立即在日常生活中使用的调适方法。',
    ctaApps: '查看 App 系列',
    ctaKnowledge: '走进心理学',
    ctaWellness: '今日自我调适',
    sectionAppsTitle: 'App 系列',
    sectionAppsDesc: '为放松、觉察与专注设计的 iOS 小应用，按场景挑选你需要的那个。',
    sectionKnowledgeTitle: '心理学知识',
    sectionKnowledgeDesc: '从认知偏差到情绪调节，系统梳理可验证的心理学知识。',
    sectionWellnessTitle: '日常调适',
    sectionWellnessDesc: '面向真实场景的小练习：睡眠、焦虑、人际、专注、自我接纳。',
    contact: '联系',
    footerCopyright: '用理解替代评判，从一点觉察开始。',
    footerDisclaimer:
      '免责声明：本站内容仅用于心理健康科普与日常自助练习，部分内容由 AI 辅助撰写；作者不是执业医生或心理咨询师，内容不构成诊断、治疗或专业建议。如需帮助请寻求专业人士；紧急情况请拨打 120 / 110 或全国心理援助热线 12356。',
    languageSwitch: '语言',
    updated: '最后更新',
    readMore: '阅读全文',
    backToList: '返回列表',
    countApps: '共 {n} 个 App',
    countLiveApps: '{n} 个已上线',
    countArticles: '共 {n} 篇',
    countPractices: '共 {n} 个练习',
    pageNotFound: '页面未找到',
    pageNotFoundDesc: '你访问的页面可能不存在或已迁移。',
  },
  en: {
    siteName: 'Atrium',
    tagline: 'Gentle science, to see yourself clearly',
    heroTitle: 'Welcome to Atrium',
    heroSubtitle:
      'A curated collection of psychology tools I built, the knowledge behind them, and everyday practices you can apply right away.',
    ctaApps: 'Explore Apps',
    ctaKnowledge: 'Open Knowledge',
    ctaWellness: 'Daily Practice',
    sectionAppsTitle: 'App Series',
    sectionAppsDesc: 'Small iOS apps for relaxation, awareness and focus. Pick the one that fits your moment.',
    sectionKnowledgeTitle: 'Psychology Knowledge',
    sectionKnowledgeDesc: 'From cognitive biases to emotion regulation — a systematic, verifiable overview.',
    sectionWellnessTitle: 'Daily Wellness',
    sectionWellnessDesc: 'Real-life micro-practices for sleep, anxiety, relationships, focus, and self-acceptance.',
    contact: 'Contact',
    footerCopyright: 'Replace judgment with understanding. Begin with a single moment of awareness.',
    footerDisclaimer:
      'Disclaimer: this site offers general wellbeing education and self-help practices; some content is written with AI assistance. The author is not a licensed clinician or therapist, and nothing here is a diagnosis, treatment or professional advice. If you need help, please contact a professional; in a crisis, contact local emergency services (US: call or text 988).',
    languageSwitch: 'Language',
    updated: 'Last updated',
    readMore: 'Read more',
    backToList: 'Back to list',
    countApps: '{n} apps',
    countLiveApps: '{n} live',
    countArticles: '{n} articles',
    countPractices: '{n} practices',
    pageNotFound: 'Page not found',
    pageNotFoundDesc: 'The page you visited may have been moved or no longer exists.',
  },
};

export type Locale = 'zh' | 'en';

/**
 * 无障碍文案（屏幕阅读器会朗读，必须本地化，不能留英文）
 * switchTo* 的措辞跟随「当前语言」，所以两种语言都要给出两个目标的说法。
 */
export const a11y = {
  zh: {
    primaryNav: '主导航',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    footerNav: '页脚导航',
    switchToEn: 'Switch to English',
    switchToZh: '切换到中文',
    toggleTheme: '切换深浅色主题',
  },
  en: {
    primaryNav: 'Primary navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    footerNav: 'Footer navigation',
    switchToEn: 'Switch to English',
    switchToZh: '切换到中文',
    toggleTheme: 'Toggle light/dark theme',
  },
};

export function getUI(locale: Locale) {
  return ui[locale];
}

export function getNav(locale: Locale) {
  return navItems[locale];
}

export function getA11y(locale: Locale) {
  return a11y[locale];
}