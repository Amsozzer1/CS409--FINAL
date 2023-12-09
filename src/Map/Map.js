import React from 'react';
import { GoogleMap, useLoadScript,Marker, MarkerF,DirectionsRenderer,InfoWindow } from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';
import AdvSearch,{ROUTE} from '../AdvanceSearch/advsearch.js';
// <<<<<<< wangzhe_new
// import AdvSearch,{ROUTE} from '../AdvanceSearch/advsearch.js';
// =======
// //<<<<<<< wangzhe-handleConflict
// import AdvSearch,{ROUTE} from '../AdvanceSearch/advsearch';
// // <<<<<<< heh
// // //import AdvSearch,{ROUTE} from '../AdvanceSearch/advsearch.js';
// // =======
// // // import AdvSearch,{ROUTE} from '../AdvanceSearch/advsearch.js';
// // >>>>>>> main
// //>>>>>>> main
// >>>>>>> main
import Navbar from '../Navbar/Navbar';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

export var DESTINATION = '';

const Map = (props) => {
  
  let data = props.queryResult;

  console.log(data);

  const [long, setLong] = React.useState(0);
  const [lat, setLat] = React.useState(0);
  
  const [navigate, setNavigate] = React.useState(false);

  const [currentLocation, setCurrentLocation] = React.useState(null);

  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);


      
  const [center, setCenter] = useState({ lat:  40.145714753336584, lng:-87.9655735301962 });

  const [zoom, setZoom] = useState(16);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [dest, setDest] = useState(null);

  const handleOnClick = (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();

    setSelectedLocation({ lat:clickedLat, lng:clickedLng });

  }

  const handleCloseInfoWindow = () => {
    setSelectedLocation(null);
  };

  const handleNavigate =() => {
    setDest(selectedLocation);
    DESTINATION = selectedLocation
  }
 

  return (
    // <div style={{ height: '89vh', width: '100%', position: 'relative', zIndex: 1 }}>
    <div style={{ top: '80px', height: 'calc(100vh - 80px)', width: '100%' }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={currentLocation}
          onClick={handleOnClick}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          <MarkerF position={currentLocation} />
          {/* <MarkerF position={center} /> */}
          {ROUTE && (
            <DirectionsRenderer directions={ROUTE} />
          )}
            {selectedLocation && (
            <InfoWindow
              position={selectedLocation}
              onCloseClick={handleCloseInfoWindow}
            >
              <div>
                {/* Your content for the info window goes here */}
                <h2>Pin</h2>
                <p>Latitude: {selectedLocation.lat}</p>
                <p>Longitude: {selectedLocation.lng}</p>
                <button
                  style={{zIndex:10}}
                  onClick={handleNavigate}>Navigate</button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      
    </div>
  );
};

export default Map;



