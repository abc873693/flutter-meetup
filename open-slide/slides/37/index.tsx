import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import coverBg from '@assets/cover-v2.png';
import flutterTaipeiLogo from '@assets/flutter-taipei.avif';
import flutterTaipeiQr from '@assets/flutter-taipei-qr.png';
import gdgQr from '@assets/gdg-taipei-qr.png';
import gdgLogo from '@assets/gdg-taipei.svg';
import mediumPost from '@assets/medium-post.jpeg';
import swag from '@assets/sharing-swag.jpeg';
// 這期自己的 Slido QR，不在 repo 根的 images/ 底下
import slidoQr from './assets/slido.png';
import {
  about,
  android,
  checklist,
  closingNote,
  events,
  meetup,
  overview,
  topics,
  wasm,
  type Topic,
} from './content';

// GDG brand — https://developers.google.com/community/gdg/brand-guidelines
const gdg = {
  blue: '#4285f4',
  red: '#ea4335',
  yellow: '#f9ab00',
  green: '#34a853',
  ink: '#1e1e1e',
  muted: '#5f6368',
  offWhite: '#f0f0f0',
  warnBg: '#fffdf5',
};

const SANS =
  '"Google Sans", "Product Sans", "Noto Sans TC", Roboto, "PingFang TC", system-ui, sans-serif';
const MONO = '"Google Sans Mono", "Roboto Mono", "SF Mono", Menlo, monospace';

export const design: DesignSystem = {
  palette: { bg: '#ffffff', text: gdg.ink, accent: gdg.blue },
  fonts: { display: SANS, body: SANS },
  typeScale: { hero: 120, body: 34 },
  radius: 12,
};

