<template>
  <div class="view flex">
    <BasicTable :register="register"></BasicTable>
  </div>
</template>

<script setup lang="ts">
import BasicTable from "@/components/Table";
import { BasicTableOptions } from "@/components/Table/src/types";
import { useTable } from "@/hook/useTable";
type MenuApiData = {
  name: string;
  type: string;
  icon: string;
  path: string;
};
const tableOptions: BasicTableOptions = {
  border: true,
  align: 'center',
  height: "100%",
  stripe: true,
  columns: [
    {
      label: "菜单名称",
      prop: "menuName",
    },
    {
      label: "菜单类型",
      prop: "type",
    },
    {
      label: "菜单路径",
      prop: "path",
    },
    {
      label: "菜单权限",
      prop: "permissions",
    },
    {
      label: "排序",
      prop: "sort",
    },
    {
      label: "路由缓存",
      prop: "keepAlive",
      type: "select",
      dictData: [
        { label: "缓存", value: 0 },
        { label: "不缓存", value: 1 },
      ],
    },
    {
      label: "操作",
      prop: "menu",
      width: 250,
      slot: true,
    },
  ],

};

const { register, setData, setLoading } = useTable<MenuApiData>({
  api: "/rest/sys/menu/getMenuList",
  options: tableOptions,
});
setLoading(true);
setTimeout(() => {
  setLoading(false);
}, 3000);
defineExpose({
  register,
});
</script>
