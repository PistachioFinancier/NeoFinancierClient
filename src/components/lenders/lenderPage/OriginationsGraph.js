import React from "react";
import { Line } from "react-chartjs-2";

function OriginationsGraph(props) {
  const data = {
    labels: ["2012", "2013", "2014", "2015", "2016"],
    datasets: [
      {
        label: "Data 1",
        data: [10, 50, 25, 70, 40],
        backgroundColor: "blue",
        borderColor: "lightblue",
        fill: false,
        lineTension: 0,
        radius: 5
      },
      {
        label: "Data 2",
        data: [20, 35, 40, 60, 50],
        backgroundColor: "green",
        borderColor: "lightgreen",
        fill: false,
        lineTension: 0,
        radius: 5
      }
    ]
  };

  //options
  const options = {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "Line Graph",
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#333",
        fontSize: 16
      }
    }
  };

  return <Line data={data} options={options} />;
}

export default OriginationsGraph;
