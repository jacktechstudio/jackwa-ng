# jackwa.ng

Jack Wang 的双语个人项目与身份页（出海硬件产品营销 / 科技内容创作者 / 音乐与网页实验）。

## 技术栈

- React 19 + Vite 6，单页应用，CSS 集中在 `src/styles.css`。
- 字体：Barlow Condensed（display）、Archivo Variable（body），经 `@fontsource` 引入。
- 图标：Phosphor Icons（`@phosphor-icons/react`），界面图标统一来自该图标族。
- 构建产物面向 OpenAI Sites：`npm run build` 产出 `dist/client/index.html`、`dist/server/index.js`、`dist/.openai/hosting.json`；`npm run test:sites` 校验。

## 目录结构

- `src/App.jsx` — 页面结构与组件（identity panel + 四个 chapter：work / marketing / media / contribution）。
- `src/styles.css` — 全部样式与明暗双主题 token（`data-theme`）。
- `src/main.jsx` — 入口，挂载字体与样式。
- `public/assets/` — 真实项目截图与头像（不要用 CSS/SVG 替代可见图片）。
- `references/selected-broadcast-split.png` — 选定的视觉来源。
- `qa/` — 各视口与对比截图；`design-qa.md` — 逐轮 QA 记录。
- `worker/`、`scripts/`、`tests/` — Sites 交付相关，勿改动结构。
- `.claude/launch.json` — 本地预览启动配置（`npm run dev`，端口 5173）。

## 设计约定

- 编辑式广播分屏：sticky 身份面板（约 31.5vw / min 360px）+ 右侧 chapter 网格；aubergine / midnight / ivory / coral / cyan 调色板；condensed 大标题。
- 开场动效：单一文本槽 `jackwa.ng → jack wang` 形变，约 1 秒完成，不堆叠标签、无全屏 intro；`prefers-reduced-motion` 直接跳到终态。
- 章节导航为编号频道块（`01`–`04`，aria-label 含中文名），820px 以下隐藏。
- 滚动揭示用 CSS `translate` 属性实现，避免与卡片 hover 的 `transform` 冲突。
- 移动端目标 402px（iPhone 17 / 17 Pro）与 440px（17 Pro Max），含安全区、零横向溢出；触控目标 ≥ 44px。
- 明暗双主题，切换带短暂全局颜色过渡；通过 `localStorage('jackwa-theme')` 持久化。

## 内容红线

- 全球硬件营销章节保持纯文本，列名合作博主：Mrwhosetheboss、Linus Tech Tips、Beebom。
- BetterDisplay 为商业软件，Jack 仅为简体中文本地化贡献者；**任何可见文案都不得称其或该贡献为开源**。

## 本地验证

```bash
npm run dev          # 开发预览
npm run build        # 构建（须产出 dist/client、dist/server、dist/.openai）
npm run test:sites   # Sites 交付测试
```

详细审查记录见 `design-qa.md`。
