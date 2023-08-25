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
import { computed, nextTick, ref } from "vue";
import { BasicForm } from "@/components/Form";
import { BasicDialog } from "@/components/Dialog";
import { BasicDialogMethods } from "@/components/Dialog/src/types";
import { useMessage } from "@/hook/useMessage";
import { BasicFormMethods } from "@/components/Form/src/types";
import { addEnterpriseApi, updateEnterpriseApi } from "./api";
import { validateMobile } from "@/components/Form/src/rules";

const dialog = ref<BasicDialogMethods>();
const { message } = useMessage();
const props = defineProps<{}>();
const emits = defineEmits(['reload'])
let dialogFormData = ref({});
const dialogLoading = ref<boolean>(false)
const titles = {
  "create": "新增企业",
  "update": "编辑企业",
  "detail": "企业详情"
}
let status = ref<MainDialogStatus>("create");
const formRef = ref<BasicFormMethods>();
const formOption = computed(() => {
  return {
    labelWidth: "130px",
    disabled: status.value === "detail",
    column: [
      {
        label: "企业名称",
        prop: "name",
        span: 20,
        rules: [
          { required: true, message: "企业名称不能为空", trigger: "blur" },
        ],
      },
      {
        label: "企业联系人",
        prop: "contactPerson",
        span: 20,
        rules: [
          { required: true, message: "企业联系人不能为空", trigger: "blur" },
        ],
      },
      {
        label: "企业联系人电话",
        prop: "contactMobile",
        span: 20,
        rules: [
          {
            required: true,
            message: "企业联系人电话不能为空",
            trigger: "blur",
          },
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
      const api = isCreate ?addEnterpriseApi : updateEnterpriseApi
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
  nextTick(() => {
    formRef.value?.resetForm();
  })
}

defineExpose({
  open,
});
</script>

<style scoped></style>