// 中文字型不能靠訪客的系統：GitHub Pages 的觀眾可能在 Windows / Android。
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap');
  `}</style>
);

const fill = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: SANS,
  color: gdg.ink,
  background: '#ffffff',
  padding: '88px 104px',
  boxSizing: 'border-box',
} as const;

const centered = { ...fill, display: 'grid', placeContent: 'center', textAlign: 'center' } as const;

/** 標題下的 GDG 四色條 */
const Rule = ({ width = 260 }: { width?: number }) => (
  <div style={{ display: 'flex', width, height: 9, marginTop: 20 }}>
    {[gdg.blue, gdg.red, gdg.yellow, gdg.green].map((c) => (
      <div key={c} style={{ flex: 1, background: c }} />
    ))}
  </div>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <h1 style={{ fontSize: 72, fontWeight: 700, letterSpacing: '-0.01em', margin: 0 }}>
      {children}
    </h1>
    <Rule />
  </div>
);

const Note = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      borderLeft: `8px solid ${gdg.yellow}`,
      background: gdg.warnBg,
      padding: '18px 30px',
      fontSize: 32,
      marginBottom: 32,
    }}
  >
    {children}
  </div>
);

const Bullets = ({ items }: { items: string[] }) => {
  const size = items.length > 5 ? 30 : items.length > 4 ? 32 : 36;
  return (
    <ul style={{ margin: 0, paddingLeft: 40, fontSize: size, lineHeight: 1.6 }}>
      {items.map((t) => (
        <li key={t} style={{ margin: '0.42em 0' }}>
          {t}
        </li>
      ))}
    </ul>
  );
};

const Code = ({ body }: { body: string }) => (
  <pre
    style={{
      fontFamily: MONO,
      fontSize: 30,
      background: gdg.offWhite,
      borderRadius: 12,
      padding: '22px 30px',
      margin: '28px 0 0',
      whiteSpace: 'pre-wrap',
      lineHeight: 1.5,
    }}
  >
    {body}
  </pre>
);

const Source = ({ label, url }: { label: string; url: string }) => (
  <div style={{ position: 'absolute', left: 104, bottom: 48, fontSize: 24, color: gdg.muted }}>
    來源：<span style={{ color: gdg.blue }}>{label}</span>
    <span style={{ marginLeft: 12, fontFamily: MONO, fontSize: 20 }}>{url}</span>
  </div>
);

/** logo 與 QR 並排，對應 Marp 版的雙 bg 圖頁 */
const qrPage = (logo: string, qr: string, logoWidth: number): Page => {
  const QrPage: Page = () => (
    <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <img src={logo} alt="" style={{ width: logoWidth, maxHeight: 620, objectFit: 'contain' }} />
      <img src={qr} alt="" style={{ width: 480 }} />
    </div>
  );
  return QrPage;
};

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      display: 'grid',
      placeContent: 'center',
      backgroundImage: `url(${coverBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <Fonts />
    <h1 style={{ fontSize: 132, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
      Flutter 小聚 #{meetup.num}
    </h1>
    <div style={{ fontSize: 40, color: gdg.muted, marginTop: 20 }}>
      {meetup.yearMonth} ・ {about.organizers.join(' × ')}
    </div>
    <Rule width={340} />
  </div>
);

const About: Page = () => (
  <div style={fill}>
    <Title>小聚說明</Title>
    <Bullets
      items={[
        `主辦社群：${about.organizers.join('、')}`,
        `原則上一個月一次，時間在${about.cadence}`,
        `地點：${about.venue}`,
        ...about.segments,
      ]}
    />
    <div style={{ marginTop: 32, fontSize: 26, color: gdg.muted }}>
      小聚任何行為都參照 GDG 台灣行為準則 {about.codeOfConduct}
    </div>
  </div>
);

const MonthlyReport: Page = () => (
  <div style={fill}>
    <Title>Flutter Taipei 每月月報</Title>
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <img src={mediumPost} alt="" style={{ maxWidth: '82%', maxHeight: 560, objectFit: 'contain' }} />
    </div>
  </div>
);

const Swag: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', gap: 64 }}>
    <div style={{ flex: 1 }}>
      <h1 style={{ fontSize: 64, fontWeight: 700, margin: 0, lineHeight: 1.25 }}>
        上台分享可獲得
        <br />
        一個 Pin 針及帽子
      </h1>
      <Rule />
    </div>
    <img src={swag} alt="" style={{ width: '46%', borderRadius: 16, objectFit: 'contain' }} />
  </div>
);

const Events: Page = () => (
  <div style={fill}>
    <Title>近期社群活動</Title>
    <div style={{ fontSize: 44, fontWeight: 700, color: gdg.blue, marginBottom: 12 }}>
      {events.upcoming ?? '無'}
    </div>
    <div style={{ fontSize: 28, color: gdg.muted, marginBottom: 44 }}>
      目前沒有已公告的近期活動
    </div>
    <div style={{ fontSize: 32, fontWeight: 500, marginBottom: 16 }}>近期已辦</div>
    {events.past.map((e) => (
      <div key={e.title} style={{ fontSize: 30, lineHeight: 1.6 }}>
        <span style={{ fontWeight: 700 }}>{e.title}</span>
        <span style={{ color: gdg.muted }}>
          （{e.when}，{e.where}）
        </span>
        <div style={{ fontSize: 26, color: gdg.muted }}>{e.detail}</div>
      </div>
    ))}
  </div>
);

const Slido: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', gap: 72 }}>
    <div style={{ flex: 1 }}>
      <h1 style={{ fontSize: 84, fontWeight: 700, margin: 0 }}>Slido</h1>
      <Rule />
      <div style={{ fontSize: 28, fontFamily: MONO, color: gdg.blue, marginTop: 28 }}>
        {meetup.slido}
      </div>
      <div style={{ fontSize: 30, color: gdg.muted, marginTop: 24 }}>
        有任何問題都可以在這裡發問
      </div>
    </div>
    <img src={slidoQr} alt="" style={{ width: 460 }} />
  </div>
);

const Divider: Page = () => (
  <div style={{ ...centered, background: gdg.blue, color: '#fff' }}>
    <h1 style={{ fontSize: 104, fontWeight: 700, margin: 0 }}>Flutter 八月大小事</h1>
    <div style={{ fontSize: 44, opacity: 0.92, marginTop: 16 }}>{meetup.speaker}</div>
  </div>
);

const Overview: Page = () => (
  <div style={fill}>
    <Title>{overview.title}</Title>
    <Note>{overview.note}</Note>
    <Bullets items={overview.points} />
    <div style={{ position: 'absolute', left: 104, bottom: 48, fontSize: 24, color: gdg.muted }}>
      來源：
      {overview.sources.map((s, i) => (
        <span key={s.url}>
          {i > 0 && ' ｜ '}
          <span style={{ color: gdg.blue }}>{s.label}</span>
        </span>
      ))}
    </div>
  </div>
);

/** 一個 topic 一頁，warn 的換底色 */
const topicPage = (t: Topic): Page => {
  const TopicPage: Page = () => (
    <div style={{ ...fill, background: t.tone === 'warn' ? gdg.warnBg : '#ffffff' }}>
      <Title>{t.title}</Title>
      {t.tagline &&
        (t.tone === 'warn' ? (
          <div style={{ fontSize: 42, fontWeight: 700, color: gdg.red, marginBottom: 32 }}>
            {t.tagline}
          </div>
        ) : (
          <div style={{ fontSize: 38, fontWeight: 500, color: gdg.blue, marginBottom: 28 }}>
            {t.tagline}
          </div>
        ))}
      <Bullets items={t.bullets} />
      {t.code && <Code body={t.code.body} />}
      {t.note && <div style={{ marginTop: 28 }}><Note>{t.note}</Note></div>}
      {t.source && <Source {...t.source} />}
    </div>
  );
  return TopicPage;
};

const Wasm: Page = () => (
  <div style={fill}>
    <Title>{wasm.title}</Title>
    <Note>{wasm.note}</Note>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
      {wasm.metrics.map((m) => (
        <div
          key={m.label}
          style={{ border: `2px solid ${gdg.offWhite}`, borderRadius: 16, padding: '24px 20px' }}
        >
          <div style={{ fontSize: 76, fontWeight: 700, color: gdg.blue, lineHeight: 1 }}>
            {m.value}
          </div>
          <div style={{ fontSize: 26, fontWeight: 500, marginTop: 14 }}>{m.label}</div>
          <div style={{ fontSize: 21, color: gdg.muted, marginTop: 6 }}>{m.detail}</div>
        </div>
      ))}
    </div>
    <ul style={{ margin: '32px 0 0', paddingLeft: 40, fontSize: 28, lineHeight: 1.6 }}>
      {wasm.todo.map((t) => (
        <li key={t} style={{ margin: '0.3em 0' }}>
          {t}
        </li>
      ))}
    </ul>
    <div style={{ position: 'absolute', left: 104, bottom: 48, fontSize: 22, color: gdg.muted }}>
      測試環境：{wasm.env}　｜　來源：<span style={{ color: gdg.blue }}>{wasm.source.label}</span>
    </div>
  </div>
);

const Android: Page = () => {
  const Row = ({ k, v }: { k: string; v: string }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '14px 24px',
        borderBottom: `2px solid ${gdg.offWhite}`,
        fontSize: 30,
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: 27 }}>{k}</span>
      <span style={{ fontWeight: 700 }}>{v}</span>
    </div>
  );
  return (
    <div style={fill}>
      <Title>{android.title}</Title>
      <div style={{ fontSize: 30, color: gdg.muted, marginBottom: 20 }}>{android.note}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div>
          {android.rows.map(([k, v]) => (
            <Row key={k} k={k} v={v} />
          ))}
        </div>
        <div>
          {android.sdk.map(([k, v]) => (
            <Row key={k} k={k} v={v} />
          ))}
        </div>
      </div>
      <Source {...android.source} />
    </div>
  );
};

