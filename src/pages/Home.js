import React from 'react';
import RoomList from '../components/RoomList';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => (
  <div>
    <Header />
    <h1>Welcome to Room Reservation System</h1>
    {/* <RoomList /> */}
    <Outlet />
  </div>
);

export default Home;
