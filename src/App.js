import React from "react";
import "antd/dist/antd.css";
import Calculators from "./components/Calculators";
import LenderMap from "./components/maps/LenderMap";
import Test from "./components/maps/Test";

function App() {
  return (
    <div className="App">
      <Calculators />
      <div>
        <LenderMap
          provinces={["ON", "QC"]}
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
      <Test
        addresses={[
          "1360 Rathburn Road East, Mississauga, ON",
          "52 Parkside Drive, Port Moody, BC"
        ]}
        center={{ lat: 52.8415678, lng: -95.153671399999993 }}
      />
    </div>
  );
}

export default App;
