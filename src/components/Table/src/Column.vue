<template>
  <div>
    <BasicSelect
      v-model="columnValue"
      :dictData="column.dictData"
      v-bind="column.props"
      v-if="column.type === 'select'"
      :detail="true"
    ></BasicSelect>
  </div>
</template>

<script setup lang="ts">
import {
  BasicTableColumn,
  BasicTableOptions,
} from "@/components/Table/src/types";
import {computed, ref, watch} from "vue";
import BasicSelect from "@/components/Select/BasicSelect.vue";

const props = defineProps<{
  row: any
  column: BasicTableColumn;
  options: BasicTableOptions;
}>();

const column = computed(() => {
  return props.column;
});
const columnValue = ref(props.row[column.value.prop])
watch([() => props.row, () => props.column], () => {
  columnValue.value = props.row[column.value.prop]
})
</script>

<style scoped></style>
