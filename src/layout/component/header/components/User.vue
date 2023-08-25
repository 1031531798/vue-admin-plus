<template>
  <el-dropdown class="layout-header-user h-full" trigger="click">
    <div
      class="pl-2 pr-2 flex flex-row items-center h-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <el-avatar :src="userInfo.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" :size="24" />
      <span class="ml-2">{{userInfo.username}}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logOut">
          <Icon class="mr-2" icon="material-symbols:exit-to-app" />
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { PageEnum } from "@/enum/pageEnum";
import { Icon } from "@/components/Icon";
import { useUserStore } from "@/store/modules/user";
import { toRef } from "vue";
const router = useRouter();
const userInfo = toRef(useUserStore(), 'userInfo')
const avatarSrc = "https://avatars.githubusercontent.com/u/44080404?v=4";
function logOut() {
  localStorage.clear();
  sessionStorage.clear();
  router.replace(PageEnum.BASE_LOGIN);
}
</script>

<style lang="scss" scoped>
.layout-header-user {
  font-size: 14px;
  transition: all 0.3s;
}
</style>
