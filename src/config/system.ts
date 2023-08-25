import { CacheTypeEnum } from "@/enum/cacheEnum";
import { SystemConfig } from "@/config/types";
import { useDark } from "@vueuse/core";
import logoImage from "/public/logo.png?url";
import { LayoutModeTypeEnum, NavsTypeEnum } from "@/enum/settingsEnum";

const isDark = useDark()
const systemSettings: SystemConfig = {
  projectName: import.meta.env.VITE_APP_TITLE,
  publicPrefixCls: import.meta.env.VITE_APP_PREFIX,
  defaultPage: "/welcome",
  cacheType: CacheTypeEnum.SESSION,
  logoUrl: logoImage,
  cacheCipher: {
    key: "_11111000001111@",
    iv: "@11111000001111_",
    cacheTimeOut: 864000
  },
  menuWidth: 240,
  headerHeight: 50,
  // 路由数据参数配置
  menuProps: {
    name: "menuName",
    path: "path",
    children: "children",
    meta: "meta",
    icon: "icon"
  },
  colorMode: isDark.value,
  grayMode: false, // 暗黑模式
  weaknessMode: false, // 色弱模式
  showNavs: true, // 隐藏标签页
  navsType: NavsTypeEnum.flat, // 标签页类型
  layoutMode: LayoutModeTypeEnum.top, // 布局模式
  transition: true, // 是否开启过渡动画
}
export default systemSettings;
