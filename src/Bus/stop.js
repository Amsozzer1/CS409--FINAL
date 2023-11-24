import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
export function Stop(){
const stopData=[

    'Stop 1',
    'Stop 2',
    'Stop 3',
    'Stop 4',
    'Stop 5',
    'Stop 6',
    'Stop 7',
    'Stop 8',
]

return(
    <Box
    sx={
        {
            position: 'relative',
            top: '10px',
            left: '20px',
            zIndex: '1',
        
        }
    }
    >
        
        <Box
            sx={{

                height: 'auto',
                width: '240px',
                backgroundColor: '#ABABAB',
                opacity: '0.7',
                paddingBottom: '10px',
                
            }}
            >
                <Button
                sx={{
                    position: 'relative',
                    color: 'black',
                    backgroundColor: '#D9D9D9',
                    width: '240px',
                    height: '30px',
                    
                    


                    
                }}
                >

                    
                    <p
                    style={{
                        position: 'relative',
                        right: '90px',
                    }}
                    >Stops</p>
                </Button>
                <Button>
                
                </Button>
                
        <ul
        style={{
            listStyleType: 'none',
            display: 'grid',
            gap: '10px',


        
        }}
        key={stopData.id}
        >
            {stopData.map((stop, key)=>(
                <li>{stop}</li>
            ))}
        </ul>
    
    </Box>
    </Box>
)


}