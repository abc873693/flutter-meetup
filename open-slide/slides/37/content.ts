// #37 的內容資料層。呈現全部在 index.tsx，這裡只放「講什麼」。
// 頁序與 37/slide.md（Marp 版）的 25 頁一一對應。
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
  segments: [
    '當月 Flutter 大小事：介紹當月 Flutter 相關的大小事',
    '開發者經驗分享：題目不限，可洽志工報名',
    'Lightning Talk：現場／事前表單報名',
    '任何問題都可以透過 Slido 發問',
  ],
  codeOfConduct: 'https://gdg.tw/code_of_conduct/',
};

export const events = {
  upcoming: null as string | null, // 目前沒有已公告的近期活動
  past: [
    {
      title: 'COSCUP 2026 - Google 開發者派對',
      when: '8/8–8/9',
      where: '台灣科技大學',
      detail: 'GDG 專屬議程軌與攤位，主題涵蓋 Gemini / Gemma、Android、Google Cloud',
    },
  ],
};

export const overview = {
  title: 'Flutter 3.47 ＋ Dart 3.13',
  note: '兩者都在 2026/08/12 發布',
  points: [
    '設計系統獨立：material_ui、cupertino_ui 釋出 1.0',
    'Impeller 成為桌面預設 renderer（macOS / Windows / Linux）',
    'Widget Previews 進入 stable',
    'Apple 平台最低版本拉高：iOS 15、macOS 12',
    'Dart 3.13：primary constructors 進入 stable',
    '官方推 Wasm：8/17–8/21 辦了 WebAssembly Week',
  ],
  sources: [
    { label: 'Flutter 3.47', url: 'https://flutter.dev/blog/whats-new-in-flutter-3-47' },
    { label: 'Dart 3.13', url: 'https://dart.dev/blog/announcing-dart-3-13' },
  ],
};

export type Topic = {
  title: string;
  tagline?: string;
  bullets: string[];
  code?: { lang: string; body: string };
  source?: { label: string; url: string };
  tone?: 'normal' | 'warn';
  note?: string;
};

