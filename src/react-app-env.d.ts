interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

// 引入 svg 报找不到模块原因

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'