import type { OpenSlideConfig } from '@open-slide/core';

// 部署在 gh-pages 的子路徑下，與 Marp 產出的 /<num>/ 並存。
// base 會同時傳給 Vite 的 base 與 React Router 的 basename。
const config: OpenSlideConfig = {
  base: '/flutter-meetup/os/',
  // 直接用 repo 既有的圖，不再複製一份；deck 內以 @assets/... import
  assetsDir: '../images',
};

export default config;
