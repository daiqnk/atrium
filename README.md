# 心庭 / Atrium · 微光 App 官网

> 2026-10-16 更新：已补齐 6 个 App 的商店信息（来自 App Store 公开页面）、隐私政策 / 支持页、页脚免责声明、5 篇新科普文章（中英），并配置为 GitHub Pages 项目站。

## 快速开始

```bash
npm ci            # 依赖版本已全部固定（见 package.json / package-lock.json）
npm run build     # 默认产物面向 https://daiqnk.github.io/atrium/
# 换部署位置：SITE_URL=https://example.com SITE_BASE=/ npm run build
```

本地预览带 base 的产物：把 `dist/` 挂到 `/atrium` 路径下再访问，例如
`mkdir -p /tmp/s && ln -s "$PWD/dist" /tmp/s/atrium && cd /tmp/s && python3 -m http.server 4321` → http://127.0.0.1:4321/atrium/

**站内路径写法**：代码里写逻辑路径（`/apps/wilume`），输出时用 `withBase()`（`src/utils/paths.ts`）；读 `Astro.url.pathname` 时用 `stripBase()`。

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库 `daiqnk/atrium`（公开），把本目录推上去（main 分支）
2. 仓库 Settings → Pages → Source 选「GitHub Actions」
3. `.github/workflows/deploy.yml` 会在每次 push main 时自动构建并发布
4. 发布后访问 https://daiqnk.github.io/atrium/ 自检

---

# 心庭 · 网站

> 心庭（Atrium）：收录心理学 App 矩阵（多系列）、心理学知识、日常调适方案的中英双语站点。
> 静态站、Astro 4.x、Tailwind、温暖治愈风、零 JS 默认（性能优先）。

---

## 一、目录速览

```
psychology-app-matrix/
├── astro.config.mjs        # i18n（中英）+ Tailwind/MDX/sitemap 集成
├── tailwind.config.mjs     # 温暖治愈主题色板（柔粉/米白/鼠尾草绿）
├── src/
│   ├── pages/              # 路由 = 文件夹路径
│   │   ├── index.astro           # 中文首页（/）
│   │   ├── scenes/index.astro    # 需求场景总览（/scenes）
│   │   ├── scenes/[slug].astro   # 场景详情（/scenes/<slug>，按 tags 聚合内容）
│   │   ├── apps/index.astro      # 中文 App 矩阵列表（/apps）
│   │   ├── apps/[slug].astro     # 中文 App 详情（/apps/<slug>）
│   │   ├── knowledge/            # 心理学知识
│   │   ├── wellness/             # 日常调适
│   │   ├── about.astro
│   │   ├── 404.astro
│   │   └── en/                   # 英文版（同样结构）
│   ├── data/scenes.ts      # 需求场景定义（slug/中英文/情绪色/匹配 tags）
│   ├── components/         # Header / Footer / LanguageSwitcher / Card 组件
│   │   └── ui/             # Badge / Tag / Chip / PageHeader / RevealOnScroll / ArticleHero
│   ├── layouts/BaseLayout.astro
│   ├── content/            # 内容数据
│   │   ├── config.ts             # 三套 schema（apps/knowledge/wellness）
│   │   ├── apps/{zh,en}/*.md     # 每篇一个 App
│   │   ├── knowledge/{zh,en}/*.md
│   │   └── wellness/{zh,en}/*.md
│   ├── i18n/
│   │   ├── dictionaries.ts # 导航与页面文案字典
│   │   ├── labels.ts       # 标签文案 + 配色的唯一来源
│   │   └── utils.ts        # locale 解析 / 语言切换 URL / bareSlug
│   ├── styles/global.css   # 全局样式（已包含温馨治愈配色变量）
│   └── env.d.ts
├── public/
│   ├── favicon.svg
│   ├── og-cover.png        # 社交分享图（由 scripts/gen_og_image.py 生成）
│   └── robots.txt
├── scripts/
│   ├── gen_og_image.py     # 重新生成 og-cover.png
│   └── remark-strip-todo.mjs # 构建时摘掉正文里的 TODO 占位块
└── package.json
```

---

## 二、本地开发

```bash
# 第一次安装依赖（只用一次）
cd atrium
npm install
# 部分 Windows 环境需手动补 esbuild 平台二进制
npm install @esbuild/win32-x64 --no-save

# 启动开发服务器（默认 http://localhost:4321）
npm run dev

# 类型检查
npm run check

# 生产构建
npm run build

# 本地预览构建产物
npm run preview
```

