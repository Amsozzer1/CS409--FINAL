import React, { Component } from 'react';
import { DayPilot, DayPilotMonth } from "@daypilot/daypilot-lite-react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
class Calendar extends Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      startDate: DayPilot.Date.today(),
      events: [],
      isModalOpen: false,
      newEvent: {
        start: null,
        end: null,
        text: ''
      }
    };
  }

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents() {
    const calendar = this.calendarRef.current.control;

    // Set up event handler for date click
    calendar.onTimeRangeSelected = (args) => {
      this.setState({
        isModalOpen: true,
        newEvent: {
          start: args.start,
          end: args.end,
          text: ''
        }
      });
    };
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      newEvent: {
        ...prevState.newEvent,
        [name]: value
      }
    }));
  };

  handleAddEvent = () => {
    const { events, newEvent } = this.state;
    const updatedEvents = [...events, newEvent];
    this.setState({ events: updatedEvents, isModalOpen: false });
  };

  render() {
    const { isModalOpen, newEvent } = this.state;
    const calendarStyle = {
        height: '600px', // Set the height of the calendar
        border: '1px solid #ccc', // Add a border
        borderRadius: '5px', // Add border radius
        backgroundColor: 'black', // Change the background color
        color:'pink'
        // Add any other styles you want to apply to the calendar component
      };
    return (
      <div>
        <Navbar/>
        

<LocalizationProvider dateAdapter={AdapterDayjs}
sx={{
        
        display: 'inline-flex',
        backgroundColor: 'black',
        color:'pink',
    
   
    

}}
>
    <DemoContainer components={['DatePicker', 'DatePicker']}>
      
      <Box>
      <DatePicker
        label={'year month'}
        openTo="month"
        views={['year', 'month']}
         // Adjust margin for spacing
         sx={{ 
            maxWidth: '300px',
            display: 'row',
            margin: '0px 10px 0px 10px',
            
        }}
      />

      
      <DatePicker
        label={'day'}
        openTo="day"
        views={['day']}
        sx={{ 
              maxWidth: '300px', 
            

        }}
      />
      
      </Box>
    </DemoContainer>
  </LocalizationProvider>
        

        <Box
         
         sx={{

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
            margin:'10% 2% 0% 2%',
         }}
         >
            
        <DayPilotMonth
          {...this.state}
          ref={this.calendarRef}
            style={calendarStyle}
          
        />

        <Dialog open={isModalOpen} onClose={this.handleCloseModal}>
          <DialogTitle>Add Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task"
              type="text"
              fullWidth
              name="text"
              value={newEvent.text}
              onChange={this.handleInputChange}
              
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModal}>Cancel</Button>
            <Button onClick={this.handleAddEvent}>Add</Button>
          </DialogActions>
        </Dialog>
        </Box>
      </div>
    );
  }
}

export default Calendar;
