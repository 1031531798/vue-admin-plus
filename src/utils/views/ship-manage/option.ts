import { BasicTableOptions } from "@/components/Table/src/types";
import { BasicFormOption } from "@/components/Form/src/types";

export const searchOption: Partial<BasicFormOption> = {
  labelWidth: "80px",
  labelPosition: 'left',
  column: [
    {
      label: "所属企业",
      prop: "enterpriseName",
      span: 8,
      maxWidth: "300px",
      minWidth: "300px",
    },
    {
      label: "船名",
      prop: "name",
      span: 8,
      maxWidth: "300px",
      minWidth: "300px",
    },
  ],
};
export const tableOption: BasicTableOptions = {
  border: true,
  align: "center",
  height: "100%",
  stripe: true,
  full: true,
  columns: [
    {
      label: "所属企业",
      prop: "enterpriseId",
      type: 'select',
      dictUrl: '/rest/shipowner/shipownerEnterprise/getList',
      dictMethod: 'post',
      props: {
        propsOption: {
          label: 'name',
          value: "id"
        }
      }
    },
    {
      label: "船名",
      prop: "name",
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
      formatter: (row) => {
        const map: any = {
          1: "轻油",
          2: "重油",
        };
        return map[row.oilType] || "-";
      },
    },
    {
      label: "建造年月",
      prop: "constructionTime",
      width: "110",
      formatter: (row) => {
        return row.constructionTime ? row.constructionTime.slice(0, 11) : ''
      }
    },
    {
      label: "主机功率（千瓦）",
      prop: "mainPower",
    },
    {
      label: "操作",
      prop: "menu",
      width: 250,
      slot: true,
    },
  ],
};
