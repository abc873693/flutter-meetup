---
marp: true
title: Flutter 十月大小事
description: 2025/10 有趣新知
author: Rainer Fang
keywords: Flutter, Dart
theme: default
size: 16:9
paginate: true
---

# Flutter 小聚 #29

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
- 下次小聚時間：**2025/11/25**

---

![bg width:75%](../images/gdg-taipei.jpeg)

![bg width:80%](../images/gdg-taipei-qr.png)

---

![bg width:90%](../images/flutter-taipei.avif)

![bg width:80%](../images/flutter-taipei-qr.png)

---

# DevFest Taipei 2025 in 11/30

![width:80%](./images/devfest-taipei-2025.webp)

---


![bg width:50%](./images/website.jpeg)

![bg width:80%](./images/devfest-taipei-2025-website.png)

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

# Flutter 九月大小事

## Rainer Fang

---

# Google Summer of Code 2025 成果

## Dart 連續第六年參與 GSoC

---

# GSoC 2025 專案亮點 (Dart)

## 增強 Flutter 應用互動性與原生體驗

- **Jing Shao**: 實現 Flutter iOS 自訂上下文選單
  > 開發者現可透過 `IOSSystemContextMenuItemCustom` API 新增自訂動作，增強 iOS 上的互動性與原生體驗。

---

# GSoC 2025 專案亮點 (Dart)

## 終端應用程式開發 (TUI)

- **Gedion Ezra**: 開發 **Pixel Prompt**
  > 一個基於 Flutter 宣告式、組件化方法的 Dart TUI 框架，讓 Dart 開發者無需切換語言即可建立動態互動式終端應用程式。

---

# GSoC 2025 專案亮點 (Dart)

## LLM 驅動的測試與文件解決方案

- **Amr Ahmed**: 開發 **TestGen**
  > 基於 LLM 的測試生成工具，透過分析程式碼依賴圖譜，精確生成針對未覆蓋程式碼的單元測試，有效提高程式碼品質與測試覆蓋率。

---

# GSoC 2025 專案亮點 (Dart)

## 跨語言文件重用與整合

- **Marshelino Maged**: LLM + JNIgen 綁定
  > 自動將 Android (Java/Kotlin) 文件中的程式碼片段翻譯成 Dart，解決跨語言文件重用難題。
  > 透過 AST 提取與 RAG 技術克服 LLM 輸入限制。

---

# GSoC 2025 專案亮點 (Dart)

## 簡化 Dart 與 JavaScript 整合

- **Nikechukwu Okoronkwo**: 開發 **JS Interop Generator**
  > 自動從 TypeScript 宣告檔 (`.d.ts`) 生成 Dart JS Interop 介面，極大地簡化 Dart 與 JavaScript 函式庫的整合。

---

# Meet the Flutter Extension for Gemini CLI

## 提升 Flutter 開發者生產力

---

# Flutter Extension for Gemini CLI

## 核心功能與整合

- **簡化開發流程**: 整合 Dart 和 Flutter MCP 伺服器。
- **AI 代理增強**: 提供額外的背景資訊與指令，讓 AI 代理更有效地協助開發者。
- **協助任務**: 原型開發、程式碼審查、編寫與執行測試等。
- **品質保證**: 遵守 Dart 和 Flutter 最佳實踐，生成高品質程式碼。

---

# Flutter Extension for Gemini CLI

## 實用指令集

- **`/create-app`**:
  > 自動生成符合生產環境標準的 Flutter 應用程式，並提供詳細的設計與實作計畫。

- **`/modify`**:
  > 啟動引導式開發會話，協助修改現有程式碼。

- **`/commit`**:
  > 提交前清理與準備程式碼 (修正、格式化、分析、測試)，並生成具描述性的提交訊息。

---

# Flutter Extension for Gemini CLI

## 自動化配置與互動

- **自動配置 MCP 伺服器**: 讓 Gemini CLI 具備多

---


# 隆重推出 Flumpose：Flutter 的流暢、宣告式 UI 擴充套件

- 一個輕量級的 Flutter 套件，為 Flutter 帶來宣告式語法
- 專注於 **效能和 const 安全**

