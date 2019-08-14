import React, { useEffect } from "react";
import { Map, GoogleApiWrapper, Polygon } from "google-maps-react";
import provinces from "../../../resources/provinceCoordinates";

function LenderMap(props) {
  const mapStyles = {
    width: "70%",
    height: "70%",
    position: "relative"
  };

  useEffect(() => {
    populateProvincesToHighlight();
  });

  const provincesToHighlight = [];

  const populateProvincesToHighlight = () => {
    for (let i of props.provinces) {
      if (i === "BC" || i === "NL") {
        provincesToHighlight.push(...provinces[`${i}`]);
      } else {
        provincesToHighlight.push(provinces[`${i}`]);
      }
    }
  };

  return (
    <Map
      google={props.google}
      zoom={4}
      style={mapStyles}
      initialCenter={props.center}
      scrollwheel={false}
    >
      <Polygon
        paths={provincesToHighlight}
        strokeColor="#0000FF"
        strokeOpacity={0.4}
        strokeWeight={2}
        fillColor="#0000FF"
        fillOpacity={0.2}
      />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC3fatvZECW_8oamH3dFXefvaZ1ro2diXU"
})(LenderMap);
