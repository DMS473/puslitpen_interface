import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoom } from '../services/api';

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await getRoom(id);
      setRoom(response.data);
    };

    fetchRoom();
  }, [id]);

  if (!room) return <div>Loading...</div>;

  return (
    <div>
      <h1>Room {room.room_number}</h1>
      <p>Type: {room.room_type}</p>
      <p>Capacity: {room.capacity}</p>
      <p>Price per slot: ${room.price_per_slot}</p>
      <p>Status: {room.status}</p>
      {/* You can add more details and a list of available time slots here */}
    </div>
  );
};

export default RoomDetail;
