<template>
  <el-form-item
    :label="col.label"
    :prop="col.prop"
    :label-width="col.labelWidth || options.labelWidth"
  >
    <!--自定义组件 -->
    <component
      v-if="col.component"
      class="w-full"
      :is="col.component"
      :disabled="disabled"
      v-bind="col.prop"
    />
    <!--文本框 -->
    <el-input
      v-if="col.type === 'text' && !col.component"
      v-model="val"
      class="w-full"
      :placeholder="`请输入 ${col.label}`"
      :disabled="disabled"
      v-bind="col.props"
    ></el-input>
    <!--下拉框 -->
    <BasicSelect
      v-model="val"
      v-if="col.type === 'select' && !col.component"
      class="w-full"
      :dictData="col.dictData"
      :dictUrl="col.dictUrl"
      :dictMethod="col.dictMethod"
      :dictQuery="col.dictQuery"
      :disabled="disabled"
      v-bind="col.props"
      :placeholder="`请选择 ${col.label}`"
      :detail="false"
    ></BasicSelect>
    <!--日期-->
    <el-date-picker
      v-model="val"
      :disabled="disabled"
      style="width: 100%"
      :placeholder="`请选择 ${col.label}`"
      v-bind="col.props"
      v-if="col.type === 'date' && !col.component"
    />
    <!--插槽-->
    <slot v-if="col.slot && !col.component" :name="col.prop">
      <el-input
        v-model="val"
        class="w-full"
        :disabled="disabled"
        :placeholder="`请输入 ${col.label}`"
        v-bind="col.props"
      ></el-input>
    </slot>
  </el-form-item>
</template>

<script setup lang="ts">
import {
  BasicFormColumnProps,
  BasicFormOption,
} from "@/components/Form/src/types";
import BasicSelect from "@/components/Select/BasicSelect.vue";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  formData: Recordable;
  modelValue: Recordable;
  col: BasicFormColumnProps;
  options: BasicFormOption;
  disabled: boolean;
}>();
const emits = defineEmits(["update:modelValue"]);
const val = useVModel(props, 'modelValue', emits)

</script>

<style scoped></style>
