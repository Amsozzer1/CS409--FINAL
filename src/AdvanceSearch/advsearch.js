import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import {Input} from '@mui/material';
import {Search} from '@mui/icons-material';
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