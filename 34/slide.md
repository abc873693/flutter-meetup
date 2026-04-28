---
marp: true
title: Flutter 小聚 \#34
description: 2026/04 有趣新知
author: Rainer Fang
keywords: Flutter, Dart
theme: default
size: 16:9
paginate: true
---

# Flutter 小聚 #34

![bg](../images/cover.png)

---

# 小聚說明

- 主辦社群: **GDG Taipei**、**Flutter Taipei**
- 原則上一個月會舉辦一次，時間會在當月**最後一週的週二**
- 地點：**天攏書局 2F**
- 活動主要會分成
  - 當月 Flutter 大小事: 介紹當月 Flutter 相關的大小事
  - 開發者經驗分享: 分享與 Flutter 開發的相關內容，題目不限，可洽志工報名
  - Lightning Talk: 現場/活動事前表單報名，在場有任何想法，可洽志工報名
  - 活動任何問題都可以透過 **Slido** 發問
- 小聚任何行為都參照 GDG 台灣 行為準則 https://gdg.tw/code_of_conduct/


---

![bg width:75%](../images/gdg-taipei.jpeg)

![bg width:80%](../images/gdg-taipei-qr.png)

---

![bg width:90%](../images/flutter-taipei.avif)

![bg width:80%](../images/flutter-taipei-qr.png)

---

# Flutter Taipei 每月月報

![width:80%](../images/medium-post.jpeg)

---

# 上台分享可獲得一個 Pin 針 及 帽子

![bg width:75% right ](../images/sharing-swag.jpeg)

---

# Build with AI 2026

![bg width:75% right](./images/tw_bwai25_banner.png)

---

# [Slido](https://app.sli.do/event/foSqFPgdLXht2jtwsS2RQz)

![bg width:75% right](./images/slido.png)

---

# Flutter 四月大小事

## Rainer Fang

---

# 用 Dart 與 Jaspr 重建 Flutter 官方網站
> dart.dev、flutter.dev、docs.flutter.dev 全面遷移到 Dart 技術棧。

