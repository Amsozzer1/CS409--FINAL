import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

export function Bus({DATA}){
const busData=[

    'Bus 1',
    'Bus 2',
    'Bus 3',
    'Bus 4',
    'Bus 5',
    'Bus 6',
    'Bus 7',
    'Bus 8',
]
// fetch(URL).then((response) => response.json())
// .then((data) => console.log(data))
// .catch((error) => console.log(error));


return(
    <Box>
    
        <Box
    sx={
        {
            position: 'absolute',
            top: '150px',
            left: '20px',
        
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
                    >Bus</p>
                </Button>
                <Button>
                
                </Button>
                
        <ul
        style={{
            listStyleType: 'none',
            display: 'grid',
            gap: '10px',


        
        }}
        
        >
            {busData.map((bus, key)=>(
                <li>{bus}</li>
            ))}
        </ul>
    {<p>{DATA.long} , {DATA.lat},</p>}
    </Box>
    </Box>
    
    </Box>
)


}