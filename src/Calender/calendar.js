import React, { Component,useState } from 'react';
import { DayPilot, DayPilotMonth } from "@daypilot/daypilot-lite-react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileUploadIcon from '@mui/icons-material/FileUpload';

function CalendarComp(
  startDate
){
  return(
    <DayPilotMonth
    {...this.state}
    ref={this.calendarRef}
    startDate={startDate}
    events={this.state.events}
    />
  )

}
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
  
  date = 24;
  year = 2023;
  month = 11;
  FullDate ='2023-01-12';
  
  _renderCounter = () => () => {
    const [count, setCount] = useState(this.FullDate);

    return count;
  }
 
  render() {
    const { isModalOpen, newEvent } = this.state;
    const CountHook = this._renderCounter();
    
    console.log(this.FullDate); 
    return (
      <div>
        

<LocalizationProvider dateAdapter={AdapterDayjs}

>
    <DemoContainer components={['DatePicker', 'DatePicker']}>
      
      <Box
      sx={{
       
        
      }}
      >
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
        onChange={(e) => {
          this.year = e.toJSON().toString().split('T')[0].split('-')[0];
          this.month = e.toJSON().toString().split('T')[0].split('-')[1];
          console.log(this.year);
          console.log(this.month);
          this.FullDate = this.year+'-'+this.month+'-'+this.date;
        }
          
        }
      />

      
      <DatePicker
        label={'day'}
        openTo="day"
        views={['day']}
        onChange={(e) => {
          this.date = e.toJSON().toString().split('T')[0].split('-')[2];
          //console.log(this.date);
          this.FullDate = this.year+'-'+this.month+'-'+this.date;
        }}
      />
       <Button
  variant="contained"
  component="label"
  sx={{
    float:' right',
    backgroundColor: 'white',
    color: 'black',
    

  }}
  
>
  <FileUploadIcon/>
  <input
    type="file"
    hidden
  />
</Button>
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
          {
            this.FullDate ? <DayPilotMonth
            {...this.state}
            ref={this.calendarRef}
            startDate={this.FullDate}
            events={this.state.events}
            /> : <DayPilotMonth
            {...this.state}
            ref={this.calendarRef}
            events={this.state.events}
            />
          }
          

        
      

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
