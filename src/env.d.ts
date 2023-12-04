/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module 'vite-plugin-iconify-preset/vue'
declare module 'codemirror'
declare module 'sql-formatter'
declare module 'xml-formatter'
declare module 'js-beautify'
declare module '@/*'