---

## 三、添加新内容（最常用操作）

### 1. 新增一个 App（中英各一篇）

文件名 = URL 末尾的 slug。

**中文版**：`src/content/apps/zh/<slug>.md`

```markdown
---
locale: zh
title: 微光·虚度          # App 中文名
subtitle: "WilLume"        # 英文副标 / 展示名（可选）
description: "一句话讲清它是什么、谁用"
icon: 🕯️
category: 微光系列
series: 微光               # 系列分组（可选）。未来加「时间」「时光」等新系列直接换这个值
tags: [正念, 觉察]
status: live               # live=已上线 / coming-soon=即将上线 / draft=草稿
platforms: [ios]           # ios / android / web 任选
links:                     # 商店链接（可选）
  appStore: https://apps.apple.com/app/idxxxxxxx
  playStore: https://play.google.com/store/apps/details?id=xxx
  web: https://example.com
features:                   # 主要功能（可选，列表页与详情页都会显示）
  - 5 档情绪滑杆
  - 周报自动生成趋势图
cover: /apps/wilume/cover.png   # 卡片 16:9 封面图（可选，不填会自动生成 SVG 占位）
gallery:                       # 详情页截图（3-5 张推荐），不填则用 3 张 SVG 占位
  - /apps/wilume/01.png
  - /apps/wilume/02.png
  - /apps/wilume/03.png
accentColor: '#9CAF88'         # 系列强调色（可选，不填按 series 默认配色）
order: 7                       # 数字越小越靠前
featured: true                 # true = 列表右上角显示「推荐」
publishedAt: 2026-10-02
---

## 这是什么

（正文用 markdown 写，可写多段、列表、表格、引用…）
```

**英文版**：`src/content/apps/en/<slug>.md`，结构同上，`locale: en`，title / description / category 翻成英文，subtitle 字段通常填中文版的英文名或英文版的副标。

> **重要细节**：title / description 里如果含英文冒号 `:`，要加双引号包裹，例如 `title: "Hello: World"`，否则 YAML 会把它当成新 key 解析失败。

### 2. 加新系列

直接在 frontmatter 写 `series: <新系列名>` 即可。**无需改 schema**，未来需要"按系列分组展示"时再加逻辑。
`src/utils/hash.ts` 里有按系列名（中文 `微光` / 英文 `Gleam` 等）映射的默认调色板；新系列可暂时走 fallback 配色。

### 3. 修改 App 状态

- 已发布：`status: live`
- 即将发布：`status: coming-soon`（列表自动加"即将上线"标签，且排到最后）
- 草稿：`status: draft`

### 4. 图片预留位（你想问的）

每个 App 当前默认有 4 类视觉位，**全都可以不填就显示出"占位"**，让你先看到骨架：

| 位置 | frontmatter 字段 | 占位行为 | 替换方式 |
|---|---|---|---|
| 列表卡片顶部 | `cover` | 按 slug 哈希生成渐变 + 大 emoji icon + 小 app 名标签 | 把图放进 `public/apps/<slug>/cover.png`，frontmatter 写 `cover: /apps/<slug>/cover.png` |
| 详情页 hero（左侧大图） | `cover` | 同上，但用 3:2 aspect | 同上 |
| 详情页预览（3 张截图） | `gallery` | 自动生成"主界面 / 使用中 / 回顾"三种 phone-frame SVG 占位 | `gallery: ['/apps/<slug>/01.png', '/apps/<slug>/02.png', '/apps/<slug>/03.png']`（建议 3-5 张） |
| 系列强调色 | `accentColor` | 按 series 默认（微光=鼠尾草绿） | 写 hex 如 `'#7A8E6A'` |

**图片规格建议**：

| 类型 | 尺寸 | 比例 |
|---|---|---|
| 卡片封面 `cover.png` | 1600×900 或更大 | 16:9 |
| 详情页 gallery 截图 | 1170×2532（iPhone 14 Pro 物理分辨率）或 1242×2688 | 9:19.5 |
| Hero 大图（可选） | 2400×1350 或更大 | 16:9 |

> SVG 占位是按 `slug` 哈希生成稳定视觉，**同一 app 永远同一张图**——方便你先把骨架排好，再逐步替换。

### 5. 新增一篇心理学知识文章

`src/content/knowledge/zh/<slug>.md` 或 `…/en/<slug>.md`

