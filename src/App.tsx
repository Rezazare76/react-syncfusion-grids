import { useState } from "react";
import { Grid, PivotTable, SwitchButton } from "./component";
import {
  dataSourceSettings,
  dropDownList,
  gridColumnsData,
  gridOptions,
} from "./data";
function App() {
  const [section, setSection] = useState<"grid" | "table">("grid");
  const sections = {
    grid: (
      <Grid
        url="https://services.syncfusion.com/react/production/api/UrlDataSource"
        columnsData={gridColumnsData}
        dropDownList={dropDownList}
        gridOptions={gridOptions}
      />
    ),
    table: <PivotTable data={dataSourceSettings} />,
  };
  const switchButtonList = [
    {
      title: "Grid",
      onClick: () => setSection("grid"),
    },
    {
      title: "Table",
      onClick: () => setSection("table"),
    },
  ];
  return (
    <main className="App">
      <SwitchButton list={switchButtonList} active={0} />
      <section style={{ padding: "2rem" }}>{sections[section]}</section>
    </main>
  );
}

export default App;
