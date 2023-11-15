import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import Box from '@mui/material/Box';
import {Typography } from '@mui/material';


export default function Navbar(){
    return(
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#13294B',height:'81px'}} >
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2,color:'#FF5F05',marginTop:'1.5%'}}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" sx= {{marginTop:'1.5%',color:'#FF5F05'}}>
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    )
}