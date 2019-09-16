import React, { Fragment, useReducer } from "react";
import { Bar } from "react-chartjs-2";
import { amortSchedCA } from "../../../scripts/amortCA";
import { abbrNum } from "../../../scripts/abbreviateNumber";

function PrincipalInterestChart(props) {
  function mainCalculation() {
    const parsedDataArray = props.data;

    // create blank object that will get populated with data
    const dataObject = {};
    for (let i = 0; i < 120; i++) {
      dataObject[i] = {
        principalPaid: 0,
        interestPaid: 0,
        avgInterestRateAcc: 0
      };
    }
    // loop through data and add amount to principal or interest paid
    parsedDataArray.forEach(loan => {
      const amortSchedule = amortSchedCA(
        loan.amount,
        loan.interestRate,
        loan.term,
        loan.amortization
      );

      const firstPaymentIndex =
        (loan.startDate.getFullYear() - years[0]) * 12 +
        loan.startDate.getMonth(); // firstPaymentIndex will be >0 if startDate is within our 10-year period

      for (let i = 0; i < loan.term; i++) {
        if (firstPaymentIndex >= 0 && dataObject[`${firstPaymentIndex + i}`]) {
          dataObject[`${firstPaymentIndex + i}`].principalPaid +=
            amortSchedule[i].principal;
          dataObject[`${firstPaymentIndex + i}`].interestPaid +=
            amortSchedule[i].interest;
          dataObject[`${firstPaymentIndex + i}`].avgInterestRateAcc +=
            amortSchedule[i].interest * loan.interestRate;
        } else if (
          firstPaymentIndex < 0 &&
          amortSchedule[-firstPaymentIndex + i]
        ) {
          dataObject[`${i}`].principalPaid +=
            amortSchedule[-firstPaymentIndex + i].principal;
          dataObject[`${i}`].interestPaid +=
            amortSchedule[-firstPaymentIndex + i].interest;
          dataObject[`${i}`].avgInterestRateAcc +=
            amortSchedule[i].interest * loan.interestRate;
        }
      }
    });

    return { dataObject };
  }

  function populateArraysForAvgInterestRateDefault() {
    const { dataObject } = mainCalculation();

    let defaultDatasetForAvgInterestRatePerYear = Array(
      totalNumYearsForChart
    ).fill(0);
    let totalInterestPaidPerYear = Array(totalNumYearsForChart).fill(0);

    for (let i = 0; i < totalNumYearsForChart; i++) {
      for (let j = 0; j < 12; j++) {
        defaultDatasetForAvgInterestRatePerYear[i] +=
          dataObject[`${i * 12 + j}`].avgInterestRateAcc;
        totalInterestPaidPerYear[i] += dataObject[`${i * 12 + j}`].interestPaid;
      }
      defaultDatasetForAvgInterestRatePerYear[i] =
        Math.round(
          (defaultDatasetForAvgInterestRatePerYear[i] /
            totalInterestPaidPerYear[i]) *
            100
        ) / 100;
    }

    return defaultDatasetForAvgInterestRatePerYear;
  }

  function populateArraysForAvgInterestRateZoomed(yearIndex) {
    const { dataObject } = mainCalculation();

    let datasetForChartZoomedAvgInterestRate = Array(12).fill(0);
    let indexOfStartOfSelectedYear = yearIndex * 12;

    for (let i = 0; i < 12; i++) {
      datasetForChartZoomedAvgInterestRate[i] =
        Math.round(
          (dataObject[`${indexOfStartOfSelectedYear + i}`].avgInterestRateAcc /
            dataObject[`${indexOfStartOfSelectedYear + i}`].interestPaid) *
            100
        ) / 100;
    }

    return datasetForChartZoomedAvgInterestRate;
  }

  function populateArraysForChartDefault() {
    const { dataObject } = mainCalculation();
    // blank arrays for chart
    let defaultDatasetForChartPrincipal = Array(totalNumYearsForChart).fill(0);
    let defaultDatasetForChartInterest = Array(totalNumYearsForChart).fill(0);

    // populate blank arrays
    for (let i = 0; i < totalNumYearsForChart; i++) {
      for (let j = 0; j < 12; j++) {
        defaultDatasetForChartPrincipal[i] += Math.round(
          dataObject[`${i * 12 + j}`].principalPaid
        );
        defaultDatasetForChartInterest[i] += Math.round(
          dataObject[`${i * 12 + j}`].interestPaid
        );
      }
    }
    return [
      {
        label: "Average Interest Rate Weighted",
        data: populateArraysForAvgInterestRateDefault(),
        type: "line",
        fill: false,
        yAxisID: "2",
        backgroundColor: "rgba(255, 206, 86, 1)",
        borderColor: "rgba(255, 206, 86, 1)",
        pointBackgroundColor: "rgba(255, 206, 86, 1)",
        pointBorderColor: "rgba(255, 206, 86, 1)"
      },
      {
        label: "Principal",
        data: defaultDatasetForChartPrincipal,
        backgroundColor: "#7D3A96",
        yAxisID: "1"
      },
      {
        label: "Interest",
        data: defaultDatasetForChartInterest,
        backgroundColor: "#F26722",
        yAxisID: "1"
      }
    ];
  }

  function populateArraysForChartsZoomed(yearIndex) {
    const { dataObject } = mainCalculation();

    // blank array for chart
    let datasetForChartZoomPrincipal = Array(12).fill(0);
    let datasetForChartZoomInterest = Array(12).fill(0);
    let indexOfStartOfSelectedYear = yearIndex * 12;

    for (let i = 0; i < 12; i++) {
      datasetForChartZoomPrincipal[i] += Math.round(
        dataObject[`${indexOfStartOfSelectedYear + i}`].principalPaid
      );
      datasetForChartZoomInterest[i] += Math.round(
        dataObject[`${indexOfStartOfSelectedYear + i}`].interestPaid
      );
    }

    return [
      {
        label: "Average Interest Rate Weighted",
        data: populateArraysForAvgInterestRateZoomed(yearIndex),
        type: "line",
        fill: false,
        yAxisID: "2",
        backgroundColor: "rgba(255, 206, 86, 1)",
        borderColor: "rgba(255, 206, 86, 1)",
        pointBackgroundColor: "rgba(255, 206, 86, 1)",
        pointBorderColor: "rgba(255, 206, 86, 1)"
      },
      {
        label: "Principal",
        data: datasetForChartZoomPrincipal,
        backgroundColor: "#7D3A96",
        yAxisID: "1"
      },
      {
        label: "Interest",
        data: datasetForChartZoomInterest,
        backgroundColor: "#F26722",
        yAxisID: "1"
      }
    ];
  }

  const currentYear = new Date().getFullYear();
  const totalNumYearsForChart = 10;

  // create years array
  const years = [];
  for (
    let i = currentYear - totalNumYearsForChart / 2;
    i < currentYear + totalNumYearsForChart / 2;
    i++
  ) {
    years.push(i);
  }

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

  function userActionReducer(state, action) {
    switch (action.type) {
      case "ZOOM": {
        return {
          ...state,
          zoomPrincipal: true,
          labelsForChart: monthsText,
          datasetForChart: populateArraysForChartsZoomed(action.payload)
        };
      }
      case "RETURN": {
        return {
          ...state,
          zoomPrincipal: false,
          zoomInterest: false,
          labelsForChart: years,
          datasetForChart: populateArraysForChartDefault()
        };
      }
      default: {
        return state;
      }
    }
  }
  const initialState = {
    zoomPrincipal: false,
    zoomInterest: false,
    labelsForChart: years,
    datasetForChart: populateArraysForChartDefault()
  };
  const [state, dispatch] = useReducer(userActionReducer, initialState);
  const {
    zoomPrincipal,
    zoomInterest,
    labelsForChart,
    datasetForChart
  } = state;

  function handleClick(e) {
    if (!zoomPrincipal && !zoomInterest) {
      if (e[0] === undefined) {
      } else if (e[0]._datasetIndex === 0 || e[0]._datasetIndex === 1) {
        dispatch({
          type: "ZOOM",
          payload: e[0]._index
        });
      }
    } else {
      dispatch({
        type: "RETURN"
      });
    }
  }

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
          barPercentage: 0.4,
          stacked: true
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
          },
          stacked: true
        },
        {
          id: "2",
          position: "right",
          ticks: {
            beginAtZero: true,
            callback: function(value, index, values) {
              return value + "%";
            }
          },
          gridLines: {
            lineWidth: 0
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
    </Fragment>
  );
}

export default PrincipalInterestChart;