```markdown
---
locale: zh
title: "文章标题（含英文冒号请加引号）"
description: 一句话介绍
category: 认知行为
tags: [CBT, 焦虑]
readingTime: 6           # 分钟数（可选）
publishedAt: 2026-10-02
---
```

### 6. 新增一个调适方案（步骤化练习）

`src/content/wellness/zh/<slug>.md` 或 `…/en/<slug>.md`

```markdown
---
locale: zh
title: 调适方案名
description: 一句话介绍
category: 呼吸
duration: 3 分钟
difficulty: easy          # easy / medium / hard
publishedAt: 2026-10-02
---
```

保存后**开发服务器会自动热更新**，无需重启。

### 7. 需求场景（Scenes）

首页按「需求」组织入口（焦虑 / 压力 / 失眠 / 专注 / 自我接纳），而不是平铺 App / 知识 / 调适。

- **场景定义**：`src/data/scenes.ts`。每个场景有 slug、中英文名、icon（emoji 占位）、情绪色（rose/sage/lavender/cream）、一句面向用户的话、`tags`（用于聚合内容）。
- **场景页**：`/scenes`（总览）+ `/scenes/<slug>`（详情）。详情页按 `tags` 匹配自动聚合 App / 知识 / 调适三类内容；没有内容命中时显示「内容整理中」占位。
- **让内容归入某场景**：给内容的 `tags` 加上场景的某个 tag 即可，无需改 schema。例如给一篇讲失眠的文章加 `tags: [睡眠, 失眠]`，它就会出现在「睡个好觉」场景页。
- **加新场景**：在 `scenes.ts` 里加一条即可，路由自动生成，无需建新文件。

---

## 四、标签系统（改文案 / 改配色只改一处）

全站所有「状态 / 难度 / 平台 / 系列 / 精选」类标签，都走同一条链路：

```
src/i18n/labels.ts            ← 文案 + 配色的唯一来源
        ↓
src/components/ui/Badge.astro ← 系统语义标签（状态、精选、系列、难度）
src/components/ui/Tag.astro   ← 内容自带关键词（#焦虑、#sleep）
src/components/ui/Chip.astro  ← 附属信息（平台、日期、时长、阅读时间）
src/components/ui/PageHeader.astro ← 列表页 / 关于 / 404 的统一标题区
```

### 想改一个标签的叫法

只改 `src/i18n/labels.ts` 里对应 map 的 `zh` / `en` 两个值，全站（列表页 + 详情页 + 中英文）同时生效：

| 函数 | 当前取值（中 / 英） |
|---|---|
| `statusLabel` | 已上线 / Live、即将上线 / Coming soon、开发中 / In progress |
| `difficultyLabel` | 轻松上手 / Easy、需要一点专注 / Moderate、需要投入 / Demanding |
| `platformLabel` | iOS、Android、网页版 / Web |
| `word('view' \| 'minute' \| 'featured' …)` | 查看 / View、分钟 / min、精选 / Featured |
| `formatDate` | 2026年10月2日 / Oct 2, 2026 |

### 想改一个标签的颜色

改 `Badge.astro` 里的 `data-tone` 分支即可，tone 与语义绑定：

| tone | 用途 | 颜色 |
|---|---|---|
| `live` | 已上线 / 难度 easy | 鼠尾草绿底 |
| `soon` | 即将上线 / 难度 medium | 玫瑰粉底 |
| `draft` | 开发中 / 难度 hard | 米色中性 |
| `featured` | 精选 | 实心玫瑰 |
| `series` | 系列名 / 分类 | 描边浅底 |
| `neutral` | 兜底 | 米色 |

### 两条硬规则

1. **不要在页面里手写状态文案**。之前 `apps/[slug].astro` 写「草稿」、`wellness/[slug].astro` 写「入门」，同一个 `easy` 在两处显示成两种说法——现在统一由 `labels.ts` 提供。
2. **不要在页面里另写一份标签颜色**。否则同一状态在不同页会出现色差。

### 已知坑：slug 带目录前缀

Astro 4 的 `entry.slug` 会带上子目录（如 `zh/wilume`）。凡是拼链接的地方都要先过 `bareSlug()`（`src/i18n/utils.ts`），否则会生成 `/apps/zh/wilume` 这种 404。卡片组件内部已经处理过了，新增自定义组件时注意沿用。

---

## 五、占位与"半成品外露"的处理

