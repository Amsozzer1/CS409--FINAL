/* eslint-disable no-undef */
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import {Input} from '@mui/material';
import {Search} from '@mui/icons-material';
// <<<<<<< wangzhe
import Results from './Results.js';
import {useLoadScript,Autocomplete,DirectionsRenderer } from '@react-google-maps/api';
// import { DESTINATION } from '../Map/Map.js';

import { useState, useEffect, useRef } from 'react';

// =======
// import Results from '../AdvanceSearch/Results.js';
// import {useLoadScript,Autocomplete } from '@react-google-maps/api';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

// import { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// >>>>>>> main
import '../index.css';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import '../index.css';
import { useUser } from '../User/User.js';
const libraries = ['places'];

export var ROUTE = '';
/* CHANGE DATA TO UPDATE RESULTS AND ALSO CHANGE AVATAR
    FROM Results.js*/
// const data = [
    
//     {
//         id: 1,
//         name: 'Hawaii',
//         email: 'abc@gmail.com',
//         sirName: 'Hawaii',

//     }
    
//   ];
/* CHANGE DATA TO UPDATE RESULTS (fecth from backend based on
    the search query?)
*/


export var BUS = '';

const TripDetails = ({ tripData }) => {
    if (!tripData || !Array.isArray(tripData) || tripData.length === 0) {
      console.error('Invalid or empty trip data: ', tripData);
      return <p>Loading or invalid data...</p>;
    }
  
    ////console.log(tripData);
  
    return (
        <Box>
        {
          tripData.length>0?
          (<Box
            sx={
                {
                    position: 'relative',
                    top: '10px',
                    left: '0px',
                    zIndex: '2',
                
                }
            }
            >
                
                <Box
                    sx={{
        
                        height: 'auto',
                        width: '265px',
                        backgroundColor: '#ABABAB',
                        opacity: '0.9',
                        borderRadius: '5px',
                        paddingBottom: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        
                    }}
                    >
                      <Button
                        sx={{
                            position: 'relative',
                            color: 'black',
                            backgroundColor: '#D9D9D9',
                            borderRadius: '5px',
                            width: '265px',
                            height: '30px',
                            
                            
        
        
                            
                        }}
                        >
        
                            
                            <p
                            style={{
                                position: 'relative',
                                right: '80px',
                            }}
                            >Results</p>
                        </Button>
                        
                        <h2>Trip Details</h2>
        {tripData.map((leg, index) => {
          if (leg.type === 'Walk') {
            return (
              <div key={index}>
                <p>Leg {index + 1}</p>
                <p>Type: {leg.type}</p>
                <p>Begin: {leg.walk.begin.name}</p>
                <p>End: {leg.walk.end.name}</p>
                <p>Distance: {leg.walk.distance} miles</p>
                <p>Direction: {leg.walk.direction}</p>
                <hr></hr>
              </div>
            );
          } else if (leg.type === 'Service' && leg.services && leg.services.length > 0) {
            const service = leg.services[0]; // Assuming only one service in the array for simplicity
            return (
              <div key={index}>
                <p>Leg {index + 1}</p>
                <p>Type: {leg.type}</p>
                <p>From: {service.begin.name}</p>
                <p>To: {service.end.name}</p>
                <p>Route: {service.route.route_short_name}</p>
                <p>Trip Headsign: {service.trip.trip_headsign}</p>
                <hr></hr>
              </div>
            );
          } else {
            return null; // Handle other types if needed
          }
        })}
                        
                        
                
            
            </Box>
            </Box>):null
        }
      </Box>
    );
  };



