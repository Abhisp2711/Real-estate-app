import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'; // switch-off icon
import '../styles/Navbar.css';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/listings" className="nav-link">Listings</Link>

        {user ? (
          <>
            <Link to="/profile" className="nav-link">Profile</Link>
            {user.role === 'seller' && (
              <Link to="/add-property" className="nav-link">Add Property</Link>
            )}
            <button onClick={handleLogout} className="logout-button">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
