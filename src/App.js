import './App.css';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import MonthlyCalendar from './Calender/calendar.js';
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
  ]);
  
  





  return (
    <div className="App">
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  </div>

  );
}

export default App;
