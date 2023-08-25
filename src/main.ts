import { createApp, Directive } from "vue";
import App from './App.vue'
import router from "./router";
import { setupStore } from "@/store";
import ElementPlus from "element-plus"
import { MotionPlugin } from "@vueuse/motion";
import 'animate.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'
import "@/styles/tailwind.css"
import "element-plus/dist/index.css";

const app = createApp(App)
app.use(ElementPlus)

// 自定义指令
import * as directives from "@/directives";

Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

app.use(router)
app.use(MotionPlugin)

setupStore(app);

app.mount('#app')
