import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";
import { lendersCategorized } from "../../../resources/lenderCategories";
import { usePreventInitialUseEffect } from "../../../scripts/hooks/usePreventInitialUseEffect";

function RealnetMarketDataByLenderCategory({ parsedRealnetData }) {
  const [propertyData, setPropertyData] = useState({});
  const [pieChartData, setPieChartData] = useState();

  useEffect(() => {
    if (parsedRealnetData) {
      filterDataByLenderCategory();
    }
  }, [parsedRealnetData]);

  usePreventInitialUseEffect(() => {
    const temp = [];

    for (let i of Object.keys(propertyData)) {
      temp.push({
        y: propertyData[i].length,
        label: i,
        percentage: Math.round(
          (propertyData[i].length / parsedRealnetData.length) * 100
        )
      });
    }

    setPieChartData(temp);
  }, [propertyData]);

  const filterDataByLenderCategory = () => {
    const tempObject = {};

    parsedRealnetData.forEach(property => {
      const category =
        lendersCategorized[property["Primary Lender 1"]] || "Other";

      !tempObject[category]
        ? (tempObject[category] = [property])
        : tempObject[category].push(property);
    });

    setPropertyData(tempObject);
  };

  return (
    <PieChart pieChartData={pieChartData} tableData={propertyData}></PieChart>
  );
}

export default RealnetMarketDataByLenderCategory;
