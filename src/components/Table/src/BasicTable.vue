<template>
  <div class="basic-el-table flex flex-col flex-grow w-full h-0">
    <div class="basic-table-title h-10 text-2xl p-2 bg-white dark:bg-black">
      <slot name="title">
        <div>
          <span class="p-2">{{props.title}}</span>
        </div>
      </slot>
    </div>
    <el-table :class="getTableClass" :data="getTableData" :style="{width: register.options.width || '100%'}" v-loading="loading" :border="getOptions.border" v-bind="attrs">
      <el-table-column :prop="column.prop" :label="column.label" :width="column.width || ''" v-for="column in columns" :key="column.prop"  :align="column.align || getOptions.align" v-bind="column">
        <template  #default="{row}">
          <slot v-if="column.slot" :name="column.prop" :row="row"></slot>
          <Column v-else-if="column.type !== 'text'" :row="row" :column="column" :options="getOptions" />
        </template>
      </el-table-column>
      <template #empty>
        <div class="flex justify-center items-center h-full">
          <el-empty description="暂无数据" />
        </div>
      </template>
    </el-table>
    <BasicPagination :pagination="getPagination" @size-change="sizeChange" @currentChange="currentChange" />
  </div>
</template>

<script setup lang="ts">
import { BasicTableOptions } from "@/components/Table/src/types";
import { computed, onMounted, ref, useAttrs, useSlots } from "vue";
import { PaginationProps } from "element-plus";
import BasicPagination from "@/components/Pagination/BasicPagination.vue";
import { UseTableRegisterProps } from "@/hook/useTable";
import Column from "@/components/Table/src/Column.vue";
import { getTableDefaultOption } from "@/components/Table/src/utils";
import { requestDictByUrl } from "@/utils/dict";

const props = defineProps<{
  register: () => UseTableRegisterProps<any>;
  options?: BasicTableOptions;
  data?: Recordable[];
  title?: string;
  pagination?: PaginationProps & {currentChange?: () => void, sizeChange?: () => void};
}>()
// 初始化参数
const register = props.register()
const dictMap = ref({})
const getPagination = computed((): PaginationProps & {currentChange?: () => void, sizeChange?: () => void} => {
  return props.pagination || register.pagination
})
const getOptions = computed(() => {
  return getTableDefaultOption(props.options || register.options)
})
const columns = computed(() => {
  return getOptions.value.columns
})
const getTableData = computed(() => {
  return register.data.value || props.data
})
const loading = computed(() => {
  return register.loading.value
})

const attrs = useAttrs()
const slots: any = useSlots()
// 变更当前页回调
function currentChange () {
  const changeFn = getPagination.value.currentChange
  changeFn && changeFn()
}
// 变更当前页数回调
function sizeChange () {
  const changeFn = getPagination.value.sizeChange
  changeFn && changeFn()
}
// 获取table class
const getTableClass = computed(() => {
  return getOptions.value.full ? 'flex flex-col flex-grow h-0' : ''
})
onMounted(() => {
  getDictMap()
})
function getDictMap () {
  columns.value.forEach(col => {
    if (!col.dictData && col.type === 'select' && col.dictUrl) {
      requestDictByUrl({
        url: col.dictUrl,
        method: col.dictMethod || 'get',
        data: col.dictQuery?.data || {},
        params: col.dictQuery?.params || {}
      }).then(({data}) => {
        col.dictData = data
      })
    }
  })
}
</script>

<style scoped>

</style>
