import { createContext, useRef, useContext } from 'react';

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
    const user = useRef(new User());

    const handleIdChange = (newId) => {
        user.current.setId(newId);
    };

    const handleAddEvent = (newEvent) => {
        user.current.addEvent(newEvent);
    };

    const handleSetEvents = (events) => {
        user.current.setEvents(events);
        user.current.sortEvents();
    };

    return (
        <UserContext.Provider value={{ user, handleIdChange, handleAddEvent, handleSetEvents }}>
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