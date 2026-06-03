import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Fixed: Imported Route component
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {
  ;
  
  // 1. Initialize theme configuration from local storage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // 2. Synchronize DOM element with the state whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      {/* 
        The root wrapper applies the theme backgrounds globally 
        and passes the state tools down to your Navbar 
      */}
      <div data-theme={theme} >
        
        {/* Pass theme variables to the Navbar so your button switcher works there */}
        <Navbar theme={theme} setTheme={setTheme} />
        
        <Routes>
          <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
