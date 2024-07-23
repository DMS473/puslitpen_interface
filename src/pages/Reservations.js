import React, { useEffect, useState } from 'react';
import { getReservations } from '../services/api';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await getReservations();
      setReservations(response.data);
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h1>Reservations</h1>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.reservation_id}>
            Reservation ID: {reservation.reservation_id}, User ID: {reservation.user_id}, Room TimeSlot ID: {reservation.room_timeslot_id}, Date: {reservation.reservation_date}, Price: {reservation.total_price}, Status: {reservation.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
