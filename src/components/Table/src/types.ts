import { TableColumnCtx, TableProps } from "element-plus";

export type BasicTableOptions = {
  width?: string;
  height: number | string
  columns: BasicTableColumn[];
  align: "center" | "right" | "left";
  stripe?: boolean;
  border?: boolean;
  full: boolean
} & Partial<TableProps<any>>
export type BasicTableColumn = {
  label: string;
  prop: string;
  type?: "text" | "select";
  slot?: boolean;
  dictData?: Recordable[];
  dictUrl?: string;
  dictMethod?: 'get' | 'post';
  dictQuery?: {data: Recordable, params: Recordable},
  width?: string | number;
  align?: string;
  props?: Recordable;
} & Partial<TableColumnCtx<any>>
