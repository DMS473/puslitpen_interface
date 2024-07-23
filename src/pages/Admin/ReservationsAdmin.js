import React, { useEffect, useState } from 'react';
import { getReservations } from '../../services/api';

const ReservationsAdmin = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        // const usersData = await fetchUsers(token);
        const reservationsData = await getReservations();
        setReservations(reservationsData.data);
        console.log(reservationsData.data);
      } catch (err) {
        setError('Failed to fetch rooms');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Reservations</h1>
      {error && <p>{error}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>Reservation_ID</th>
            <th>User ID</th>
            <th>Room-timeslot-id</th>
            <th>Start Time</th>
            <th>End TIme</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservation_id}>
              <td>{reservation.reservation_id}</td>
              <td>{reservation.User.username}</td>
              <td>{reservation.room_timeslot_id}</td>
              <td>{reservation.RoomTimeSlot.TimeSlot.start_time}</td>
              <td>{reservation.RoomTimeSlot.TimeSlot.end_time}</td>
              <td>{reservation.RoomTimeSlot.date}</td>
              <td>{reservation.status}</td>
              <button>edit</button>
              <button>delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsAdmin;
