import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { about, checklist, meetup, overview, topics, wasm, type Topic } from './content';

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
  padding: '96px 112px',
  boxSizing: 'border-box',
} as const;

/** 標題下的 GDG 四色條 */
const Rule = ({ width = 260 }: { width?: number }) => (
  <div style={{ display: 'flex', width, height: 9, marginTop: 22 }}>
    {[gdg.blue, gdg.red, gdg.yellow, gdg.green].map((c) => (
      <div key={c} style={{ flex: 1, background: c }} />
    ))}
  </div>
);

const Title = ({ children, rule = true }: { children: React.ReactNode; rule?: boolean }) => (
  <div style={{ marginBottom: 48 }}>
    <h1 style={{ fontSize: 76, fontWeight: 700, letterSpacing: '-0.01em', margin: 0 }}>
      {children}
    </h1>
    {rule && <Rule />}
  </div>
);

const Note = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      borderLeft: `8px solid ${gdg.yellow}`,
      background: gdg.warnBg,
      padding: '20px 32px',
      fontSize: 34,
      marginBottom: 36,
    }}
  >
    {children}
  </div>
);

const Bullets = ({ items, size = 36 }: { items: string[]; size?: number }) => (
  <ul style={{ margin: 0, paddingLeft: 40, fontSize: size, lineHeight: 1.65 }}>
    {items.map((t) => (
      <li key={t} style={{ margin: '0.45em 0' }}>
        {t}
      </li>
    ))}
  </ul>
);

const Code = ({ body }: { body: string }) => (
  <pre
    style={{
      fontFamily: MONO,
      fontSize: 32,
      background: gdg.offWhite,
      borderRadius: 12,
      padding: '24px 32px',
      margin: '32px 0 0',
      whiteSpace: 'pre-wrap',
      lineHeight: 1.5,
    }}
  >
    {body}
  </pre>
);

const Source = ({ label, url }: { label: string; url: string }) => (
  <div style={{ position: 'absolute', left: 112, bottom: 56, fontSize: 26, color: gdg.muted }}>
    來源：<span style={{ color: gdg.blue }}>{label}</span>
    <span style={{ marginLeft: 12, fontFamily: MONO, fontSize: 22 }}>{url}</span>
  </div>
);

const Cover: Page = () => (
  <div style={{ ...fill, display: 'grid', placeContent: 'center' }}>
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
        `時間：${about.cadence}`,
        `地點：${about.venue}`,
        `活動分成：${about.segments.join('、')}`,
        '任何問題都可以透過 Slido 發問',
      ]}
    />
    <div style={{ marginTop: 40, fontSize: 28, color: gdg.muted }}>
      行為準則：{about.codeOfConduct}
    </div>
  </div>
);

const Slido: Page = () => (
  <div style={{ ...fill, display: 'grid', placeContent: 'center', textAlign: 'center' }}>
    <h1 style={{ fontSize: 92, fontWeight: 700, margin: 0 }}>Slido</h1>
    <div style={{ fontSize: 34, fontFamily: MONO, color: gdg.blue, marginTop: 28 }}>
      {meetup.slido}
    </div>
  </div>
);

const Divider: Page = () => (
  <div
    style={{
      ...fill,
      background: gdg.blue,
      color: '#fff',
      display: 'grid',
      placeContent: 'center',
    }}
  >
    <h1 style={{ fontSize: 104, fontWeight: 700, margin: 0 }}>Flutter 八月大小事</h1>
    <div style={{ fontSize: 44, opacity: 0.92, marginTop: 16 }}>{meetup.speaker}</div>
  </div>
);

const Overview: Page = () => (
  <div style={fill}>
    <Title>{overview.title}</Title>
    <Note>{overview.note}</Note>
    <Bullets items={overview.points} />
  </div>
);

/** 一個 topic 一頁，warn 的換底色 */
const topicPage = (t: Topic): Page => {
  const TopicPage: Page = () => (
    <div style={{ ...fill, background: t.tone === 'warn' ? gdg.warnBg : '#ffffff' }}>
      <Title>{t.title}</Title>
      {t.tagline &&
        (t.tone === 'warn' ? (
          <div style={{ fontSize: 44, fontWeight: 700, color: gdg.red, marginBottom: 36 }}>
            {t.tagline}
          </div>
        ) : (
          <div style={{ fontSize: 40, fontWeight: 500, color: gdg.blue, marginBottom: 32 }}>
            {t.tagline}
          </div>
        ))}
      <Bullets items={t.bullets} size={t.bullets.length > 4 ? 32 : 36} />
      {t.code && <Code body={t.code.body} />}
      {t.source && <Source {...t.source} />}
    </div>
  );
  return TopicPage;
};

const WasmMetrics: Page = () => (
  <div style={fill}>
    <Title>{wasm.title}</Title>
    <Note>{wasm.note}</Note>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
      {wasm.metrics.map((m) => (
        <div
          key={m.label}
          style={{
            border: `2px solid ${gdg.offWhite}`,
            borderRadius: 16,
            padding: '28px 24px',
          }}
        >
          <div style={{ fontSize: 86, fontWeight: 700, color: gdg.blue, lineHeight: 1 }}>
            {m.value}
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, marginTop: 16 }}>{m.label}</div>
          <div style={{ fontSize: 22, color: gdg.muted, marginTop: 8 }}>{m.detail}</div>
        </div>
      ))}
    </div>
    <div style={{ fontSize: 24, color: gdg.muted, marginTop: 24 }}>測試環境：{wasm.env}</div>
  </div>
);

const WasmTodo: Page = () => (
  <div style={fill}>
    <Title>想試 Wasm 要做什麼</Title>
    <Bullets items={wasm.todo} />
    <Source {...wasm.source} />
  </div>
);

const Checklist: Page = () => (
  <div style={fill}>
    <Title>這個月該做的事</Title>
    <ol style={{ margin: 0, paddingLeft: 48, fontSize: 34, lineHeight: 1.6 }}>
      {checklist.map((c) => (
        <li key={c} style={{ margin: '0.4em 0' }}>
          {c}
        </li>
      ))}
    </ol>
  </div>
);

const QA: Page = () => (
  <div style={{ ...fill, display: 'grid', placeContent: 'center', textAlign: 'center' }}>
    <h1 style={{ fontSize: 132, fontWeight: 700, margin: 0 }}>Q &amp; A</h1>
    <div style={{ fontSize: 32, fontFamily: MONO, color: gdg.blue, marginTop: 28 }}>
      {meetup.slido}
    </div>
  </div>
);

export const meta: SlideMeta = {
  title: `Flutter 小聚 #${meetup.num}`,
  createdAt: '2026-08-25T19:00:00+08:00',
};

export default [
  Cover,
  About,
  Slido,
  Divider,
  Overview,
  ...topics.slice(0, 4).map(topicPage),
  ...topics.slice(4, 6).map(topicPage),
  WasmMetrics,
  WasmTodo,
  ...topics.slice(6).map(topicPage),
  Checklist,
  QA,
] satisfies Page[];
