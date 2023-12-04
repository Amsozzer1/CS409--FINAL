import { createContext, useState, useContext } from 'react';

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
        this.events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    };
    getId = () => {
        return this.id;
    };
    getEvents = () => {
        return this.events;
    };
    addEvent = (newEvent) => {
        const startTime = new Date(newEvent.start).getTime();
        let insertIndex = this.events.findIndex(
            (event) => new Date(event.start).getTime() > startTime
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

    const handleIdChange = (newId) => {
        const updatedUser = { ...user };
        updatedUser.setId(newId);
        setUser(updatedUser);
    };

    const handleAddEvent = (newEvent) => {
        const updatedUser = { ...user };
        updatedUser.addEvent(newEvent);
        setUser(updatedUser);
    };

    return (
        <UserContext.Provider value={{ user, handleIdChange, handleAddEvent }}>
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