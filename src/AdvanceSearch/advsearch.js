/* eslint-disable no-undef */
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import {Input} from '@mui/material';
import {Search} from '@mui/icons-material';
import Results from './Results.js';
import {useLoadScript,Autocomplete,DirectionsRenderer } from '@react-google-maps/api';
import { DESTINATION } from '../Map/Map.js';

import { useState, useEffect, useRef } from 'react';

import '../index.css';

const libraries = ['places'];

export var ROUTE = '';
/* CHANGE DATA TO UPDATE RESULTS AND ALSO CHANGE AVATAR
    FROM Results.js*/
// const data = [
    
   
    
//   ];
/* CHANGE DATA TO UPDATE RESULTS (fecth from backend based on
    the search query?)
*/


export var BUS = '';



export default function AdvSearch(props){
    const sendData = (mes)=>{
        props.parentCallback(mes);
    };

    

    const [open, setOpen] = useState(false);
    // const [center, setCenter] = useState({ lat: 40.110558, lng: -88.228333 });
    // const [directionResponse, setDirectionResponse] = useState(null);
    // const [distance, setDistance] = useState(0);
    // const [duration, setDuration] = useState(0);
    // const [long, setLong] = useState(-88.22884);
    // const [lat, setLat] = useState(40.11644);
    

    // const [data, setData] = useState([]);
   

    const [origin, setOrigin] = useState({lat: 40.12233, lon: -88.29619});
    const [destination, setDestination] = useState({lat: 40.11626, lon: -88.25783});

    const [itinerary, setItinerary] = useState(null);

    const [walkTrip, setWalkTrip] = useState([]);
    const [busTrip, setBusTrip] = useState([]);

    const [busTripInfo, setBusTripInfo] = useState([]);

    const [routeShape, setRouteShape] = useState(null);

    const [currRoute, setCurrRoute] = useState("");
    const [vehicles, setVehicles] = useState([]);

    

    // setOrigin({lat: 40.12233, lon: -88.29619})
    // setDestination({lat: 40.11626, lon: -88.25783});

    console.log(origin);
    console.log(destination);

    // const [originStop, setOriginStop] = useState(null);
    // const [destStop, setDestStop] = useState(null);

    // const [stopData, setStopData] = useState([]);
    // const [closestStop, setClosestStop] = useState(null);
    // const [markers, setMarkers] = useState([]);

    async function getPlannedTrip() {
        const URL = `https://developer.mtd.org/api/v2.2/json/getplannedtripsbylatlon?key=ca74c75b34e64cc9bde55c9714918493&origin_lat=${origin.lat}&origin_lon=${origin.lon}&destination_lat=${destination.lat}&destination_lon=${destination.lon}`;
      
        try {
            const response = await fetch(URL);
            const data = await response.json();
            const currItinerary = data.itineraries[0];

            // const startTime = currItinerary.start_time;
            // const endTime = currItinerary.end_time;
            // const travelTime = currItinerary.travel_time;

            const trips = currItinerary.legs;

            // console.log(trips);

            let walkTrips = []
            let busTrips = [];
            if (trips !== null) {
                for (let i = 0; i < trips.length; ++i) {
                    let trip = trips[i];

                    if (trip.type === 'Walk') {
                        walkTrips.push(trip);
                    } else if (trip.type === 'Service') {
                        busTrips.push(trip)
                    }
                }
            }

            setItinerary(data.itineraries[0]);
            setWalkTrip(walkTrips);
            setBusTrip(busTrips);
            
            // console.log(walkTrip);
            // console.log(busTrip);


          } catch (error) {
            console.error('Error fetching stop data: ', error);
          }
    }

    function getBusInfo() {
        let busInfo = [];
        for (let i = 0; i < busTrip.length; ++i) {
            let bus = {};
            let service = busTrip[i].services[0]

            bus.origin = service.begin.stop_id;
            bus.destination = service.end.stop_id;
            bus.route = service.route.route_id;

            busInfo.push(bus);
        }

        setBusTripInfo(busInfo);

        console.log(busTripInfo);
    }

    async function getVehicle() {
        const URL = `https://developer.mtd.org/api/v2.2/json/getvehiclesbyroute?key=ca74c75b34e64cc9bde55c9714918493&route_id=${currRoute}`;
      
        try {
            const response = await fetch(URL);
            const data = await response.json();

            // console.log(data);

            const currVehicles = data.vehicles;
            

            console.log(currVehicles);

            setVehicles(currVehicles);

            // setItinerary(data.itineraries[0]);
            // setWalkTrip(walkTrips);
            // setBusTrip(busTrips);
            
            console.log(vehicles);


          } catch (error) {
            console.error('Error fetching stop data: ', error);
          }
    }



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



    function handleSearch() {
        getPlannedTrip();

        getBusInfo();

        if (busTripInfo.length > 0) {
            setCurrRoute(busTripInfo[0].route);
        }

        if (currRoute !== "") {
            getVehicle();
        }
        


        console.log(itinerary);
    }

    return (
        // <div style={{ position: 'relative', zIndex: 2 }}>
        // <div>
        <Box
        sx={{
            position: 'absolute',
            top: '15vh',
            left: '2.5vh',
        }}
        >
            
            {open? 
            <Box
            sx={{

                height: '300px',
                width: '240px',
                backgroundColor: '#ABABAB',
                opacity: '0.9',
            }}
            >
                <Button
                sx={{
                    color: 'black',
                }}
                >
                    
                        <input type='checkbox'
                        className='checkbox-round'
                        onClick={()=>{
                            if(open === false)
                            {
                                setOpen(true);
                            }
                            else
                            {
                                setOpen(false);
                            }
            

                        }}
                        
                        
                    
                    ></input>
                    
                    <p>AdvanceSearch</p>
                </Button>
                <Button>
                <Search
                    sx={{
                    color: '#E84A27',
                    verticalAlign: 'middle',
                    


                    }}/>
                </Button>
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                <Input
                    type='text'
                    placeholder='Destination'
                    sx={{
                        width: '200px',
                        height: '30px',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        opacity: '0.9',
                        color: 'black',
                        marginLeft: '5px',
                        marginTop: '20px',
                    verticalAlign: 'middle',

                    }}
                    ></Input>
                    <Input
                    type='text'
                    placeholder='Destination'
                    sx={{
                        width: '200px',
                        height: '30px',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        opacity: '0.9',
                        color: 'black',
                        marginLeft: '5px',
                        marginTop: '20px',
                    verticalAlign: 'middle',

                    }}
                    ></Input>
                    <Input
                    type='text'
                    placeholder='Destination'
                    sx={{
                        width: '200px',
                        height: '30px',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        opacity: '0.9',
                        color: 'black',
                        marginLeft: '5px',
                        marginTop: '20px',
                    verticalAlign: 'middle',

                    }}
                    ></Input>
                    <Input
                    type='text'
                    placeholder='Destination'
                    sx={{
                        width: '200px',
                        height: '30px',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        opacity: '0.9',
                        color: 'black',
                        marginLeft: '5px',
                        marginTop: '20px',
                    verticalAlign: 'middle',

                    }}
                    ></Input>
                    
                </Box>
            </Box>
            : //else
            <Box
            sx={{

                height: '150px',
                width: '240px',
                backgroundColor: '#ABABAB',
                opacity: '0.9',
                
            }}
            >
                <Button
                sx={{
                    color: 'black',
                }}
                >                   
                        <input type='checkbox'
                        className='checkbox-round'
                        onClick={()=>{
                            if(open === false)
                            {
                                setOpen(true);
                            }
                            else
                            {
                                setOpen(false);
                            }
                        }}                    
                    ></input>
                    
                    <p>Advanced Search</p>

                    
                </Button>
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                <Autocomplete>
                <Input
                    type='text'
                    name='destination'
                    placeholder='Destination'
                    sx={{
                        width: '200px',
                        height: '30px',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        opacity: '0.9',
                        color: 'black',
                        marginLeft: '30px',
                        marginTop: '20px',
                        verticalAlign: 'middle',

                    }}
                    onChange={(event)=>{

                        console.log(event.target.value);

                    }}
                    ></Input>
                </Autocomplete>
                    <Button
                    onClick={handleSearch}
                    >
                    <Search
                    sx={{
                    color: '#E84A27',
                    verticalAlign: 'middle',
                    marginLeft: '-25px',
                    marginTop: '20px',
                    }}/>
                    </Button>
                </Box>
                
            </Box>
            }
            
            {/* <Results data={data}></Results> */}
            
            
        </Box>
        // </div>
    );
};
