import { PivotViewComponent } from "@syncfusion/ej2-react-pivotview";
import { FC } from "react";
import { PivotTableProps } from "../../types";
export const PivotTable: FC<PivotTableProps> = ({
  data,
  width,
  height,
  className,
}) => {
  return (
    <PivotViewComponent
      id="PivotView"
      dataSourceSettings={data}
      width={width}
      height={height}
      gridSettings={{ columnWidth: 140 }}
      className={className}
    />
  );
};
PivotTable.defaultProps = {
  width: "100%",
  height: "290",
};
