import React, { useEffect, useState } from 'react';
import { getRooms, addRoom, updateRoom, deleteRoom } from '../../services/api';
import AddRoomModal from '../../components/Admin/AddRoomModal';

const RoomsAdmin = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState(null);
  // const kosong = null;
  

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        // const usersData = await fetchUsers(token);
        const roomsData = await getRooms();
        setRooms(roomsData.data);
        console.log(roomsData.data);
      } catch (err) {
        setError('Failed to fetch rooms');
      }
    };

    fetchData();
  }, []);

  const handleSave = async (roomData) => {
    console.log('Room name:', roomData);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      if (roomToEdit) {
        await updateRoom(token, roomData);
        setRooms(rooms.map(r => (r.room_id === roomData.room_id ? roomData : r)));
      } else {
        const newRoom = await addRoom(token, roomData);
        setRooms([...rooms, newRoom]);
      }
      // const newRoom = await addRoom(token, roomData);
      // setRooms([...rooms, newRoom]);
      setShowModal(false);
      setRoomToEdit(null);
    } catch (err) {
      setError('Failed to add room');
    }
    // Add the room to the list (for demonstration purposes)
    // setRooms([...rooms, { id: rooms.length + 1, name: roomData }]);
  };

  const handleAdd = () => {
    // setRoomToEdit({});
    
    // setRoomToEdit(kosong);
    setShowModal(true);
    // console.log(showModal)
  };

  const handleEdit = (room) => {
    setRoomToEdit(room);
    setShowModal(true);
  };

  const handleDelete = async (roomId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      await deleteRoom(token, roomId);
      setRooms(rooms.filter(room => room.room_id !== roomId));
    } catch (err) {
      setError('Failed to delete room');
    }
  };

  return (
    <div>
      <h1>Rooms</h1>
      {error && <p>{error}</p>}
      <button onClick={() => handleAdd()}>Add Room</button>
      <AddRoomModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setRoomToEdit(null);
          console.log(roomToEdit)
          // setRoomToEdit(null);
        }}
        handleSave={handleSave}
        roomToEdit={roomToEdit}
      />
      <table border="1">
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.room_id}>
              <td>{room.room_id}</td>
              <td>{room.room_number}</td>
              <td>{room.room_type}</td>
              <td>{room.capacity}</td>
              <td>{room.price_per_slot}</td>
              <td>{room.status}</td>
              <button onClick={() => handleEdit(room)}>Edit</button>
              <button onClick={() => handleDelete(room.room_id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomsAdmin;
