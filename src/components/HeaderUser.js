import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        {/* <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li> */}
        {/* <li><Link to="/dashboard/rooms">Rooms</Link></li> */}
        <li><Link to="/dashboard/booking">Booking</Link></li>
        <li><Link to="/dashboard/profile">Profile</Link></li>
        <li><Link to="/dashboard/mybooking">My Booking</Link></li>
        <LogoutButton />
      </ul>
    </nav>
  </header>
);

export default Header;
