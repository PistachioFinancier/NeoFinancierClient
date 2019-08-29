import React, { Fragment, useReducer } from "react";
import { Bar } from "react-chartjs-2";
import { Modal, Table } from "antd";

function LoanExpiriesPerYearChart(props) {
  const currentYear = new Date().getFullYear();

  const totalNumYearsForChart = 10;

  const years = [];

  for (
    let i = currentYear - totalNumYearsForChart / 2;
    i < currentYear + totalNumYearsForChart / 2;
    i++
  ) {
    years.push(i);
  }

  const initialState = {
    zoomDollar: false,
    zoomNumber: false,
    labelsForChart: years,
    datasetForChart: populateArraysForChartDefault(),
    showModal: false,
    datasetForTable: []
  };
  const [state, dispatch] = useReducer(userActionReducer, initialState);
  const {
    zoomDollar,
    zoomNumber,
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
      case "ZOOM_DOLLAR": {
        return {
          ...state,
          zoomDollar: true,
          labelsForChart: monthsText,
          datasetForChart: populateArraysForChartZoomedDollar(action.payload)
        };
      }
      case "ZOOM_NUMBER": {
        return {
          ...state,
          zoomNumber: true,
          showModal: true,
          datasetForTable: populateDatasetForTable(action.payload)
        };
      }
      case "ZOOM_NUMBER_MONTH": {
        return {
          ...state,
          zoomNumber: true,
          showModal: true,
          datasetForTable: populateDatasetForTableMonth(action.payload)
        };
      }
      case "RETURN": {
        return {
          ...state,
          zoomDollar: false,
          zoomNumber: false,
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
        totalPrincipalRemainingPerYear[i] +=
          dataObject[i * 12 + j].loanExpiriesDollar;
        numPropertiesExpiringPerYear[i] +=
          dataObject[i * 12 + j].loanExpiriesNumber;
      }
    }

    return [
      {
        label: "Total $",
        data: totalPrincipalRemainingPerYear,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "1"
      },
      {
        label: "# Properties",
        data: numPropertiesExpiringPerYear,
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        yAxisID: "2"
      }
    ];
  }

  function populateArraysForChartZoomedDollar(year) {
    const { dataObject } = mainCalculation();

    const totalPrincipalRemainingPerMonth = Array(12);
    const numPropertiesExpiringPerMonth = Array(12);

    for (let i = 0; i < 12; i++) {
      totalPrincipalRemainingPerMonth[i] =
        dataObject[i + year * 12].loanExpiriesDollar;
      numPropertiesExpiringPerMonth[i] =
        dataObject[i + year * 12].loanExpiriesNumber;
    }

    return [
      {
        label: "Total $",
        data: totalPrincipalRemainingPerMonth,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "1"
      },
      {
        label: "# Properties",
        data: numPropertiesExpiringPerMonth,
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        yAxisID: "2"
      }
    ];
  }

  function handleClick(e) {
    if (!zoomDollar && !zoomNumber) {
      if (e[0] === undefined) {
      } else if (e[0]._datasetIndex === 0) {
        dispatch({
          type: "ZOOM_DOLLAR",
          payload: e[0]._index
        });
      } else if (e[0]._datasetIndex === 1) {
        dispatch({
          type: "ZOOM_NUMBER",
          payload: e[0]._index
        });
      }
    } else if (zoomDollar) {
      if (e[0] === undefined) {
        dispatch({
          type: "RETURN"
        });
      } else if (e[0]._datasetIndex === 1) {
        dispatch({
          type: "ZOOM_NUMBER_MONTH",
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

  function populateDatasetForTableMonth(month) {
    const parsedDataArrayForYear = datasetForChart;

    console.log(parsedDataArrayForYear);

    // const dataForTable = parsedDataArray.filter(
    //   loan => loan.expiryDate.getFullYear() === years[year]
    // );

    // let x = 0;

    // return dataForTable.map(loan => ({
    //   key: x++,
    //   ...loan
    // }));

    return [];
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
          barPercentage: 0.4
        }
      ],
      yAxes: [
        {
          id: "1",
          position: "left",
          ticks: {
            beginAtZero: true
          }
        },
        {
          id: "2",
          position: "right",
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

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
        title="Loans"
        footer={null}
        visible={showModal}
        onCancel={() =>
          dispatch({
            type: "RETURN"
          })
        }
        width="auto"
      >
        <Table dataSource={datasetForTable} columns={columnsForTable} />
      </Modal>
    </Fragment>
  );
}

export default LoanExpiriesPerYearChart;
