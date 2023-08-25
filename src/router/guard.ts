import { RouteComponent, RouteLocationNormalized, Router } from "vue-router";
import { useLayoutStore } from "@/store/modules/layout";
import { dynamicAddRoute } from "@/router/dynamicRouter";
import { MenuDataItem } from "@/layout/component/aside/menuData";
import { useUserStore } from "@/store/modules/user";
import { PageEnum } from "@/enum/pageEnum";

export function registerGuard(router: Router) {
  // 全局前置守卫
  router.beforeEach(async (to, from, next) => {
    const { getMenuList, actionMenuData } = useLayoutStore();
    const { getToken } = useUserStore();
    console.log(to);
    if (getToken) {
      // 请求菜单数据
      if (!getMenuList.length) {
        await actionMenuData();
        const {menuList} = useLayoutStore()
        dynamicAddRoute(menuList);
        return next({ ...to, replace: true });
      } else {
        return next();
      }
    } else if (to.path !== PageEnum.BASE_LOGIN) {
      return next({ path: PageEnum.BASE_LOGIN });
    }
    return next()
  });
  // 全局解析守卫
  router.beforeResolve(async (to) => {
    const { meta } = to;
    // 设置缓存页面
    if (meta.keepAlive) {
      setKeepAliveIncludes(to)
    }
    if (meta.isTab) {
      // 添加导航栏
      const { addNavBar } = useLayoutStore();
      addNavBar({
        name: to.name as string,
        path: to.path,
      });
    }
  });
}
// 设置缓存页面方法
function setKeepAliveIncludes (route: RouteLocationNormalized) {
  const layoutStore = useLayoutStore()
  if (route.meta.keepAlive) {
    const { matched } = route
    const component = matched.slice(-1)[0].components as Record<string, RouteComponent>
    layoutStore.setCachePages(component.default.name as string)
    console.log(component);
  }
}
