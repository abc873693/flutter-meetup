---
marp: true
title: Flutter 小聚 \#38
description: 2026/09 有趣新知
author: Rainer Fang
keywords: Flutter, Dart
theme: default
size: 16:9
paginate: true
---

<style>
/* GDG brand — https://developers.google.com/community/gdg/brand-guidelines
   選擇器一律帶 section 前綴：Marp 會補上與 default theme 同級的高特異性前綴，
   少了 section 就會被 theme 的 `section :is(h1)` 蓋掉。 */

section {
  --h1-color: #1e1e1e;
  --heading-strong-color: #4285f4;
  --paginate-color: #5f6368;
  background: #ffffff;
  color: #1e1e1e;
  font-family: "Google Sans", "Product Sans", Roboto, "Noto Sans TC",
    "PingFang TC", "Microsoft JhengHei", sans-serif;
  font-size: 26px;
  line-height: 1.65;
  padding: 64px 72px;
}

section h1 {
  font-size: 52px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 28px;
  padding-bottom: 20px;
  background-image: linear-gradient(
    to right,
    #4285f4 0 25%, #ea4335 25% 50%, #f9ab00 50% 75%, #34a853 75% 100%
  );
  background-repeat: no-repeat;
  background-size: 200px 6px;
  background-position: left bottom;
}

