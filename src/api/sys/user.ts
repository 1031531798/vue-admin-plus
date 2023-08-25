// 修改密码
import { request } from "@/utils/http";

// 修改密码
export function changeUserPassword (data: Recordable) {
  return request.post({
    url: '/rest/auth/changePassword',
    data
  })
}
