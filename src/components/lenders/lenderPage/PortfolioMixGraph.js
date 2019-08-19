import React from "react";
import { Doughnut } from "react-chartjs-2";

function PortfolioMixGraph(props) {
  const data = {
    datasets: [
      {
        data: [100, 33, 45],
        backgroundColor: ["#FF0000", "#13C62B", "#007CFF"],
        hoverBackgroundColor: ["#FF0000", "#13C62B", "#007CFF"]
      }
    ],
    labels: ["Red", "Green", "Blue"]
  };
  const options = {
    cutoutPercentage: 70
  };
  return <Doughnut data={data} options={options} />;
}

export default PortfolioMixGraph;
