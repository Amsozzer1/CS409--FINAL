
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Input, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Google,Facebook} from '@mui/icons-material';
import Navbar from '../Navbar/navbar';
export default function Login(){

    return(

            <Box
            sx={{justifyContent:'center',width:'100%',height:'85vh',display:'flex',flexDirection:'column'}}
            >
                <Navbar/>
                <Button sx={{color:'black',marginLeft:'35%',width:'20px'}}>Back</Button>
                <Button sx={{color:'black',top:'-35px',marginLeft:'25%'}}>Next</Button>
                
            <h1 style={{textAlign:'center',fontWeight:'normal',fontSize:'48px',marginBottom:'37px'}}>Login</h1>
            
            <Input
            sx={{backgroundColor:'lightgray',width:'443px',height:'64px',marginLeft:'auto',marginRight:'auto',border:'oldlace',borderColor:'black',borderRadius:'5px'}}
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
            <Box sx={{marginTop:'19px',alignItems:'center',width:'70%',display:'flex',flexDirection:'row'}}>
            <Checkbox  sx={{marginLeft:'50%'}} disableRipple = 'true'></Checkbox>
            <Typography >Remember Me</Typography>
            <Button sx={{marginLeft:'15%',color:'black',textTransform:'none'}}
            
            >
                <Typography>
                Forgot Password?
                </Typography>
            </Button>
            </Box>
            <Box sx = {{textAlign:'center'}}>
            <Button
            sx={{backgroundColor:'#3b77bc',color:'white',
                borderRadius:'50px',
                marginTop:'30px',width: '435px',
                height: '46px',
                flexShrink:0,
                background: '#1979BB',
        
        }}
            
           
            
            >Login</Button>
            
            </Box>
            <Box sx = {{textAlign:'center',flexDirection:'column'}}>
            
            <Button
          startIcon={<Google />}
          
          sx={{
            backgroundColor: '#4285F4',
            color: 'white',
            borderRadius: '10px',
            width: '230px',
            height: '44px',
            marginTop: '25px',
          }}
        >
          Sign in with Google
        </Button>
        <Button
          startIcon={<Facebook />}
          sx={{
            marginLeft:'15px',
            background: '#3C5A9A',
            color: 'white',
            width: '230px',
            height: '44px',
            marginTop: '25px',
          }}
        >
          Sign in with Facebook
        </Button>
            </Box>
            </Box>
            
            

    )
}

