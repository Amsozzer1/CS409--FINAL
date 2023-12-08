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



export default function AdvSearch(props){
    const sendData = (mes)=>{
        props.parentCallback(mes);
    };

// <<<<<<< wangzhe

    const {user} = useUser();
    const events = user.getEvents();
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedTime, setSelectedTime] = React.useState(null);
    const [destinations, setDestinations] = useState([{ id: uuidv4(), name: '' }]);

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

    const [walkTripInfo, setWalkTripInfo] = useState([]);
    const [busTripInfo, setBusTripInfo] = useState([]);

    const [routeShape, setRouteShape] = useState(null);

    const [currRoute, setCurrRoute] = useState("");
    const [vehicles, setVehicles] = useState([]);


    async function getPlannedTrip() {
        const URL = `https://developer.mtd.org/api/v2.2/json/getplannedtripsbylatlon?key=ca74c75b34e64cc9bde55c9714918493&origin_lat=${origin.lat}&origin_lon=${origin.lon}&destination_lat=${destination.lat}&destination_lon=${destination.lon}`;
      
        try {
            const response = await fetch(URL);
            const data = await response.json();
            const currItinerary = data.itineraries[0];


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
            
            console.log(walkTrip);
            // console.log(busTrip);


          } catch (error) {
            console.error('Error fetching stop data: ', error);
          }
    }

    async function getWalkInfo() {
        let walkInfo = [];
        let walkResult = [];
        for (let i = 0; i < walkTrip.length; ++i) {
            let walk = {};
            walk.origin = walkTrip[i].walk.begin;
            walk.destnation = walkTrip[i].walk.end;

            walkInfo.push(walk);

            const directionsService = new google.maps.DirectionsService();
            const results = await directionsService.route({
                origin: { lat: walk.origin.lat, lng: walk.origin.lon },
                destination: { lat: walk.destnation.lat, lng: walk.destnation.lon },
                travelMode: google.maps.TravelMode.WALKING,   
            });

            walkResult.push(results);
        }

        // console.log(walkResult);

        setWalkTripInfo(walkResult);
        console.log(walkTripInfo);
    }

    async function getBusInfo() {
        let busInfo = [];
        for (let i = 0; i < busTrip.length; ++i) {
            let bus = {};
            let service = busTrip[i].services[0]

            const URL = `https://developer.mtd.org/api/v2.2/json/getshape?key=ca74c75b34e64cc9bde55c9714918493&shape_id=${service.trip.shape_id}`;
            try {
                const response = await fetch(URL);
                const data = await response.json();

                bus.shape = data.shapes;
            } catch (error) {
                console.error('Error fetching stop data: ', error);
            }



            bus.origin = service.begin.stop_id;
            bus.destination = service.end.stop_id;
            bus.route = service.route.route_id;
            // bus.shape = service.trip.shape_id;
            bus.trip = service.trip.trip_id;

            busInfo.push(bus);
        }

        setBusTripInfo(busInfo);

        // console.log(busTripInfo);
    }

    async function getVehicles() {
        const vehicleURL = `https://developer.mtd.org/api/v2.2/json/getvehiclesbyroute?key=ca74c75b34e64cc9bde55c9714918493&route_id=${currRoute}`;
      
        try {
            const response = await fetch(vehicleURL);
            const data = await response.json();

            // console.log(data);

            const currVehicles = data.vehicles;
            

            setVehicles(currVehicles);
            
            // console.log(vehicles);


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

        getWalkInfo();
        getBusInfo();

        if (busTripInfo.length > 0) {
            // console.log(busTripInfo);
            setCurrRoute(busTripInfo[0].route);
        }

        if (currRoute !== "") {
            getVehicles();
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

                height: 'fit-content',
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
                    {events.map( (event, index) => (
                        <MenuItem key = {index} value = {EventSource.name}>
                            {EventSource.name}
                        </MenuItem>
                    ))}
                </Select>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    label="Departure Time"
                    value={selectedTime}
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
                    setSelectedTime(newValue);
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
                    value={selectedTime}
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
                    setSelectedTime(newValue);
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="hh:mm AM/PM"  
                    />
                    )}
                />
                </LocalizationProvider> 

                {destinations.map((destination, index) => (
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
                </Box>
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
