<template>
  <el-button v-bind="attrs" @click="importTable" :loading="importLoading">
    <template #icon v-if="icon">
      <Icon :icon="icon" />
    </template>
    {{label || '导入'}}
  </el-button>
</template>

<script setup lang="ts">
import { openFileSelect } from "@/utils/file";
import { ref, useAttrs } from "vue";
import { useMessage } from "@/hook/useMessage";
import { request } from "@/utils/http";
import Icon from "@/components/Icon/src/Icon.vue";

type ImportButtonProps = {
  api: string
  label?: string
  icon?: string
  requestData?: Recordable
  requestQuery?: Recordable
}
const props = defineProps<ImportButtonProps>()
const emits = defineEmits(['confirm'])
const attrs = useAttrs()
const importLoading = ref(false);
const {message} = useMessage()

// 导入
function importApi (data: FormData) {
  return request.post({
    url: props.api,
    data
  })
}
function importTable () {
  importLoading.value = true;
  openFileSelect().then((data) => {
    const formData = new FormData();
    data && formData.append("file", data[0]);
    importLoading.value = true
    importApi(formData).then(() => {
      message("导入成功", { type: "success" });
      emits('confirm')
    }).finally(() => {
      importLoading.value = false
    })
  });
}
</script>

<style scoped>

</style>