import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Fixed: Imported Route component
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoutes from './components/ProtectedRoutes';
import Settings from './pages/settings';
import { ThemeContext} from './contexts/Theme.context.jsx';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      {/* 
        The root wrapper applies the theme backgrounds globally 
        and passes the state tools down to your Navbar 
      */}
      <div data-theme={theme} >
        
        {/* Pass theme variables to the Navbar through ThemeContext */}
        <Navbar />
        
        <Routes>
          <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          <Route path="/settings" element={<ProtectedRoutes><Settings /></ProtectedRoutes>} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
