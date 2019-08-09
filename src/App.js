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
      address: "100 City Centre Dr, Mississauga, Ontario"
    },
    {
      title: "Tim Hortons",
      name: "Tim Hortons",
      address: "30 Eglinton Ave W Unit C14, Mississauga, Ontario"
    },
    {
      title: "UTM",
      name: "UTM",
      address: "University of Toronto Mississauga"
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
