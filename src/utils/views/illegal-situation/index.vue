<template>
  <div class="view flex flex-col">
    <SearchForm v-model="searchData" :option="searchOption" @search="getList"></SearchForm>
    <BasicTable :register="register">
      <template #title>
        <div class="flex flex-row justify-between">
          <div class="text-2xl flex-ac">
            <Icon icon="icon-park:all-application" size="40"></Icon>
            <span class="ml-2">违章情况列表</span>
          </div>
        </div>
      </template>
      <template #menu="{row}">
        <div class="flex-ac">
          <IconButton icon="fluent:apps-list-detail-24-regular" type="info" label="详情" @action="handleDetail(row)"></IconButton>
        </div>
      </template>
    </BasicTable>
    <MainDialog ref="mainDialog" @reload="getList"></MainDialog>
  </div>
</template>

<script setup lang="ts">
import BasicTable from "@/components/Table";
import { useTable } from "@/hook/useTable";
import IconButton from "@/components/Button/IconButton.vue";
import MainDialog from "./MainDialog.vue";
import Icon from "@/components/Icon/src/Icon.vue";
import { useMessage } from "@/hook/useMessage";
import { onMounted, ref } from "vue";
import { deletesApi } from "./api";
import { tableOption, searchOption } from "./option";
import SearchForm from "@/components/Form/src/SearchForm.vue";
const {message, confirm} = useMessage()
const mainDialog = ref()

onMounted(() => {
  searchData.value.status = 1
})
const { register, searchData, getList } = useTable({
  api: "/rest/shipowner/tbDataIllegalSituation/getPage",
  options: tableOption,
});
function handleDetail (rowData: Recordable) {
  mainDialog.value?.open(rowData, "detail")
}
function handleDelete (rowData: Recordable) {
  confirm(`是否确定删除${rowData.name}?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deletesApi({id: rowData.id}).then(() => {
        getList()
        message("删除成功", {type: 'success'})
      })
    })
}

defineExpose({
  register,
});
</script>
