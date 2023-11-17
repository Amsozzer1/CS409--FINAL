
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Input } from '@mui/material';
import Navbar from './../Navbar/Navbar.js';
export default function Register(){

    return(

            <Box
            sx={{justifyContent:'center',width:'100%',height:'85vh',display:'flex',flexDirection:'column'}}
            >
                <Navbar />
                <Button sx={{color:'black',marginLeft:'35%',marginTop:'13%',width:'20px'}}>Back</Button>
                
            <h1 style={{textAlign:'center',fontWeight:'normal',fontSize:'48px',marginBottom:'37px'}}>Register</h1>
            <Input
            sx={{backgroundColor:'lightgray',width:'443px',height:'64px',marginLeft:'auto',marginRight:'auto',border:'oldlace',borderColor:'black',borderRadius:'5px'}}
            placeholder="  Username"
            disableUnderline = {true}
            ></Input>
            <Input
            sx={{backgroundColor:'lightgray',width:'443px',height:'64px',marginLeft:'auto',marginRight:'auto',border:'oldlace',borderColor:'black',borderRadius:'5px',marginTop:'37px',}}
            placeholder="  Email"
            disableUnderline = {true}
            >

            </Input>
            <Input
            sx={{backgroundColor:'lightgray',width:'443px',height:'64px',marginLeft:'auto',marginRight:'auto',marginTop:'37px',border:'oldlace',borderColor:'black',borderRadius:'5px'}}
            placeholder="  Password"
            disableUnderline = {true}
            
            >

            </Input>
            
            <Box sx = {{textAlign:'center'}}>
            <Button
            sx={{backgroundColor:'#3b77bc',color:'white',
                borderRadius:'50px',
                marginTop:'30px',width: '435px',
                height: '46px',
                flexShrink:0,
                background: '#1979BB',
        
        }}
            
           
            
            >Register</Button>
            
            </Box>
            <Box sx = {{textAlign:'center',flexDirection:'column'}}>
            
         
            </Box>
            </Box>
            
            

    )
}

