import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        {/* <li><Link to="/rooms">Rooms</Link></li>
        <li><Link to="/reservations">Reservations</Link></li>
        <li><Link to="/room-time-slots">Room Time Slots</Link></li> */}
      </ul>
    </nav>
  </header>
  
);

export default Header;
