<template>
  <div class="view flex flex-col">
    <SearchForm v-model="searchData" :option="searchOption" @search="getList"></SearchForm>
    <BasicTable :register="register">
      <template #title>
        <div class="flex flex-row justify-between">
          <div class="text-2xl flex-ac">
            <Icon icon="icon-park:all-application" size="40"></Icon>
            <span class="ml-2">企业列表</span>
          </div>
          <el-button class="mr-5" type="primary" @click="handleCreate">新增</el-button>
        </div>
      </template>
      <template #menu="{row}">
        <div class="flex-ac">
          <IconButton icon="material-symbols:edit-note" label="编辑" @action="handleUpdate(row)"></IconButton>
          <IconButton icon="fluent:apps-list-detail-24-regular" type="info" label="详情" @action="handleDetail(row)"></IconButton>
          <IconButton icon="material-symbols:delete-outline" type="danger" label="删除" @action="handleDelete(row)"></IconButton>
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
import MainDialog from "@/views/enterprise-manage/MainDialog.vue";
import { ref } from "vue";
import Icon from "@/components/Icon/src/Icon.vue";
import { useMessage } from "@/hook/useMessage";
import { deleteEnterpriseApi } from "./api";
import { searchOption, tableOption } from "./option";
import SearchForm from "@/components/Form/src/SearchForm.vue";
const {message, confirm} = useMessage()
const mainDialog = ref()

const { register, searchData, getList } = useTable({
  api: "/rest/shipowner/shipownerEnterprise/getPage",
  options: tableOption,
});
function handleCreate () {
  mainDialog.value?.open({}, "create")
}
function handleUpdate (rowData: Recordable) {
  mainDialog.value?.open(rowData, "update")
}
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
      deleteEnterpriseApi({id: rowData.id}).then(() => {
        getList()
        message("删除成功", {type: 'success'})
      })
    })
}

defineExpose({
  register,
});
</script>
