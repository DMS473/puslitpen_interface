import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div>
    <ul>
      <li><Link to="/admin/users">Users</Link></li>
      <li><Link to="/admin/rooms">Rooms</Link></li>
      <li><Link to="/admin/timeslots">Timeslots</Link></li>
      <li><Link to="/admin/roomtimeslots">Room Timeslots</Link></li>
      <li><Link to="/admin/reservations">Reservations</Link></li>
    </ul>
  </div>
);

export default Sidebar;
