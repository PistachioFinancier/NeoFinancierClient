import React, { Fragment, useReducer, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Modal, Table } from "antd";
import { abbrNum } from "../../../scripts/abbreviateNumber";

function LoanExpiriesPerYearChart(props) {
  const totalNumYearsForChart = 10;
  const years = [];

  const currentYear = new Date().getFullYear();

  for (
    let i = currentYear - totalNumYearsForChart / 2;
    i < currentYear + totalNumYearsForChart / 2;
    i++
  ) {
    years.push(i);
  }

  const [zoomedYear, setZoomedYear] = useState();
  const [zoomedMonth, setZoomedMonth] = useState();

  const initialState = {
    zoomMonths: false,
    showTableYear: false,
    showTableMonth: false,
    labelsForChart: years,
    datasetForChart: populateArraysForChartDefault(),
    showModal: false,
    datasetForTable: []
  };

  const [state, dispatch] = useReducer(userActionReducer, initialState);

  const {
    zoomMonths,
    showTableYear,
    showTableMonth,
    labelsForChart,
    datasetForChart,
    showModal,
    datasetForTable
  } = state;

  function userActionReducer(state, action) {
    const monthsText = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    switch (action.type) {
      case "ZOOM_MONTHS": {
        setZoomedYear(action.payload);
        return {
          ...state,
          zoomMonths: true,
          labelsForChart: monthsText,
          datasetForChart: populateArraysForChartZoomedMonths(action.payload)
        };
      }
      case "SHOW_TABLE_YEAR": {
        setZoomedYear(action.payload);
        return {
          ...state,
          showTableYear: true,
          showModal: true,
          datasetForTable: populateDatasetForTable(action.payload)
        };
      }
      case "SHOW_TABLE_MONTH": {
        setZoomedMonth(action.payload);
        return {
          ...state,
          showTableMonth: true,
          showModal: true,
          datasetForTable: populateDatasetForTableMonth(action.payload)
        };
      }
      case "RETURN_TO_ZOOM_MONTHS": {
        return {
          ...state,
          zoomMonths: true,
          showTableYear: false,
          showTableMonth: false,
          showModal: false,
          labelsForChart: monthsText,
          datasetForChart: populateArraysForChartZoomedMonths(zoomedYear)
        };
      }
      case "RETURN": {
        setZoomedMonth(null);
        return {
          ...state,
          zoomMonths: false,
          showTableYear: false,
          showModal: false,
          labelsForChart: years,
          datasetForChart: populateArraysForChartDefault()
        };
      }
      default: {
        return {
          state
        };
      }
    }
  }

  function mainCalculation() {
    const parsedDataArray = props.data;

    // create blank object that will get populated with data
    const dataObject = {};
    for (let i = 0; i < 120; i++) {
      dataObject[i] = {
        loanExpiriesDollar: 0,
        loanExpiriesNumber: 0
      };
    }

    // loop through data and populate dataObject
    parsedDataArray.forEach(loan => {
      const expiryMonthIndex =
        (loan.expiryDate.getFullYear() - years[0]) * 12 +
        loan.expiryDate.getMonth();

      if (dataObject[expiryMonthIndex]) {
        dataObject[expiryMonthIndex].loanExpiriesDollar +=
          loan.principalRemaingAtEndOfTerm;
        dataObject[expiryMonthIndex].loanExpiriesNumber++;
      }
    });

    return { dataObject };
  }

  function populateArraysForChartDefault() {
    const { dataObject } = mainCalculation();

    const totalPrincipalRemainingPerYear = Array(totalNumYearsForChart).fill(0);
    const numPropertiesExpiringPerYear = Array(totalNumYearsForChart).fill(0);

    for (let i = 0; i < totalNumYearsForChart; i++) {
      for (let j = 0; j < 12; j++) {
        totalPrincipalRemainingPerYear[i] += Math.round(
          dataObject[i * 12 + j].loanExpiriesDollar
        );
        numPropertiesExpiringPerYear[i] += Math.round(
          dataObject[i * 12 + j].loanExpiriesNumber
        );
      }
    }

    return [
      {
        label: "Total $",
        data: totalPrincipalRemainingPerYear,
        backgroundColor: "#7D3A96",
        yAxisID: "1"
      },
      {
        label: "# Properties",
        data: numPropertiesExpiringPerYear,
        backgroundColor: "#F26722",
        yAxisID: "2"
      }
    ];
  }

  function populateArraysForChartZoomedMonths(year) {
    const { dataObject } = mainCalculation();

    const totalPrincipalRemainingPerMonth = Array(12);
    const numPropertiesExpiringPerMonth = Array(12);

    for (let i = 0; i < 12; i++) {
      totalPrincipalRemainingPerMonth[i] = Math.round(
        dataObject[i + year * 12].loanExpiriesDollar
      );
      numPropertiesExpiringPerMonth[i] = Math.round(
        dataObject[i + year * 12].loanExpiriesNumber
      );
    }

    return [
      {
        label: "Total $",
        data: totalPrincipalRemainingPerMonth,
        backgroundColor: "#7D3A96",
        yAxisID: "1"
      },
      {
        label: "# Properties",
        data: numPropertiesExpiringPerMonth,
        backgroundColor: "#F26722",
        yAxisID: "2"
      }
    ];
  }

  function populateDatasetForTableMonth(month) {
    const parsedDataArray = props.data;

    const dataForTable = parsedDataArray.filter(
      loan =>
        loan.expiryDate.getFullYear() === years[zoomedYear] &&
        loan.expiryDate.getMonth() === month
    );

    let x = 0;

    return dataForTable.map(loan => ({
      key: x++,
      ...loan
    }));
  }

  function handleClick(e) {
    if (!zoomMonths && !showTableYear && !showTableMonth) {
      if (e[0] === undefined) {
      } else if (e[0]._datasetIndex === 0) {
        dispatch({
          type: "ZOOM_MONTHS",
          payload: e[0]._index
        });
      } else if (e[0]._datasetIndex === 1) {
        dispatch({
          type: "SHOW_TABLE_YEAR",
          payload: e[0]._index
        });
      }
    } else if (zoomMonths) {
      if (showTableMonth) {
        dispatch({
          type: "RETURN_TO_ZOOM_MONTHS"
        });
      } else if (e[0] === undefined) {
        dispatch({
          type: "RETURN"
        });
      } else if (e[0]._datasetIndex === 1) {
        dispatch({
          type: "SHOW_TABLE_MONTH",
          payload: e[0]._index
        });
      }
    } else {
      dispatch({
        type: "RETURN"
      });
    }
  }

  // update hooks to be used for table
  function populateDatasetForTable(year) {
    const parsedDataArray = props.data;

    const dataForTable = parsedDataArray.filter(
      loan => loan.expiryDate.getFullYear() === years[year]
    );

    let x = 0;

    return dataForTable.map(loan => ({
      key: x++,
      ...loan
    }));
  }

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

  // parameters for chart
  const data = {
    labels: labelsForChart,
    datasets: datasetForChart
  };

  const options = {
    responsive: true,
    scales: {
      xAxes: [
        {
          barPercentage: 0.7,
          categoryPercentage: 0.4
        }
      ],
      yAxes: [
        {
          id: "1",
          position: "left",
          ticks: {
            beginAtZero: true,
            callback: function(value, index, values) {
              return "$" + abbrNum(value, 2);
            }
          },
          gridLines: {
            lineWidth: 0
          }
        },
        {
          id: "2",
          position: "right",
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            lineWidth: 0
          }
        }
      ]
    }
  };

  const monthsTextLong = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return (
    <Fragment>
      <Bar
        data={data}
        width={2000}
        getElementAtEvent={e => handleClick(e)}
        height={500}
        options={options}
      />
      <Modal
        title={`Loans Expiring in ${years[zoomedYear]} ${
          zoomMonths ? monthsTextLong[zoomedMonth] : ""
        }`}
        footer={null}
        visible={showModal}
        onCancel={e => handleClick(e)}
        width="auto"
      >
        <Table dataSource={datasetForTable} columns={columnsForTable} />
      </Modal>
    </Fragment>
  );
}

export default LoanExpiriesPerYearChart;
