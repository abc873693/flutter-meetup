/// <reference types="vite/client" />

// assetsDir 指向 repo 根的 images/，由 @open-slide/core 註冊成 @assets alias
declare module '@assets/*' {
  const src: string;
  export default src;
}
