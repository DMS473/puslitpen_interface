import React, { useEffect, useState } from 'react';
import { getTimeSlots, addTimeSlot } from '../../services/api';
// import '';
import AddTimeslotModal from '../../components/Admin/AddTimeSlotModal';

const TimeSlots = () => {
  const [timeslots, setTimeslots] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTimeslot, setNewTimeslot] = useState({
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        // const usersData = await fetchUsers(token);
        const timeslotsData = await getTimeSlots();
        setTimeslots(timeslotsData.data);
        console.log(timeslotsData.data);
      } catch (err) {
        setError('Failed to fetch rooms');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTimeslot({ ...newTimeslot, [name]: value });
  };

  const handleAdd = () => {
    setShowModal(true);
    // console.log(showModal)
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTimeslot({ start_time: '', end_time: '' });
  };


  const handleAddTimeslot = async () => {
    try {
      const token = localStorage.getItem('token');
      const newData = await addTimeSlot(token, newTimeslot);
      setTimeslots([...timeslots, newData]);
      setShowModal(false);
      setNewTimeslot({ startTime: '', endTime: '' });

    } catch (error) {
      console.error('Failed to add timeslot:', error);
      alert('Failed to add timeslot');
    }
  };

  return (
    <div>
      <h1>Timeslots</h1>
      
      {error && <p>{error}</p>}
      <button onClick={() => handleAdd()}>Add Data</button>
      <AddTimeslotModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleAddTimeslot={handleAddTimeslot}
        newTimeslot={newTimeslot}
        handleChange={handleChange}
      />
      <table border="1">
        <thead>
          <tr>
            <th>Timeslot ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {timeslots.map((timeslot) => (
            <tr key={timeslot.timeslot_id}>
              <td>{timeslot.timeslot_id}</td>
              <td>{timeslot.start_time}</td>
              <td>{timeslot.end_time}</td>
              <button>edit</button>
              <button>delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSlots;
