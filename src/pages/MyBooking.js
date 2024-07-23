import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { getMyBookings } from '../services/api';
import { formatDate } from '../utils/formatDate';
// import './MyBooking.css';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getMyBookings(token)
        setBookings(response);
        // console.log(response.data);
        console.log(bookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  console.log('Bookings state:', bookings);

  return (
    <div>
      <h1>My Bookings</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room</th>
            <th>Timeslot</th>
            <th>Date</th>
            {/* <th>Start Time</th>
            <th>End Time</th> */}
            <th>Status Ruangan</th>
            <th>Status Bookings</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.RoomTimeSlot.Room.room_number}</td>
              <td>{booking.RoomTimeSlot.TimeSlot.start_time} - {booking.RoomTimeSlot.TimeSlot.end_time} </td>
              <td>{formatDate(booking.RoomTimeSlot.date)}</td>
              {/* <td>{booking.startTime}</td>
              <td>{booking.endTime}</td> */}
              <td>{booking.RoomTimeSlot.status}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyBooking;
