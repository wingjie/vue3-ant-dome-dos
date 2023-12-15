import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import legacy from '@vitejs/plugin-legacy'
import qiankun from 'vite-plugin-qiankun'
import Inspector from 'vite-plugin-vue-inspector'
import copy from 'rollup-plugin-copy'
import { resolve } from 'path'
import icon from 'vite-plugin-iconify-preset'
import writeInCode from './src/library/writeInCode'

import iconConfigData from './src/common/components/Icon/config'
import proxy from './proxy'
import autoImportConfig from './src/common/utils/autoImportConfig'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_BASE_CHILD_URL, VITE_BASE_BUILD_DIR } = env
  const useInspector = (option) => (mode === 'debug' ? Inspector(option) : null)

  return {
    base: './',
    plugins: [
      icon(iconConfigData),
      writeInCode(),
      AutoImport({
        dts: './src/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          'vuex',
          {
            '@/common/utils/autoImport': autoImportConfig,
            '@vueuse/core': [
              'computedAsync',
              'useVModel',
              ['get', '$get'],
              // ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
            ],
          },
        ],
        // eslint报错解决
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      Components({
        resolvers: [IconsResolver()],
        // 自动引入的后缀
        extensions: ['vue'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: './src/components.d.ts',
        // imports 指定组件所在位置，默认为 src/components
        dirs: ['src/common/components/'],
      }),
      Icons({
        compiler: 'vue3',
        // autoInstall: true,
        // customCollections: {
        // 'my-icons': {
        //   account: '<svg><!-- ... --></svg>',
        //   // load your custom icon lazily
        //   settings: () =>
        //     fs.readFile('./public/AntDesignAccountBookFilled.svg', 'utf-8'),
        //   /* ... */
        // },
        // 'my-icons': {}, // 自定义图标集合
        // },
      }),
      vue(),
      useInspector({
        enabled: true,
        toggleButtonVisibility: 'never',
        toggleComboKey: 'shift-s',
      }),
      PkgConfig(), // 启动优化
      OptimizationPersist(), // 启动优化
      legacy({
        targets: ['Chrome 68'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        modernPolyfills: true,
      }),
      qiankun('mars', {
        useDevMode: true,
      }),
      copy({
        targets: [
          {
            src: ['src/common/*.md'],
            dest: 'dist/src',
          }, // 将 src/static 目录下的资源复制到 assets 目录下
          // { src: 'node_modules/package/static', dest: 'assets' }, // 将 node_modules/package/static 目录下的资源复制到 assets 目录下
        ],
        hook: 'writeBundle',
        flatten: false, // 是否将源文件的目录结构扁平化
      }),
    ],
    build: {
      target: 'es2020',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 去除控制台打印语句
          drop_debugger: true, // 去除控制台打印语句
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: { target: 'es2020', supported: { bigint: true } },
    },
    resolve: {
      alias: [
        // 配置别名
        { find: '@', replacement: resolve(__dirname, 'src') },
        {
          find: '@antv/x6',
          replacement: '@antv/x6/dist/x6.js',
        },
        {
          find: '@antv/x6-vue-shape',
          replacement: '@antv/x6-vue-shape/lib',
        },
      ],
      // 情景导出 package.json 配置中的exports字段
      conditions: [],
      // 导入时想要省略的扩展名列表
      // 不建议使用 .vue 影响IDE和类型支持
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    css: {
      preprocessorOptions: {
        // 向 CSS 相关的 loader 传递选项
        less: {
          javascriptEnabled: true, // 允许链式调用的换行
        },
        scss: {
          additionalData: `@import "@/common/style/variables.scss";`,
        },
      },
    },
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      host: true,
      port: 8570,
      open: false, // 是否服务启动时自动打开浏览器
      cors: true, // 是否允许跨域
      proxy: proxy(env),
    },
  }
})
