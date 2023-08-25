import { request } from "@/utils/http";

const BASE_URL = "/rest/shipowner/shipownerEnterprise"
// 新增船东协会 企业表
export function addEnterpriseApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/add`,
    data
  });
}

// 修改
export function updateEnterpriseApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/update`,
    data
  });
}
// 删除船东协会企业
export function deleteEnterpriseApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/delete`,
    data
  });
}
// 详情
export function detailEnterpriseApi(data: Recordable) {
  return request.post({
    url: `${BASE_URL}/getDetail`,
    data
  });
}
