import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

export function Stop({ DATA }) {
  const [stopData, setStopData] = useState([]);

  useEffect(() => {
    async function getStopData() {
      const URL = `https://developer.mtd.org/api/v2.2/json/getstopsbylatlon?key=ca74c75b34e64cc9bde55c9714918493&lat=${DATA.lat}&lon=${DATA.long}&count=5`;

      try {
        const response = await fetch(URL);
        const data = await response.json();
        const stops = data.stops.map(stop => stop.stop_name);
        setStopData(stops);
      } catch (error) {
        console.error('Error fetching stop data: ', error);
      }
    }

    getStopData();
  }, [DATA.lat, DATA.long]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '500px',
        left: '20px',
        zIndex: '1',
      }}
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
          >
            Stops
          </p>
        </Button>
        <Button></Button>

        <ul
          style={{
            listStyleType: 'none',
            display: 'grid',
            gap: '10px',
          }}
        >
          {stopData.map((stop, key) => (
            <li key={key}>{stop}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}
