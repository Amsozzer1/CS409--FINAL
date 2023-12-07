import React from 'react';
import { GoogleMap, useLoadScript,Marker, MarkerF,DirectionsRenderer,InfoWindow } from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';
import AdvSearch,{ROUTE} from '../AdvanceSearch/advsearch';
import Navbar from '../Navbar/Navbar';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const Map = (props) => {
  let data = props.queryResult;

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

  const markerRef = useRef(null);

      
  const [center, setCenter] = useState({ lat:  40.145714753336584, lng:-87.9655735301962 });
  // navigator.geolocation.getCurrentPosition(function(position) {
  //   //console.log(position.coords.longitude);
  //   setLong(position.coords.longitude);
  //   setLat(position.coords.latitude);
  //   setCenter({ lat: lat, lng:long });
  // });
  const [zoom, setZoom] = useState(16);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleOnClick = (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();

    // console.log(`Clicked on: Lat ${clickedLat}, Lng ${clickedLng}`);
    // setCenter({ lat:clickedLat, lng:clickedLng });
    setSelectedLocation({ lat:clickedLat, lng:clickedLng });

  }

  const handleCloseInfoWindow = () => {
    setSelectedLocation(null);
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative', zIndex: 1 }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={center}
          onClick={handleOnClick}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {/* <MarkerF position={currentLocation} icon={iconUrl} /> */}\
          <MarkerF position={currentLocation} />
          <MarkerF position={center} />
          {ROUTE && <DirectionsRenderer directions={ROUTE} />}
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
                onClick={() => {

                  setNavigate(true);
                  
                  
                  
                }}
                
                
                >Navigate</button>
                      {
                        navigate && (
                          <Marker position={{ lat: selectedLocation.lat, lng:selectedLocation.lng }} />
                        )
                      }
                    

              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      
    </div>
  );
};

export default Map;




