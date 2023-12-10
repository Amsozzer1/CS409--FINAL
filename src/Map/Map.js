import React from 'react';
import { GoogleMap, useLoadScript,Marker, MarkerF,DirectionsRenderer,InfoWindow, Polyline } from '@react-google-maps/api';
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

  // console.log(data);

  const [long, setLong] = React.useState(0);
  const [lat, setLat] = React.useState(0);
  
  const [navigate, setNavigate] = React.useState(false);

  const [currentLocation, setCurrentLocation] = React.useState(null);

  const walkRoute = data.walk;
  const busRoute = data.bus;
  const vehicle = data.vehicle;

  console.log(data);
  console.log(walkRoute);
  console.log(busRoute);
  console.log(vehicle);

  console.log(typeof busRoute);

  

  var routeCoord = [];
  if (busRoute !== undefined) {
    for (let i = 0; i < busRoute.length; ++i) {
      // const routeCoords = [];
      // const singleRoute = busRoute[i];
  
      // for (let j = 0; j < singleRoute.length; ++j) {
      //   const singleCoord = {};
      //   singleCoord['lat'] = singleRoute.
      //   routeCoords = {...routeCoords, }
      // }
  
      const singleRoute = busRoute[i];
      const pathCoordinates = singleRoute.map(
        point => (
          {
            lat: point.shape_pt_lat,
            lng: point.shape_pt_lon
          }
        )
      );
  
      routeCoord = routeCoord.concat(pathCoordinates);
    }

    console.log(routeCoord);
    console.log(routeCoord[0]);
  }
  

  // const routePath = new google.maps.Polyline(
  //   {
  //     path: routeCoord,
  //     geodesic: true,
  //     strokeColor: '#FF0000',
  //     strokeOpacity: 1.0,
  //     strokeWeight: 2
  //   }
  // );



  if (busRoute !== undefined) {
    console.log(typeof busRoute[0]);
  }
 

  // console.log(walkRoute[0]);

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
          {
            routeCoord.length > 0 && 
            <Polyline
          path={routeCoord}
          options={{
            strokeColor: "#4285F4", // Google Maps default route color
            strokeOpacity: 1.0,
            strokeWeight: 4,
          }}
        />
          }
        
          <MarkerF position={currentLocation} />
          {/* <MarkerF position={center} /> */}
          {walkRoute && (
            <DirectionsRenderer directions={walkRoute[0]} />
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



