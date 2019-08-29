import React, { useState } from "react";
import { Modal, Table } from "antd";
import CanvasJSReact from "../../../assets/canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PieChart(props) {
  const [visible, setVisible] = useState(false);
  const [tableData, setTableData] = useState(null);

  const dollarToValue = dollar => {
    return dollar ? Number(dollar.replace(/[^0-9.-]+/g, "")) : 0;
  };

  const valueToDollar = value => {
    return "$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const populateTableData = category => {
    let categoryMap = {};
    if (props.showBy === "propertyType") {
      categoryMap = {
        Apartment: "apartment",
        Office: "office",
        Retail: "retail",
        ResidentialLand: "residentialLand",
        Industrial: "industrial",
        ICILand: "iCILand",
        Hotel: "hotel"
      };
    } else {
      for (let i of Object.keys(props.tableData)) {
        categoryMap[i] = i;
      }
    }

    let key = 1;
    const dataForTable = props.tableData[categoryMap[category]].map(item => ({
      key: key++,
      address: item.Address,
      value: item.Price,
      loanAmount:
        valueToDollar(
          dollarToValue(item["Principal Amount 1"]) +
            dollarToValue(item["Principal Amount 2"]) +
            dollarToValue(item["Principal Amount 3"]) +
            dollarToValue(item["Principal Amount 4"])
        ) || "Buyer Financed",
      LTV:
        Math.round(
          ((dollarToValue(item["Principal Amount 1"]) +
            dollarToValue(item["Principal Amount 2"]) +
            dollarToValue(item["Principal Amount 3"]) +
            dollarToValue(item["Principal Amount 4"])) /
            dollarToValue(item.Price)) *
            100
        ) || "N/A",
      tenant: item.Tenant,
      purchaser: item.Purchaser
    }));

    setTableData(dataForTable);
  };

  const options = {
    animationEnabled: true,
    title: {
      text: `Market Data for Past 1 Year: ${
        props.showBy === "propertyType"
          ? "by Property Type"
          : "by Lender Category"
      }`
    },
    data: [
      {
        click: e => {
          setVisible(true);
          populateTableData(e.dataPoint.label);
        },
        type: "pie",
        toolTipContent: "<b>{label}</b>: {y} properties",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {percentage}%",
        dataPoints: props.pieChartData
      }
    ]
  };

  const tableColumns = [
    {
      title: "Address",
      dataIndex: "address",
      width: 250
    },
    {
      title: "Value",
      dataIndex: "value",
      sorter: (a, b) => dollarToValue(a.value) - dollarToValue(b.value),
      width: 125
    },
    {
      title: "Loan Amount",
      dataIndex: "loanAmount",
      sorter: (a, b) =>
        dollarToValue(a.loanAmount) - dollarToValue(b.loanAmount),
      width: 125
    },
    {
      title: "LTV",
      dataIndex: "LTV",
      width: 75
    },
    {
      title: "Tenant",
      dataIndex: "tenant",
      width: 125
    },
    {
      title: "Owner",
      dataIndex: "purchaser",
      width: 300
    }
  ];

  return (
    <div>
      <CanvasJSChart options={options} />
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        width="1500px"
        footer={null}
      >
        <Table columns={tableColumns} dataSource={tableData} />
      </Modal>
    </div>
  );
}

export default PieChart;
