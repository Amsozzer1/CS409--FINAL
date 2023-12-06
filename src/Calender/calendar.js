import React, { Component, useState } from 'react';
import { DayPilot, DayPilotMonth } from "@daypilot/daypilot-lite-react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ical from 'ical.js';
import Navbar from '../Navbar/Navbar';

function CalendarComp(
  startDate
) {
  return (
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

  handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        this.parseICS(content);
      };
      reader.readAsText(file);
    }
  };

  expandRecurringEvents = (vevent) => {
    const occurrences = [];
    const duration = new ical.Period({
      start: vevent.getFirstPropertyValue('dtstart'),
      end: vevent.getFirstPropertyValue('dtend')
    }).getDuration();
    const summary = vevent.getFirstPropertyValue('summary');

    var expand = new ical.RecurExpansion({
      component: vevent,
      dtstart: vevent.getFirstPropertyValue('dtstart')
    });
    var next;
    while ((next = expand.next()) && occurrences.length < 500) {
      const startDate = new DayPilot.Date(next.toString());
      next.addDuration(duration);
      const endDate = new DayPilot.Date(next.toString());
      occurrences.push({
        start: startDate,
        end: endDate,
        text: summary
      });
    }

    return occurrences;
  };

  parseICS = (data) => {
    const jcalData = ical.parse(data);
    const comp = new ical.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');

    const allEvents = [];
    vevents.forEach(vevent => {
      const occurrences = this.expandRecurringEvents(vevent);
      allEvents.push(...occurrences);
    });

    const updatedEvents = [...this.state.events, ...allEvents];
    this.setState({ events: updatedEvents });
  };

  date = 24;
  year = 2023;
  month = 11;
  FullDate = '2023-01-12';

  _renderCounter = () => () => {
    const [count, setCount] = useState(this.FullDate);

    return count;
  }

  render() {
    const { isModalOpen, newEvent } = this.state;
    const CountHook = this._renderCounter();

    
    return (
      <div
      
      style={{
        height:'100vh',
      }}>

        <Navbar />
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
               
                  this.FullDate = this.year + '-' + this.month + '-' + this.date;
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
                  this.FullDate = this.year + '-' + this.month + '-' + this.date;
                }}
              />
              <Button
                variant="contained"
                component="label"
                sx={{
                  // float: ' right',
                  backgroundColor: 'white',
                  color: 'black',


                }}

              >
                <FileUploadIcon />
                <input
                  type="file"
                  accept='.ics'
                  onChange={this.handleFileUpload}
                  hidden
                />
              </Button>
            </Box>

          </DemoContainer>
        </LocalizationProvider>


        <Box

          sx={{

            position: 'relative',
            // zIndex: -2,

            margin: '2% 2% 0px 2%',
            
            
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
              startDate={DayPilot.Date.today()}
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
