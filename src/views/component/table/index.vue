<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "@/hook/useMessage";
const {message} = useMessage()
const data = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }
])
message('hello world', {
  type: 'success'
})
</script>

<style scoped>

</style>
