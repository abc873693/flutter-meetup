---
marp: true
title: Flutter 二月大小事
description: 2026/02 有趣新知
author: Rainer Fang
keywords: Flutter, Dart
theme: default
size: 16:9
paginate: true
---

# Flutter 小聚 #32

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

# [Slido](https://app.sli.do/event/foSqFPgdLXht2jtwsS2RQz)

![bg width:75% right](./images/slido.png)

---

# Flutter 二月大小事

## Rainer Fang

---

# Dart 3.11 正式發布
> 本次更新專注於提升開發流程的響應速度與工具效能。

![Announcing Dart 3.11](https://cdn-images-1.medium.com/max/1024/1*29dKLBxAMepAi2od91c3TA.png)

- **無語言層級更新**：本次著重於工具鏈的改善。
- **Dart MCP & AI 支援**：新增 `read_package_uris` 工具，讓 AI 助手（Cursor, Gemini 等）能讀取套件 URI，正確解析並利用依賴項。
- **分析伺服器效能提升**：引入「細粒度依賴 (fine-grained dependencies)」，提升 IDE 分析與重新編譯的速度，並改善「點縮寫 (dot shorthands)」的程式碼補全。

---

# Dart 3.11：Pub 套件管理更新

- **Pub Workspaces 支援 Glob**：
  > 可以在 pub workspace 中使用 Glob 語法（如 `pkg/*`）來宣告套件，無需再逐一列出目錄下的所有套件。
  - *注意*：需將 Dart SDK 版本設定為 `^3.11.0` 以上。
- **Pub Cache 垃圾回收 (`pub cache gc`)**：
  - 過去套件快取只能全部刪除，現在可以透過 `dart pub cache gc` 指令。
  - 此指令會掃描所有「活躍中」的專案，保留需要的套件版本，並刪除未使用的快取，釋放硬碟空間。

---


# Flutter 3.41：透明度與模組化
> 授權社群，帶來可預測的發布週期與更輕量的核心。

![Flutter 3.41](https://cdn-images-1.medium.com/max/1024/1*XxO20lj9p2xlQfuIiwa8mg.png)

- **公開發布窗口 (Public Release Windows)**：
  - 明確公布分支截斷日期（2026 年預計 4 次穩定版），讓 PR 貢獻者能清楚預測程式碼何時會進入穩定版。
- **解耦 Material 與 Cupertino**：
  > 將設計函式庫獨立為套件，實現更快的發布週期、獨立升級，並能更敏捷地適應 iOS/Android 的設計變更。

---

# Flutter 3.41：生態系標準與新功能

- **生態系標準對齊**：
  - 全面支援 Swift Package Manager (SPM) 與 iOS `UIScene` 生命週期。
  - 預設使用 Kotlin DSL 建立 Android 專案，並持續推進 AGP 9 的相容性（目前暫不建議升級）。
- **平台專屬資源 (Platform-specific assets)**：
  - 可在 `pubspec.yaml` 指定資源僅供特定平台使用（如排除行動端的桌面資源），減小 App 體積。
- **其他更新**：
  - Fragment Shader 支援同步影像解碼與高位元率紋理。
  - Widget Previews 實驗性功能整合 Flutter Inspector，支援 FFI 相依專案。

---

# 全新的 Dart & Flutter 入門體驗
> 為了尚未成為 Flutter 開發者的「觀望者」打造的全新學習路徑。

![Getting Started](https://cdn-images-1.medium.com/max/862/1*rHBScksI6g6at1HsqSuPhA.png)

- **快速安裝指南**：
  - 結合 Web 熱重載技術，讓新手無需安裝特定平台的開發環境即可體驗 Flutter。
- **循序漸進的教學內容**：
  > 包含 Dart 與 Flutter 的完整獨立教學，帶領讀者從零開始建置 4 個小型 App，避免大型專案帶來的挫折感。

---

# 豐富的學習資源與網站更新

- **多媒體輔助與測驗**：
  - 搭配 8 支由 Flutter 團隊親自錄製的教學影片，提供核心概念解析與友善的社群氛圍。
  - 每個章節末尾提供低壓力的隨堂小測驗，確認學習成效。
- **網站架構更新**：
  - 網站基礎設施已遷移至基於 Dart 的靜態網站生成器 `Jaspr`。
  - 將教學內容獨立至全新的「Learn」區塊，讓官方文件結構更清晰。

---

# 提示工程作為基礎設施 (Prompt engineering)
> 進入 AI 代理 (Agentic AI) 時代，開發瓶頸從「程式碼產量」轉為「程式碼完整度」。

![Agentic Era](https://cdn-images-1.medium.com/max/1024/1*HNqQFQ2hdhAgjew1pIMqXA.png)

- **弭平團隊落差**：
  - 基礎設施必須成為傳統嚴謹開發與高敏捷 AI 工具之間的橋樑，讓 CI 系統成為高訊號的反饋迴圈 (Feedback loop)。
- **提示詞即基礎設施**：
  > 不要將 AI 指令視為閱後即焚的對話。應將自動化工作流程寫入版控檔案，將部落知識轉化為「可執行的文件」。

---

# 轉換為基於「技能 (Skills)」的架構

- **Agent Skills (Anthropic 開放標準)**：
  - 將指令與資源打包，確保 AI 能一致地執行複雜任務。支援 Antigravity, Cursor, Claude Code 等多種工具。
- **高成效 Skill 的構成要素**：
  - **已知良好狀態**：AI 改 code 前必須確認測試通過、分析乾淨。
  - **可操作的驗證**：明確指示使用 `flutter test` 或 `dart fix` 進行驗證。
  - **邊界限制與回報機制**：限制修改範圍，要求 AI 總結修改內容並建議 Commit 訊息，**禁止自動 Push**，將最終決定權保留給人類。

---

---

# 官方 Material 套件發布！

- `material_ui` 套件現已發布！
- `cupertino_ui` 也可使用！
- Flutter 分離正式開始！
- 連結: https://pub.dev/packages/material_ui

---

# Cached Network Image 的替代方案

## 兩年未維護，決定 Fork 並創建 CE 版本

- `cached_network_image` 專案停滯不前
- 開發者決定接手維護並改進

---

# 效能大幅提升

- 將快取管理從 `sqflite` 轉換為 `hive_ce`
- 效能提升高達 8 倍

## 基準測試 (100 次操作)

| 操作         | 標準 (sqflite) | CE (hive_ce) | 提升         |
| :----------- | :------------- | :----------- | :----------- |
| 讀取 (命中檢查) | 16 ms          | **2 ms**     | 🚀 **8.00x 更快** |
| 寫入 (新圖片)  | 116 ms         | **29 ms**    | ⚡ **4.00x 更快** |
| 刪除 (清理)    | 55 ms          | **19 ms**    | 🧹 **2.89x 更快** |

---

# 為什麼 `hive_ce` 如此出色？

- **平台通道開銷:** `sqflite` 涉及 Dart 到原生端的序列化和跨平台通訊。
- **Dart-原生速度:** `hive_ce` 直接在 Dart 中處理記憶體中的索引和檔案讀取，無橋接開銷，速度接近記憶體存取。

---

# 後續計畫與社群回饋

- 接下來可能專注於解決記憶體洩漏問題。
- 希望獲得社群回饋以驗證方向。
- 專案已發布至 pub.dev: https://pub.dev/packages/cached_network_image_ce

---

# 開源 Flutter/Dart 網路監測工具

## `network_debugger`：HTTP + WebSocket/Socket.io (DevTools 替代方案)

- 推出免費開源的 `network_debugger`，Flutter/Dart 的高級網路監測工具。
- 隱私優先，可完全離線工作。
- GitHub (文件 + 截圖): [https://github.com/cherrypick-agency/flutter_network_debugger](https://github.com/cherrypick-agency/flutter_network_debugger)

---

# 為什麼需要 `network_debugger`？

- Flutter DevTools Network 不支援 WebSocket，且更新頻率低。

## 主要功能亮點

- HTTP(S) + WebSocket/Socket.io 檢查 (框架/事件 + 搜尋)
- Firebase 資料庫檢查 (支援！)
- 時間軸/瀑布圖 + 分組 + 過濾器
- 請求/回應詳情 (美觀的 JSON/樹狀結構、語法高亮、時間)
- 編寫和編輯請求、節流、斷點、可選的全系統偵錯

---

# 快速入門 (Web UI)

1. 安裝並啟動
   ```bash
   dart pub global activate network_debugger
   network_debugger
   ```
2. 若使用 [dio](https://pub.dev/packages/dio) (使用 `dio_debugger` 套件):
   ```dart
   import 'package:dio_debugger/dio_debugger.dart';
   
   if (kDebugMode) DioDebugger.attach(myDioClient);
   ```

- 另有 Dio、package:[http](https://pub.dev/packages/http) 和多個 WebSocket 客戶端的整合套件。
- 歡迎社群回饋，您的#1 功能需求是什麼？

---

# 為何我們不再從零開始 Flutter 專案

## (以及為什麼你也應該這麼做)

- SolGuruz 團隊發現重複模式：
  - 每次都從零開始
  - 遵循略有不同的標準
  - 重複建立相同的基礎模組

---

# 團隊成長與挑戰

- 團隊擴大後，新成員需學習 Flutter 以外的應用程式結構、架構和決策流程。
- 客戶總是希望在第一個 Sprint 就看到核心功能。

---

# 解決方案：標準化骨架專案 `Skelter`

- 將實務中有效的共同模組、基礎架構、慣例和設置標準化。
- 作為所有新應用程式的內部骨架。
- 幫助開發者專注於**產品核心**，而非重複的程式碼。
- 提早交付有意義的功能。

---

# 開源 `Skelter`

- 將內部基礎專案開源為 **Skelter**。
- 目標是作為一個實用的起點，而非「完美的 Flutter 架構」。
- 歡迎探索、提供回饋、建議和貢獻。
- GitHub Repo: [https://github.com/solguruz/skelter](https://github.com/solguruz/skelter)

---

# 我所知道的 Fluorite

- Toyota Connected North America 宣布 Fluorite：
  - 一款主機級 3D 遊戲引擎，完全以 Dart 和 Flutter 構建。
  - 由 Google 的 Filament 渲染器驅動。
  - 在 FOSDEM 2026 發布，計畫開源。

---


# Toyota 正在開發主機級開源遊戲引擎 - Fluorite

https://www.facebook.com/groups/flutter.taipei/posts/4383251535275103/

https://fluorite.game/

# Fluorite 的細節與影響

- **架構:** C++ ECS, Dart API, Filament (PBR 渲染), SDL3 (跨平台 I/O)。
- **為何選擇 Fluorite 而非 Unity、Unreal 或 Godot?**
- **重要性:** 對 Flutter 生態系統可能產生巨大影響。
- 已在 2026 年 Toyota RAV4 的車載娛樂系統中運行。

---

# 我們打造了夢寐以求的國家選擇器！

- Codeable 團隊發現現有國家選擇器套件的不足：
  - 搜尋、主題、功能（電話國碼、篩選、旗幟自訂）不完整。
  - 顯示模式選擇少，通常只強制一種底部彈出視窗。

---

# Countrify：綜合性 Flutter 國家選擇器

## 主要特色

- **245+ 國家豐富數據：** 包含首都、貨幣、語言、時區、邊界、人口、面積等 15+ 欄位。
- **5 種顯示模式：** 底部彈出視窗、對話框、全螢幕、下拉選單、行內顯示。
- **專用 `PhoneNumberField` 小工具：** 完整的電話號碼輸入，整合國碼前綴和行內下拉選單。

---

# Countrify：更多功能

- **`CountryDropdownField`：** 表單友善的小工具，支援 `InputDecoration` 和驗證。
- **4 種內建主題：** (Light, Dark, Material 3, Custom)，所有視覺屬性可透過 `copyWith` 自訂。
- **即時去抖動搜尋：** 支援名稱、代碼、首都、地區和電話國碼。
- **進階篩選：** 依地區、次地區、獨立狀態、聯合國成員資格或特定國家代碼。

---

# Countrify：彈性與效能

- **旗幟自訂：** 矩形、圓形或圓角形狀，可配置邊框和陰影。
- **自訂建構器：** 可提供國家項目、標頭、搜尋欄和篩選欄的自訂小工具。
- **40+ 實用方法：** 透過 `CountryUtils` 實現程式化存取 (搜尋、統計、驗證、排序等)。
- **零運行時依賴：** 僅依賴 Flutter SDK。
- **跨平台支援：** iOS、Android、Web、macOS、Windows、Linux。

---

# Countrify：整合與社群

- 內建高品質 PNG 旗幟資源和專用圖標字體，無外部依賴。
- 解決了整合多個套件以實現國家選擇器、電話輸入和撥號代碼選擇器的痛點。
- 歡迎回饋，期待了解您還需要哪些功能。
- pub.dev: https://pub.dev/packages/countrify
- GitHub: [https://github.com/Arhamss/countrify](https://github.com/Arhamss/countrify)