### 1. 正文里的 `TODO（待补充）`

`.md` 源文件里保留了 `> TODO（待补充）…` 的填写清单，但**不会渲染到页面上**。

实现方式：`scripts/remark-strip-todo.mjs` 挂在 `astro.config.mjs` 的**顶层 `markdown.remarkPlugins`** 上（注意：挂进 `mdx()` 集成只对 `.mdx` 生效，而 `content/` 下全是 `.md`）。插件做两件事：

1. 删掉所有以 `TODO` / `TODO：` / `TODO:` 开头的块
2. 删掉因此变空的标题（比如 `## 适合谁` 下面只有 TODO，清空后会留一个空标题）

要恢复显示：从 `astro.config.mjs` 的 `markdown.remarkPlugins` 里去掉这一项。

### 2. `features` / `links` 为空时的空区块

- `features` 为空 → 详情页「主要功能」整块不渲染
- `links` 为空 → 不渲染商店按钮
- 都不会出现"这里应该有东西但是空的"这种尴尬区块

### 3. 社交分享图

`public/og-cover.png`（1200×630）由脚本生成，不用 AI 生图——品牌图需要和站点色板严格一致，且中文字不能出错。

```bash
python3 scripts/gen_og_image.py   # 需要 Pillow
```

改文案或配色：改脚本顶部的常量后重跑。依赖：Pillow（已随托管 Python 装好）。

---

## 六、部署（推荐 Cloudflare Pages）

> 海外为主 + 免备案 + 免费 + 全球 CDN + 自动 HTTPS。

### 步骤

1. **推到 GitHub**
   ```bash
   cd atrium
   git init
   git add .
   git commit -m "init: psychology app matrix"
   # 在 GitHub 创建空 repo，复制地址后：
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

2. **登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → Create a project → Connect to Git**

3. **构建设置**:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 22（或 20）

4. **环境变量**：暂不需要

5. **绑定自定义域名**（可选）：
   - 进入 Pages 项目 → Custom domains → 添加 `yourdomain.com`
   - Cloudflare 会自动签发 HTTPS 证书

### 部署后自检

| 检查项 | 验证方式 |
|---|---|
| 中英首页 200 | `https://<your-site>.pages.dev/` 与 `/en` |
| App 详情页 | 点击 App 矩阵任意卡片，URL 形如 `/apps/wilume`（不带 `zh/` 前缀） |
| 语言切换器 | 点击右上角「English」/「中文」应保留当前页路径 |
| sitemap | `https://<your-site>.pages.dev/sitemap-index.xml` 应返回 XML |
| Lighthouse | 在 Chrome DevTools 跑一次 ≥ 95 |

---

## 七、待办与扩展点

- [ ] **补齐每个 App 的 4 项**：一句话定位（description）、`features` 功能列表、`links` 商店链接、CTA 文案（正文里已留 `> TODO` 块）
- [ ] **替换示例知识 / 调适内容**：`src/content/{knowledge,wellness}/{zh,en}/` 下目前是占位文章
- [ ] **替换占位图**：`cover` / `gallery` 目前是自动生成的 SVG 占位，逐步换成真机截图
- [ ] **替换首页 hero 文案**：`src/i18n/dictionaries.ts` 里 `ui.zh.heroTitle / heroSubtitle`
- [ ] **加联系页 / 订阅**（需要的话我可以加）
- [ ] **接 RSS**：`src/pages/rss.xml.ts` 接入 `@astrojs/rss`
- [ ] **接评论**：用 Giscus（GitHub Discussions 后端）即可

---

## 八、技术栈与决策依据

| 层 | 选择 | 决策理由 |
|---|---|---|
| 框架 | Astro 4.x | 内容站性能最优；零 JS 默认；中英 i18n 内置；MDX 内容集合 |
| 样式 | Tailwind 3.x | 主题色板集中维护；CSS 体积小 |
| 内容 | Content Collections（zod schema） | 类型安全；新增 App 仅需新建一个 md |
| 部署 | Cloudflare Pages | 海外免备案；全球 CDN；自动 HTTPS；免费 |

### 你后续可能用得到的命令

```bash
# 验证全部页面是否能 build 成功
npm run build

# 类型与 schema 校验（找到损坏的 frontmatter）
npm run check
```

---

**问题反馈**：新建 Issue 或留言给我。看到 deploy 链接可以发我看一眼，我帮你做上线后第一次 Lighthouse 体检。