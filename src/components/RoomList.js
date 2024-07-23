import React, { useEffect, useState } from 'react';
import { getRooms } from '../services/api';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await getRooms();
      setRooms(response.data);
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Rooms</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.room_id}>{room.room_number} - {room.room_type}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
