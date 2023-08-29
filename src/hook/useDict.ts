import { requestDictByUrl } from "@/utils/dict";

type DictRequestProp = {
  prop: string;
  dictUrl: string;
  dictMethod?: string;
  dictQuery?: {data?: Recordable, params?: Recordable};
}
export function useDict () {
  const dictMap = new Map()

  function getDictByProp (prop: string) {
    return dictMap.get(prop)
  }
  // 请求网络字典数据
  function requestDict (col: DictRequestProp) {
    return requestDictByUrl({
      url: col.dictUrl,
      method: col.dictMethod || 'get',
      data: col?.dictQuery?.data || {},
      params: col?.dictQuery?.params || {}
    }).then(({data}) => {
      dictMap.set(col.prop, data)
    })
  }

  // 根据dictUrl 请求网络字典数据 直接赋值给col
  function setDictDataByColumns (columns: Recordable[]) {
    columns.forEach(col => {
      if (!col.dictData && col.type === 'select' && col.dictUrl) {
        !dictMap.has(col.prop) && requestDictByUrl({
          url: col.dictUrl,
          method: col.dictMethod || 'get',
          data: col.dictQuery?.data || {},
          params: col.dictQuery?.params || {}
        }).then(({data}) => {
          col.dictData = data
          dictMap.set(col.prop, data)
        })
      }
    })
  }
  return {
    dictMap,
    getDictByProp,
    requestDict,
    setDictDataByColumns
  }
}
