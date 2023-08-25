<template>
  <div>
    <BasicDialog
      :title="titles[status]"
      ref="dialog"
      width="40%"
      :showFooter="status !== 'detail'"
      :loading="dialogLoading"
      @submit="submitDialog"
      @close="closeDialog"
    >
      <BasicForm
        ref="formRef"
        v-model="dialogFormData"
        :option="formOption"
      ></BasicForm>
    </BasicDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { BasicForm } from "@/components/Form";
import { BasicDialog } from "@/components/Dialog";
import { BasicDialogMethods } from "@/components/Dialog/src/types";
import { useMessage } from "@/hook/useMessage";
import { BasicFormMethods } from "@/components/Form/src/types";
import {addApi, updateApi } from "./api";
import { validateMobile } from "@/components/Form/src/rules";

const dialog = ref<BasicDialogMethods>();
const { message } = useMessage();
const props = defineProps<{}>();
const emits = defineEmits(['reload'])
let dialogFormData = ref({});
const dialogLoading = ref<boolean>(false)
const titles = {
  "create": "新增船舶",
  "update": "编辑船舶",
  "detail": "船舶详情"
}

let status = ref<MainDialogStatus>("create");
const formRef = ref<BasicFormMethods>();
const formOption = computed(() => {
  return {
    labelWidth: "130px",
    disabled: status.value === "detail",
    column: [
      {
        label: "所属企业",
        prop: "enterpriseId",
        span: 12,
        rules: [
          // { required: true, message: "所属企业不能为空", trigger: "blur" },
        ],
      },
      {
        label: "船名",
        prop: "name",
        span: 12,
        rules: [
          { required: true, message: "船名不能为空", trigger: "blur" },
        ],
      },
      {
        label: "总吨",
        prop: "totalTon",
      },
      {
        label: "载货吨",
        prop: "cargoDeadweightTon",
      },
      {
        label: "轻油重油",
        prop: "oilType",
        type: 'select',
        dictData: [
          {label: '轻油', value: 1},
          {label: '重油', value: 2},
        ]
      },
      {
        label: "建造年月",
        prop: "constructionTime",
        type: 'date',
        props: {
          type: "month"
        }
      },
      {
        label: "主机功率（千瓦）",
        prop: "mainPower",
      },
      {
        label: "联系电话",
        prop: "contactMobile",
        span: 12,
        rules: [
          {
            validator: validateMobile, trigger: 'change'
          }
        ],
      },
    ],
  };
});
function open(formData: Recordable, mode: MainDialogStatus = "create") {
  dialogFormData.value = formData;
  status.value = mode;
  dialog.value?.showDialog();

}
function submitDialog() {
  formRef.value
    ?.submitForm()
    .then(() => {
      const isCreate = status.value === 'create'
      const api = isCreate ?addApi : updateApi
      dialogLoading.value = true
      api(dialogFormData.value).then(() => {
          message(isCreate ? "新增成功" : "修改成功", { type: "success" });
          dialog.value?.hideDialog();
          emits('reload')
        }).finally(() => {
          dialogLoading.value = false
      });
    })
    .catch(() => {
      message("表单填写有误", { type: "warning" });
    });
}
function closeDialog() {
  formRef.value?.resetForm();
}

defineExpose({
  open,
});
</script>

<style scoped></style>