---

## 語法範例

```dart
const Text('Hello, Flumpose!')
        .pad(12)
        .backgroundColor(Colors.blue)
        .rounded(8)
        .onTap(() => print('Tapped'));
```

> 告別深度巢狀的 widget，讓 UI 程式碼更簡潔。

---

## Flumpose 的優勢

- **流暢**：鏈式語法，提升可讀性和開發樂趣
- **效能導向**：避免不必要的重建
- **Const-safe**：盡可能支援 `const`，取代現有巢狀 widget
- **輕量**：無魔法或建構時的技巧
- **真實世界基準測試**：驗證效能聲明
- **詳細文件與實用範例**：清晰度對 Flutter 社群很重要

---

## 期待您的回饋

- API 用起來如何？自然還是太冗長？
- 還有哪些擴充功能或佈局模式能讓它在實際專案中更有用？
- 是否應該保持 **精簡**？

🔗 立即試用：[https://pub.dev/packages/flumpose](https://pub.dev/packages/flumpose)

---

# Motor 1.0 發佈：Flutter 複雜動畫的最佳協調工具

- Motor 是一個統一的 Flutter 動畫系統
- 結合物理彈簧或傳統時間曲線兩種動畫方式
- 無需重寫程式碼即可在兩種方式間切換

---

## 強大的序列 API

- 協調多階段動畫，實現流暢的狀態轉換
- 適用於狀態機動畫、 onboarding 流程、複雜 UI 轉場
- 每個階段可使用不同的運動類型 (例如：彈性彈簧、平滑曲線)

---

## 為何選擇物理動畫？

- 類比 iOS 或 Material 3 Expressive 應用程式的「流暢感」
- 響應式、自然、對使用者輸入有「生命」般的反應
- 傳統曲線動畫適用於精確計時，物理動畫帶來有機感，尤其適合使用者驅動的互動 (拖曳、滑動)

---

## 其他主要功能

- 內建符合 iOS (CupertinoMotion) 和 Material Design 3 (MaterialSpringMotion) 指南的預設值
- 多維動畫，每維度獨立物理效果 (對自然的 2D 運動非常重要)
- 支援 Offset, Size, Rect, Color 等複雜類型，或自訂轉換器
- 互動式可拖曳 widget，帶有彈簧回彈動畫

> 當使用者驅動互動時，Motor 是協調複雜動畫的最佳工具。維度獨立性在對角線滑動等場景中尤其關鍵，因為水平和垂直物理效果可獨立穩定。

---

## 立即體驗！

- 試用範例應用程式：[https://whynotmake-it.github.io/rivership/#/motor](https://whynotmake-it.github.io/rivership/#/motor)
- 套件連結：[https://pub.dev/packages/motor](https://pub.dev/packages/motor)

期待您的想法與問題！

---

# Flutter 成熟度提升，但實際應用程式架構討論仍不足？

- Flutter 框架在效能、UI 一致性、套件生態系統等方面已大幅成熟
- 教學多專注於 UI 和 Widget，缺乏實際應用程式架構的討論

---

## 缺乏的討論重點

- 如何擴展程式碼庫
- 依賴管理
- 設定清晰的架構
- 大型應用程式的功能模組組織

> 大家都在展示「待辦事項應用程式」或精美的登入畫面，但卻沒有教導如何維護一個有數名開發者、CI/CD 和真實資料流挑戰的六個月老程式碼庫。

---

## 您的專案架構如何？

- 您是否堅持使用 Riverpod/BLoC/Clean Architecture 模式？
- 還是採用自訂的混合模式？

> 期待聽到實際有效的經驗或方法！

---



# 我很高興推出我的新 Flutter 框架 Solid 🚀

- Solid 是一個基於 Flutter 構建的微型框架
- 讓應用程式開發更簡單、更愉快。

---

## 資源與回饋

- 官方文件：[https://solid.mariuti.com](https://solid.mariuti.com)
- GitHub 儲存庫：[https://github.com/nank1ro/solid](https://github.com/nank1ro/solid)

> 期待您的回饋！
> 讓我們在 2025 年再次讓 Flutter 變得更棒 🚀

