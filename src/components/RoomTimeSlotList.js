import React, { useEffect, useState } from 'react';
import RoomTimeSlotCard from './RoomTimeSlotCard';
import { createReservation, getRoomTimeSlots } from '../services/api';
import { Card, Row, Col, Modal, Button, ListGroup, Navbar, Container } from 'react-bootstrap';
import axios from 'axios';
import { format, addDays, subDays } from 'date-fns';
import { getDateRange } from '../utils/getDateRange';
import { formatDate } from '../utils/formatDate';
import { formatTime } from '../utils/formatTime';

const RoomTimeSlotList = () => {
  const [roomTimeSlots, setRoomTimeSlots] = useState([]);
  const [data, setData] = useState({ user_id: '', room_timeslot_id: ''});
  const [showModal, setShowModal] = useState(false);
  const [selectedRoomTimeSlot, setSelectedRoomTimeSlot] = useState(null);
  const [startDate, setStartDate] = useState('2024-07-08');

  // const limit = 10; // Jumlah item per halaman
  const daysRange = 7;
  // const start_time = '2024-07-01';
  // const end_time = '2024-07-07';

  useEffect(() => {
    const fetchData = async () => {
      const { startDate: start, endDate: end } = getDateRange(startDate, daysRange);
      const response = await getRoomTimeSlots(start, end);
      setRoomTimeSlots(response);
      console.log(response);
      console.log(startDate)
    };

    fetchData();
  }, [startDate]);

  const handleShowModal = (roomTimeSlot) => {
    setSelectedRoomTimeSlot(roomTimeSlot);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // createReservation(data);
    setShowModal(false);
    setSelectedRoomTimeSlot(null);
  };

  const handleSubmitModal = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/api/reservations`,
        { room_timeslot_id: selectedRoomTimeSlot.room_timeslot_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Booking successful');
      setSelectedRoomTimeSlot(null); // Close the modal
    } catch (error) {
      console.log(error);
      alert('Failed to reserve booking');
    }
    // createReservation(data);
    setShowModal(false);
    setSelectedRoomTimeSlot(null);
  };

  const handlePrevious = () => {
    const newStartDate = subDays(new Date(startDate), daysRange);
    setStartDate(format(newStartDate, 'yyyy-MM-dd'));
  };

  const handleNext = () => {
    const newStartDate = addDays(new Date(startDate), daysRange);
    setStartDate(format(newStartDate, 'yyyy-MM-dd'));
  };

  // const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const getDayIndex = (day) => {
    switch(day) {
      case 'Senin': return 1;
      case 'Selasa': return 2;
      case 'Rabu': return 3;
      case 'Kamis': return 4;
      case 'Jumat': return 5;
      case 'Sabtu': return 6;
      case 'Minggu': return 0;
      default: return -1;
    }
  };

  const { startDate: displayStartDate, endDate: displayEndDate } = getDateRange(startDate, daysRange);

  // const getDayWithDate = (date) => {
  //   const dayIndex = new Date(date).getDay();
  //   const dayName = daysOfWeek[dayIndex];
  //   const formattedDate = format(new Date(date), 'd MMMM');
  //   return `${dayName}, ${formattedDate}`;
  // };

  // const getDayWithDate = (date, dayIndex) => {
  //   const currentDate = addDays(new Date(date), dayIndex);
  //   const dayName = daysOfWeek[currentDate.getDay() - 1];
  //   const formattedDate = format(currentDate, 'd MMMM');
  //   return `${dayName}, ${formattedDate}`;
  // };

  const getDayWithDate = (date, dayIndex) => {
    const currentDate = addDays(new Date(date), dayIndex);
    const dayName = daysOfWeek[currentDate.getDay()];
    const formattedDate = format(currentDate, 'd MMMM');
    return `${dayName}, ${formattedDate}`;
  };


  return (
    <div className="room-time-slot-list">
      {/* <h1>tes</h1> */}
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
        <Button onClick={handlePrevious}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div> */}
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Button onClick={handlePrevious} variant="outline-primary">Previous</Button>
          <Navbar.Text className="mx-auto">
            {format(new Date(displayStartDate), 'd MMMM yyyy')} - {format(new Date(displayEndDate), 'd MMMM yyyy')}
          </Navbar.Text>
          <Button onClick={handleNext} variant="outline-primary">Next</Button>
        </Container>
      </Navbar>

      <Row>
      {[...Array(daysRange)].map((_, index) => (
          <Col key={index}>
            {/* <h3>{day}</h3> */}
            <h3>{getDayWithDate(displayStartDate, index)}</h3>
            {roomTimeSlots
              // .filter((slot) => format(new Date(slot.date), 'EEEE') === day)
              .filter((slot) => new Date(slot.date).getDay() === (new Date(displayStartDate).getDay() + index) % 7)
              .map((slot) => (
                <Card key={slot.room_timeslot_id} style={{ marginbottom: '10px'}}>
                  <Card.Body>
                    <Card.Title>{slot.Room.room_number}</Card.Title>
                    <Card.Text>
                      <p>{formatTime(slot.TimeSlot.start_time)} - {formatTime(slot.TimeSlot.end_time)}</p>
                      {/* <p>{formatDate(slot.date)}</p>  */}
                    </Card.Text>
                    <Button
                  variant={slot.status === 'reserved' ? 'danger' : 'primary'}
                  disabled={slot.status === 'reserved'}
                  onClick={() => handleShowModal(slot)}
                >
                  {slot.status === 'reserved' ? 'Reserved' : 'Book'}
                </Button>
                  </Card.Body>
                </Card>
              ))}
          </Col>
        ))}
      </Row>

      
      {/* {roomTimeSlots.map((slot) => (
        // <RoomTimeSlotCard key={slot.room_timeslot_id} roomTimeSlot={slot} />
        // console.log("tes")
        <div className="room-time-slot-card">
          <h2>Ruangan {slot.Room.room_number}</h2>
          <p>Type: {slot.Room.room_type}</p>
          <p>Capacity: {slot.Room.capacity}</p>
          <p>Price: ${slot.Room.price_per_slot}</p>
          <p>Time: {slot.TimeSlot.start_time} - {slot.TimeSlot.end_time}</p>
          <p>Date: {formatDate(slot.date)}</p> 
          <p>Status: {slot.status}</p> 
          <Button
                  variant={slot.status === 'reserved' ? 'danger' : 'primary'}
                  disabled={slot.status === 'reserved'}
                  onClick={() => handleShowModal(slot)}
                >
                  {slot.status === 'reserved' ? 'Reserved' : 'Book'}
                </Button>
        </div>
      ))} */}

      {selectedRoomTimeSlot && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Room Time Slot Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Room ID: {selectedRoomTimeSlot.room_id}</p>
            <p>Time Slot ID: {selectedRoomTimeSlot.timeslot_id}</p>
            <p>Date: {formatDate(selectedRoomTimeSlot.date)}</p>
            <p>Status: {selectedRoomTimeSlot.status}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmitModal}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}

    </div>

    
  );
};

export default RoomTimeSlotList;
