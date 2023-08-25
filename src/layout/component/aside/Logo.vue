<template>
  <div
    class="layout-aside-logo flex flex-row items-center justify-items-start text-white"
    :style="{ minHeight: config.headerHeight + 'px' }"
  >
    <div class="flex-ac" style="min-width: 64px">
      <img :width="props.iconSize" :src="config.logoUrl" alt="logo" />
    </div>
    <h3 :style="{fontSize: props.fontSize + 'px'}">{{ config.projectName }}</h3>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from "@/store/modules/settings";
import { toRef } from "vue";
const props = defineProps<{
  iconSize?: number
  fontSize?: number
}>()
const settingStore = useSettingStore();
const config = toRef(settingStore, "systemConfig");
const expand = toRef(settingStore, "getMenuExpand");
</script>

<style lang="scss" scoped>
.layout-aside-logo {
  overflow: hidden;
  width: 100%;
  h3 {
    white-space: nowrap;
  }
}
</style>
