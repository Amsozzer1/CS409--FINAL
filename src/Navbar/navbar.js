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
const auth = getAuth(app);
const user = auth.currentUser;
export default function Navbar(){
    
    const [img,setImg] = React.useState('');
    const navigate = useNavigate();
    const createHandleMenuClick = (menuItem) => {
        return () => {
          console.log(`Clicked on ${menuItem}`);
        };
      };
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          
            setImg(user.photoURL);
          //console.log(user.photoURL);
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
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
                <IconButton aria-label="Icon" size="large" sx={{ color:"#E84A27", fontSize:"40px" }}> 
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
