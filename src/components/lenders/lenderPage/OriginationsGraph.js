import React from "react";
import { Line } from "react-chartjs-2";

function OriginationsGraph(props) {
  const data = [
    {
      x: 10,
      y: 20
    },
    {
      x: 15,
      y: 10
    }
  ];

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100
          }
        }
      ]
    }
  };

  return <Line data={data} options={options} />;
}

export default OriginationsGraph;
