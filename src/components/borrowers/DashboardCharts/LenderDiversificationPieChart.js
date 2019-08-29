import React, { useReducer } from "react";
import { Modal, Table } from "antd";
import CanvasJSReact from "../../../assets/canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LenderDiversificationPieChart(props) {
  function userActionReducer(state, action) {
    switch (action.type) {
      case "SHOW_TABLE": {
        return {
          ...state,
          showModal: true,
          datasetForTable: getDatasetForTable(action.payload)
        };
      }
      case "RETURN": {
        return {
          ...state,
          showModal: false
        };
      }
      default: {
        return state;
      }
    }
  }

  function getDatasetForTable(label) {
    return props.tableData.filter(loan => loan.lenderClassification === label);
  }

  const initialState = {
    showModal: false,
    datasetForTable: null
  };
  const [state, dispatch] = useReducer(userActionReducer, initialState);
  const { showModal, datasetForTable } = state;

  const options = {
    animationEnabled: true,
    title: {
      text: "Lender Diversification"
    },
    data: [
      {
        click: e => {
          dispatch({
            type: "SHOW_TABLE",
            payload: e.dataPoint.label
          });
        },
        type: "pie",
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: props.pieChartData
      }
    ]
  };

  const columnsForTable = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Lender",
      dataIndex: "lender",
      key: "lender"
    },
    {
      title: "Loan Amount",
      dataIndex: "loanAmount",
      key: "loanAmount"
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDateString",
      key: "expiryDateString"
    },
    {
      title: "Interest Rate",
      dataIndex: "interestRate",
      key: "interestRate"
    },
    {
      title: "LTV",
      dataIndex: "LTV",
      key: "LTV"
    },
    {
      title: "DSCR",
      dataIndex: "DSCR",
      key: "DSCR"
    },
    {
      title: "Property Value",
      dataIndex: "propertyValue",
      key: "propertyValue"
    }
  ];

  return (
    <div>
      <CanvasJSChart options={options} />
      <Modal
        visible={showModal}
        onCancel={() => {
          dispatch({
            type: "RETURN"
          });
        }}
        width="1500px"
        footer={null}
      >
        <Table columns={columnsForTable} dataSource={datasetForTable} />
      </Modal>
    </div>
  );
}

export default LenderDiversificationPieChart;
