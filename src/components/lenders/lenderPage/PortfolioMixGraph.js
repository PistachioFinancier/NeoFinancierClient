import React from "react";
import { Pie } from "react-chartjs-2";

function PortfolioMixGraph(props) {
  const data = {
    datasets: [
      {
        data: [10, 20, 30]
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Red", "Yellow", "Blue"]
  };
  return <Pie data={data} />;
}

export default PortfolioMixGraph;
