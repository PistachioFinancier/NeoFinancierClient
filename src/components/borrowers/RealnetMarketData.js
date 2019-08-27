import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import realnetCSV from "../../resources/realnetUpdated.csv";
import PieChart from "./PieChart";

function RealnetMarketData() {
  const [parsedRealnetData, setParsedRealnetData] = useState();
  const [propertyData, setPropertyData] = useState({});
  const [pieChartData, setPieChartData] = useState();

  useEffect(() => {
    parseData(realnetCSV, updateParsedRealnetData);
  }, []);

  useEffect(() => {
    if (parsedRealnetData) {
      filterDataByPropertyType();
    }
  }, [parsedRealnetData]);

  useEffect(() => {
    if (
      propertyData.office &&
      propertyData.apartment &&
      propertyData.hotel &&
      propertyData.iCILand &&
      propertyData.industrial &&
      propertyData.residentialLand &&
      propertyData.retail
    ) {
      const totalPropertyCount = parsedRealnetData.length;
      const totalOffices = propertyData.office.length;
      const totalApartments = propertyData.apartment.length;
      const totalHotels = propertyData.hotel.length;
      const totalICILands = propertyData.iCILand.length;
      const totalIndustrials = propertyData.industrial.length;
      const totalResidentialLands = propertyData.residentialLand.length;
      const totalRetail = propertyData.retail.length;

      setPieChartData([
        {
          y: totalOffices,
          label: propertyData.office[0].Category,
          percentage: (totalOffices / totalPropertyCount).toFixed(2) * 100
        },
        {
          y: totalApartments,
          label: propertyData.apartment[0].Category,
          percentage: (totalApartments / totalPropertyCount).toFixed(2) * 100
        },
        {
          y: totalHotels,
          label: propertyData.hotel[0].Category,
          percentage: (totalHotels / totalPropertyCount).toFixed(2) * 100
        },
        {
          y: totalICILands,
          label: propertyData.iCILand[0].Category,
          percentage: (totalICILands / totalPropertyCount).toFixed(2) * 100
        },
        {
          y: totalIndustrials,
          label: propertyData.industrial[0].Category,
          percentage: (totalIndustrials / totalPropertyCount).toFixed(2) * 100
        },
        {
          y: totalResidentialLands,
          label: propertyData.residentialLand[0].Category,
          percentage:
            (totalResidentialLands / totalPropertyCount).toFixed(2) * 100
        },
        {
          y: totalRetail,
          label: propertyData.retail[0].Category,
          percentage: (totalRetail / totalPropertyCount).toFixed(2) * 100
        }
      ]);
    }
  }, [propertyData]);

  const filterDataByPropertyType = () => {
    setPropertyData({
      office: parsedRealnetData.filter(item => item.Category === "Office"),
      apartment: parsedRealnetData.filter(
        item => item.Category === "Apartment"
      ),
      hotel: parsedRealnetData.filter(item => item.Category === "Hotel"),
      iCILand: parsedRealnetData.filter(item => item.Category === "ICILand"),
      industrial: parsedRealnetData.filter(
        item => item.Category === "Industrial"
      ),
      residentialLand: parsedRealnetData.filter(
        item => item.Category === "ResidentialLand"
      ),
      retail: parsedRealnetData.filter(item => item.Category === "Retail")
    });
  };

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
    <PieChart pieChartData={pieChartData} tableData={propertyData}></PieChart>
  );
}

export default RealnetMarketData;
