import { FormItemRule } from "element-plus/es/components/form/src/types";

export type BasicFormOption = {
  labelWidth: string | number;
  labelPosition: "top" | "right" | "left";
  labelSuffix: string;
  disabled: boolean;
  inline: boolean;
  column: BasicFormColumnProps[]
};
export type BasicFormColumnProps = {
  label: string;
  prop: string;
  labelWidth?: string | number;
  type?: "text" | "number" | "select" | "date";
  formatter?: (value: Recordable) => string;
  dataType?: BasicFormDataType
  span?: number;
  slot?: boolean;
  props?: Recordable;
  rules?: FormItemRule[];
  display?: boolean;
  dictData?: Recordable[];
  dictUrl?: string;
  dictMethod?: 'get' | 'post';
  dictQuery?: {data: Recordable, params: Recordable},
  defaultValue?: string | number;
  component?: string;
  maxWidth?: string;
  minWidth?: string;
}

// 数据类型值
export type BasicFormDataType = 'string' | 'number' | 'boolean' | 'array' | 'object'

// 表单组件事件
export type BasicFormMethods = {
  getFormData: () => Recordable;
  resetForm: VoidFunction;
  submitForm: () => Promise<any>;
  clearValidate: VoidFunction;
}

// 搜索框组件事件
export type SearchFormMethods = {
  getData: () => Recordable;
  reset: VoidFunction;
  search: VoidFunction;
}
