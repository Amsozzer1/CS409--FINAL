/* eslint-disable no-undef */
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import {Input} from '@mui/material';
import {Search} from '@mui/icons-material';
import Results from '../AdvanceSearch/Results.js';
import {useLoadScript,Autocomplete } from '@react-google-maps/api';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import '../index.css';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import '../index.css';

const libraries = ['places'];

export var ROUTE = '';
/* CHANGE DATA TO UPDATE RESULTS AND ALSO CHANGE AVATAR
    FROM Results.js*/
const data = [
    
   
    
  ];
/* CHANGE DATA TO UPDATE RESULTS (fecth from backend based on
    the search query?)
*/



export default function AdvSearch(props){
    const sendData = (mes)=>{
        props.parentCallback(mes);
    };

    const [open, setOpen] = React.useState(false);
    const [center, setCenter] = React.useState({ lat: 40.110558, lng: -88.228333 });
    const [directionResponse, setDirectionResponse] = React.useState(null);
    const [distance, setDistance] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [long, setLong] = React.useState(0);
    const [lat, setLat] = React.useState(0);
    const [destination, setDestination] = React.useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedTime, setSelectedTime] = React.useState(null);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

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
    navigator.geolocation.getCurrentPosition(function(position) {
    //console.log(position.coords.longitude);
    setLong(position.coords.longitude);
    setLat(position.coords.latitude);
    });    

    async function calculateRoute()
    {
        if(destination !== ''|| (lat !== 0 && long !== 0))
        {
           console.log("HERE "+destination);
           console.log("HERE "+lat);
           console.log("HERE "+long);
           const directionsService = new google.maps.DirectionsService();
           const results = await directionsService.route({
            origin: { lat: lat, lng: long },
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            
            }
            );
            setDirectionResponse(results);
            setDistance(results.routes[0].legs[0].distance.text);
            setDuration(results.routes[0].legs[0].duration.text);
            console.log(directionResponse);
            console.log(distance);
            console.log(duration);
            ROUTE = directionResponse;
            return <h1>Results:{directionResponse}
            <br></br>
            Distance: {distance}
            <br></br>
            Duration: {duration}
            </h1>

        }
        else{
            return;
        }
    }

    return (
        <div style={{ position: 'relative', zIndex: 2 }}>
        <Box
        sx={{
            position: 'absolute',
            top: '5vh',
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
                    <MenuItem value="destination1">Event 1</MenuItem>
                    <MenuItem value="destination2">Event 2</MenuItem>
                    <MenuItem value="destination3">Event 3</MenuItem>
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
                    onClick={
                        ()=>{
                            calculateRoute();
                        
                            setDestination(document.getElementsByName('destination')[0].value);
                        }
                    }
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
            <Results data={data}></Results>
            
            
        </Box>
        </div>
    );
}