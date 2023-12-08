import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import { useUser } from '../User/User'
import { useState, useRef } from 'react'
import ical from 'ical.js'
import NavBar from '../Navbar/Navbar'
import { useTheme, TextField, IconButton, Button, styled, Toolbar, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, useMediaQuery } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InfoIcon from '@mui/icons-material/Info';
import { backendURL } from '../Backend/Backend.js';
import EventImport from './EventImport.js';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const EventCalendar = (props) => {
    const { user, handleSetEvents, handleAddEvent } = useUser();
    const [open, setOpen] = useState(false);
    let eventStart = useRef(new Date());
    let eventEnd = useRef(new Date());
    const [title, setTitle] = useState('');
    const [openInStruction, setOpenInStruction] = useState(false);
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                parseICS(content);
            };
            reader.readAsText(file);
        }
    };

    const expandRecurringEvents = (vevent) => {
        const occurrences = [];
        const duration = new ical.Period({
            start: vevent.getFirstPropertyValue('dtstart'),
            end: vevent.getFirstPropertyValue('dtend')
        }).getDuration();
        const summary = vevent.getFirstPropertyValue('summary');

        const expand = new ical.RecurExpansion({
            component: vevent,
            dtstart: vevent.getFirstPropertyValue('dtstart')
        });
        let next;
        while ((next = expand.next()) && occurrences.length < 100) {
            const startDate = new Date(next.toString());
            next.addDuration(duration);
            const endDate = new Date(next.toString());
            occurrences.push({
                start: startDate,
                end: endDate,
                title: summary
            });
        }

        return occurrences;
    };

    const parseICS = (data) => {
        const jcalData = ical.parse(data);
        const comp = new ical.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');

        const allEvents = [];
        vevents.forEach(vevent => {
            const occurrences = expandRecurringEvents(vevent);
            allEvents.push(...occurrences);
        });

        const updatedEvents = [...user.getEvents(), ...allEvents];
        const hasEvents = user.getEvents().length > 0;
        const dataToSend = JSON.stringify({ events: (hasEvents ? allEvents : updatedEvents) });
        fetch(`${backendURL}/events/${user.getId()}`, {
            method: (hasEvents ? 'PUT' : 'POST'),
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataToSend
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.error('Fetch error:', error);
        });
        sessionStorage.setItem(user.getId(), JSON.stringify(updatedEvents));
        handleSetEvents(user.getId(), updatedEvents);
    };
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const theme = useTheme();
    const fullWidth = useMediaQuery(theme.breakpoints.down('md'));
    const handleSelect = ({ start, end }) => {
        setOpen(true);
        eventStart.current = start;
        eventEnd.current = end;
    };
    const handleSave = () => {
        const newEvent = {
            start: eventStart.current,
            end: eventEnd.current,
            title: title
        };
        handleAddEvent(newEvent);
        setOpen(false);
        setTitle('');
    };
    const handleCancel = () => {
        setOpen(false);
        setTitle('');
    };
    const handleEnter = (e, func) => {
        if (e.key === 'Enter') {
            func();
        }
    };
    const handleCloseDialog = () => {
        setOpenInStruction(false);
    };
    return (
        <div>
            <NavBar />
            <div style={{ top: '80px', height: 'calc(100vh - 80px)', width: '100%' }} >
                <Toolbar sx={{ justifyContent: 'end', boxSizing: 'border-box' }}>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file (.ics)
                        <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
                    </Button>
                    <IconButton variant="contained" sx={{ marginLeft: '10px' }} onClick={() => setOpenInStruction(true)}>
                        <InfoIcon />
                    </IconButton>
                </Toolbar>
                <EventImport openInStruction={openInStruction} handleCloseDialog={handleCloseDialog} />
                <Dialog open={open} onClose={handleCancel} maxWidth='md' fullWidth >
                    <DialogTitle sx={{fontWeight: '900'}}>Add a New Event</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <strong>Selected Slot:</strong>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <span>Start: {eventStart.current.toLocaleString()}</span>
                                <span>End: {eventEnd.current.toLocaleString()}</span>
                            </div>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Event Title"
                            id='event-title'
                            type="text"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => handleEnter(e, handleSave)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
                <div style={{ height: 'calc(100vh - 80px - 64px)', width: '100%' }}>
                    <Calendar
                        localizer={localizer}
                        events={user.getEvents()}
                        popup
                        selectable
                        defaultView={fullWidth ? 'week' : 'month'}
                        onSelectSlot={handleSelect}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </div>
            </div>
        </div>
    );
}

export default EventCalendar;