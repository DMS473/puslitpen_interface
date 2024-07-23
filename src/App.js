import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import Reservations from './pages/Reservations';
import Header from './components/Header';
import HeaderUser from './components/HeaderUser';
import RoomTimeSlotList from './components/RoomTimeSlotList';
import ProtectedComponent from './pages/ProtectedComponents';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Admin from './pages/Admin/DashboardAdmin'
import Users from './pages/Admin/Users'
import RoomsAdmin from './pages/Admin/RoomsAdmin';
import TimeSlots from './pages/Admin/TimeSlots';
import RoomTimeSlotsAdmin from './pages/Admin/RoomTimeSlotsAdmin';
import ReservationsAdmin from './pages/Admin/ReservationsAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import MyBooking from './pages/MyBooking';
import WelcomeUser from './pages/WelcomeUser';
import RoomTimeSlots from './components/RoomTimeSlots';

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<WelcomeUser />} />
          <Route path="/dashboard/rooms" element={<Rooms />} />
          {/* <Route path="/protected/reservations" element={<Reservations />} /> */}
          <Route path="/dashboard/booking" element={<RoomTimeSlotList />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/mybooking" element={<MyBooking />} />
        </Route>
        <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>
          }>
          <Route index element={<Rooms />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/rooms" element={<RoomsAdmin />} />
          <Route path="/admin/timeslots" element={<TimeSlots />} />
          <Route path="/admin/roomtimeslots" element={<RoomTimeSlotsAdmin />} />
          <Route path="/admin/reservations" element={<ReservationsAdmin />} />
        </Route>
      </Routes>
    </div>
  </Router>
);

export default App;
