import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Button } from '@mui/material';
import {Input} from '@mui/material';
import {Search} from '@mui/icons-material';
import { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Results from '../AdvanceSearch/Results.js';
import '../index.css';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import { useUser } from '../User/User.js';

/* CHANGE DATA TO UPDATE RESULTS AND ALSO CHANGE AVATAR
    FROM Results.js*/
const data = [
    {
        id: 1,
        name: 'Hawaii',
        email: 'abc@gmail.com',
        sirName: 'Hawaii',

    }
    
  ];
/* CHANGE DATA TO UPDATE RESULTS (fecth from backend based on
    the search query?)
*/
export var ROUTE = '';

export default function AdvSearch(){

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedTime, setSelectedTime] = React.useState(null);
    const {user} = useUser();
    const events = user.getEvents();
    console.log( events );

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
                        <MenuItem key = {index} value = {event.title}>
                            {event.title}
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
                <Input
                    type='text'
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
                        marginBottom: '20px'
                    }}
                    ></Input>
                </Box>
                
            </Box>
            }
            <Results data={data}></Results>
            
        </Box>
    );
}