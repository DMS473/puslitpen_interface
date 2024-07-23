import React from 'react';
import './RoomTimeSlotCard.css';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const RoomTimeSlotCard = ({ roomTimeSlot }) => {
  // console.log(roomTimeSlot.room_timeslot_id)
  return (
    <div className="room-time-slot-card">
      <h2>Ruangan {roomTimeSlot.Room.room_number}</h2>
      <p>Type: {roomTimeSlot.Room.room_type}</p>
      <p>Capacity: {roomTimeSlot.Room.capacity}</p>
      <p>Price: ${roomTimeSlot.Room.price_per_slot}</p>
      <p>Time: {roomTimeSlot.TimeSlot.start_time} - {roomTimeSlot.TimeSlot.end_time}</p>
      <p>Status: {roomTimeSlot.Room.status}</p> 
       
    </div>
  );
};

export default RoomTimeSlotCard;
