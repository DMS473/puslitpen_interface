import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/admin">Home</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/rooms">Rooms</Link></li>
        <li><Link to="/admin/timeslots">TimeSlots</Link></li>
        <li><Link to="/admin/roomtimeslots">Room-TimeSlots</Link></li>
        <li><Link to="/admin/reservations">Reservations</Link></li>
        <LogoutButton />
      </ul>
    </nav>
  </header>
);

export default Header;
