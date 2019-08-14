import React, { useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import Geocode from "react-geocode";

const apiKey = "AIzaSyC3fatvZECW_8oamH3dFXefvaZ1ro2diXU";

Geocode.setApiKey(apiKey);

function LenderMap(props) {
  const [places, setPlaces] = useState([
    {
      title: "Toronto",
      name: "Toronto",
      address: "301 Front St W, Toronto",
      coordinates: { lat: 43.642567, lng: -79.387054 }
    }
  ]);

  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const mapStyles = {
    width: "70%",
    height: "70%",
    position: "relative"
  };

  useEffect(() => {
    const fetchPlacesData = async places => {
      const result = await getAddresses(places);
      setPlaces(result);
    };
    fetchPlacesData(props.places);
  }, [props.places]);

  /**
   * Returns an array of JSONs containing the given location information
   * and the coordinates for each one of them.
   * @param {{Title: String, Name: String, Address: String}[]} places
   */
  const getAddresses = async places => {
    /**
     * Returns a promise that would return a JSON with the given location
     * information, plus its coordinates.
     * @param {{Title: String, Name: String, Address: String}} place
     */
    const GeoPromise = place =>
      new Promise((resolve, reject) => {
        Geocode.fromAddress(place.address).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            resolve({ ...place, coordinates: { lat, lng } });
          },
          error => {
            console.log(place.address + " has failed");
            resolve(null); // Even if we fail, we still want to display the rest of the locations
          }
        );
      });

    const result = await Promise.all(
      places.map(place => GeoPromise(place))
    ).then(result => result.filter(place => place)); // Remove null values
    return result;
  };

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };

  const onMapClicked = props => {
    if (showInfoWindow) {
      setShowInfoWindow(false);
      setActiveMarker(null);
    }
  };

  const selectedPlaceInfo = showInfoWindow ? (
    <div>
      <h1 style={{ textAlign: "center" }}>{selectedPlace.name}</h1>
      <h4 style={{ textAlign: "center" }}>
        {selectedPlace.clientPlace.address}
      </h4>
      <table>
        <tr>
          <td>
            <div>
              <img
                src={
                  "https://maps.googleapis.com/maps/api/streetview?location=" +
                  activeMarker.clientPlace.address +
                  "&size=175x175&key=" +
                  apiKey
                }
                alt={"Image of " + selectedPlace.name}
              />
            </div>
          </td>
          <td>
            <div style={{ marginLeft: "10px", marginTop: "10px" }}>
              <h4>Value:</h4>
              <p>{activeMarker.clientPlace.value}</p>
              <br />
              <h4>Loan Amount:</h4>
              <p>{activeMarker.clientPlace.loan_amount}</p>
              <br />
              <h4>Expiry Date:</h4>
              <p>{activeMarker.clientPlace.expiry_date}</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  ) : (
    <div></div>
  );

  // Create the bounds to center the map
  const points = places.map(place => place.coordinates);
  const bounds = new props.google.maps.LatLngBounds();
  for (let i = 0; i < points.length; i++) {
    bounds.extend(points[i]);
  }

  return (
    <div>
      <Map
        google={props.google}
        zoom={4}
        style={mapStyles}
        initialCenter={props.center}
        scrollwheel={false}
        onClick={onMapClicked}
        bounds={bounds}
      >
        {places.map(place => (
          <Marker
            key={place.address}
            title={place.title}
            name={place.name}
            position={place.coordinates}
            onClick={onMarkerClick}
            clientPlace={place}
          />
        ))}
        <InfoWindow marker={activeMarker} visible={showInfoWindow}>
          {selectedPlaceInfo}
        </InfoWindow>
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey
})(LenderMap);
