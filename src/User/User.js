import { createContext, useState, useContext } from 'react';
import { backendURL } from '../Backend/Backend.js';

const UserContext = createContext();

class User {
    constructor() {
        this.id = '';
        this.events = [];
    }
    setId = (id) => {
        this.id = id;
    };
    setEvents = (events) => {
        this.events = events;
    };
    sortEvents = () => {
        this.events.sort((a, b) => a.start.getTime() - b.start.getTime());
    };
    getId = () => {
        return this.id;
    };
    getEvents = () => {
        return this.events;
    };
    addEvent = (newEvent) => {
        const startTime = newEvent.start.getTime();
        let insertIndex = this.events.findIndex(
            (event) => event.start.getTime() > startTime
        );
        if (insertIndex === -1) {
            insertIndex = this.events.length;
        }
        this.events.splice(insertIndex, 0, newEvent);
    };
    // getNextEvent = () => {


    // }
}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(new User());

    const handleAddEvent = (newEvent) => {
        const updatedUser = new User();
        updatedUser.setId(user.getId());
        updatedUser.setEvents(user.getEvents());
        if (user.getEvents().length === 0) {
            fetch(`${backendURL}/events/${user.getId()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({events: [newEvent]})
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.error('Fetch error:', error);
            });
        } else {
            fetch(`${backendURL}/events/${user.getId()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({events: [newEvent]})
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.error('Fetch error:', error);
            });
        }
        updatedUser.addEvent(newEvent);
        sessionStorage.setItem(user.getId(), JSON.stringify(updatedUser.getEvents()));
        setUser(updatedUser);
    };

    const handleSetEvents = (id, events) => {
        const updatedUser = new User();
        updatedUser.setId(id);
        updatedUser.setEvents(events);
        updatedUser.sortEvents();
        setUser(updatedUser);
    };

    return (
        <UserContext.Provider value={{ user, handleAddEvent, handleSetEvents }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export { UserProvider, useUser };