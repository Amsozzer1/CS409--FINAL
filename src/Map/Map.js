import React from 'react';
import { GoogleMap, useLoadScript, MarkerF,DirectionsRenderer,InfoWindow } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import AdvSearch,{ROUTE} from '../AdvanceSearch/advsearch';
import Navbar from '../Navbar/Navbar';
//import { GoogleMap, useLoadScript, MarkerF, InfoWindow  } from '@react-google-maps/api';
//import { useState, useEffect } from 'react';

//import Navbar from '../Navbar/Navbar';
//import AdvSearch from '../AdvanceSearch/advsearch';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const Map = () => {
  const [long, setLong] = React.useState(0);
  const [lat, setLat] = React.useState(0);

      
  const [center, setCenter] = useState({ lat: 0, lng:0 });
  navigator.geolocation.getCurrentPosition(function(position) {
    //console.log(position.coords.longitude);
    setLong(position.coords.longitude);
    setLat(position.coords.latitude);
    setCenter({ lat: lat, lng:long });
  });
  const [zoom, setZoom] = useState(16);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCG8MUFrbUkfNNxhg-gcs-DM5Rku9pSsHM',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const handleOnClick = (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();

    // console.log(`Clicked on: Lat ${clickedLat}, Lng ${clickedLng}`);
    setCenter({ lat:clickedLat, lng:clickedLng });
    setSelectedLocation({ lat:clickedLat, lng:clickedLng });
  }

  const handleCloseInfoWindow = () => {
    setSelectedLocation(null);
  };

  return (
    <div>
      <Navbar />
      <div style={{ top: '80px', height: 'calc(100vh - 80px)', width: '100%' }}>
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
          <MarkerF position={center} />
          {ROUTE && <DirectionsRenderer directions={ROUTE} />
      }
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
                <button>Navigate</button>
              </div>
            </InfoWindow>
          )}
          {/* <MarkerF position={center} /> */}
        </GoogleMap>
        <AdvSearch />
      </div>
      <AdvSearch />
      
    </div>
  );
};

export default Map;
