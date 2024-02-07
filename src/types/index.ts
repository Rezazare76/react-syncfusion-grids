import { DateFormatOptions, NumberFormatOptions } from "@syncfusion/ej2-base";
import { ReactNode } from "react";

export type gridProps = {
  url: string;
  containerClass?: string;
  dropDownList?: { [key: string]: Object }[];
  columnsData: {
    type?: string;
    allowSorting?: boolean;
    allowFiltering?: boolean;
    visible?: boolean;
    headerText?: string;
    isPrimaryKey?: boolean;
    width?: string;
    field?: string;
    clipMode?: "Clip" | "Ellipsis" | "EllipsisWithTooltip";
    template?: (props: any) => ReactNode;
    format?: string | NumberFormatOptions | DateFormatOptions;
  }[];
  gridOptions: {
    enableHeaderFocus?: boolean;
    allowFiltering?: boolean;
    allowSorting?: boolean;
    allowSelection?: boolean;
    enableHover?: boolean;
    enableVirtualization?: boolean;
  };
};
export type PivotTableProps = {
  data: Record<string, any>;
  width?: string;
  height?: string;
  className?: string;
};
