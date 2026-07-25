import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  GithubLogo,
  MegaphoneSimple,
  Moon,
  NotePencil,
  Play,
  Sun,
  TelevisionSimple,
  YoutubeLogo,
} from '@phosphor-icons/react';

const externalProps = {
  target: '_blank',
  rel: 'noreferrer',
};

const chapters = [
  { id: 'work', number: '01', zh: '作品' },
  { id: 'marketing', number: '02', zh: '营销' },
  { id: 'media', number: '03', zh: '自媒体' },
  { id: 'contribution', number: '04', zh: '贡献' },
];

const projects = [
  {
    number: '01',
    eyebrow: 'K-POP RELEASE RADAR',
    tag: 'MUSIC RADAR',
    title: '今天值得听的 K‑Pop 新发行',
    description: '每周 K-Pop 新发行，一张可视化音乐雷达。',
    image: '/assets/project-kpop.png',
    href: 'https://kpop.jacktechstudio.com/',
    className: 'project-card--lead',
  },
  {
    number: '02',
    eyebrow: 'JACK MUSIC',
    tag: 'MUSIC INDEX',
    title: '音乐发现与收藏',
    description: '一张带着温度的个人音乐首页。',
    image: '/assets/project-jack-music.png',
    href: 'https://i.jackwa.ng/',
    className: '',
  },
  {
    number: '03',
    eyebrow: 'AQUA WEB',
    tag: 'MAC OS RETRO',
    title: 'Mac OS X 10.2 Interface Study',
    description: '把 2002 年的 Aqua 界面装回浏览器。',
    image: '/assets/project-aqua.png',
    href: 'https://macosaqua.jacktechstudio.com/',
    className: '',
  },
];

const socialLinks = [
  {
    label: 'Bilibili',
    meta: '4.1W 粉丝',
    href: 'https://space.bilibili.com/669497011',
    brand: 'bilibili',
    Icon: TelevisionSimple,
  },
  {
    label: 'YouTube',
    meta: '10K+ 订阅',
    href: 'https://www.youtube.com/@j.w',
    brand: 'youtube',
    Icon: YoutubeLogo,
  },
  {
    label: '微博',
    meta: '@jacktechstudio',
    href: 'https://www.weibo.com/u/7742599085',
    brand: 'weibo',
    Icon: MegaphoneSimple,
  },
  {
    label: '小红书',
    meta: 'DESK / GEAR',
    href: 'https://www.xiaohongshu.com/user/profile/61d3beae000000001000f5ae',
    brand: 'xiaohongshu',
    Icon: NotePencil,
  },
];

function ThemeToggle({ theme, onToggle }) {
  const nextTheme = theme === 'dark' ? '白天' : '夜间';

  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`切换到${nextTheme}模式`}
      title={`切换到${nextTheme}模式`}
    >
      {theme === 'dark' ? <Sun weight="bold" /> : <Moon weight="fill" />}
    </button>
  );
}

function SectionHeading({ index, eyebrow, title, children, link, linkLabel }) {
  return (
    <div className="section-heading reveal">
      <div className="section-kicker">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {children && <div className="section-copy">{children}</div>}
      {link && (
        <a className="text-link" href={link} {...externalProps}>
          {linkLabel}
          <ArrowUpRight weight="bold" />
        </a>
      )}
    </div>
  );
}

function Timecode({ children }) {
  return <span className="timecode">{children}</span>;
}

