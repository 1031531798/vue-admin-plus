<template>
  <div
    @click="openSetting"
    class="layout-header-setting cursor-pointer flex-ac pl-2 pr-2 h-full hover:bg-gray-100 dark:hover:bg-gray-800"
  >
    <Icon icon="ep:setting" size="22" />
    <el-drawer
      v-model="showSetting"
      size="400px"
      title="全局设置"
      direction="rtl"
    >
      <div class="flex flex-col h-full justify-start">
        <div class="flex flex-col justify-start items-center flex-grow">
          <el-divider> 主题 </el-divider>
          <DarkSwitch />
          <el-divider>布局模式</el-divider>
          <el-radio-group v-model="getSystemConfig.layoutMode">
            <el-radio :label="LayoutModeTypeEnum.classical" size="large" border>经典</el-radio>
            <el-radio :label="LayoutModeTypeEnum.top" size="large" border>置顶</el-radio>
          </el-radio-group>
          <el-divider>界面显示</el-divider>
          <ul class="view-settings">
            <li>
              <span class="dark:text-white">灰色模式</span>
              <el-switch
                v-model="getSystemConfig.grayMode"
                inline-prompt
                @change="greyChange"
                active-text="开"
                inactive-text="关"
              />
            </li>
            <li>
              <span class="dark:text-white">色弱模式</span>
              <el-switch
                v-model="getSystemConfig.weaknessMode"
                inline-prompt
                @change="weaknessChange"
                active-text="开"
                inactive-text="关"
              />
            </li>
            <li>
              <span class="dark:text-white">路由过渡动画</span>
              <el-switch
                v-model="getSystemConfig.transition"
                @change="setSetting"
                inline-prompt
                active-text="开"
                inactive-text="关"
              />
            </li>
            <li>
              <span class="dark:text-white">标签栏</span>
              <el-switch
                v-model="getSystemConfig.showNavs"
                @change="setSetting"
                inline-prompt
                active-text="开"
                inactive-text="关"
              />
            </li>
            <li>
              <span class="dark:text-white">标签栏模式</span>
              <el-radio-group v-model="getSystemConfig.navsType" @change="setSetting">
                <el-radio-button :label="NavsTypeEnum.flat" name="扁平">扁平</el-radio-button>
                <el-radio-button :label="NavsTypeEnum.card">卡片</el-radio-button>
              </el-radio-group>
            </li>
            <li>
              <span class="dark:text-white">菜单宽度</span>
              <el-input-number
                v-model="getSystemConfig.menuWidth"
                :min="200"
                :max="500"
                :step="10"
                controls-position="right"
                style="width: 120px"
                @change="setSetting"
              />
            </li>
          </ul>

        </div>
        <div>
          <el-button type="warning" class="w-full" @click="resetStorage">清空所有缓存并退出</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {Icon} from "@/components/Icon";
import DarkSwitch from "@/components/DarkSwitch/index.vue";
import { onMounted, ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useSettingStore } from "@/store/modules/settings";
import { storeToRefs } from "pinia";
import { useSetting } from "@/hook/useSetting";
import { LayoutModeTypeEnum, NavsTypeEnum } from "@/enum/settingsEnum";
import { useUserStore } from "@/store/modules/user";
const settings = useSettingStore();
const { greyChange, weaknessChange } = useSetting();
const userStore = useUserStore()
const { getSystemConfig } = storeToRefs(settings);
const {setSetting} = settings

const showSetting = ref<boolean>(false);
const isDark = useDark();
const toggleColor = useToggle(isDark);
onMounted(() => {
  // 初始化颜色模式
  toggleColor(!settings.getSystemConfig.colorMode);
  // 初始化灰色模式
  greyChange(settings.getSystemConfig.grayMode)
  // 初始化色弱模式
  weaknessChange(settings.getSystemConfig.weaknessMode)
});
function resetStorage () {
  localStorage.clear();
  sessionStorage.clear();
  userStore.logOut()
}
function openSetting() {
  showSetting.value = true;
}
</script>

<style lang="scss" scoped>
.view-settings {
  width: 100%;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px;
  }
}
</style>
