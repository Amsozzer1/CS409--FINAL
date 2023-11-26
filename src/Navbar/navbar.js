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

export default function Navbar(){
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
                    <AccountCircleIcon sx={{fontSize:"inherit"}}/>  
                </Button>
            </Toolbar>
        </AppBar>
    );
}