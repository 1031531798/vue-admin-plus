<template>
  <Layout v-resize="layoutResize">
    <template #aside>
      <ASide />
    </template>
    <template #header>
      <Header />
    </template>
    <template #body>
      <router-view v-if="hasShowView">
        <template #default="{ Component, route }">
          <transition
            v-if="settings.getSystemConfig.transition"
            name="transition-class"
            enterActiveClass="animate__animated animate__fadeInLeft"
            leaveActiveClass="animate__animated animate__fadeOutRight"
            mode="out-in"
            appear
          >
            <KeepAlive :include="getKeepAliveList">
              <component :is="Component" />
            </KeepAlive>
          </transition>
          <KeepAlive v-else :include="getKeepAliveList">
            <component :is="Component" />
          </KeepAlive>
        </template>
      </router-view>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/layout/Layout.vue";
import ASide from "@/layout/component/aside/ASide.vue";
import Header from "@/layout/component/header/Header.vue";
import { useLayoutStore } from "@/store/modules/layout";
import {
  computed,
  onMounted, ref,
  toRef
} from "vue";
import { isEmpty } from "@/utils/is";
import { useSettingStore } from "@/store/modules/settings";
import { useUserStore } from "@/store/modules/user";
import { useRoute, useRouter } from "vue-router";
const menuList = toRef(useLayoutStore(), "getMenuList");
const settings = useSettingStore();
const layoutStore = useLayoutStore();
const { setUserInfo } = useUserStore();
const route = useRoute()
const router = useRouter()
const keepAliveRoutes = ref(new Set())
onMounted(() => {
  // 获取用户信息
  setUserInfo();
});
// 获取 keepAlive include数据
const getKeepAliveList = computed(() => {
  return layoutStore.getCachePages
})
const hasShowView = computed(() => {
  return !isEmpty(menuList.value);
});

function layoutResize(el: HTMLDivElement) {
  const { offsetWidth, offsetHeight } = el;
  if (offsetWidth < 600 && offsetWidth !== 0) {
    settings.menuExpand = false
  }
  layoutStore.layoutWidth = offsetWidth;
  layoutStore.layoutHeight = offsetHeight;
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>
