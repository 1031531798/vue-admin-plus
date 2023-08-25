import { BasicTableOptions } from "@/components/Table/src/types";
import { BasicFormOption } from "@/components/Form/src/types";

export const searchOption: Partial<BasicFormOption> = {
  labelWidth: "80px",
  labelPosition: 'left',
  column: [
    {
      label: "船名",
      prop: "cnName",
      span: 8,
      maxWidth: "300px",
      minWidth: "300px",
    },
    {
      label: "九位码",
      prop: "mmsi",
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
      label: "船名(中文)",
      prop: "cnName",
      width: 120,
    },
    {
      label: "船名(大写英文)",
      prop: "shipName",
      width: 140,
    },
    {
      label: "九位码",
      prop: "mmsi",
      width: 100
    },
    {
      label: "引水编号",
      prop: "diversionNo",
      width: 100,
    },
    {
      label: "船舶公司",
      prop: "company",
      width: 100,
    },
    {
      label: "船籍港",
      prop: "homePort",
    },
    {
      label: "船舶联系方式",
      prop: "shipContact",
      width: 140,
    },
    {
      label: "船舶公司联系方式",
      prop: "shipCompanyContact",
      width: 140,
    },
    {
      label: "管理分区",
      prop: "managementZone",
      width: 120,
    },
    {
      label: "违章日期",
      prop: "illegalDate",
      minWidth: 110,
      formatter: (row) => {
        console.log(row);
        return row.illegalDate ? row.illegalDate.slice(0, 11) : ''
      }
    },
    {
      label: "违章时间",
      prop: "illegalTime",
      width: 110,
    },
    {
      label: "违章地点",
      prop: "address",
      width: 100,
    },
    {
      label: "违章种类",
      prop: "illegalType",
      width: 100,
    },
    {
      label: "违章种类2",
      prop: "illegalType2",
      width: 120,
    },
    {
      label: "违章详细描述",
      prop: "illegalDescription",
      minWidth: 320,
      showOverflowTooltip: true,
    },
    {
      label: "是否现场纠正",
      prop: "isTheCorrect",
      type: "select",
      width: 140,
    },
    {
      label: "违章发现途径 ",
      prop: "findWays",
      width: 120,
    },
    {
      label: "记录人 ",
      prop: "userName",
    },
    // {
    //   label: "操作",
    //   prop: "menu",
    //   fixed: 'right',
    //   width: 100,
    //   slot: true,
    // },
  ],
};
