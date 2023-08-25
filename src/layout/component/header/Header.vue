<template>
  <div
    class="header h-full flex flex-col text-gray-950 dark:text-white relative"
  >
    <div
      v-if="getSystemConfig.layoutMode === LayoutModeTypeEnum.classical"
      class="header-main flex flex-row justify-between items-center bg-white dark:bg-gray-950"
    >
      <div>
        <Icon
          v-if="layoutStore.layoutWidth > 600"
          class="ml-1 cursor-pointer"
          :icon="getMenuExpand ? 'ep:fold' : 'ep:expand'"
          size="30"
          @click="toggleMenuExpand"
        />
      </div>
      <div class="flex flex-row items-center h-full">
        <Notify />
        <User />
        <WebSetting />
      </div>
    </div>
    <WebSetting class="absolute right-0" v-else></WebSetting>
    <Tabs
      :class="{
        'mt-5': getSystemConfig.layoutMode === LayoutModeTypeEnum.classical,
        'mr-10': getSystemConfig.layoutMode === LayoutModeTypeEnum.top,
      }"
      v-if="getSystemConfig.showNavs"
    />
  </div>
</template>

<script setup lang="ts">
import Tabs from "@/layout/component/header/navBar/Tabs.vue";
import { Icon } from "@/components/Icon";
import User from "@/layout/component/header/components/User.vue";
import Notify from "@/layout/component/header/components/Notify.vue";
import WebSetting from "@/layout/component/header/components/WebSetting.vue";
import { useSettingStore } from "@/store/modules/settings";
import { toRef } from "vue";
import { useLayoutStore } from "@/store/modules/layout";
import { LayoutModeTypeEnum } from "@/enum/settingsEnum";

const { toggleMenuExpand, getSystemConfig } = useSettingStore();
const layoutStore = useLayoutStore();
const getMenuExpand = toRef(useSettingStore(), "getMenuExpand");
</script>

<style lang="scss" scoped>
.header {
  &-main {
    height: 50px;
  }
}
</style>
