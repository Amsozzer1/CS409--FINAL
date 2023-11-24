import React from "react";
import  Box from "@mui/material/Box";
import { Button } from "@mui/material";



function Avatar({ data }) {
  return (
    
      data.map((item) => (
        <Box key={item.id}>
          <h1>{item.name}</h1>
          <h2>{item.email}</h2>
          <h3>{item.sirName}</h3>
        </Box>
      ))
    
  );
}

export default function Results({ data }) {
  


  return (
    <Box>
      {
        data.length>0?
        (<Box
          sx={
              {
                  position: 'relative',
                  top: '10px',
                  left: '0px',
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
                          width: '240px',
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
                      
                      <Avatar data={data} />
                      
                      
              
          
          </Box>
          </Box>):null
      }
    </Box>
    
  );
}
