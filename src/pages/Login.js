import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css'; 
import Loader2 from '../components/loader2'

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); 
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setLoading(true);
    try {
      const res = await axios.post('https://real-estate-backend-api-8r48.onrender.com/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading ? (
        <div className='fade-overlay'>
          <div className='loader-with-text'>
            <Loader2 probe={'Logging...'}/>
            <p>Logging in...</p>
          </div>
        </div>
      ):(
      <form className={`login-form ${loading ? 'blurred': ''}`}onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>} 
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <div className="signup-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </form>
      )}
    </div>
  );
};

export default Login;
