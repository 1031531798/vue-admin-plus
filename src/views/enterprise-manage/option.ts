import { BasicTableOptions } from "@/components/Table/src/types";
import { BasicFormOption } from "@/components/Form/src/types";

export const searchOption: Partial<BasicFormOption> = {
  labelWidth: "80px",
  labelPosition: 'left',
  column: [
    {
      label: "企业名称",
      prop: "name",
      span: 8,
      maxWidth: '300px',
      minWidth: '300px'
    },
  ]
}
export const tableOption: BasicTableOptions = {
  border: true,
  align: 'center',
  height: "100%",
  stripe: true,
  full: true,
  columns: [
    {
      label: "企业名称",
      prop: "name",
    },
    {
      label: "公司联系人",
      prop: "contactPerson",
    },
    {
      label: "联系电话",
      prop: "contactMobile",
    },
    {
      label: "操作",
      prop: "menu",
      width: 250,
      slot: true,
    },
  ],
};
