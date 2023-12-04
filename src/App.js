import './App.css';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import MonthlyCalendar from './Calender/calendar.js';
import AdvSearch from './AdvanceSearch/advsearch.js';
import { Bus } from './Bus/bus.js';
import { Stop } from './Bus/stop.js';
import Map from './Map/Map.js';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import { UserProvider } from './User/User.js';

function App() {

  const router = createBrowserRouter([
    {
      id: "root",

      path: "/",
      Component: Map,
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
      path: "/login",
      Component: Login,
    }


  ]);







  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
      </UserProvider>
    </div>

  );
}

export default App;
