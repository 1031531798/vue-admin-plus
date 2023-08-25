import { requestDictByUrl } from "@/utils/dict";

export function useDict () {

  // 根据dictUrl 请求网络字典数据 直接赋值给col
  function setDictDataByUrl (columns: Recordable[]) {
    columns.forEach(col => {
      if (!col.dictData && col.type === 'select' && col.dictUrl) {
        requestDictByUrl({
          url: col.dictUrl,
          method: col.dictMethod || 'get',
          data: col.dicQuery?.data || {},
          params: col.dicQuery?.params || {}
        }).then(({data}) => {
          col.dictData = data
        })
      }
    })
  }
  return {
    setDictDataByUrl
  }
}