export function App() {
  const initialTheme = useMemo(() => {
    if (typeof window === 'undefined') return 'dark';
    const savedTheme = window.localStorage.getItem('jackwa-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }, []);

  const [theme, setTheme] = useState(initialTheme);
  const [identityText, setIdentityText] = useState('jackwa.ng');
  const [identityChanging, setIdentityChanging] = useState(false);
  const [activeSection, setActiveSection] = useState('work');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('jackwa-theme', theme);
  }, [theme]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setIdentityText('jack wang');
      return undefined;
    }

    const startMorph = window.setTimeout(() => setIdentityChanging(true), 620);
    const finishMorph = window.setTimeout(() => {
      setIdentityText('jack wang');
      setIdentityChanging(false);
    }, 860);

    return () => {
      window.clearTimeout(startMorph);
      window.clearTimeout(finishMorph);
    };
  }, []);

  useEffect(() => {
    const sectionIds = chapters.map((chapter) => chapter.id);
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: '-10% 0px -30% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'));
    if (nodes.length === 0) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-in'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.add('is-theme-animating');
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
    window.setTimeout(
      () => document.documentElement.classList.remove('is-theme-animating'),
      480
    );
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到顶部">
          <span className="brand-dot" />
          JACKWA.NG
        </a>

        <nav className="header-nav" aria-label="章节导航">
          {chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className={`nav-item ${activeSection === chapter.id ? 'is-active' : ''}`}
              aria-label={`${chapter.number} ${chapter.zh}`}
              title={`${chapter.number} · ${chapter.zh}`}
            >
              {chapter.number}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <span className="location">Shenzhen · China</span>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main id="top" className="site-shell">
        <aside className="identity-panel">
          <div className="identity-panel__inner">
            <div className="studio-label">
              <span>JACK TECH STUDIO</span>
              <span>科技数码内容创作者</span>
            </div>

            <div className="identity-stack" aria-live="polite">
              <div
                className={`identity-line identity-line--morph ${identityChanging ? 'is-switching' : ''}`}
                aria-label={identityText}
              >
                <span className="identity-number">{identityText === 'jackwa.ng' ? '01' : '02'}</span>
                <span>{identityText}</span>
              </div>
            </div>

            <div className="role-list">
              <p className={`role-item ${activeSection === 'marketing' ? 'is-active' : ''}`}>
                <strong>出海硬件产品营销人</strong>
                <span>Global hardware product marketing</span>
              </p>
              <p className={`role-item ${activeSection === 'media' ? 'is-active' : ''}`}>
                <strong>科技内容创作者</strong>
                <span>Technology creator</span>
              </p>
              <p className={`role-item ${activeSection === 'work' ? 'is-active' : ''}`}>
                <strong>音乐 / 网页实验家</strong>
                <span>Music &amp; web experimenter</span>
              </p>
              <p className={`role-item ${activeSection === 'contribution' ? 'is-active' : ''}`}>
                <strong>软件本地化贡献者</strong>
                <span>Localization &amp; UI contributor</span>
              </p>
            </div>

            <div className="hero-actions">
              <a className="button button--primary" href="#work">
                查看作品
                <ArrowDown weight="bold" />
              </a>
              <a
                className="button button--secondary"
                href="https://resume1.jacktechstudio.com/"
                {...externalProps}
              >
                查看媒体简历
                <ArrowUpRight weight="bold" />
              </a>
            </div>

            <div className="identity-note">
              <img src="/assets/jack-avatar.png" alt="Jack Wang 的头像" />
              <p>
                <strong>Jack Wang</strong>
                <span>把产品、内容与代码，调到同一个频道。</span>
              </p>
            </div>

            <a className="scroll-cue" href="#work">
              SCROLL TO EXPLORE
              <ArrowDown weight="bold" />
            </a>
          </div>
        </aside>

        <div className="content-panel">
          <section className="chapter chapter--projects" id="work">
            <SectionHeading index="01" eyebrow="WORK" title="精选项目">
              <p>音乐雷达、个人音乐首页与网页界面实验，全部真实上线。</p>
              <p className="micro-copy">LIVE PROJECTS · 点击直达</p>
            </SectionHeading>

            <div className="project-grid reveal" style={{ ['--reveal-delay']: '90ms' }}>
              {projects.map((project, index) => (
                <a
                  className={`project-card ${project.className}`}
                  href={project.href}
                  {...externalProps}
                  key={project.href}
                >
                  <div className="project-card__image">
                    <img
                      src={project.image}
                      alt={`${project.title} 项目高清网页截图`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="project-card__shine" aria-hidden="true" />
                    <span className="project-card__tag">{project.tag}</span>
                    <span className="project-card__play" aria-hidden="true">
                      <Play weight="fill" />
                    </span>
                  </div>
                  <div className="project-card__meta">
                    <span>{project.number}</span>
                    <span>{project.eyebrow}</span>
                    <ArrowUpRight weight="bold" />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <Timecode>00:0{index + 1}:2{index}:0{index + 4}</Timecode>
                </a>
              ))}
            </div>

            <div
              className="broadcast-ticker reveal"
              style={{ ['--reveal-delay']: '180ms' }}
              aria-label="实时项目广播"
            >
              <span className="ticker-badge">LIVE FEED</span>
              <div className="ticker-track-wrapper">
                <div className="ticker-track">
                  <span>FEATURED PROJECTS · K-POP RELEASE RADAR · JACK MUSIC · AQUA WEB INTERFACE STUDY · 出海硬件产品营销 GLOBAL HARDWARE MARKETING · 深圳信号 SHENZHEN SIGNAL 001 · </span>
                  <span>FEATURED PROJECTS · K-POP RELEASE RADAR · JACK MUSIC · AQUA WEB INTERFACE STUDY · 出海硬件产品营销 GLOBAL HARDWARE MARKETING · 深圳信号 SHENZHEN SIGNAL 001 · </span>
                </div>
              </div>
              <span className="ticker-status">ONLINE</span>
            </div>
          </section>

          <section className="chapter chapter--marketing" id="marketing">
            <SectionHeading
              index="02"
              eyebrow="MARKETING"
              title={
                <>
                  出海硬件
                  <br />
                  产品营销
                </>
              }
            >
              <p>让好产品、全球科技受众与头部创作者，调到同一个频道。</p>
              <ul>
                <li>创作者合作 / Creator Partnerships</li>
                <li>全球传播策略 / Global Communications</li>
                <li>产品叙事 / Product Storytelling</li>
              </ul>
            </SectionHeading>

            <div
              className="collaboration-board reveal"
              style={{ ['--reveal-delay']: '90ms' }}
              aria-label="合作科技博主"
            >
              <div className="collaboration-board__header">
                <span>CREATOR COLLABORATIONS</span>
                <span className="signal-pill"><span className="pulse-dot" /> GLOBAL / TECH</span>
              </div>
              <p className="collaboration-board__title">合作创作者 / COLLABORATORS</p>
              <div className="collaboration-list">
                <div className="creator-item">
                  <span>01</span>
                  <strong>Mrwhosetheboss</strong>
                  <small className="country-badge">UK</small>
                </div>
                <div className="creator-item">
                  <span>02</span>
                  <strong>Linus Tech Tips</strong>
                  <small className="country-badge">CA</small>
                </div>
                <div className="creator-item">
                  <span>03</span>
                  <strong>Beebom</strong>
                  <small className="country-badge">IN</small>
                </div>
              </div>
              <div className="collaboration-board__footer">
                <span>硬件产品 × 科技创作者 × 全球市场</span>
                <span>PARTNERSHIP SIGNAL / 003</span>
              </div>
            </div>
          </section>

          <section className="chapter chapter--media" id="media">
            <SectionHeading index="03" eyebrow="MEDIA" title="自媒体">
              <p>科技、工具与桌面生产力，多平台同步放送。</p>
              <div className="media-stats">
                <span>
                  <strong>4.1W</strong>
                  Bilibili 粉丝
                </span>
                <span>
                  <strong>1000W+</strong>
                  Bilibili 播放
                </span>
                <span>
                  <strong>10K+</strong>
                  YouTube 订阅
                </span>
              </div>
              <a
                className="button button--primary button--inline"
                href="https://resume1.jacktechstudio.com/"
                {...externalProps}
              >
                查看媒体简历
                <ArrowUpRight weight="bold" />
              </a>
            </SectionHeading>

            <div className="media-showcase">
              <div className="feature-frame feature-frame--media reveal" style={{ ['--reveal-delay']: '90ms' }}>
                <img
                  src="/assets/jack-studio.webp"
                  alt="Jack Tech Studio 的真实工作室与内容创作画面"
                  loading="lazy"
                  decoding="async"
                />
                <div className="feature-frame__label">
                  <span>JACK TECH STUDIO / ON AIR</span>
                  <span className="live-dot">LIVE</span>
                </div>
                <Timecode>00:02:48:21</Timecode>
              </div>

              <div className="social-grid reveal" style={{ ['--reveal-delay']: '170ms' }}>
                {socialLinks.map((social) => (
                  <a
                    href={social.href}
                    {...externalProps}
                    key={social.label}
                    className={`social-card social-card--${social.brand}`}
                  >
                    <span className="social-card__icon">
                      <social.Icon weight="fill" />
                    </span>
                    <strong>{social.label}</strong>
                    <small>{social.meta}</small>
                    <ArrowUpRight className="social-arrow" weight="bold" />
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="chapter chapter--contribution" id="contribution">
            <SectionHeading
              index="04"
              eyebrow="CONTRIBUTION"
              title="产品贡献"
              link="https://github.com/jacktechstudio/BetterDisplay-localization"
              linkLabel="查看本地化记录"
            >
              <p>BetterDisplay 简体中文本地化贡献者，为中文用户优化专业显示工具的使用体验。</p>
            </SectionHeading>

            <div className="contribution-reveal reveal" style={{ ['--reveal-delay']: '90ms' }}>
              <a
                className="contribution-card"
                href="https://github.com/jacktechstudio/BetterDisplay-localization"
                {...externalProps}
              >
                <div className="contribution-card__visual">
                  <img
                    src="/assets/betterdisplay.webp"
                    alt="BetterDisplay 官方应用界面截图"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="contribution-card__overlay" />
                </div>
                <div className="contribution-card__body">
                  <span className="contribution-card__icon">
                    <GithubLogo weight="fill" />
                  </span>
                  <div>
                    <p className="eyebrow">BETTERDISPLAY LOCALIZATION</p>
                    <h3>Simplified Chinese localization contributor</h3>
                    <p>@jacktechstudio · Localization contributor</p>
                  </div>
                  <ArrowUpRight className="contribution-card__arrow" weight="bold" />
                </div>
              </a>
            </div>
          </section>

          <footer className="site-footer">
            <p>© 2026 Jack Wang · JACK TECH STUDIO</p>
            <p>Built with curiosity. Broadcast from Shenzhen.</p>
          </footer>
        </div>
      </main>
    </>
  );
}
