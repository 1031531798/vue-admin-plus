import { BasicTableOptions } from "@/components/Table/src/types";
import { onMounted, reactive, Ref, ref, ShallowRef, shallowRef, unref, watch } from "vue";
import { PaginationProps } from "element-plus";
import { request } from "@/utils/http";

type UseTableConfig = {
  api: string;
  apiHandler?: (data: Recordable[]) => void;
  options: BasicTableOptions;
  pagination?: PaginationProps;
};
export type UseTableRegisterProps<T> = {
  options: BasicTableOptions;
  data: ShallowRef<T[]>;
  pagination: PaginationProps & {
    currentChange?: () => void;
    sizeChange?: () => void;
  };
  loading: Ref<boolean>;
};
interface UseTableReturn<T> {
  register: () => UseTableRegisterProps<T>;
  getData: () => T[];
  setData: (data: T[]) => void;
  setLoading: (data: boolean) => void;
  getList: VoidFunction
  searchData: Ref
}
export function useTable<T extends object>(
  config: UseTableConfig
): UseTableReturn<T> {
  const { api } = config;
  const searchData = ref({})
  // 使用shallowRef 不对数据进行深度监听 优化性能
  const tableData = shallowRef<T[]>([]);
  let pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    pageSizes: [10, 20, 30, 40, 50],
    sizeChange: getList,
    currentChange: getList
  });
  const loading = ref<boolean>(false);
  const apiRequest = (data: Recordable = {}) => {
    loading.value = true;
    return request
      .post({
        url: api,
        data: data,
        params: {
          pageIndex: pagination.currentPage,
          pageSize: pagination.pageSize,
        },
      })
      .then(({ data }) => {
        setData(data.rows);
        pagination.total = data.total
      })
      .finally(() => {
        loading.value = false;
      });
  };
  // 请求表格数据
  function getList  (data: Recordable = {}) {
    api && apiRequest({...searchData.value, ...data});
  }
  onMounted(() => {
    getList()
  })
  // 注入表格
  const register = () => {
    pagination = Object.assign(pagination, config.pagination);
    return {
      options: config.options,
      data: tableData,
      pagination: pagination as unknown as PaginationProps,
      loading,
    };
  };

  // 获取表格数据
  const getData = () => {
    return unref(tableData.value);
  };

  const setData = (data: T[]) => {
    tableData.value = data;
  };
  const setLoading = (data: boolean) => {
    loading.value = data;
  };
  return { register, getData, setData, setLoading, getList, searchData };
}
