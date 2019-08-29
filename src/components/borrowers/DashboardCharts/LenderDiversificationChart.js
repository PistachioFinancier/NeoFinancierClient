import React from "react";
import LenderDiversificationPieChart from "./LenderDiversificationPieChart";

function LenderDiversificationChart(props) {
  function createPieChartData() {
    const parsedDataArray = props.data;

    const totalLoans = parsedDataArray.reduce((total, loan) => {
      return total + Number(loan.loanAmount);
    }, 0);

    const dataObject = {};

    parsedDataArray.forEach(loan => {
      if (!dataObject[`${loan.lenderClassification}`]) {
        dataObject[`${loan.lenderClassification}`] = [loan];
      } else {
        dataObject[`${loan.lenderClassification}`].push(loan);
      }
    });

    const result = [];

    for (let i of Object.keys(dataObject)) {
      result.push({
        y: Math.round(
          (dataObject[i].reduce((total, loan) => {
            return total + Number(loan.loanAmount);
          }, 0) /
            totalLoans) *
            100
        ),
        label: i
      });
    }

    return result;
  }
  return (
    <LenderDiversificationPieChart
      pieChartData={createPieChartData()}
      tableData={props.data}
    ></LenderDiversificationPieChart>
  );
}

export default LenderDiversificationChart;
