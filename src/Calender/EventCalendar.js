import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { useUser } from '../User/User'
import { useEffect, useState, useRef } from 'react'
import ical from 'ical.js'
import NavBar from '../Navbar/Navbar'
import { TextField, Button, styled, Toolbar } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const EventCalendar = (props) => {
    const { user, handleSetEvents, handleAddEvent } = useUser();

    const backendURL = 'http://127.0.0.1:8000';
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
        handleSetEvents(updatedEvents);
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
    const handleSelect = ({ start, end }) => {
        const newEvent = {
            start: new Date(start),
            end: new Date(end),
            title: 'New event'
        };
        handleAddEvent(newEvent);
    };
    return (
        <div>
            <NavBar />
            <div style={{ top: '80px', height: 'calc(100vh - 80px)', width: '100%' }} >
                <Toolbar sx={{ justifyContent: 'end', boxSizing: 'border-box' }}>
                    <div>{user.getId()}</div>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
                    </Button>
                </Toolbar>
                <div style={{ height: 'calc(100vh - 80px - 64px)', width: '100%' }}>
                    <Calendar
                        localizer={localizer}
                        events={user.getEvents()}
                        popup
                        selectable
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