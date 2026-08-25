---
marp: true
title: Flutter 小聚 \#37（ADHD 友善版）
description: 2026/08 有趣新知
author: Rainer Fang
keywords: Flutter, Dart
theme: default
size: 16:9
paginate: true
---

<style>
/* ADHD 友善版：一頁一個重點、字級放大、不用巢狀清單。
   GDG brand — https://developers.google.com/community/gdg/brand-guidelines
   選擇器一律帶 section 前綴，否則會被 default theme 的 `section :is(h1)` 蓋掉。 */

section {
  --h1-color: #1e1e1e;
  --heading-strong-color: #4285f4;
  --paginate-color: #5f6368;
  background: #ffffff;
  color: #1e1e1e;
  font-family: "Google Sans", "Product Sans", Roboto, "Noto Sans TC",
    "PingFang TC", "Microsoft JhengHei", sans-serif;
  font-size: 34px;
  line-height: 1.75;
  padding: 72px 88px;
}

section h1 {
  font-size: 58px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 32px;
  padding-bottom: 22px;
  background-image: linear-gradient(
    to right,
    #4285f4 0 25%, #ea4335 25% 50%, #f9ab00 50% 75%, #34a853 75% 100%
  );
  background-repeat: no-repeat;
  background-size: 200px 6px;
  background-position: left bottom;
}

