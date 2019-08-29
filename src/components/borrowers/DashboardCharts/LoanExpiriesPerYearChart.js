import React, { useState, Fragment, useReducer } from "react";
import { Bar } from "react-chartjs-2";
import { amortSchedCA } from "../../../scripts/amortCA";
import addMonths from "date-fns/addMonths";
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
    showModal: false
  };
  const [state, dispatch] = useReducer(userActionReducer, initialState);
  const { zoomDollar, zoomNumber, labelsForChart, datasetForChart } = state;

  function userActionReducer(state, action) {
    switch (action.type) {
      case "ZOOM_DOLLAR": {
        return {
          ...state,
          zoomDollar: true
        };
      }
      case "ZOOM_NUMBER": {
        return {
          ...state,
          zoomNumber: true,
          showModal: true
        };
      }
      case "RETURN": {
        return {
          ...state,
          zoomDollar: false,
          zoomNumber: false,
          showModal: false
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

    return {
      labels: years,
      datasets: [
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
      ]
    };
  }

  function populateArraysForChartZoomedDollar(){
    
  }

  function handleClick(e) {
    if (!zoomDollar && !zoomNumber) {
      if (e[0]===undefined){
      } else if (e[0]._datasetIndex ===0){
        dispatch({
          type: "ZOOM_DOLLAR",
          payload: e[0]._index
        })
      } else if (e[0]._datasetIndex ===1){
        dispatch({
          type:"ZOOM_NUMBER",
          payload: e[0]._index
        })
      }
    } else {
      dispatch({
        type: "RETURN"
      });
    }
  }

  // function handleClick(e) {
  //   if (chartState === 0) {
  //     setChartState(1);
  //     if (e[0] === undefined) {
  //     } else if (e[0]._datasetIndex === 0) {
  //       // user clicked $
  //       updateDatasetForChart(e);
  //     } else {
  //       // user clicked #
  //       setModalVisibility(true);
  //       updateDatasetForTable(e);
  //     }
  //   } else {
  //     setDatasetForChart(defaultDatasetForChart);
  //     setLabelsForChart(years);
  //     setChartState(0);
  //   }
  // }

  const monthsNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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

  //   const numPropertiesExpiringPerMonth = new Array(12).fill(0);
  //   const totalPrincipalRemainingPerMonth = new Array(12).fill(0);

  //   parsedDataArray
  //     .filter(loan => loan.expiryDate.getFullYear() === years[e[0]._index])
  //     .forEach(loan => {
  //       if (monthsNum.includes(loan.expiryDate.getMonth())) {
  //         numPropertiesExpiringPerMonth[
  //           monthsNum.indexOf(loan.expiryDate.getMonth())
  //         ]++;
  //         totalPrincipalRemainingPerMonth[
  //           monthsNum.indexOf(loan.expiryDate.getMonth())
  //         ] += loan.principalRemaingAtEndOfTerm;
  //       }
  //     });

  //   setLabelsForChart(monthsText);
  //   setDatasetForChart([
  //     {
  //       label: "$",
  //       data: totalPrincipalRemainingPerMonth,
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       yAxisID: "1"
  //     },
  //     {
  //       label: "# Properties",
  //       data: numPropertiesExpiringPerMonth,
  //       backgroundColor: "rgba(255, 206, 86, 0.5)",
  //       yAxisID: "2"
  //     }
  //   ]);
  // }

  // const [dataSourceForTable, setDataSourceForTable] = useState([]);

  // // update hooks to be used for table
  // function updateDatasetForTable(e) {
  //   const dataForTable = parsedDataArray.filter(
  //     loan => loan.expiryDate.getFullYear() === years[e[0]._index]
  //   );

  //   let x = 0;

  //   setDataSourceForTable(
  //     dataForTable.map(loan => ({
  //       key: x++,
  //       ...loan
  //     }))
  //   );
  // }

  // const columnsForTable = [
  //   {
  //     title: "Address",
  //     dataIndex: "address",
  //     key: "address"
  //   },
  //   {
  //     title: "Lender",
  //     dataIndex: "lender",
  //     key: "lender"
  //   },
  //   {
  //     title: "Loan Amount",
  //     dataIndex: "loanAmount",
  //     key: "loanAmount"
  //   },
  //   {
  //     title: "Expiry Date",
  //     dataIndex: "expiryDateString",
  //     key: "expiryDateString"
  //   },
  //   {
  //     title: "Interest Rate",
  //     dataIndex: "interestRate",
  //     key: "interestRate"
  //   },
  //   {
  //     title: "LTV",
  //     dataIndex: "LTV",
  //     key: "LTV"
  //   },
  //   {
  //     title: "DSCR",
  //     dataIndex: "DSCR",
  //     key: "DSCR"
  //   },
  //   {
  //     title: "Property Value",
  //     dataIndex: "propertyValue",
  //     key: "propertyValue"
  //   }
  // ];

  // // parameters for chart
  // const data = {
  //   labels: labelsForChart,
  //   datasets: datasetForChart
  // };

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
        data={datasetForChart}
        width={2000}
        getElementAtEvent={e => handleClick(e)}
        height={500}
        options={options}
      />
      {/* <Modal
        title="Loans"
        footer={null}
        visible={modalVisibility}
        onCancel={() => setModalVisibility(false)}
        width="auto"
      >
        <Table dataSource={dataSourceForTable} columns={columnsForTable} />
      </Modal> */}
    </Fragment>
  );
}

export default LoanExpiriesPerYearChart;
