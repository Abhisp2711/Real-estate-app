import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Listings from './pages/Listings';
import Profile from './pages/Profile';
import AddProperty from './pages/AddProperty';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const BACKEND_URL = 'https://real-estate-backend-api-8r48.onrender.com';
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${BACKEND_URL}/api/auth/user`, { 
        headers: { 'Authorization': `Bearer ${token}` } 
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(err => console.error(err));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/add-property" element={<AddProperty />} />
      </Routes>
    </Router>
  );
};

export default App;