export default function AdvSearch(props){
    const sendData = (mes)=>{
        props.parentCallback(mes);
    };

    const [map, setMap] = useState(null);
    const [directions, setDirections] = useState(null);
    const [open, setOpen] = useState(false);
    const [center, setCenter] = useState({ lat: 40.110558, lng: -88.228333 });
    const [directionResponse, setDirectionResponse] = useState(null);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [long, setLong] = useState(-88.22884);
    const [lat, setLat] = useState(40.11644);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedTime, setSelectedTime] = React.useState(null);
    const [destinations, setDestinations] = useState([{ id: uuidv4(), name: '' }]);

    const [data, setData] = useState([]);
   
    const [trips, setTrips] = useState([]);

    const [departureTime, setDepartureTime] = React.useState(null);
    const [arrivalTime, setArrivalTime] = React.useState(null);


    const [coordinates, setCoordinates] = useState(null);

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const [origin, setOrigin] = useState({lat: 40.12233, lon: -88.29619});
    const [destination, setDestination] = useState({lat: 40.11626, lon: -88.25783});

    const [itinerary, setItinerary] = useState(null);

    const [walkTrip, setWalkTrip] = useState([]);
    const [busTrip, setBusTrip] = useState([]);

    const [walkTripInfo, setWalkTripInfo] = useState([]);
    const [busTripInfo, setBusTripInfo] = useState([]);

    const [routeShape, setRouteShape] = useState(null);

    const [currRoute, setCurrRoute] = useState("");
    const [vehicles, setVehicles] = useState([]);

    
    const {user} = useUser();
    const events = user.getEvents();

    const now = new Date();
    const twoDaysLater = new Date( now.getTime() + ( 2*24*60*60*1000 ) );

    const upcomingEvents = events.filter( event => {
        const eventStart = new Date( event.start );
        return eventStart >= now && eventStart <= twoDaysLater;
    });

    const getDirections = async () => {
        const directionsService = new window.google.maps.DirectionsService();
    
        const request = {
          origin: new window.google.maps.LatLng(origin.lat, origin.lon),
          destination: new window.google.maps.LatLng(destination.lat, destination.lon),
          travelMode: window.google.maps.TravelMode.WALKING, // or DRIVING, depending on your use case
        };
    
        directionsService.route(request, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error('Error fetching directions:', status);
          }
        });
    };

    useEffect(() => {
        // Fetch directions when origin/destination changes
        getDirections();
    }, [origin, destination]);

    const getCoordinatesFromPlaceId = (placeId) => {
        const map = new window.google.maps.Map(document.createElement('div'));
        const placesService = new window.google.maps.places.PlacesService(map);

        placesService.getDetails({ placeId }, (place, status) => {
            if (status === 'OK') {
                const { geometry } = place;
                // //console.log(place);
                // //console.log(geometry);
                const { location } = geometry;
                const loc = { lat: location.lat(), lng: location.lng() };
                setTimeout(() => {
                    setCoordinates(loc);
                    setDestination({lat: loc.lat, lon: loc.lng});
                }, 1);
                // //console.log(loc);
                // //console.log(destination);
            } else {
                console.error('Error fetching place details:', status);
            }
        });
    };

    function onLoad(autocomplete) {
        // //console.log("Enter onLoad");
        setSearchResult(autocomplete);
    }

    async function onPlaceChanged() {
        // //console.log("Enter onPlaceChanged");
        if (searchResult === null) {
            return;
        }
        const place = searchResult.getPlace();
        // //console.log(place);
        setSelectedPlace(place);
        getCoordinatesFromPlaceId(place.place_id);
        // const { lat, lng } = placeDetails.geometry.location;
        // //console.log(`Latitude: ${lat}, Longitude: ${lng}`);

        // //console.log(destination);
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        const newDayjsObject = dayjs(event.target.value.start);
        setArrivalTime( newDayjsObject );
    }



    const addDestination = () => {
        setDestinations([...destinations, { id: uuidv4(), name: '' }]);
    };

    const removeDestination = (id) => {
        setDestinations(destinations.filter(dest => dest.id !== id));
        };

    const handleDestinationChange = (id, newValue) => {
        const newDestinations = destinations.map(dest => {
            if (dest.id === id) {
            return { ...dest, name: newValue };
            }
            return dest;
        });
        setDestinations(newDestinations);
        };



    

    // const [open, setOpen] = useState(false);
    // const [center, setCenter] = useState({ lat: 40.110558, lng: -88.228333 });
    // const [directionResponse, setDirectionResponse] = useState(null);
    // const [distance, setDistance] = useState(0);
    // const [duration, setDuration] = useState(0);
    // const [long, setLong] = useState(-88.22884);
    // const [lat, setLat] = useState(40.11644);
    

    // const [data, setData] = useState([]);
   

    // const [origin, setOrigin] = useState({lat: 40.12233, lon: -88.29619});
    // const [destination, setDestination] = useState({lat: 40.11626, lon: -88.25783});

    // const [itinerary, setItinerary] = useState(null);

    // const [walkTrip, setWalkTrip] = useState([]);
    // const [busTrip, setBusTrip] = useState([]);

    // const [walkTripInfo, setWalkTripInfo] = useState([]);
    // const [busTripInfo, setBusTripInfo] = useState([]);

    // const [routeShape, setRouteShape] = useState(null);

    // const [currRoute, setCurrRoute] = useState("");
    // const [vehicles, setVehicles] = useState([]);


    async function getPlannedTrip() {
        let URL = ``;
        if( departureTime != null ){
            console.log( "departure case" );
            const formattedDepartureTime = departureTime.format('YYYY-MM-DDTHH:mm:ss');
            
            const date = formattedDepartureTime.substring(0,10);
            const time = formattedDepartureTime.substring(11,16);
            // console.log(date);
            // console.log(time);
            URL = `https://developer.mtd.org/api/v2.2/json/getplannedtripsbylatlon?key=ca74c75b34e64cc9bde55c9714918493&origin_lat=${origin.lat}&origin_lon=${origin.lon}&destination_lat=${destination.lat}&destination_lon=${destination.lon}&date=${date}&time=${time}&arrive_depart=depart`;
            // console.log(URL);
        }
        else if( arrivalTime != null ){
            console.log( "arrival case" );

            const formattedArrivalTime =arrivalTime.format( 'YYYY-MM-DDTHH:mm:ss' );
            const date = formattedArrivalTime.substring(0,10);
            const time = formattedArrivalTime.substring(11, 16);
            URL = `https://developer.mtd.org/api/v2.2/json/getplannedtripsbylatlon?key=ca74c75b34e64cc9bde55c9714918493&origin_lat=${origin.lat}&origin_lon=${origin.lon}&destination_lat=${destination.lat}&destination_lon=${destination.lon}&date=${date}&time=${time}&arrive_depart=arrive`;
        }
        else{
            console.log( "normal case" );
            URL = `https://developer.mtd.org/api/v2.2/json/getplannedtripsbylatlon?key=ca74c75b34e64cc9bde55c9714918493&origin_lat=${origin.lat}&origin_lon=${origin.lon}&destination_lat=${destination.lat}&destination_lon=${destination.lon}`;  
        }
        try {
            const response = await fetch(URL);
            const data = await response.json();
            const currItinerary = data.itineraries[0];

            console.log(data);
            // //console.log(currItinerary);

            if (currItinerary === undefined || currItinerary === null) {
                return;
            }

            setTimeout(() => {
                setTrips(currItinerary.legs);
            }, 1);

            // //console.log(trips);

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

            setTimeout(() => {
                setItinerary(data.itineraries[0]);
                setWalkTrip(walkTrips);
                setBusTrip(busTrips);
            }, 1);
          } catch (error) {
            console.error('Error fetching stop data: ', error);
          }
    }

    async function getWalkInfo() {
         // setTimeout(() => {
            // let walkInfo = [];
            let walkResult = [];
            for (let i = 0; i < walkTrip.length; ++i) {
                let walk = {};
                walk.origin = walkTrip[i].walk.begin;
                walk.destnation = walkTrip[i].walk.end;

                // walkInfo.push(walk);

                const directionsService = new google.maps.DirectionsService();
                const results = directionsService.route({
                    origin: { lat: walk.origin.lat, lng: walk.origin.lon },
                    destination: { lat: walk.destnation.lat, lng: walk.destnation.lon },
                    travelMode: google.maps.TravelMode.WALKING,   
                });

                walkResult.push(results);
            }

            // //console.log(walkResult);
            setTimeout(() => {
                setWalkTripInfo(walkResult);
            }, 1);  
            // //console.log(walkTripInfo);
        // }, 10000);   
    }

    async function getBusInfo() {
         //await getPlannedTrip();
        
        // setTimeout(() => {
            let busInfo = [];
            for (let i = 0; i < busTrip.length; ++i) {
                let bus = {};
                let service = busTrip[i].services[0]

                bus.origin = service.begin.stop_id;
                bus.destination = service.end.stop_id;
                bus.route = service.route.route_id;

                busInfo.push(bus);
            }

            setTimeout(() => {
                setBusTripInfo(busInfo);
            }, 1);    

            // //console.log(busTripInfo);
        // }, 10000); 
    }

    async function getVehicles() {
        const URL = `https://developer.mtd.org/api/v2.2/json/getvehiclesbyroute?key=ca74c75b34e64cc9bde55c9714918493&route_id=${currRoute}`;
      
        try {
            const response = await fetch(URL);
            const data = await response.json();

            // //console.log(data);

            const currVehicles = data.vehicles;
            

            // //console.log(currVehicles);
            setTimeout(() => {
                setVehicles(currVehicles);
            }, 1);  
            
            // //console.log(vehicles);


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

        // //console.log(itinerary);

         getBusInfo();
        if (busTripInfo.length > 0) {
            setTimeout(() => {
                setCurrRoute(busTripInfo[0].route);
            }, 1);  
        }

         getWalkInfo();

        if (currRoute !== "") {
            getVehicles();
        }

        const routeInfo = {};
        routeInfo['walk'] = walkTripInfo;
        routeInfo['bus'] = busTripInfo;
        routeInfo['vehicle'] = vehicles;

        sendData(routeInfo);

        return(<TripDetails tripData ={trips}></TripDetails>);
    }

    return (
        <Box
        sx={{
            position: 'absolute',
            top: '150px',
            left: '20px',
            zIndex: '2'
        }}
        >
            
            {open? 
            <Box
            sx={{
                width: '265px',
                backgroundColor: '#ABABAB',
                borderRadius: '5px',
                opacity: '0.9',
                paddingBottom: '10px'
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
                <Button onClick={handleSearch}>
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
                    marginLeft: '10px'
                }}
                >
                <Select
                    id="my-dropdown"
                    value={selectedValue}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                        width: '213.171px',
                        height: '55.984px',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        opacity: '0.9',
                        color: 'black',
                        '& .MuiSelect-select': {
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        }
                    }}
                    >
                    <MenuItem value="">
                        <em>Event in next two days</em>
                    </MenuItem>
                    {upcomingEvents.map( (event, index) => (
                        <MenuItem key = {index} value = {event}>
                            {event.title}
                        </MenuItem>
                    ))}
                </Select>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    label="Departure Time"
                    value={departureTime}
                    sx={{
                        width: '213.171px',
                        height: '55.984px',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        opacity: '0.9',
                        color: 'black',
                        verticalAlign: 'middle',
                        marginTop: '10px'
                        }}
                    onChange={(newValue) => {
                    setDepartureTime(newValue);
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="hh:mm AM/PM"  
                    />
                    )}
                />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    label="Arrival Time"
                    value={arrivalTime}
                    sx={{
                        width: '213.171px',
                        height: '55.984px',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        opacity: '0.9',
                        color: 'black',
                        verticalAlign: 'middle',
                        marginTop: '10px',
                        }}
                    onChange={(newValue) => {
                    setArrivalTime(newValue);
                    // console.log( "arrival time = ", newValue );
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="hh:mm AM/PM"  
                    />
                    )}
                />
                </LocalizationProvider> 
                <Autocomplete
                    onPlaceChanged={onPlaceChanged}
                    onLoad={onLoad}
                >
                <Input
                    type='text'
                    name='destination'
                    placeholder='Destination'
                    sx={{
                        width: '213.171px',
                        height: '55.984px',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        opacity: '0.9',
                        color: 'black',
                        verticalAlign: 'middle',
                        marginTop: '10px',
                        marginBottom: '10px'
                    }}
                    onChange={(event)=>{

                        console.log(event.target.value);

                    }}
                    ></Input>
                </Autocomplete>
                {/* {destinations.map((destination, index) => (
                    <Box key={destination.id} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Autocomplete>
                        <TextField
                        key={destination.id}
                        value={destination.name}
                        onChange={(e) => handleDestinationChange(destination.id, e.target.value)}
                        label={`Add stop ${index + 1}`}
                        variant="outlined"
                        sx={{
                            width: '213.171px',
                            height: '55.984px',
                            borderRadius: '5px',
                            backgroundColor: 'white',
                            opacity: '0.9',
                            color: 'black',
                            verticalAlign: 'middle',
                            marginTop: '10px',  
                            }}
                        />
                    </Autocomplete>
                    <IconButton onClick={() => removeDestination(destination.id)} color="error" aria-label="remove stop">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    </Box>
                ))}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex', // 右对齐
                    gap: '8px', // 组件之间的间隙
                    }}>
                <IconButton onClick={addDestination} color="primary" aria-label="add stop">
                    <AddCircleOutlineIcon />
                </IconButton>
                <Typography variant="body1">
                    add stop
                </Typography>
                </Box> */}
                </Box>

            </Box>
            : //else
            <Box
            sx={{
                width: '265px',
                backgroundColor: '#ABABAB',
                borderRadius: '5px',
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
                    marginLeft: '10px'
                }}
                >
                <Autocomplete
                    onPlaceChanged={onPlaceChanged}
                    onLoad={onLoad}
                >
                <Input
                    type='text'
                    name='destination'
                    placeholder='Destination'
                    sx={{
                        width: '213.171px',
                        height: '55.984px',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        opacity: '0.9',
                        color: 'black',
                        verticalAlign: 'middle',
                        marginTop: '10px',
                        marginBottom: '10px'
                    }}
                    onChange={(event)=>{

                        console.log(event.target.value);

                    }}
                    ></Input>
                </Autocomplete>
                    <Button
                        onClick={handleSearch}
                        onChange={(event)=>{
                            //console.log(event.target.value);
                            setDestination(event.target.value);
                        }}
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

            {
                trips &&
                
                
                (<TripDetails tripData ={trips}>
                    
                </TripDetails>
                )
            }
            
            {/* <Results data={data}></Results> */}
            
            
        </Box>
        // </div>
    );
};