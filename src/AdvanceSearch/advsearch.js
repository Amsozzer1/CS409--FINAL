import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Button } from '@mui/material';
import {Input} from '@mui/material';
import {Search} from '@mui/icons-material';
import { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import Results from '../AdvanceSearch/Results.js';
import '../index.css';

/* CHANGE DATA TO UPDATE RESULTS AND ALSO CHANGE AVATAR
    FROM Results.js*/
const data = [
    {
        id: 1,
        name: 'Hawaii',
        email: 'abc@gmail.com',
        sirName: 'Hawaii',

    },
    {
        id: 2,
        name: 'Hawaii',
        email: 'abc@gmail.com',
        sirName: 'Hawaii',

    }
   
    
  ];
/* CHANGE DATA TO UPDATE RESULTS (fecth from backend based on
    the search query?)
*/

export default function AdvSearch(){

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedTime, setSelectedTime] = React.useState(null);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
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
                <Select
                    id="my-dropdown"
                    value={selectedValue}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                        width: '200px',
                        height: '30px',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        opacity: '0.9',
                        color: 'black',
                        marginLeft: '5px',
                        marginTop: '20px',
                        '& .MuiSelect-select': {
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        },
                    }}
                    >
                    <MenuItem value="">
                        <em>Event in next two days</em>
                    </MenuItem>
                    <MenuItem value="destination1">Event 1</MenuItem>
                    <MenuItem value="destination2">Event 2</MenuItem>
                    <MenuItem value="destination3">Event 3</MenuItem>
                </Select>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    value={selectedTime}
                    onChange={(newValue) => {
                    setSelectedTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} 
                    sx={{
                        width: '200px',
                        height: '40px', // 调整高度以适应内边距
                        borderRadius: '5px',
                        backgroundColor: 'rgba(255, 255, 255)', // 白色背景带透明度
                        color: 'black',
                        marginLeft: '5px',
                        marginTop: '20px',
                        '& .MuiOutlinedInput-input': {
                          paddingTop: '10px',
                          paddingBottom: '10px',
                        }
                      }}
                    />}
                />
                </LocalizationProvider>

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
                    <Button
                    
                    >
                    <Search
                    sx={{
                    color: '#E84A27',
                    verticalAlign: 'middle',
                    marginLeft: '5px',
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