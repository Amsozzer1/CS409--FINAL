import React from 'react';
import { GoogleMap, useLoadScript, MarkerF,DirectionsRenderer,InfoWindow } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import {Bus} from '../Bus/bus';
import {Stop} from '../Bus/stop';
//import { GoogleMap, useLoadScript, MarkerF, InfoWindow  } from '@react-google-maps/api';
//import { useState, useEffect } from 'react';

//import Navbar from '../Navbar/Navbar';
//import AdvSearch from '../AdvanceSearch/advsearch';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const busses = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [long, setLong] = React.useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [lat, setLat] = React.useState(0);

      
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [center, setCenter] = useState({ lat: 0, lng:0 });
  navigator.geolocation.getCurrentPosition(function(position) {
    //console.log(position.coords.longitude);
    setLong(position.coords.longitude);
    setLat(position.coords.latitude);
    setCenter({ lat: lat, lng:long });
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [zoom, setZoom] = useState(16);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //const [selectedLocation, setSelectedLocation] = useState(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
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


  return (
    <div>
      <Navbar />
      <div style={{ top: '80px', height: 'calc(100vh - 80px)', width: '100%' }}>
      <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={center}
          onClick={(event)=>{
            const clickedLat = event.latLng.lat();
            const clickedLng = event.latLng.lng();
            
            console.log(`Clicked on: Lat ${clickedLat}, Lng ${clickedLng}`);
            console.log((clickedLat-lat));


          }}

          
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        
        >
          <MarkerF position={center} />
      
        </GoogleMap>
      </div>
      <Bus DATA={{'long':long,'lat':lat}}/>
      <Stop DATA={{'long':long,'lat':lat}}/>     

      
      
    </div>
  );
};

export default busses;
