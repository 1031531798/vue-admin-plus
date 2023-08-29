import { BasicTableOptions } from "@/components/Table/src/types";
import {
  onMounted,
  reactive,
  Ref,
  ref,
  ShallowRef,
  shallowRef,
  unref,
} from "vue";
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
  getList: (data?: Recordable, query?: Recordable) => void;
  searchData: Ref<Recordable>;
  searchQuery: Ref<Recordable>;
}
export function useTable<T extends object>(
  config: UseTableConfig
): UseTableReturn<T> {
  const { api, apiHandler } = config;
  const searchData = ref({});
  const searchQuery = ref({});
  // 使用shallowRef 不对数据进行深度监听 优化性能
  const tableData = shallowRef<T[]>([]);
  let pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    pageSizes: [10, 20, 30, 40, 50],
    sizeChange: getList,
    currentChange: getList,
  });
  const loading = ref<boolean>(false);
  const apiRequest = async (data: Recordable = {}, query: Recordable = {}) => {
    loading.value = true;
    try {
      const { data: dataBody } = await request.post({
        url: api,
        data: data,
        params: {
          pageIndex: pagination.currentPage,
          pageSize: pagination.pageSize,
          ...query,
        },
      });
      const apiData = apiHandler ? apiHandler(dataBody) : dataBody.rows;
      setData(apiData);
      pagination.total = dataBody.total;
    } finally {
      loading.value = false;
    }
  };
  // 请求表格数据
  function getList(data: Recordable = {}, query: Recordable = {}) {
    api &&
      apiRequest(
        { ...searchData.value, ...data },
        { ...searchQuery.value, ...query }
      );
  }
  onMounted(() => {
    getList();
  });
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
  return {
    register,
    getData,
    setData,
    setLoading,
    getList,
    searchData,
    searchQuery,
  };
}
