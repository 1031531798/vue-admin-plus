<template>
  <el-menu
    :default-active="getCurrentRoute"
    style="border: none; width: 100%"
    class="layout-aside-menu h-full overflow-y-auto"
    active-text-color="#fff"
    :collapse-transition="false"
    :collapse="getMenuCollapse"
    background-color="var(--menu-bg-color)"
    text-color="rgba(255,255,255,0.7)"
    router
    v-loading="loading"
    element-loading-background="transparent"
  >
    <MenuItem v-for="item in menuData" :key="item.id" :menu="item"></MenuItem>
  </el-menu>
</template>

<script setup lang="ts">
import "./menu.scss";
import MenuItem from "@/layout/component/aside/MenuItem.vue";
import { computed, ref, toRef } from "vue";
import { useRouter } from "vue-router";
import { useSettingStore } from "@/store/modules/settings";
import { MenuDataItem } from "@/layout/component/aside/menuData";
import { MenuDataTypeEnum } from "@/enum/settingsEnum";
import { useLayoutStore } from "@/store/modules/layout";
const router = useRouter();
const { getSystemConfig } = useSettingStore();
const { menuProps } = getSystemConfig;
const getMenuExpand = toRef(useSettingStore(), "getMenuExpand");
const layoutStore = useLayoutStore()
const getCurrentRoute = computed(() => {
  return router.currentRoute.value.fullPath;
});
const getMenuCollapse = computed(() => {
  return !getMenuExpand.value;
});
const menuData = computed(() => {
  return clearBottomMenu(layoutStore.getMenuList)
})
// 清除权限菜单
function clearBottomMenu (menu: MenuDataItem[]) {
  const list: MenuDataItem[] = []
  menu.forEach(item => {
    const menuData: MenuDataItem = {...item}
    if (menuData[menuProps.children]) {
      menuData.children = clearBottomMenu(menuData.children)
    }
    ![MenuDataTypeEnum.button].includes(menuData.type) && list.push(menuData)
  })
  return list
}
const loading = ref<boolean>(false);
</script>

<style lang="scss" scoped>
:deep .el-sub-menu.is-active {
  svg {
    color: var(--el-color-primary);
  }
}
</style>
