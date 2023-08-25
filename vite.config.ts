import {ConfigEnv, loadEnv, UserConfigExport} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import {wrapperEnv} from "./build";
import {createProxy} from "./build/proxy";
import {createAlias} from "./build/alias";
import Icons from 'unplugin-icons/vite';
import svgLoader from "vite-svg-loader";
import { createHtmlPlugin } from 'vite-plugin-html'

/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd();
export default ({ mode }: ConfigEnv): UserConfigExport => {
  // 获取环境变量
  const { VITE_PORT, VITE_APP_API_URL,VITE_OUT_DIR, VITE_PUBLIC_PATH, VITE_APP_TITLE } =
      wrapperEnv(loadEnv(mode, root));
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      // 设置别名
      alias: createAlias([
        ['@/', 'src'],
        ['#/', 'types'],
      ]),
    },
    // 服务端渲染
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      host: "0.0.0.0",
      // 设置代理
      proxy: createProxy(VITE_APP_API_URL)
    },
    plugins: [
      vue(),
      // svg组件化支持
      svgLoader(),
      vueSetupExtend(),
      Icons({
        autoInstall: true,
      }),
      // html模板插件
      createHtmlPlugin({
        inject: {
          data: {
            title: VITE_APP_TITLE
          }
        }
      })
    ],
    build: {
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      outDir: VITE_OUT_DIR,
    },
    // 预处理变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variable.scss";`,
        },
      },
    },
    // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
    define: {
    }
  };
};
