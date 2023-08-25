<template>
  <div>
    <BasicSelect v-model="row[column.prop]" :dictData="column.dictData" v-bind="column.props" v-if="column.type === 'select'" :detail="true"></BasicSelect>
  </div>
</template>

<script setup lang="ts">
import { BasicTableColumn, BasicTableOptions } from "@/components/Table/src/types";
import { computed, onMounted, ref } from "vue";
import BasicSelect from "@/components/Select/BasicSelect.vue";

const props = defineProps<{
  row: Recordable
  column: BasicTableColumn
  options: BasicTableOptions
}>()
// 字典值
const dictData = ref([])
const column = computed(() => {
  return props.column
})
</script>

<style scoped>

</style>
