/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { closest, isNullOrUndefined } from "@syncfusion/ej2-base";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Filter,
  VirtualScroll,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { RatingComponent } from "@syncfusion/ej2-react-inputs";
import { DataManager, Query, UrlAdaptor } from "@syncfusion/ej2-data";
import "./grid-overview.css";
import { FC } from "react";
import { gridProps } from "../../types";
import {
  RiFlagLine,
  RiMapPin2Line,
  RiUser2Fill,
  RiUser3Line,
} from "@remixicon/react";

function statusTemplate(props: any): any {
  return (
    <div>
      {props.Status === "Active" ? (
        <div id="status" className="statustemp e-activecolor">
          <span className="statustxt e-activecolor">{props.Status}</span>
        </div>
      ) : (
        <div id="status" className="statustemp e-inactivecolor">
          <span className="statustxt e-inactivecolor">{props.Status}</span>
        </div>
      )}
    </div>
  );
}
function ratingTemplate(props: any): any {
  return (
    <div>
      <RatingComponent
        value={props.Rating}
        cssClass={"custom-rating"}
        readOnly={true}
      />
    </div>
  );
}
function progessTemplate(props: any): any {
  let percentage: number = props[props.column.field];
  if (percentage <= 20) {
    percentage = percentage + 30;
  }
  return (
    <div id="myProgress" className="pbar">
      {props.Status === "Inactive" ? (
        <div
          id="myBar"
          className="bar progressdisable"
          style={{ width: percentage + "%" }}
        >
          <div id="pbarlabel" className="barlabel">
            {percentage + "%"}
          </div>
        </div>
      ) : (
        <div id="myBar" className="bar" style={{ width: percentage + "%" }}>
          <div id="pbarlabel" className="barlabel">
            {percentage + "%"}
          </div>
        </div>
      )}
    </div>
  );
}
let loc = { width: "31px", height: "24px" };
function trustTemplate(props: any): any {
  return (
    <div>
      <RiFlagLine
        size={14}
        className={`mx-2 ${
          props.Trustworthiness == "Sufficient"
            ? "blue"
            : props.Sufficient == "Insufficient"
            ? "red"
            : "green"
        }`}
      />
      <span id="Trusttext">{props.Trustworthiness}</span>
    </div>
  );
}

function empTemplate(props: any): any {
  return (
    <div>
      {props.EmployeeImg === "usermale" ? (
        <div className="empimg center">
          <RiUser2Fill size={14} className="e-userimg sf-icon-Male" />
        </div>
      ) : (
        <div className="empimg center">
          <RiUser3Line size={14} className="e-userimg sf-icon-FeMale" />
        </div>
      )}
      <span id="Emptext">{props.Employees}</span>
    </div>
  );
}
function coltemplate(props: any): any {
  return (
    <div className="Mapimage">
      <RiMapPin2Line size={14} /> <span> </span>
      <span id="locationtext">{props.Location}</span>
    </div>
  );
}

export const Grid: FC<gridProps> = ({
  url,
  columnsData,
  dropDownList,
  containerClass,
  gridOptions,
}) => {
  let dReady: boolean = false;
  let dtTime: boolean = false;
  let isDataChanged: boolean = true;
  let intervalFun: any;
  let clrIntervalFun: any;
  let clrIntervalFun2: any;
  let dropSlectedIndex: number | null = null;
  let ddObj: DropDownListComponent | null;
  let gridInstance: GridComponent | null = null;

  let stTime: any;

  const fields: object = { text: "text", value: "value" };

  function onDataBound(): void {
    clearTimeout(clrIntervalFun);
    clearInterval(intervalFun);
    dtTime = true;
  }
  function onComplete(args: any): void {
    if (args.requestType === "filterchoicerequest") {
      if (
        args.filterModel.options.field === "Trustworthiness" ||
        args.filterModel.options.field === "Rating" ||
        args.filterModel.options.field === "Status"
      ) {
        var span =
          args.filterModel.dialogObj.element.querySelectorAll(
            ".e-selectall"
          )[0];
        if (!isNullOrUndefined(span)) {
          closest(span, ".e-ftrchk").classList.add("e-hide");
        }
      }
    }
  }
  const data: DataManager = new DataManager({
    url: url,
    adaptor: new UrlAdaptor(),
  });
  const query = new Query().addParams("dataCount", "1000");
  function onChange(): void {
    ddObj?.hidePopup();
    dropSlectedIndex = null;
    let index: number = ddObj?.value as number;
    clearTimeout(clrIntervalFun2);
    clrIntervalFun2 = setTimeout(() => {
      isDataChanged = true;
      stTime = null;
      let contentElement: Element = gridInstance?.contentModule.getPanel()
        .firstChild as Element;
      contentElement.scrollLeft = 0;
      contentElement.scrollTop = 0;
      if (
        gridInstance &&
        gridInstance?.pageSettings &&
        gridInstance.pageSettings?.currentPage
      ) {
        gridInstance.pageSettings.currentPage = 1;
        stTime = performance.now();
        if (gridInstance?.query?.params?.length > 1) {
          for (let i: number = 0; i < gridInstance.query.params.length; i++) {
            if (gridInstance.query.params[i].key === "dataCount") {
              gridInstance.query.params[i].value = index.toString();
              break;
            }
          }
        } else {
          gridInstance.query.params[0].value = index.toString();
        }
      }

      gridInstance?.setProperties({ dataSource: data });
    }, 100);
  }
  const select: any = {
    persistSelection: true,
    type: "Multiple",
    checkboxOnly: true,
  };
  function onLoad(args: any): void {
    (document.getElementById("overviewgrid") as any).ej2_instances[0].on(
      "data-ready",
      () => {
        dReady = true;
        stTime = performance.now();
      }
    );
    document
      .getElementById("overviewgrid")
      ?.addEventListener("DOMSubtreeModified", () => {
        if (dReady && stTime && isDataChanged) {
          let msgEle = document.getElementById("msg");
          let val: any = (performance.now() - stTime).toFixed(0);
          stTime = null;
          dReady = false;
          dtTime = false;
          isDataChanged = false;
          if (msgEle) {
            // Null check before accessing properties
            msgEle.innerHTML =
              "Load Time: " + "<b>" + val + "</b>" + "<b>ms</b>";
            msgEle.classList.remove("e-hide");
          }
        }
      });
  }
  const gridFilter: any = {
    type: "Menu",
  };

  return (
    <div className={containerClass}>
      <div className="control-section">
        <div>
          <DropDownListComponent
            width="220"
            dataSource={dropDownList}
            index={0}
            ref={(dropdownlist) => {
              ddObj = dropdownlist;
            }}
            fields={fields}
            change={onChange}
            placeholder="Select a Data Range"
            popupHeight="240px"
          />
          <span id="msg"></span>
          <br />
        </div>
        <GridComponent
          id="overviewgrid"
          dataSource={data}
          loadingIndicator={{ indicatorType: "Shimmer" }}
          query={query}
          rowHeight={38}
          height="400"
          ref={(g) => {
            gridInstance = g;
          }}
          actionComplete={onComplete}
          load={onLoad}
          dataBound={onDataBound}
          filterSettings={gridFilter}
          selectionSettings={select}
          {...gridOptions}
        >
          <ColumnsDirective>
            {columnsData.map((elm, inx) => (
              <ColumnDirective {...elm} key={`syncfusion-grid-${inx}`} />
            ))}
          </ColumnsDirective>
          <Inject services={[Filter, VirtualScroll, Sort]} />
        </GridComponent>
      </div>
    </div>
  );
};
Grid.defaultProps = {
  containerClass: "control-pane",
};
