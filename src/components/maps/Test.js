import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Geocode from "react-geocode";
import BorrowerMap from "./BorrowerMap";

Geocode.setApiKey("AIzaSyC3fatvZECW_8oamH3dFXefvaZ1ro2diXU");

function Test(props) {
  let coordinates = [];

  Geocode.fromAddress(props.addresses[0]).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;

      coordinates[0] = { lat, lng };
    },
    error => {
      console.error(error);
    }
  );

  return <BorrowerMap coordinates={coordinates}></BorrowerMap>;
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC3fatvZECW_8oamH3dFXefvaZ1ro2diXU"
})(Test);
