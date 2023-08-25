<template>
  <div
    class="aside w-full h-full flex flex-col"
    style="background-color: var(--menu-bg-color)"
  >
    <Logo class="mb-2" :iconSize="40" style="background-color: var(--menu-bg-color)" />
    <UserBox v-if="getSystemConfig.layoutMode === LayoutModeTypeEnum.top" />
    <Menu />
    <div
      class="flex flex-row items-center bg-white border-2 h-10 mt-2 mb-2 text-white cursor-pointer"
      @click="toggleMenuExpand"
      style="
        background-color: var(--menu-bg-color);
        padding-left: var(--el-menu-base-level-padding);
      "
      v-if="getSystemConfig.layoutMode === LayoutModeTypeEnum.top"
    >
      <Icon
        class="ml-1 cursor-pointer min-w-fit"
        :icon="getMenuExpand ? 'ep:fold' : 'ep:expand'"
        size="30"
      />
      <span class="ml-2 whitespace-nowrap" v-show="getMenuExpand">收起侧边栏</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { useSettingStore } from "@/store/modules/settings";
import Menu from "@/layout/component/aside/Menu.vue";
import Logo from "@/layout/component/aside/Logo.vue";
import { Icon } from "@/components/Icon";
import { LayoutModeTypeEnum } from "@/enum/settingsEnum";
import UserBox from "@/layout/component/aside/UserBox.vue";

const { getSystemConfig } = useSettingStore();
const { toggleMenuExpand } = useSettingStore();
const getMenuExpand = toRef(useSettingStore(), "getMenuExpand");
</script>

<style lang="scss" scoped>
.aside {
}
</style>
