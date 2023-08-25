<template>
  <div class="basic-select">
    <el-select v-model="data" v-bind="attrs" v-if="!detail">
      <el-option
        v-for="item in getOptionList"
        :key="item[getPropsOption.value]"
        :value="item[getPropsOption.value]"
        :label="item[getPropsOption.label]"
        @click="optionClick(item)"
      >
      </el-option>
      <slot></slot>
    </el-select>
    <span v-else>{{ getDetailText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs } from "vue";
import { DictItem } from "@/types/dict";
import { useVModel } from "@vueuse/core";
import { useDict } from "@/hook/useDict";

const props = defineProps<{
  modelValue: number | string;
  dictData?: Recordable;
  dictUrl?: string;
  dictQuery?: {data? : Recordable, params?: Recordable}
  dictMethod?: string;
  detail: boolean;
  propsOption?: { value: string; label: string };
}>();
const emits = defineEmits(["optionClick", "update:modelValue"]);

const attrs = useAttrs();
const data = useVModel(props, "modelValue", emits);
const {getDictByProp, requestDict} = useDict()
const optionList = ref<Recordable>([]);
const getOptionList = computed((): Recordable => {
  return props.dictData || optionList.value;
});
const getPropsOption = computed(() => {
  return Object.assign({ label: "label", value: "value" }, props.propsOption);
});
const getDetailText = computed(() => {
  const {dictData} = props
  const {value, label} = getPropsOption.value
  return dictData ? dictData.find((item: Recordable) => item[value] === data.value)?.[label] : data.value;
});

onMounted(() => {
  if (!props.dictData && props.dictUrl) {
    requestDict({
      prop: 'option',
      dictUrl: props.dictUrl,
      dictMethod: props.dictMethod,
      dictQuery: props.dictQuery
    }).then(() => {
      optionList.value = getDictByProp('option')
    })
  }
})
function optionClick(item: DictItem) {
  emits("optionClick", item);
}
</script>

<style scoped></style>