const Checklist: Page = () => (
  <div style={fill}>
    <Title>這個月該做的事</Title>
    <ol style={{ margin: 0, paddingLeft: 48, fontSize: 32, lineHeight: 1.55 }}>
      {checklist.map((c) => (
        <li key={c} style={{ margin: '0.35em 0' }}>
          {c}
        </li>
      ))}
    </ol>
    <div style={{ marginTop: 32 }}>
      <Note>{closingNote}</Note>
    </div>
  </div>
);

const QA: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', gap: 72 }}>
    <div style={{ flex: 1 }}>
      <h1 style={{ fontSize: 128, fontWeight: 700, margin: 0 }}>Q &amp; A</h1>
      <Rule width={320} />
      <div style={{ fontSize: 28, fontFamily: MONO, color: gdg.blue, marginTop: 28 }}>
        {meetup.slido}
      </div>
    </div>
    <img src={slidoQr} alt="" style={{ width: 460 }} />
  </div>
);

export const meta: SlideMeta = {
  title: `Flutter 小聚 #${meetup.num}`,
  createdAt: '2026-08-25T19:00:00+08:00',
};

// 頁序與 37/slide.md 的 25 頁一一對應
export default [
  Cover,
  About,
  qrPage(gdgLogo, gdgQr, 760),
  qrPage(flutterTaipeiLogo, flutterTaipeiQr, 620),
  MonthlyReport,
  Swag,
  Events,
  Slido,
  Divider,
  Overview,
  topicPage(topics.materialUi),
  topicPage(topics.migration),
  topicPage(topics.impeller),
  topicPage(topics.apple),
  topicPage(topics.widgetPreviews),
  topicPage(topics.dartPrimary),
  topicPage(topics.dartMisc),
  Wasm,
  topicPage(topics.windowing),
  topicPage(topics.desktopMisc),
  topicPage(topics.ai),
  Android,
  topicPage(topics.polish),
  Checklist,
  QA,
] satisfies Page[];