section h2 { font-size: 34px; font-weight: 500; color: #4285f4; }
section h3 { font-size: 28px; font-weight: 400; color: #5f6368; }

section code {
  font-family: "Google Sans Mono", "Roboto Mono", "SF Mono", monospace;
  background: #f0f0f0;
  color: #1e1e1e;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.88em;
}
section a { color: #4285f4; text-underline-offset: 3px; }

section ul > li::marker { color: #4285f4; }
section ul ul > li::marker { color: #34a853; }
section ul ul { font-size: 0.92em; color: #3c4043; }
section li { margin: 0.3em 0; }

section blockquote {
  border-left: 5px solid #f9ab00;
  background: #fffdf5;
  margin: 20px 0;
  padding: 12px 22px;
  color: #1e1e1e;
  font-style: normal;
}

/* 封面：疊在 cover-v2.png 上，不要四色底線 */
section.cover h1 {
  background-image: none;
  padding-bottom: 0;
  font-size: 76px;
  margin-top: 120px;
}

/* 段落分隔頁：GDG 藍底 */
section.divider {
  --h1-color: #ffffff;
  --paginate-color: rgba(255, 255, 255, 0.8);
  background: #4285f4;
  color: #ffffff;
}
section.divider h1 {
  font-size: 64px;
  background-image: linear-gradient(
    to right,
    #ffffff 0 25%, #f9ab00 25% 50%, #c3ecf6 50% 75%, #34a853 75% 100%
  );
}
section.divider h2 { color: #ffffff; opacity: 0.92; }
</style>

<!-- _class: cover -->

# Flutter 小聚 #38

### 2026 / 09 ・ GDG Taipei × Flutter Taipei

![bg](../images/cover-v2.png)

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

![bg width:90%](../images/gdg-taipei.svg)

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


# 近期社群活動｜GDG Taipei

- **DevFest Taipei 2026**
  - 12/13（日）[活動頁](https://gdg.community.dev/events/details/google-gdg-taipei-presents-devfest-taipei-2026/cohost-gdg-taipei)
- 近期已辦
  - GDG 2026 / 09 月會：**WebMCP** — 讓 AI 知道你的網站可以怎麼操作（9/17）
  - Kotlin 15 歲生日蛋糕派對（8/18）
- GDG Cloud Taipei：**無**（目前沒有已公告的近期活動）

---

# [Slido](https://qr.sli.do/msHPor1mdpYPYvUfMyDdpf)

![bg width:75% right](./images/slido.png)

---

<!-- _class: divider -->

# Flutter 九月大小事

## Rainer Fang

---


# 九月重點一覽

- **iOS 27 / Xcode 27** 正式版，Flutter 升到 **3.47.5**
- **iPhone Duo**：Flutter 還讀不到摺疊狀態
- Dart **`skills` CLI 1.0**、**Serverpod 4**
- **Android 17 QPR1**：新 API 只給 Pixel
- 社群套件：依 OS 版本切換 **Liquid Glass** / **M3 Expressive**

---

# iOS 27 / Xcode 27 正式上線

![bg right:35%](./images/ios-releases-banner.jpg)

> 9/14 釋出

- 沒採用 **UIScene** 的 app **無法啟動**
- 3.41+ 自動遷移；**自訂 `AppDelegate` 要手動改**
- Xcode 27 **只能跑在 Apple Silicon**
- 最低 iOS 版本已拉到 **15**

- 來源：[flutter/website#13872](https://github.com/flutter/website/pull/13872)｜[官方 blog](https://flutter.dev/blog/how-flutter-stays-ahead-of-ios-releases)

---

# Flutter 3.47 hotfix

| 版本 | 重點修正 |
|---|---|
| 3.47.2 | Xcode 27 add-to-app build 失敗、**libpng 安全性更新** |
| 3.47.3 | `Actions.handler` 回傳 null、PowerVR GPU 異常 |
| 3.47.4 | **Xcode 27 debug 白畫面** |
| 3.47.5 | **iOS 27 實機 debug crash** |

> 要跟上 iOS 27，**至少升到 3.47.5**。

- 來源：[Flutter CHANGELOG](https://github.com/flutter/flutter/blob/stable/CHANGELOG.md)

---

# iPhone Duo：現況

![bg right:40% contain](./images/iphone-duo-displays.jpg)

> 10/23 出貨，需 **Xcode 27.1**

- iOS 上 `displayFeatures` **永遠是空的**
- 讀不到摺疊狀態、摺痕、hinge 角度
- 官方已開 **十幾張 issue**（P2）
- 先用社群套件 [`foldable`](https://pub.dev/packages/foldable)

- 來源：[flutter/flutter#192515](https://github.com/flutter/flutter/issues/192515)｜[Flutter on iPhone Duo](https://iphoneduosupport.com/frameworks/flutter/)

---

# iPhone Duo：先檢查這些

- 螢幕尺寸**不要快取**，用 `MediaQuery.sizeOf`
- inner display **忽略方向鎖定**
- safe area **左右不對稱**
- Split View 時 `inactive` 仍然**看得到畫面**

---

# Dart skills CLI 1.0

![bg right:35%](./images/dart-skills.webp)

> 9/8，Dart 團隊維護

- 套件可以**附帶 AI agent skills**
- 放在套件的 `skills/` 目錄
- 不需要 Node.js

```bash
dart run skills@ get
```

- 來源：[Dart blog](https://dart.dev/blog/skills-cli-1-0-bundle-and-distribute-ai-agent-skills-for-your-packages)

---

# Serverpod 4

![bg right:35%](./images/serverpod-4.jpg)

> 9/14 釋出

- **全端 hot reload**（server、DB、app）
- **Embedded Postgres**，不用 Docker
- **Offline sync**（實驗性）
- 內建 **MCP server**

- 來源：[Serverpod 4](https://serverpod.dev/blog/serverpod-4)

---

# GenLatte 改成 Full-stack Dart

![bg right:35%](./images/genlatte.webp)

> 9/22，官方咖啡攤 app

- 後端 Node.js → **Dart**
- 前後端**共用 model**
- **15+ 個 service → 1 個**
- 帳單**大幅下降**

- 來源：[官方 blog](https://flutter.dev/blog/converted-genlatte-fullstack-dart)

---

# GSoC 2026 成果

![bg right:40% contain](./images/gsoc-devtools-websocket.webp)

- DevTools 支援 **WebSocket**（右圖）
- FFIgen 支援 **C++**（實驗性）
- DevTools 可檢視 **native memory**

- 來源：[Dart blog](https://dart.dev/blog/google-summer-of-code-2026-results)

---

# Android 17 QPR1：新 API 不進 AOSP

> 9/15，**Android 3.x 以來第一次**

- **API 37.1** 新 API 只有 **Pixel** 有
- 其他品牌要等 **12 月 QPR2**
- 開發者：新 API 要做 **runtime 檢查**
- 測試別只用 Pixel

- 來源：[GrapheneOS](https://grapheneos.social/@GrapheneOS/117282080803799576)｜[API diff](https://developer.android.com/sdk/api_diff/37.1/changes)

---

# 同一份 code，依 OS 版本換設計

![bg right:36% contain](./images/adaptive-liquid-glass.png)
![bg contain](./images/adaptive-classic.png)

> 社群套件 `native_adaptive_ui`

- 看 **OS 版本**，不只看平台
- iOS 26 → **Liquid Glass**（右圖左）
- iOS 18 → 舊 Cupertino（右圖右）
- 玻璃效果靠嵌入**原生 UIKit 元件**

- 來源：[GitHub](https://github.com/gauravrajkagwaniya/native_adaptive_ui)｜[Reddit](https://www.reddit.com/r/FlutterDev/comments/1w445xa/)

---

# 社群熱議（r/FlutterDev）

- Riverpod 為什麼離開 widget tree
- 沒有 Mac 也能上架 iOS？
- native app 換 Flutter 真的快 3 倍？

- 來源：[r/FlutterDev](https://www.reddit.com/r/FlutterDev/top/?t=month)

---

# 這個月該做的事

1. 升到 **3.47.5**
2. 確認 **UIScene** 遷移
3. build 機器換 **Apple Silicon**
4. 用 **iPhone Duo simulator** 測一次
5. 11 月前遷移 **`material_ui`**

---

# Q & A

![bg width:75% right](./images/slido.png)
