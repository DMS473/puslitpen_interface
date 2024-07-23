import React, { useState, useEffect } from 'react';
import { createReservation, getRooms, getTimeSlots } from '../services/api';

const ReservationForm = () => {
  const [rooms, setRooms] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [reservation, setReservation] = useState({
    user_id: '',
    room_timeslot_id: '',
    reservation_date: '',
    total_price: 0,
    status: 'pending',
  });

  useEffect(() => {
    const fetchData = async () => {
      const roomsResponse = await getRooms();
      const timeslotsResponse = await getTimeSlots();
      setRooms(roomsResponse.data);
      setTimeslots(timeslotsResponse.data);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createReservation(reservation);
      console.log('Reservation created:', response.data);
      // Handle successful reservation
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID</label>
        <input type="text" name="user_id" value={reservation.user_id} onChange={handleChange} />
      </div>
      <div>
        <label>Room TimeSlot ID</label>
        <input type="text" name="room_timeslot_id" value={reservation.room_timeslot_id} onChange={handleChange} />
      </div>
      <div>
        <label>Reservation Date</label>
        <input type="date" name="reservation_date" value={reservation.reservation_date} onChange={handleChange} />
      </div>
      <div>
        <label>Total Price</label>
        <input type="number" name="total_price" value={reservation.total_price} onChange={handleChange} />
      </div>
      <div>
        <label>Status</label>
        <select name="status" value={reservation.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <button type="submit">Create Reservation</button>
    </form>
  );
};

export default ReservationForm;