export const topics: Record<string, Topic> = {
  materialUi: {
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
  migration: {
    title: '遷移時間表要注意',
    tone: 'warn',
    tagline: '11 月 stable 會正式 deprecate 舊的 design library',
    bullets: [
      '對生態系套件而言，這等同一次 major version bump',
      '相依套件還沒跟上時，可用 MaterialUiCompatibilityBridge 先遷移自己的 app',
      'flutter_localizations 一併拆分出來，改用 GlobalMaterialLocalizations.delegates',
    ],
    note: '建議這個月就開始試 dart fix，不要等 11 月。',
  },
  impeller: {
    title: 'Impeller 成為桌面預設',
    bullets: [
      'macOS、Windows、Linux 的預設 renderer',
      'shader 改在 build 時期編譯，消除首次動畫的 shader compilation jank',
      'macOS 另外預設開啟 Wide Gamut Color',
      'macOS 用 Info.plist 的 FLTEnableImpeller、Windows 用 set_impeller_switch、Linux 用 fl_dart_project_set_enable_impeller 可退回',
      '退回的選項在未來版本會移除',
    ],
  },
  apple: {
    title: 'Apple 平台：一次大清理',
    bullets: [
      '最低版本：iOS 13 → 15、macOS 10.15 → 12，對齊秋天的 Xcode 27 / iOS 27 / macOS 27',
      'UIScene 是強制的：iOS 27 要求所有 UIKit app 採用',
      'Flutter CLI 會自動處理，但自訂 AppDelegate 或用到舊 lifecycle 的 plugin 要手動遷移',
      'Intel Mac 開始退場：build 會出現警告，未來變成 error',
      '可用 flutter config --enable-macos-arm64-only 提前切 ARM64-only',
      'SwiftPM：前 100 大 iOS plugin 已有 92 個完成遷移，沒遷移的最終會停止運作',
    ],
  },
  widgetPreviews: {
    title: 'Widget Previews 進入 stable',
    bullets: [
      '不必 build 整個 app 就能即時預覽、迭代單一 widget',
      '專案內建 .widget_preview/ 快取，啟動更快',
      '新的 PreviewThemeData API，支援 theme 疊加',
      'web 資產會自動同步，可預覽 web widget',
    ],
    note: '適合拿來做 design system／元件庫的日常開發。',
  },
  dartPrimary: {
    title: 'Dart 3.13：primary constructors',
    tagline: '一行取代「欄位宣告 + 建構式參數」的樣板程式碼',
    bullets: [
      '3.12 還是實驗性，3.13 進入 stable',
      '建構式可用 new / factory，空 body 直接用 ; 收尾',
      '附 6 個新 lint 與 4 個 IDE refactoring 協助遷移',
      '例如 use_declaring_parameters、unnecessary_primary_constructor_body',
    ],
    code: { lang: 'dart', body: 'class Point(final int x, final int y);' },
    source: { label: 'Announcing Dart 3.13', url: 'https://dart.dev/blog/announcing-dart-3-13' },
  },
  dartMisc: {
    title: 'Dart 3.13：其他重點',
    bullets: [
      'native library tree-shaking：@RecordUse() + package:record_use，只保留真正被呼叫的 native symbol',
      'binary 明顯縮小，完全沒用到的 native library 可整包省略',
      'Wasm deferred loading 進入 preview：dart compile wasm -O2 --enable-deferred-loading',
      'formatter 會自動在 import 區塊之間插入空行（僅語言版本 3.13+ 生效）',
      '舊 web library（dart:html、package:js）不支援 dart2wasm，改用 package:web、dart:js_interop',
    ],
  },
  windowing: {
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
  desktopMisc: {
    title: 'Desktop：flavors 與文字渲染',
    bullets: [
      'Windows / Linux 開始支援 flavors',
      '文字渲染改用 SDF（macOS / Linux / Windows），字更利、曲線更乾淨',
      '可從 platform controller 取 windowHandle 拿原生指標（HWND / NSWindow / GtkWindow）',
      '新的 sized-to-content API，視窗自動貼合內容',
    ],
    code: {
      lang: 'yaml',
      body: 'flutter:\n  assets:\n    - path: assets/flavor_a/images\n      flavors:\n        - flavor_a',
    },
  },
  ai: {
    title: 'AI 與 Agent 相關',
    bullets: [
      '多 agent 開發團隊（8/20）：在 Antigravity 裡跑 architect / tester / coder 分工',
      '以 TDD 方式把 Python library 移植成 idiomatic 的 Dart package',
      'async A2UI（8/13）：預先產生並快取 A2UI message，消除 generative UI 的啟動延遲',
      'Flutter 3.47 內的 genui 0.10.0 新增 a2ui_core，支援 client-side function',
    ],
    source: { label: 'multi-agent dev teams', url: 'https://flutter.dev/blog/building-multi-agent-dev-teams' },
  },
  polish: {
    title: '框架細節修補',
    bullets: [
      '無障礙：Android 高對比／反色偵測（MediaQueryData.highContrast、invertColors）',
      'Text.rich 巢狀 span 的 semantics 順序終於對齊版面順序',
      '文字選取：小幅捲動時 selection handle 不再亂跳、不再蓋住 context menu',
      '修掉 SelectableRegion 在空 scrollable 裡的 crash',
      'ImageIcon 的 useOriginalColors、AnimatedCrossFade 的 clip behavior',
      'ImageStreamListener 可直接接收 image stream 錯誤',
    ],
  },
};

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
    'dart:html / dart:js 換成 package:web / dart:js_interop',
    'server 設 COEP: credentialless、COOP: same-origin',
  ],
  source: { label: 'Wasm Week', url: 'https://flutter.dev/blog/try-flutter-web-with-webassembly-week' },
};

// Android 依賴矩陣做成表格，比 bullet 好讀
export const android = {
  title: 'Android 依賴矩陣',
  note: 'Flutter 3.47 驗證過的組合',
  rows: [
    ['Java', '17（最低）'],
    ['Kotlin Gradle Plugin', '2.4.0'],
    ['Android Gradle Plugin', '9.1.0'],
    ['Gradle', '9.3.1'],
  ],
  sdk: [
    ['flutter.compileSdkVersion', 'API 36'],
    ['flutter.targetSdkVersion', 'API 36'],
    ['flutter.minSdkVersion', 'API 24'],
  ],
  source: {
    label: '內建 Kotlin Gradle plugin 遷移指引',
    url: 'https://docs.flutter.dev/release/breaking-changes/migrate-to-built-in-kotlin',
  },
};

export const checklist = [
  'flutter upgrade 升到 3.47（含 Dart 3.13）',
  '跑 dart fix --apply --code=migrate_design_widgets，先試 material_ui 遷移',
  '檢查 Apple 專案：iOS 15 / macOS 12 最低版本、UIScene、自訂 AppDelegate',
  'web 專案試跑 flutter build web --wasm，順手把 dart:html 換掉',
  '桌面 app 實測 Impeller，確認沒有渲染回歸',
  '盤點相依 plugin 的 SwiftPM 遷移狀況',
];

export const closingNote = '11 月 stable 會正式 deprecate 舊 design library，現在動比較不痛。';
