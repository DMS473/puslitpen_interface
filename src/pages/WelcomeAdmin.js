import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { formatDate } from '../utils/formatDate';
import { getMyBookings } from '../services/api';
// import { MyBooking } from './MyBooking'

const WelcomeAdmin = () => {
  const [userName, setUserName] = useState('');
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    setUserName(decodedToken.username);
    // console.log(decodedToken);

    const fetchData = async () => {
      try {
        const reservationsResponse = await getMyBookings(token)
        setUpcomingReservations(reservationsResponse);
        console.log(reservationsResponse)

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div>
      <h1>Welcome, Admin {userName}!</h1>
      {/* <h2>Your Upcoming Reservations</h2>

      <ul>
        {upcomingReservations.map(reservation => (
          <li key={reservation.id}>
            Room: {reservation.RoomTimeSlot.Room.room_number} on {formatDate(reservation.RoomTimeSlot.date)} from {reservation.RoomTimeSlot.TimeSlot.start_time} to {reservation.RoomTimeSlot.TimeSlot.end_time}
          </li>
        ))}
      </ul> */}

      {/* <MyBooking /> */}

      {/* <h2>Available Rooms</h2>
      <div>
        {availableRooms.map(room => (
          <div key={room.id}>
            <h3>{room.name}</h3>
            <ul>
              {room.availableTimeslots.map(timeslot => (
                <li key={timeslot.id}>
                  {timeslot.time} - <button onClick={() => handleReserve(room.id, timeslot.id)}>Reserve</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}

      {/* <nav>
        <ul>
          <li><a href="/reservations">My Reservations</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </nav> */}

      {/* <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul> */}

    </div>
  );
};

export default WelcomeAdmin;
