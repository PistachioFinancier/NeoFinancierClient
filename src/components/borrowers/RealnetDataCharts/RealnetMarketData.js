import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import realnetCSV from "../../../resources/realnetUpdated.csv";
import RealnetMarketDataByPropertyType from "./RealnetMarketDataByPropertyType";
import RealnetMarketDataByLenderCategory from "./RealnetMarketDataByLenderCategory";

function RealnetMarketData() {
  const [parsedRealnetData, setParsedRealnetData] = useState();

  useEffect(() => {
    parseData(realnetCSV, updateParsedRealnetData);
  }, []);

  const updateParsedRealnetData = parsedData => {
    setParsedRealnetData(parsedData);
  };

  const parseData = (link, callBack) => {
    Papa.parse(link, {
      header: true,
      download: true,
      complete: results => {
        callBack(results.data);
      }
    });
  };

  return (
    <React.Fragment>
      <RealnetMarketDataByPropertyType
        parsedRealnetData={parsedRealnetData}
      ></RealnetMarketDataByPropertyType>
      <RealnetMarketDataByLenderCategory
        parsedRealnetData={parsedRealnetData}
      ></RealnetMarketDataByLenderCategory>
    </React.Fragment>
  );
}

export default RealnetMarketData;
