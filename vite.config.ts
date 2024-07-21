/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "node:url"
import path from "path"
import { defineConfig, loadEnv } from "vite"
import viteCompression from "vite-plugin-compression"
import { createHtmlPlugin } from "vite-plugin-html"
import mockDevServerPlugin from "vite-plugin-mock-dev-server"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import vueSetupExtend from "vite-plugin-vue-setup-extend"
import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import copyPlugin from "rollup-plugin-copy"
// 当前工作目录路径
const root: string = process.cwd()

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 环境变量
  const env = loadEnv(mode, root, "")
  return {
    base: env.VITE_PUBLIC_PATH || "/",
    plugins: [
      vue(),
      // vueJsx(),
      mockDevServerPlugin(),
      // vant 组件自动按需引入
      Components({
        dirs: ["src/components/common"],
        extensions: ["index.ts"],
        dts: "src/typings/components.d.ts",
        resolvers: [
          AntDesignVueResolver(),
          (componentName: string) => {
            if (componentName.startsWith("C")) {
              const _componentName = componentName.slice(1)
              const name =
                _componentName.charAt(0).toUpperCase() + _componentName.slice(1)
              return {
                name: name,
                from: "@/components/common/"
              }
            }
          }
        ]
      }),
      // svg icon
      createSvgIconsPlugin({
        // 指定图标文件夹
        iconDirs: [path.resolve(root, "src/icons/svg")],
        // 指定 symbolId 格式
        symbolId: "icon-[dir]-[name]"
      }),
      // 允许 setup 语法糖上添加组件名属性
      vueSetupExtend(),
      // 生产环境 gzip 压缩资源
      viteCompression(),
      // 注入模板数据
      createHtmlPlugin({
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || "false"
          }
        }
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/assets/styles/common.less";`,
          javascriptEnabled: true
        }
      }
    },
    server: {
      host: true,
      // 仅在 proxy 中配置的代理前缀， mock-dev-server 才会拦截并 mock
      // doc: https://github.com/pengzhanbo/vite-plugin-mock-dev-server
      proxy: {
        "^/api": {
          target: env.VITE_PROXY_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ""),
          configure: (proxy, options) => {
            proxy.on("proxyReq", function (proxyReq, req, res) {
              proxyReq.removeHeader("referer") //移除请求头---最主要是设置这个
              proxyReq.removeHeader("origin") //移除请求头---最主要是设置这个
              //proxyReq.setHeader('host','api.bilibili.com/') //添加请求头
            })
            proxy.on("proxyRes", function (proxyRes, req, res) {
              /*添加或删除响应头有两种写法，第一种是操作 proxyRes 参数*/
              // delete proxyRes.headers['set-cookie']
              // proxyRes.headers['cookie'] = '你的cookie,可以不用设置';
              //proxyRes.headers['set-cookie'] = '你的cookie,可以不用设置';
              /*第二种方法是操作 res 参数*/
              // res.removeHeader("Access-Control-Allow-Origin");
              // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
              // res.setHeader("Access-Control-Allow-Credentials", 'true');
              // res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, 		Authorization, Accept,X-Requested-With");
              // res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            })
          }
        }
      }
    },
    publicDir: "public",
    build: {
      copyPublicDir: true,
      outDir: "dist",
      assetsDir: "static",
      rollupOptions: {
        // output: {
        //   dir: "dist/manifesto-rsvp",
        //   chunkFileNames: "static/js/[name]-[hash].js",
        //   entryFileNames: "static/js/[name]-[hash].js",
        //   assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        // },
        plugins: [
          copyPlugin({
            targets: [
              // { src: "./MP_verify_rGzFIjsC0mMpEaiK.txt", dest: "dist/" },
              // { src: "./MP_verify_xbAr8gAeqj27R3ST.txt", dest: "dist/" },
              // { src: "./index.html", dest: "dist/" }
            ] // 将文件复制到 dist, vite会自动复制到dist目录
          })
        ]
      }
    },
    test: {}
  }
})