section h2 { font-size: 40px; font-weight: 500; color: #4285f4; }
section h3 { font-size: 30px; font-weight: 400; color: #5f6368; }

section code {
  font-family: "Google Sans Mono", "Roboto Mono", "SF Mono", monospace;
  background: #f0f0f0;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.9em;
}
section a { color: #4285f4; text-underline-offset: 3px; }

section ul > li::marker { color: #4285f4; }
section li { margin: 0.55em 0; }

section blockquote {
  border-left: 6px solid #f9ab00;
  background: #fffdf5;
  margin: 24px 0;
  padding: 16px 26px;
  font-style: normal;
}

/* 封面 */
section.cover h1 {
  background-image: none;
  padding-bottom: 0;
  font-size: 78px;
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
  font-size: 66px;
  background-image: linear-gradient(
    to right,
    #ffffff 0 25%, #f9ab00 25% 50%, #c3ecf6 50% 75%, #34a853 75% 100%
  );
}
section.divider h2 { color: #ffffff; opacity: 0.92; }

/* 單一重點頁：超大字、置中、不要底線 */
section.big {
  text-align: center;
}
section.big h1 {
  font-size: 150px;
  background-image: none;
  padding-bottom: 0;
  margin-bottom: 16px;
  color: #4285f4;
}
section.big h2 { font-size: 52px; color: #1e1e1e; font-weight: 700; }
section.big h3 { font-size: 32px; color: #5f6368; }

/* 提醒頁：黃底 */
section.warn {
  background: #fffdf5;
  text-align: center;
}
section.warn h1 {
  font-size: 68px;
  background-image: none;
  padding-bottom: 0;
  color: #ea4335;
}
section.warn h2 { font-size: 44px; color: #1e1e1e; }
section.warn h3 { font-size: 32px; color: #5f6368; }
</style>

<!-- _class: cover -->

# Flutter 小聚 #37

### 2026 / 08 ・ GDG Taipei × Flutter Taipei

![bg](../images/cover-v2.png)

---

# 小聚說明

- 主辦：**GDG Taipei**、**Flutter Taipei**
- 時間：每月**最後一週的週二**
- 地點：**天攏書局 2F**

---

# 活動有三段

- 當月 Flutter 大小事
- 開發者經驗分享
- Lightning Talk

> 有問題隨時用 **Slido** 發問。

---

# 行為準則

參照 GDG 台灣行為準則

https://gdg.tw/code_of_conduct/

---

![bg width:90%](../images/gdg-taipei.svg)

![bg width:80%](../images/gdg-taipei-qr.png)

---

![bg width:90%](../images/flutter-taipei.avif)

![bg width:80%](../images/flutter-taipei-qr.png)

---

# Flutter Taipei 每月月報

![width:70%](../images/medium-post.jpeg)

---

# 上台分享可獲得 Pin 針及帽子

![bg width:72% right](../images/sharing-swag.jpeg)

---

# 近期社群活動

- **無**（目前沒有已公告的近期活動）

---

# [Slido](https://app.sli.do/event/TODO)

<!-- TODO: 換成 #37 的 Slido event 連結，並更新 37/images/slido.png QR -->

![bg width:72% right](./images/slido.png)

---

<!-- _class: divider -->

# Flutter 八月大小事

## TODO: 講者

---

<!-- _class: big -->

# 8/12

## Flutter 3.47 ＋ Dart 3.13

### 同一天發布

---

# 這場會講 5 件事

- Material 拆出去變獨立套件
- Impeller 成為桌面預設
- Apple 平台最低版本拉高
- Dart 有了 primary constructors
- 官方在推 Wasm

---

<!-- _class: big -->

# 1

## Material 拆出去了

---

# material_ui 變成獨立套件

- 以前綁在 SDK 裡，只能等**季度**釋出
- 現在放 pub.dev，可以**每週**更新
- bug 修完不必等下一個 stable

---

# 遷移只要跑這行

```bash
dart fix --apply --code=migrate_design_widgets
```

自動把 `package:flutter/material.dart` 換成獨立套件。

---

<!-- _class: warn -->

# 11 月會 deprecate

## 舊的 design library

### 現在動比較不痛

---

# 相依套件還沒跟上？

用 `MaterialUiCompatibilityBridge`

可以先遷移自己的 app，不必等整個生態系。

---

<!-- _class: big -->

# 2

## Impeller 成為桌面預設

---

# Impeller 上桌面了

- macOS、Windows、Linux 的**預設 renderer**
- shader 在 **build 時期**編譯
- 首次動畫不再卡頓

> 想退回舊 renderer 還可以，但未來版本會移除。

---

<!-- _class: big -->

# 3

## Apple 平台最低版本拉高

---

<!-- _class: big -->

# iOS 15

## macOS 12

### 對齊秋天的 Xcode 27 / iOS 27

---

<!-- _class: warn -->

# UIScene 是強制的

## iOS 27 要求所有 UIKit app 採用

### 自訂 AppDelegate 的要手動遷移

---

# Apple 平台還有兩件事

- **Intel Mac 開始退場**：build 會出現警告，未來變成 error
- **SwiftPM**：前 100 大 plugin 已有 **92 個**完成遷移

---

<!-- _class: big -->

# 4

## Dart 有了 primary constructors

---

# 一行就是一個 class

```dart
class Point(final int x, final int y);
```

不用再寫欄位宣告加建構式參數。

---

# Dart 3.13 還給了什麼

- **6 個新 lint** 和 **4 個 IDE refactoring** 幫你遷移
- native library 可以 **tree-shaking** 了
- formatter 會自動幫 import 分段

---

<!-- _class: big -->

# 5

## 官方在推 Wasm

---

<!-- _class: big -->

# 快 2 倍

## frame time：17.4ms vs 34.5ms

### 穩定 60 FPS

---

<!-- _class: big -->

# 58%

## 的現有 web app

### 零改動就能編成 Wasm

---

# 想試 Wasm 要做什麼

- 跑 `flutter build web --wasm`
- 把 `dart:html` 換成 `package:web`
- server 設 `COEP` 和 `COOP` header

---

# 另外還有

- **Widget Previews** 進入 stable，不必 build 整個 app
- **Desktop Windowing API** 出來了，但還在 main channel

---

<!-- _class: divider -->

# 所以這個月做什麼

---

# 挑 3 件做就好

1. `flutter upgrade` 升到 **3.47**
2. 跑 `dart fix`，先試 **material_ui** 遷移
3. web 專案試跑 `flutter build web --wasm`

---

# 想看細節的話

- [What's new in Flutter 3.47](https://flutter.dev/blog/whats-new-in-flutter-3-47)
- [Announcing Dart 3.13](https://dart.dev/blog/announcing-dart-3-13)
- [Wasm Week](https://flutter.dev/blog/try-flutter-web-with-webassembly-week)
- [Desktop Windowing APIs](https://flutter.dev/blog/desktop-windowing-apis)

---

# Q & A

![bg width:72% right](./images/slido.png)
