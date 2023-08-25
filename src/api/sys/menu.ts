import { request } from "@/utils/http";

// 获取用户菜单树
export function getMenuList() {
  return request.post({
    url: "/rest/sys/user/getMenu",
  });
}
