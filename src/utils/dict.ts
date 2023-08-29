import { request } from "@/utils/http";
import { CreateAxiosOptions } from "@/utils/http/axiosTransform";
import { useUserStore } from "@/store/modules/user";

export type RequestDictProp = {
  url: string
  method: 'post' | 'get'
  params: Recordable
  data: Recordable
}
export function requestDictByUrl(prop: Partial<CreateAxiosOptions>) {
  return request.request(prop)
}

/*
* 获取字典数据
* */
export function getDictData (name: string) {
  const { dictAll} = useUserStore()
  const dict = name ? dictAll[name] : undefined
  return dict || []
}
