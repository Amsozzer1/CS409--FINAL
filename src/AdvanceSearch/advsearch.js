/* eslint-disable no-undef */
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import {Input} from '@mui/material';
import {Search} from '@mui/icons-material';
import Results from '../AdvanceSearch/Results.js';
import {useLoadScript,Autocomplete } from '@react-google-maps/api';

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



export default function AdvSearch(){

    const [open, setOpen] = React.useState(false);
    const [center, setCenter] = React.useState({ lat: 40.110558, lng: -88.228333 });
    const [directionResponse, setDirectionResponse] = React.useState(null);
    const [distance, setDistance] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCG8MUFrbUkfNNxhg-gcs-DM5Rku9pSsHM',
        libraries,
      });
      const [long, setLong] = React.useState(0);
      const [lat, setLat] = React.useState(0);
      const [destination, setDestination] = React.useState('');
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
        <Box
        sx={{
            position: 'absolute',
            top: '150px',
            left: '20px',
        }}
        >
            
            {open? 
            <Box
            sx={{

                height: '300px',
                width: '240px',
                backgroundColor: '#ABABAB',
                opacity: '0.7',
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
                        opacity: '0.7',
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
                        opacity: '0.7',
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
                        opacity: '0.7',
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
                        opacity: '0.7',
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
                opacity: '0.7',
                
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
                        opacity: '0.7',
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
    );
}