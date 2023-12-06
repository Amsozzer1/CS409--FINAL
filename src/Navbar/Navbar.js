import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import TodayIcon from '@mui/icons-material/Today';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import {app} from './../Firebase/firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton  } from '@mui/base/MenuButton';
import { MenuItem  } from '@mui/base/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../User/User.js';
import { backendURL } from '../Backend/Backend.js';
const auth = getAuth(app);
// const user = auth.currentUser;
export default function Navbar(){
    const { handleSetEvents } = useUser();
    const [img,setImg] = React.useState('');
    const navigate = useNavigate();
    const createHandleMenuClick = (menuItem) => {
        return () => {
          console.log(`Clicked on ${menuItem}`);
        };
      };
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            if (currUser) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              setImg(currUser.photoURL);
              loadEvents(currUser.uid);
              // console.log(currUser.photoURL);
              // ...
            } else {
              // User is signed out
              // ...
              setImg('');
              handleSetEvents('', []);
            }
          });
        return unsubscribe;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      const loadEvents = (userId) => {
        // Load events from session storage
        const storedData = sessionStorage.getItem(userId) || '[]';
        const events = JSON.parse(storedData);
        // If there are no events in session storage, fetch from backend
        if (events.length === 0) {
          fetchEventsFromBackend(userId);
        } else {
          const eventsWithDate = events.map((event) => {
            return {
              ...event,
              start: new Date(event.start),
              end: new Date(event.end)
            };
          });
          handleSetEvents(userId, eventsWithDate);
        }
      };
      const fetchEventsFromBackend = (userId) => {
        fetch(`${backendURL}/events/${userId}`, {
          method: 'GET'
        })
          .then(response => {
            if (!response.ok) {
              // User not found in the database
              if (response.status === 404) {
                console.log('User not found in the database');
                return [];
              } else {
                // Handle other non-success status codes
                console.error(`Error fetching events: ${response.status}`);
              }
            }
            return response.json();
          })
          .then(data => {
            const events = data.events.map((event) => {
              return {
                ...event,
                start: new Date(event.start),
                end: new Date(event.end)
              };
            });
            handleSetEvents(userId, events);
          })
          .catch(error => {
            // Handle fetch errors or non-success status codes
            console.error('Fetch error:', error);
          });
      };
      function Logout(){
        auth.signOut().then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
        navigate('/');
      }
    return (
        <AppBar position="static" sx={{bgcolor:"#13294B", height:"80px"}}>
            <Toolbar disableGutters sx={{minHeight:"80px", alignItems: 'center', justifyContent: 'space-between'}}>
                <IconButton aria-label="Icon" size="largae" sx={{ color:"#E84A27", fontSize:"40px" }}> 
                    <DirectionsBusIcon sx={{fontSize:"inherit"}}/> 
                </IconButton>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#"
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize:"40px",
                        letterSpacing: '.1rem',
                        color: '#E84A27',
                        textDecoration: 'none',
                        lineHeight: "80px"
                    }}
                >
                    UIUC BusNav
                </Typography>

                <Box sx={{flexGrow:1}}/>
                <IconButton aria-label="search" size="medium" sx={{ color:"#E84A27", fontSize:"35px", mr:"10px" }}> 
                    <SearchIcon sx={{fontSize:"inherit"}}/> 
                </IconButton>
                <IconButton aria-label="bus stop" size="medium" sx={{ color:"#E84A27", fontSize:"35px", mr:"10px" }}> 
                    <PlaceIcon sx={{fontSize:"inherit"}}/> 
                </IconButton>
                <IconButton aria-label="calendar" size="medium" sx={{ color:"#E84A27", fontSize:"35px", mr:"10px" }}> 
                    <TodayIcon sx={{fontSize:"inherit"}}/> 
                </IconButton>
                <Button aria-label="account" size="medium" sx={{ color:"#E84A27", fontSize:"35px", mr:"10px" }}> 
                    
                <Dropdown>
                
                <MenuButton
                style={{
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                }}
                >
                    
                    {
                        img ?
                        <img src={img} alt="profile" width="50px" height="50px" style={{borderRadius:"50%",}}/>
                        : 
                        (<AccountCircleIcon style={{
                        width: "50px",
                        height: "50px",
                        
                        }}/>)
                    } 
                        
                </MenuButton>
                

                <Menu slots={{ listbox: 'ol' }}

                style={{
                    borderBottom: '1px solid black',
                    borderLeft: '1px solid black',
                    borderRight: '1px solid black',
                    
                }}
                >
                  <MenuItem onClick={createHandleMenuClick('Profile')}>Profile</MenuItem>
                  <MenuItem onClick={createHandleMenuClick('Language settings')}>
                    Language settings
                  </MenuItem>
                  <MenuItem onClick={Logout}>
                    Log out
                  </MenuItem>
                </Menu>
                </Dropdown>    
                    

                </Button>
            </Toolbar>
            
        </AppBar>
    );
}
