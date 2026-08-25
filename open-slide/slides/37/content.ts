// #37 的內容資料層。呈現全部在 index.tsx，這裡只放「講什麼」。
// 未來 scripts/generate_slide.py 產出的 topics.json 可以直接對應到這個結構。

export const meetup = {
  num: 37,
  yearMonth: '2026 / 08',
  speaker: 'Rainer Fang',
  slido: 'https://qr.sli.do/7Wjw8b8UMxcGaUFAqKYsmY',
};

export const about = {
  organizers: ['GDG Taipei', 'Flutter Taipei'],
  cadence: '每月最後一週的週二',
  venue: '天攏書局 2F',
  segments: ['當月 Flutter 大小事', '開發者經驗分享', 'Lightning Talk'],
  codeOfConduct: 'https://gdg.tw/code_of_conduct/',
};

export const overview = {
  title: 'Flutter 3.47 ＋ Dart 3.13',
  note: '兩者都在 2026/08/12 發布',
  points: [
    '設計系統獨立：material_ui、cupertino_ui 釋出 1.0',
    'Impeller 成為桌面預設 renderer',
    'Widget Previews 進入 stable',
    'Apple 平台最低版本拉高到 iOS 15 / macOS 12',
    'Dart 3.13：primary constructors 進入 stable',
  ],
};

export type Topic = {
  title: string;
  tagline?: string;
  bullets: string[];
  code?: { lang: string; body: string };
  source?: { label: string; url: string };
  tone?: 'normal' | 'warn';
};

export const topics: Topic[] = [
  {
    title: 'material_ui / cupertino_ui 1.0',
    tagline: '把設計系統從 core SDK 搬到 pub.dev',
    bullets: [
      '過去綁在 SDK 裡，只能跟著季度釋出；現在可以每週更新',
      'bug 修復與新功能不必再等下一個 stable',
      '為「風格中立的 Flutter core widgets」鋪路',
    ],
    code: { lang: 'bash', body: 'dart fix --apply --code=migrate_design_widgets' },
    source: { label: "What's new in Flutter 3.47", url: 'https://flutter.dev/blog/whats-new-in-flutter-3-47' },
  },
  {
    title: '遷移時間表要注意',
    tone: 'warn',
    tagline: '11 月 stable 會正式 deprecate 舊的 design library',
    bullets: [
      '對生態系套件而言，這等同一次 major version bump',
      '相依套件還沒跟上時，可用 MaterialUiCompatibilityBridge 先遷移自己的 app',
      'flutter_localizations 一併拆分出來，改用 GlobalMaterialLocalizations.delegates',
    ],
  },
  {
    title: 'Impeller 成為桌面預設',
    bullets: [
      'macOS、Windows、Linux 的預設 renderer',
      'shader 改在 build 時期編譯，消除首次動畫的 shader compilation jank',
      'macOS 另外預設開啟 Wide Gamut Color',
      '還可以退回舊 renderer，但未來版本會移除',
    ],
  },
  {
    title: 'Apple 平台：一次大清理',
    bullets: [
      '最低版本：iOS 13 → 15、macOS 10.15 → 12',
      'UIScene 是強制的：iOS 27 要求所有 UIKit app 採用',
      '自訂 AppDelegate 或用到舊 lifecycle 的 plugin 要手動遷移',
      'Intel Mac 開始退場：build 會出現警告，未來變成 error',
      'SwiftPM：前 100 大 iOS plugin 已有 92 個完成遷移',
    ],
  },
  {
    title: 'Dart 3.13：primary constructors',
    tagline: '一行取代「欄位宣告 + 建構式參數」的樣板程式碼',
    bullets: [
      '3.12 還是實驗性，3.13 進入 stable',
      '建構式可用 new / factory，空 body 直接用 ; 收尾',
      '附 6 個新 lint 與 4 個 IDE refactoring 協助遷移',
    ],
    code: { lang: 'dart', body: 'class Point(final int x, final int y);' },
    source: { label: 'Announcing Dart 3.13', url: 'https://dart.dev/blog/announcing-dart-3-13' },
  },
  {
    title: 'Dart 3.13：其他重點',
    bullets: [
      'native library tree-shaking：@RecordUse() + package:record_use',
      'Wasm deferred loading 進入 preview',
      'formatter 會自動在 import 區塊之間插入空行（僅 3.13+ 生效）',
      '舊 web library（dart:html、package:js）不支援 dart2wasm',
    ],
  },
  {
    title: 'Desktop Windowing API',
    tagline: '在 main channel，需 flutter config --enable-windowing，仍是 experimental',
    bullets: [
      '五種 window 類型：regular / dialog / tooltip / popup / satellite',
      '可階層巢狀，跨平台行為一致',
      '主要 API：WindowController、DialogWindowController、Window、WindowScope',
      'showDialog / showMenu / Tooltip 的整合還在規劃中',
    ],
    code: {
      lang: 'dart',
      body: "final controller = WindowController(\n  title: 'My Application',\n  size: const Size(800, 600),\n);",
    },
    source: { label: 'Desktop Windowing APIs', url: 'https://flutter.dev/blog/desktop-windowing-apis' },
  },
  {
    title: 'AI 與 Agent 相關',
    bullets: [
      '多 agent 開發團隊：在 Antigravity 裡跑 architect / tester / coder 分工',
      '以 TDD 方式把 Python library 移植成 idiomatic 的 Dart package',
      'async A2UI：預先產生並快取 message，消除 generative UI 的啟動延遲',
      'genui 0.10.0 新增 a2ui_core，支援 client-side function',
    ],
  },
];

// Wasm Week 的數據單獨拉出來，因為要做成視覺化的 metric，而不是 bullet
export const wasm = {
  title: 'Wasm Week：實測數據',
  note: '8/17–8/21，官方推動大家把 web app 編成 WebAssembly',
  env: 'Chrome 151 / M4 Pro / 200 animated nodes',
  metrics: [
    { value: '2×', label: 'frame time 更快', detail: '17.4ms vs 34.5ms，穩定 60 FPS' },
    { value: '2.5×', label: 'widget building 更快', detail: '11.4ms vs 29.3ms' },
    { value: '3×', label: '抖動更小', detail: '±0.5ms vs ±1.5ms' },
    { value: '58%', label: '現有 app 零改動', detail: '就能編成 Wasm' },
  ],
  todo: [
    '跑 flutter build web --wasm',
    '把 dart:html / dart:js 換成 package:web / dart:js_interop',
    'server 設 COEP: credentialless、COOP: same-origin',
  ],
  source: { label: 'Wasm Week', url: 'https://flutter.dev/blog/try-flutter-web-with-webassembly-week' },
};

export const checklist = [
  'flutter upgrade 升到 3.47（含 Dart 3.13）',
  '跑 dart fix --apply --code=migrate_design_widgets，先試 material_ui 遷移',
  '檢查 Apple 專案：iOS 15 / macOS 12、UIScene、自訂 AppDelegate',
  'web 專案試跑 flutter build web --wasm',
  '桌面 app 實測 Impeller，確認沒有渲染回歸',
  '盤點相依 plugin 的 SwiftPM 遷移狀況',
];
