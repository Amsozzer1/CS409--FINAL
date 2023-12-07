// /* eslint-disable no-undef */
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { Button } from '@mui/material';
// import {Input} from '@mui/material';
// import {Search} from '@mui/icons-material';
// import Results from './Results.js';
// import {useLoadScript,Autocomplete,DirectionsRenderer } from '@react-google-maps/api';
// import { DESTINATION } from '../Map/Map.js';

// import '../index.css';

// const libraries = ['places'];

// export var ROUTE = '';
// /* CHANGE DATA TO UPDATE RESULTS AND ALSO CHANGE AVATAR
//     FROM Results.js*/
// // const data = [
    
   
    
// //   ];
// /* CHANGE DATA TO UPDATE RESULTS (fecth from backend based on
//     the search query?)
// */


// export var BUS = '';



// export default function AdvSearch(props){
//     const sendData = (mes)=>{
//         props.parentCallback(mes);
//     };

//     const [open, setOpen] = React.useState(false);
//     const [center, setCenter] = React.useState({ lat: 40.110558, lng: -88.228333 });
//     const [directionResponse, setDirectionResponse] = React.useState(null);
//     const [distance, setDistance] = React.useState(0);
//     const [duration, setDuration] = React.useState(0);
//     const [long, setLong] = React.useState(-88.22884);
//     const [lat, setLat] = React.useState(40.11644);
//     const [destination, setDestination] = React.useState(null);

//     const [data, setData] = React.useState([]);

//     navigator.geolocation.getCurrentPosition(function(position) {
//     //console.log(position.coords.longitude);
//     setLong(position.coords.longitude);
//     setLat(position.coords.latitude);
//     });    

//     function getBusInfo(route_id) {
//         const URL = `https://developer.mtd.org/api/v2.2/json/getvehiclesbyroute?key=ca74c75b34e64cc9bde55c9714918493&route_id=${route_id}`;
      
//         try {
//             const response = await fetch(URL);
//             const data = await response.json();
//             const stops = data.departures.map(departure => departure.headsign);
//             setBusData(stops);
//             console.log(stops);
//         } catch (error) {
//             console.error('Error fetching stop data: ', error);
//         }
//     }

//     function ProcessRoute() {
//         // const URL = `https://developer.mtd.org/api/v2.2/json/getdeparturesbystop?key=ca74c75b34e64cc9bde55c9714918493&stop_id=${DATA.stop_id}&count=8`;
      
//         // try {
//         //     const response = await fetch(URL);
//         // const data = await response.json();
//         // const stops = data.departures.map(departure => departure.headsign);
//         // setBusData(stops);
//         // console.log(stops);
//         // } catch (error) {
//         //     console.error('Error fetching stop data: ', error);
//         // }

//         if (ROUTE === null || ROUTE.routs === null) {
//             return;
//         }
//         const routes = ROUTE.routes; // Array of route information
//           const legs = routes[0].legs; // Array of legs (segments) of the route

//           legs.forEach((leg, index) => {
//             console.log(`Leg ${index + 1}:`);
//             console.log(`Duration: ${leg.duration.text}`);
//             console.log(`Distance: ${leg.distance.text}`);

//             // Access transit information
//             if (leg.steps) {
//               leg.steps.forEach((step, stepIndex) => {
//                 if (step.transit) {
//                   console.log(`Step ${stepIndex + 1}:`);
//                   console.log(`Transit mode: ${step.transit.line.vehicle.type}`);
//                   console.log(`Transit line: ${step.transit.line.short_name}`);
//                   console.log(`Departure stop: ${step.transit.departure_stop.name}`);
//                   console.log(`Arrival stop: ${step.transit.arrival_stop.name}`);
//                 }
//               });
//             }
//         });
//     };

//     async function calculateRoute()
//     {
//         if(destination !== null && (lat !== 0 && long !== 0))
//         {
//            console.log("HERE "+destination);
//            console.log("HERE "+lat);
//            console.log("HERE "+long);
//            const directionsService = new google.maps.DirectionsService();
//            const results = await directionsService.route({
//                 origin: { lat: lat, lng: long },
//                 destination: destination,
//                 travelMode: google.maps.TravelMode.TRANSIT,
//             });

//             // console.log(results);

//             if (results === null || results.routes === null || results.routes.length === 0) {
//                 return;
//             }

//             setDirectionResponse(results);
//             setDistance(results.routes[0].legs[0].distance.text);
//             setDuration(results.routes[0].legs[0].duration.text);
//             // console.log(directionResponse);
//             // console.log(distance);
//             // console.log(duration);
//             ROUTE = directionResponse;

//             console.log(ROUTE);

//             getBusInfo();

//             return (
//                 <h1>Results:{directionResponse}
//                     <br></br>
//                     Distance: {distance}
//                     <br></br>
//                     Duration: {duration}
//                 </h1>
//             )
//         } else{
//             return;
//         }
//     }

