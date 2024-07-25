import React, { useEffect, useState } from 'react';
import { getRoomTimeSlotsAll, addRoomTimeSlot } from '../../services/api';
import AddRoomTimeslotModal from '../../components/Admin/AddRoomTimeSlotModal';
import { formatDate } from '../../utils/formatDate';

const RoomTimeSlotsAdmin = () => {
  const [roomtimeslots, setRoomtimeslots] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newRoomTimeslot, setNewRoomTimeslot] = useState({
    room_id: '',
    timeslot_id: '',
    date:'',
    status:'available',
  });

  // const start_time = '2024-06-17';
  // const end_time = '2024-07-28';

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        // const usersData = await fetchUsers(token);
        const roomtimeslotsData = await getRoomTimeSlotsAll();
        setRoomtimeslots(roomtimeslotsData.data.rows);
        console.log(roomtimeslotsData.data.rows);
      } catch (err) {
        setError('Failed to fetch rooms');
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    setShowModal(true);
    // console.log(showModal)
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewRoomTimeslot({ start_time: '', end_time: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoomTimeslot({ ...newRoomTimeslot, [name]: value });
  };

  const handleAddRoomTimeslot = async () => {
    try {
      const token = localStorage.getItem('token');
      const newData = await addRoomTimeSlot(token, newRoomTimeslot);
      console.log(newData);
      // setRoomtimeslots([...roomtimeslots, newData]);
      setShowModal(false);
      setNewRoomTimeslot({ startTime: '', endTime: '', date:'' });
      window.location.reload();

    } catch (error) {
      console.error('Failed to add roomtimeslot:', error);
      alert('Failed to add roomtimeslot');
    }
  };

  return (
    <div>
      <h1>Rooms</h1>
      {error && <p>{error}</p>}
      <button onClick={() => handleAdd()}>Add Data</button>
      <AddRoomTimeslotModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleAddRoomTimeslot={handleAddRoomTimeslot}
        newRoomTimeslot={newRoomTimeslot}
        handleChange={handleChange}
      />
      <table border="1">
        <thead>
          <tr>
            <th>Room_TimesLot_ID</th>
            <th>Room_Number</th>
            <th>Start Time</th>
            <th>End TIme</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roomtimeslots.map((roomtimeslot) => (
            <tr key={roomtimeslot.room_timeslot_id}>
              <td>{roomtimeslot.room_timeslot_id}</td>
              <td>{roomtimeslot.Room.room_number}</td>
              <td>{roomtimeslot.TimeSlot.start_time}</td>
              <td>{roomtimeslot.TimeSlot.end_time}</td>
              <td>{formatDate(roomtimeslot.date)}</td>
              <td>{roomtimeslot.status}</td>
              <button>edit</button>
              <button>delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTimeSlotsAdmin;
