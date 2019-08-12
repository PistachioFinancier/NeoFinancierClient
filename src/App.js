import React from "react";
import "antd/dist/antd.css";
import Calculators from "./components/Calculators";
import LenderMap from "./components/maps/LenderMap";
import BorrowerMap from "./components/maps/BorrowerMap";

function App() {
  const places = [
    {
      title: "Square One",
      name: "Square One",
      address: "100 City Centre Dr, Mississauga, Ontario",
      value: "$10,000,000",
      loan_amount: "$5,000,000",
      expiry_date: "2019-10-10"
    },
    {
      title: "Tim Hortons",
      name: "Tim Hortons",
      address: "30 Eglinton Ave W Unit C14, Mississauga, Ontario",
      value: "$5,525,000",
      loan_amount: "$5,550,000",
      expiry_date: "2019-10-31"
    },
    {
      title: "UTM",
      name: "UTM",
      address: "University of Toronto Mississauga",
      value: "$2,000,000",
      loan_amount: "$1,400,000",
      expiry_date: "2019-02-10"
    },
    {
      title: "Old Office",
      name: "Old Office",
      address: "1 University Avenue, Toronto, Ontario",
      value: "$8,325,000",
      loan_amount: "$6,250,000",
      expiry_date: "2018-01-31"
    }
  ];

  return (
    <div className="App">
      <Calculators />
      {/*
      <div>
        <LenderMap
          provinces={["ON", "QC"]}
          center={{ lat: 52.8415678, lng: -95.153671399999993 }}
        />
      </div>
      */}
      <div>
        <BorrowerMap
          places={places}
          center={{ lat: 52.8415678, lng: -95.153671399999993 }}
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default App;
