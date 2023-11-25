import './App.css';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import MonthlyCalendar from './Calender/calendar.js';
import AdvSearch from './AdvanceSearch/advsearch.js';
import {Bus} from './Bus/bus.js';
import {Stop} from './Bus/stop.js';
import Navbar from './Navbar/Navbar.js';
import {createBrowserRouter,RouterProvider,} from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      id: "root",
      
      path: "/",
      Component: Login,
    },
    {
      path: "/register",
      Component: Register,
    },
    {
      path: "/calendar",
      Component: MonthlyCalendar,
    },
    {
      path: "/advsearch",
      Component: AdvSearch,
    },
    {
      path: "/bus",
      Component: Bus,
    },
    {
      path: "/stop",
      Component: Stop,
    },
    {
      path: "/navbar",
      Component: Navbar,
    },

  ]);
  
  





  return (
    <div className="App">
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  </div>

  );
}

export default App;
