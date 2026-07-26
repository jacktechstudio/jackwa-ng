import { useEffect, useMemo, useRef, useState } from 'react';
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

const CHAPTER_META = {
  work: { number: '01', en: 'WORK', zh: '精选项目' },
  marketing: { number: '02', en: 'MARKETING', zh: '出海硬件营销' },
  media: { number: '03', en: 'MEDIA', zh: '自媒体' },
  contribution: { number: '04', en: 'CONTRIBUTION', zh: '产品贡献' },
};

const projects = [
  {
    number: '01',
    eyebrow: 'K-POP RELEASE RADAR',
    tag: 'MUSIC RADAR',
    title: 'K‑Pop 新碟雷达',
    description: '把每周 K‑Pop 新发行，做成一张看得见的音乐雷达。',
    image: '/assets/project-kpop.png',
    href: 'https://kpop.jacktechstudio.com/',
    className: 'project-card--lead',
  },
  {
    number: '02',
    eyebrow: 'JACK MUSIC',
    tag: 'MUSIC INDEX',
    title: '杰克乐搜',
    description: '搜罗全球好音乐，发现、收藏、循环播放。',
    image: '/assets/project-jack-music.png',
    href: 'https://i.jackwa.ng/',
    className: '',
  },
  {
    number: '03',
    eyebrow: 'AQUA WEB',
    tag: 'MAC OS RETRO',
    title: 'Aqua Web 界面重现',
    description: '在浏览器里，重建 Mac OS X 10.2 的 Aqua 界面。',
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

function KineticTitle({ children }) {
  if (typeof children === 'string') {
    return (
      <h2>
        {children.split('\n').map((line, i) => (
          <span className="kinetic-line reveal-line" key={line + i} style={{ ['--stagger']: `${i * 70}ms` }}>
            {line}
          </span>
        ))}
      </h2>
    );
  }
  return <h2>{children}</h2>;
}

function SectionHeading({ index, eyebrow, title, children, link, linkLabel }) {
  return (
    <div className="section-heading reveal">
      <div className="section-kicker">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <KineticTitle>{title}</KineticTitle>
      {children && <div className="section-copy reveal-line" style={{ ['--stagger']: '160ms' }}>{children}</div>}
      {link && (
        <a className="text-link reveal-line" style={{ ['--stagger']: '230ms' }} href={link} {...externalProps}>
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

function useCountUp(target, decimals = 0, duration = 1300) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(target * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return [ref, value.toFixed(decimals)];
}

function Count({ value, decimals = 0, suffix }) {
  const [ref, text] = useCountUp(value, decimals);
  return (
    <strong ref={ref}>
      {text}
      {suffix}
    </strong>
  );
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
    document.documentElement.dataset.section = activeSection;
  }, [activeSection]);

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

  const toggleTheme = (event) => {
    const root = document.documentElement;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    root.style.setProperty('--clip-x', `${x}px`);
    root.style.setProperty('--clip-y', `${y}px`);
    root.style.setProperty('--clip-r', `${Math.ceil(radius)}px`);

    const apply = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
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
          <div className="identity-panel__ambient" aria-hidden="true" />
          <div className="identity-panel__inner">
            <div className="studio-label">
              <span>JACK TECH STUDIO</span>
              <span>科技数码内容创作者</span>
            </div>

            <div className="now-showing" aria-live="polite">
              <span className="now-showing__tag"><span className="pulse-dot" /> 正在收看 NOW SHOWING</span>
              <span className="now-showing__channel">
                <strong>{CHAPTER_META[activeSection].number}</strong>
                <span>{CHAPTER_META[activeSection].en}</span>
              </span>
              <span className="now-showing__zh">{CHAPTER_META[activeSection].zh}</span>
            </div>
            <div className="chapter-flash" key={activeSection} aria-hidden="true" />

            <div className="broadcast-status" aria-label="直播状态">
              <span className="broadcast-status__live">
                <span className="pulse-dot" /> 正在直播 ON AIR
              </span>
              <span>深圳信号 SHENZHEN · CN</span>
              <span>频道 04 CHAPTERS</span>
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

            <div className="identity-marquee" aria-hidden="true">
              <div className="identity-marquee__track">
                <span>出海硬件产品营销 · 科技内容创作 · 音乐与网页实验 · K‑POP RADAR · JACK MUSIC · AQUA WEB · 合作 Mrwhosetheboss · Linus Tech Tips · Beebom · 深圳信号 001 · </span>
                <span>出海硬件产品营销 · 科技内容创作 · 音乐与网页实验 · K‑POP RADAR · JACK MUSIC · AQUA WEB · 合作 Mrwhosetheboss · Linus Tech Tips · Beebom · 深圳信号 001 · </span>
              </div>
            </div>

            <a className="scroll-cue" href="#work" aria-label="向下滚动，查看作品">
              <span className="scroll-cue__track" aria-hidden="true">
                <span className="scroll-cue__comet" />
              </span>
              <span className="scroll-cue__text">
                <strong>向下滚动</strong>
                <small>CONTINUE THE BROADCAST</small>
              </span>
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
                  <Count value={4.1} decimals={1} suffix="W" />
                  Bilibili 粉丝
                </span>
                <span>
                  <Count value={1000} suffix="W+" />
                  Bilibili 播放
                </span>
                <span>
                  <Count value={10} suffix="K+" />
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
              link="https://github.com/waydabber/BetterDisplay"
              linkLabel="查看官方 GitHub"
            >
              <p>BetterDisplay 简体中文本地化贡献者，为中文用户优化专业显示工具的使用体验。</p>
            </SectionHeading>

            <div className="contribution-reveal reveal" style={{ ['--reveal-delay']: '90ms' }}>
              <a
                className="contribution-card"
                href="https://github.com/waydabber/BetterDisplay"
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
