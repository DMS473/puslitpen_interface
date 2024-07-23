import React from 'react';
// import RoomList from '../../components/RoomList';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import HeaderAdmin from '../../components/HeaderAdmin';

const DashboardAdmin = () => (
  <div>
    <HeaderAdmin />
    <h1>Welcome to Room Reservation System</h1>
    {/* <RoomList /> */}
    <Outlet />
  </div>
);

export default DashboardAdmin;
