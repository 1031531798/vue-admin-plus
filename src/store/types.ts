import { RouteRecordName } from "vue-router";
import { SystemConfig } from "@/config/types";
import { TabsItemProps } from "@/layout/types";
import { MenuDataItem } from "@/layout/component/aside/menuData";
import { LayoutModeTypeEnum } from "@/enum/settingsEnum";
import {DictItem} from "@/types/dict";

export type SettingType = {
  systemConfig: SystemConfig;
  menuExpand: boolean;
};
export type LayoutType = {
  navBars: Map<string, TabsItemProps>;
  menuList: MenuDataItem[];
  finishMenuRequest: boolean;
  layoutWidth: number;
  layoutHeight: number;
  cachePages: Set<string>
};
export type cacheType = {
  mode: string;
  name?: RouteRecordName;
};

export type UserStoreType = {
  userInfo: Partial<UserInfoProp>;
  dictAll: {
    [key: string]: DictItem[];
  },
  token: string;
};
// 用户信息类型
export type UserInfoProp = {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: string[];
  avatar?: string;
  clientId?: string;
  companyId?: string;
  credentialsNonExpired: boolean;
  deptId: string;
  deptIds: string;
  description: string;
  email: string;
  enabled: boolean;
  gender: string;
  host: string;
  id: string;
  ip: string;
  lastAccessTime: string;
  location: string;
  loginTime: string;
  mobile: string;
  name: string;
  phone: string;
  roleIds: string;
  sessionId: string;
  type: number;
  username: string;
};
