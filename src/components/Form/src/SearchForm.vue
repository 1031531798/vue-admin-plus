<template>
  <el-card class="flex flex-row p-2 mb-2" style="overflow-x: auto" body-style="width: 100%">
    <BasicForm ref="formRef" v-model="searchData" :option="option">
      <template #menu>
        <div class="flex flex-row justify-end items-start ml-4">
          <slot name="footer">
            <div>
              <el-button type="primary" @click="handleSearch">
                <template #icon>
                  <Icon icon="material-symbols:search" />
                </template>
                <span>搜索</span>
              </el-button>
              <el-button @click="handleReset">
                <template #icon>
                  <Icon icon="material-symbols:refresh" />
                </template>
                <span>重置</span>
              </el-button>
            </div>
          </slot>
        </div>
      </template>
    </BasicForm>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BasicFormMethods, BasicFormOption } from "@/components/Form/src/types";
import BasicForm from "@/components/Form/src/BasicForm.vue";
import Icon from "@/components/Icon/src/Icon.vue";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: Recordable;
  option: Partial<BasicFormOption>;
}>();
const formRef = ref<BasicFormMethods>()
const emits = defineEmits(['update:modelValue', 'search'])
const searchData = useVModel(props, 'modelValue', emits)
// 搜索
function handleSearch () {
  emits('search', searchData.value)
}
// 重置
function handleReset () {
  formRef.value?.resetForm()
}
</script>

<style scoped>

</style>