//     // React.useEffect(() => {
//     //     console.log("dest change");
//     //     setDestination(DESTINATION);
    
//     //     calculateRoute();
//     // }, [DESTINATION]);

//     return (
//         // <div style={{ position: 'relative', zIndex: 2 }}>
//         // <div>
//         <Box
//         sx={{
//             position: 'absolute',
//             top: '15vh',
//             left: '2.5vh',
//         }}
//         >
            
//             {open? 
//             <Box
//             sx={{

//                 height: '300px',
//                 width: '240px',
//                 backgroundColor: '#ABABAB',
//                 opacity: '0.9',
//             }}
//             >
//                 <Button
//                 sx={{
//                     color: 'black',
//                 }}
//                 >
                    
//                         <input type='checkbox'
//                         className='checkbox-round'
//                         onClick={()=>{
//                             if(open === false)
//                             {
//                                 setOpen(true);
//                             }
//                             else
//                             {
//                                 setOpen(false);
//                             }
            

//                         }}
                        
                        
                    
//                     ></input>
                    
//                     <p>AdvanceSearch</p>
//                 </Button>
//                 <Button>
//                 <Search
//                     sx={{
//                     color: '#E84A27',
//                     verticalAlign: 'middle',
                    


//                     }}/>
//                 </Button>
//                 <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//                 >
//                 <Input
//                     type='text'
//                     placeholder='Destination'
//                     sx={{
//                         width: '200px',
//                         height: '30px',
//                         borderRadius: '5px',
//                         backgroundColor: 'white',
//                         opacity: '0.9',
//                         color: 'black',
//                         marginLeft: '5px',
//                         marginTop: '20px',
//                     verticalAlign: 'middle',

//                     }}
//                     ></Input>
//                     <Input
//                     type='text'
//                     placeholder='Destination'
//                     sx={{
//                         width: '200px',
//                         height: '30px',
//                         borderRadius: '5px',
//                         backgroundColor: 'white',
//                         opacity: '0.9',
//                         color: 'black',
//                         marginLeft: '5px',
//                         marginTop: '20px',
//                     verticalAlign: 'middle',

//                     }}
//                     ></Input>
//                     <Input
//                     type='text'
//                     placeholder='Destination'
//                     sx={{
//                         width: '200px',
//                         height: '30px',
//                         borderRadius: '5px',
//                         backgroundColor: 'white',
//                         opacity: '0.9',
//                         color: 'black',
//                         marginLeft: '5px',
//                         marginTop: '20px',
//                     verticalAlign: 'middle',

//                     }}
//                     ></Input>
//                     <Input
//                     type='text'
//                     placeholder='Destination'
//                     sx={{
//                         width: '200px',
//                         height: '30px',
//                         borderRadius: '5px',
//                         backgroundColor: 'white',
//                         opacity: '0.9',
//                         color: 'black',
//                         marginLeft: '5px',
//                         marginTop: '20px',
//                     verticalAlign: 'middle',

//                     }}
//                     ></Input>
                    
//                 </Box>
//             </Box>
//             : //else
//             <Box
//             sx={{

//                 height: '150px',
//                 width: '240px',
//                 backgroundColor: '#ABABAB',
//                 opacity: '0.9',
                
//             }}
//             >
//                 <Button
//                 sx={{
//                     color: 'black',
//                 }}
//                 >                   
//                         <input type='checkbox'
//                         className='checkbox-round'
//                         onClick={()=>{
//                             if(open === false)
//                             {
//                                 setOpen(true);
//                             }
//                             else
//                             {
//                                 setOpen(false);
//                             }
//                         }}                    
//                     ></input>
                    
//                     <p>Advanced Search</p>

                    
//                 </Button>
//                 <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//                 >
//                 <Autocomplete>
//                 <Input
//                     type='text'
//                     name='destination'
//                     placeholder='Destination'
//                     sx={{
//                         width: '200px',
//                         height: '30px',
//                         borderRadius: '5px',
//                         backgroundColor: 'white',
//                         opacity: '0.9',
//                         color: 'black',
//                         marginLeft: '30px',
//                         marginTop: '20px',
//                         verticalAlign: 'middle',

//                     }}
//                     onChange={(event)=>{

//                         console.log(event.target.value);

//                     }}
//                     ></Input>
//                 </Autocomplete>
//                     <Button
//                     onClick={
//                         ()=>{
//                             calculateRoute();
                        
//                             setDestination(document.getElementsByName('destination')[0].value);
//                         }
//                     }
//                     >
//                     <Search
//                     sx={{
//                     color: '#E84A27',
//                     verticalAlign: 'middle',
//                     marginLeft: '-25px',
//                     marginTop: '20px',
//                     }}/>
//                     </Button>
//                 </Box>
                
//             </Box>
//             }
            
//             <Results data={data}></Results>
            
            
//         </Box>
//         // </div>
//     );
// };
