import Layout from "@/layout/index.vue";
import { RouteRecordRaw } from "vue-router";
import systemSettings from "@/config/system";

const viewsRoute: RouteRecordRaw[] = [
  // 首页
  {
    path: "/",
    name: "HomeLayout",
    component: Layout,
    redirect: systemSettings.defaultPage,
    children: [
    ],
  },
  // 登录页
  {
    path: "/login",
    name: "Login",
    component: () => import("@/layout/login/index.vue"),
  },
  // 刷新缓冲页面
  {
    path: "/redirect",
    component: Layout,
    meta: {
      icon: "homeFilled",
      title: '缓冲页',
      isTab: false,
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue"),
      }
    ]
  },
];
// 未配置在菜单中的视图页面
export default viewsRoute;
