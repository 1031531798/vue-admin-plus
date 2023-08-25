import { CacheTypeEnum } from "@/enum/cacheEnum";
import { LayoutModeTypeEnum, NavsTypeEnum } from "@/enum/settingsEnum";

export interface SystemConfig {
  projectName: string;
  publicPrefixCls: string | undefined;
  defaultPage: string;
  logoUrl: string,
  cacheType: CacheTypeEnum;
  cacheCipher:{ key: string; iv: string, cacheTimeOut: number },
  socketUrl?: string;
  headerHeight: string | number;
  menuWidth: string | number;
  menuProps: MenuPropsType
  colorMode: boolean;
  grayMode: boolean;
  weaknessMode: boolean;
  showNavs: boolean;
  navsType: NavsTypeEnum
  layoutMode: LayoutModeTypeEnum;
  transition: boolean;
}

export interface MenuPropsType {
  children: string;
  name: string;
  path: string;
  meta: string;
  icon: string;
}
