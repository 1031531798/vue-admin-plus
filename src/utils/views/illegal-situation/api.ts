import { request } from "@/utils/http";

const BASE_URL = "/rest/shipowner/tbDataIllegalSituation"
// 新增
export function addApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/add`,
    data
  });
}

// 修改
export function updateApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/update`,
    data
  });
}
// 删除船东协会企业
export function deletesApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/delete`,
    data
  });
}
// 详情
export function detailApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/getDetail`,
    data
  });
}
