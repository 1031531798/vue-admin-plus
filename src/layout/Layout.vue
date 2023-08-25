<template>
  <section class="layout flex flex-row">
    <aside class="layout-aside flex-shrink-0 basis-auto" :style="{width: asideWidth, minWidth: asideWidth}">
      <slot name="aside"></slot>
    </aside>
    <section class="layout-section flex flex-col flex-shrink-0 basis-auto" :style="{width: `calc(100% - ${asideWidth})`}">
      <header class="layout-header p-2">
        <slot name="header"></slot>
      </header>
      <main class="layout-section-body overflow-hidden grow p-2">
        <slot name="body"></slot>
      </main>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useSettingStore } from "@/store/modules/settings";
import { computed } from "vue";
const settingStore = useSettingStore()
const asideWidth = computed(() => {
  return settingStore.getMenuExpand ? settingStore.getSystemConfig.menuWidth + 'px' : '4rem'
})
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: $--bg-color;
  &-aside {
    transition: all .5s ease;
  }
}
</style>
