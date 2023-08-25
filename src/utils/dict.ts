import { request } from "@/utils/http";
import { CreateAxiosOptions } from "@/utils/http/axiosTransform";

export type RequestDictProp = {
  url: string
  method: 'post' | 'get'
  params: Recordable
  data: Recordable
}
export function requestDictByUrl(prop: Partial<CreateAxiosOptions>) {
  return request.request(prop)
}
