import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { useUser } from '../User/User'
import { useEffect, useState } from 'react'
import ical from 'ical.js'
import NavBar from '../Navbar/Navbar'
import { TextField, Button, styled, Toolbar } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { app } from './../Firebase/firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const EventCalendar = (props) => {
    const { user, handleSetEvents, handleIdChange, handleAddEvent } = useUser();
    const [myEventsList, setMyEventsList] = useState([]);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            if (currUser) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                handleIdChange(auth.currentUser.uid);
                loadEvents(auth.currentUser.uid);
                // console.log(currUser.photoURL);
                // ...
            } else {
                // User is signed out
                // ...
                handleIdChange('');
                handleSetEvents([]);
            }
        });
        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const backendURL = 'http://127.0.0.1:8000';
    const loadEvents = (userId) => {
        // Load events from session storage
        const storedData = sessionStorage.getItem(userId) || '[]';
        const events = JSON.parse(storedData);
        // If there are no events in session storage, fetch from backend
        if (events.length === 0) {
            fetchEventsFromBackend(userId);
        } else {
            const eventsWithDate = events.map((event) => {
                return {
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end)
                };
            });
            handleSetEvents(eventsWithDate);
            setMyEventsList(eventsWithDate);
        }
    };
    const fetchEventsFromBackend = (userId) => {
        fetch(`${backendURL}/events/${userId}`, {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    // User not found in the database
                    if (response.status === 404) {
                        console.log('User not found in the database');
                        return [];
                    } else {
                        // Handle other non-success status codes
                        console.error(`Error fetching events: ${response.status}`);
                    }
                }
                const result = response.json();
                return result['events'];
            })
            .then(data => {
                handleSetEvents(data);
            })
            .catch(error => {
                // Handle fetch errors or non-success status codes
                console.error('Fetch error:', error);
            });
    };
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

        const updatedEvents = [...myEventsList, ...allEvents];
        setMyEventsList(updatedEvents);
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
        console.log(myEventsList);
    };
    return (
        <div>
            <NavBar />
            <div style={{ top: '80px', height: 'calc(100vh - 80px)', width: '100%' }} >
                <Toolbar sx={{ justifyContent: 'end', boxSizing: 'border-box' }}>
                    <div>{user.current.getId()}</div>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
                    </Button>
                </Toolbar>
                <div style={{ height: 'calc(100vh - 80px - 64px)', width: '100%' }}>
                    <Calendar
                        localizer={localizer}
                        events={myEventsList}
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