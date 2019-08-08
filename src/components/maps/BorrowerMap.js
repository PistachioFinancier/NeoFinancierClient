import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Geocode from "react-geocode";

function BorrowerMap(props) {
  const [coordinates, setCoordinates] = useState([]);

  const mapStyles = {
    width: "70%",
    height: "70%",
    position: "relative"
  };

  useEffect(() => {
    setCoordinates(props.coordinates[0]);
  }, [props.coordinates[0]]);

  let marker = [];

  marker.push(
    <Marker
      title={"The marker`s title will appear as a tooltip."}
      name={"SOMA"}
      position={coordinates}
    />
  );

  if (props.coordinates[0]) {
    return (
      <div>
        <Map
          google={props.google}
          zoom={4}
          style={mapStyles}
          initialCenter={props.center}
          scrollwheel={false}
        >
          {marker}
        </Map>
      </div>
    );
  } else {
    return <div>Loading Map...</div>;
  }
}

export default BorrowerMap;