- **過去現況**：分別使用 Node.js 的 Eleventy 與 Python/Django 的 Wagtail CMS，工具鏈分裂。
- **現在統一**：改用基於 Dart 的開源網頁框架 [Jaspr](https://github.com/schultek/jaspr)。
- **Jaspr 特色**：
  - 元件模型與 Flutter 相似，Flutter 開發者上手零障礙。
  - 支援 CSR、SSR、SSG，並具備 **partial hydration** 與良好 SEO。
  - `Jaspr Content` 套件對 Markdown 內容驅動網站非常友善。

---

# Jaspr 遷移帶來的好處

- **統一工具鏈**：`dart pub`、`dart format`、`dart analyze`、`dart test` 一次到位。
- **降低貢獻門檻**：社群只要會 Dart 就能修網站。
- **語言/工具最新進展直接受益**：
  - 點語法簡寫（dot shorthands）
  - 空值感知集合元素
  - 輕量化 JS 互通與 WebAssembly 編譯
- 與 Jaspr 作者 Kilian 及其顧問公司 Netlight 合作完成。
- 接下來 Dart 與 Flutter 部落格也會遷移。
- 來源：[官方 Medium](https://blog.flutter.dev/we-rebuilt-flutters-websites-with-dart-and-jaspr-317c00e8b400)

---

# Flutter 核心團隊 2026 全球巡迴
> Emma Twersky 宣布：團隊深信社群在面對面互動中茁壯成長。

| 月份 | 活動                  | 地點         | 日期       |
| :--- | :-------------------- | :----------- | :--------- |
| 4 月  | Google Cloud Next     | Las Vegas    | 4/22–24    |
| 5 月  | Flutterconf Spain     | Malaga       | 5/8        |
| 5 月  | Google I/O            | Sunnyvale    | 5/19–20    |
| 6 月  | Flutter Tech Summit   | Warsaw       | 6/9        |
| 7 月  | Fluttercon USA        | Orlando      | 7/16–17    |
| 9 月  | Flutter & Friends     | Stockholm    | 9/3–5      |
| 10 月 | Flutter Kaigi         | Tokyo        | 10/29–30   |

- 團隊也預告 **Dart 3.12 / Flutter 3.44** 即將釋出。
- 想合辦活動可聯絡 `dash-devrel@google.com`。
- 來源：[官方 Medium](https://blog.flutter.dev/come-meet-the-flutter-core-team-on-tour-in-2026-51c3d7190e44)

---

# Material 與 Cupertino 程式碼凍結
> 將設計函式庫分離成獨立套件的第一個重要里程碑。

- **凍結時間**：2026/04/07，於 `flutter/flutter` 主庫不再接受 Material/Cupertino 變更。
- **新家**：以 `material_ui` / `cupertino_ui` 形式發布在 pub.dev。
- **未來開發**：移到 `flutter/packages` 倉庫進行。
- 開放中的 PR 仍會繼續審查，新套件釋出後會給 port 指引。
- 相關 issues 仍留在 `flutter/flutter`。

---

# Material/Cupertino 對應用開發者的影響

- **目前不用做事**：除非你直接貢獻 Material/Cupertino 本身。
- **3.44 之後**：必須遷移到 `material_ui` / `cupertino_ui`，舊程式碼會逐步棄用、最終移除。
- **建議準備**：
  - 將 SDK 升到 v3.44+，凍結版本會與 `1.0.0` 套件對齊。
  - 等待官方詳細遷移指南。
- 目的：在穩定釋出週期前先凍結並複製，最大化降低不相容風險。
- 來源：[官方 Medium](https://blog.flutter.dev/flutters-material-and-cupertino-code-freeze-d32d94c59c38)

---

# 2026 年 Dart/Flutter 如何看待 AI
> 84% / 79% 開發者每天都在用 AI，但只有 73% 覺得提升生產力，46% 不信任正確性。

- 三類使用者，三種策略：
  - **傳統開發者**：強化現有工具品質，建立對 AI 的信任。
  - **AI 輔助開發者**：用編碼代理處理重複性任務。
  - **AI 優先開發者**：讓 Flutter 成為「自然語言建構 App」的最佳選擇。
- 四大原則：
  - 以人為本、增強而非取代、開放標準與代理無關、透過品質建立信任。

---

# AI 策略：開放標準與合作

- **MCP（Model Context Protocol）**：不被綁定特定代理或 Gemini。
- 與 **Google DeepMind**、**Antigravity** 合作提升 AI 產出品質，降低「驗證成本」。
- Dart 持續維持「以人為本」的語言設計。
- 公開實驗、邀請社群參與；不論你用不用 AI，都會被照顧。
- 來源：[官方 Medium](https://blog.flutter.dev/how-dart-and-flutter-are-thinking-about-ai-in-2026-e2fd64e1fdd0)

---

# flutter_pretext：進階文字排版引擎
> 由 waleed719 將 Cheng Lou 的 pretext 演算法原生 port 到 Dart。

- **核心能力**：
  - 無縫置中框包裝（balanced wrapping）
  - 氣泡收縮包裝（shrink-wrap bubbles）
  - 孤立詞平衡（widow / orphan balancing）
- 使用快速遊標在記憶體計算行寬，**60 FPS 流暢動畫**，無需重建大型 Widget 樹。

---

# flutter_pretext 內建 Widget

- **`ObstacleTextFlow`**：文字自動環繞矩形障礙物。
- **`ShrinkWrapText`**：精確計算多行文字幾何長度，解決尾隨空白問題。
- **`BalancedText`**：專業標題排版斷行平衡。
- 致敬 Cheng Lou 的原始演算法貢獻。
- 已發布於 Pub 與 GitHub 供開發者試用。
- 來源：[Reddit](https://www.reddit.com/r/FlutterDev/comments/1sbbuz2/flutter_text_engine_providing_advanced_geometric/)

---

# Lumide：Flutter 寫的超輕量程式碼編輯器
> 目標：取代 Electron / 瀏覽器型編輯器。

- **資源占用**：閒置約 **80 MB RAM**，UI 可達 **120 FPS**。
- **核心特色**：
  - 自訂文字引擎
  - 內建 **C.O.R.G.I. Git 客戶端**
  - 透過 pub.dev 擴充外掛、主題、Language Server
  - 支援 Copilot 等 AI 程式碼建議與 **Agent Client Protocol**
- **隱私優先**：本地優先、無冗餘、零遙測。
- macOS / Windows 公開測試版上線中。
- 來源：[Reddit](https://www.reddit.com/r/FlutterDev/comments/1sou498/i_built_a_super_lightweight_code_editor_in/)

---

# Flutter + FFI 被嚴重低估
> 用 `dart:ffi` 幾乎可以接上任何 C/C++ 函式庫。

- **官方建議路線**（自 Flutter 3.38 起）：使用 `package_ffi` 範本搭配 build hooks。
- **典型流程**：
  1. 用 `package:ffigen` 從 header 自動產生 binding。
  2. 產出 `@Native()` external function。
  3. 由 build hook 在編譯期產生 code asset，自動解析符號。
- 不再需要 OS-specific 的 `dlopen` 邏輯，Dart 程式碼真的跨平台。
- C++ 記得用 `extern "C"` 並標記符號避免 LTO 移除。
- 來源：[Reddit](https://www.reddit.com/r/FlutterDev/comments/1sqyyqv/flutter_ffi_is_wildly_underrated_you_can/)

---

# RepaintBoundary：被低估的效能武器
> 把子樹包進獨立合成層，讓 Flutter 只重畫真正變動的區域。

- **原理**：產生獨立 `OffsetLayer`，子樹的 bitmap 可被快取，下幀直接重用。
- **適用場景**：
  - 頻繁更新的動畫元件
  - 滾動列表中重畫成本高的 cell
  - 與其他 UI 同時存在但更新節奏不同的區塊

---

# RepaintBoundary 使用注意事項

- **不是萬靈丹**：
  - 過度使用會增加記憶體與 GPU upload 成本。
  - 對 layout / build 開銷沒有幫助。
- **何時該用？** 父子在不同時機重繪時最有效；同時重繪反而更慢。
- **驗證方式**：用 Flutter DevTools 的 repaint rainbow 與 frame timing 確認效益。
- 來源：[Reddit](https://www.reddit.com/r/FlutterDev/comments/1svdyg4/repaintboundary_is_one_of_those_flutter_widgets/)

---

# GetX 從 GitHub 消失，又回來了
> Flutter 社群最受歡迎的套件之一突然找不到 repo。

- **事件**：作者 `jonataslaw` 整個 GitHub 帳號連同 GetX repo 被刪除。
- **影響**：
  - pub.dev 上仍然存在，但「未維護」疑慮升高。
  - 大量依賴 GetX 的生產專案陷入技術選擇困境。
- **後續**：帳號與 repo 已恢復，但近期 commit 偏少（兩個月前主要是文件翻譯）。
- **教訓**：依賴單一維護者的開源專案存在系統性風險。

---

# GetX 替代方案討論

- **狀態管理**：`Riverpod`、`Bloc`、`Provider`、`Signals`
- **路由**：`GoRouter`、`AutoRoute`
- **DI**：`get_it`、`injectable`
- 也有開發者選擇自製 mini framework（state + navigation）。
- 來源：[Reddit](https://www.reddit.com/r/FlutterDev/comments/1sl2iuj/getx_on_github_is_missing/) ／ [Medium 整理](https://medium.com/@yurinovicow/flutter-the-getx-package-was-deleted-from-github-422b7edabd1d)

---

# Flutter Desktop 的巨大機會
> 桌面市場仍由 Electron 主宰，但成本與效能的鴻溝愈來愈明顯。

- **Electron 的痛點**：每個 App 都背一個瀏覽器，動輒幾百 MB RAM。
- **Flutter Desktop 的優勢**：
  - 編譯成原生程式碼，啟動快、記憶體小。
  - 一套 codebase 同時跨 mobile / web / desktop。
  - 與原生平台 API 整合愈來愈成熟（SPM、UIScene、Win32/macOS native）。
- **真實案例**：Lumide、Toyota Fluorite 都選擇 Flutter 而非 Electron / Unity。
- 來源：[Reddit](https://www.reddit.com/r/FlutterDev/comments/1sqwwjl/there_is_a_massive_opportunity_for_flutter_desktop/)

---

# AI 真的讓我變慢了？
> 79% Flutter 開發者使用 AI，但效率提升不一定如預期。

- **驗證稅（Verification Tax）**：46% 不信任 AI 正確性，必須花時間 review／回測。
- **使用層次太淺**：多數人只用 autocomplete，agent / chat / context-aware review 沒有發揮。
- **工作流錯位**：把 AI 當成「減少人類參與」的工具時，理解度跟不上產出，責任歸屬模糊。
- **解法**：建立 well-defined 的 rules、MCP、Skill / Workflow，把 AI 當共同開發者而非黑盒。
- 來源：[Reddit](https://www.reddit.com/r/FlutterDev/comments/1s9csar/ai_is_reducing_my_productivity/)

---

# FlutterInit：60 秒生成 production-ready 專案
> 不再為了專案初始化花 4 小時。

- **預設原則**：`flutter_lints` + SOLID。
- **內建配置**：logging、error handling、environment management。
- **可選技術棧**：
  - 狀態管理：Riverpod、Bloc
  - 路由：GoRouter
  - 設計：Material 3 design tokens
  - 架構：Clean Architecture / MVVM / MVC
- 官方網站：<https://flutterinit.com>
- GitHub：<https://github.com/Arjun544/flutter_init>
- 來源：[Reddit](https://www.reddit.com/r/FlutterDev/comments/1sb7jdt/flutterinit_generates_a_complete_productionready/)

---

# 更快的 build_runner
> 不取代 Dart builder 生態系，但 rebuild 最高快 6.66 倍。

- **背景**：build_runner 在大型專案中是常見的痛點。
- **作法**：以更精細的依賴追蹤與快取重做 incremental build，沿用現有 builder。
- **官方那邊也在進步**：
  - `build_runner 2.10.4+` 已加入快取，改一個 library 只重建該 library。
  - changelog 提到分析檔案管理改善，**incremental build 提速 2x**。
- **長期方向**：Dart Macros 將以語言層級取代部分 build_runner 使用情境。
- 來源：[Reddit](https://www.reddit.com/r/FlutterDev/comments/1scg6ey/i_built_a_faster_build_runner_and_got_up_to_666x/)

---

# 本月重點回顧

- **官方策略**：
  - dart.dev / flutter.dev 全面 Jaspr 化
  - Material/Cupertino 凍結，邁向獨立套件
  - 2026 全球巡迴 + AI 路線圖公開
- **社群動能**：
  - flutter_pretext、Lumide、FlutterInit 等高品質開源專案陸續登場
  - GetX 事件提醒大家：依賴管理與替代方案要先準備好
- **效能與底層**：
  - FFI、RepaintBoundary、build_runner 加速等老主題重新被關注

---

# Q & A

![bg width:75% right](./images/slido.png)
