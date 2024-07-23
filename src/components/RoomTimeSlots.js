import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Pagination } from 'react-bootstrap';
import { format } from 'date-fns';

const RoomTimeSlots = () => {
  const [roomTimeSlots, setRoomTimeSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10; // Jumlah item per halaman
  const startDate = '2024-07-01';
  const endDate = '2024-07-07';

  useEffect(() => {
    const fetchRoomTimeSlots = async () => {
      try {
        console.log("kocak")
        const response = await axios.get('http://localhost:3000/api/roomtimeslots', {
          params: {
            startDate,
            endDate,
            page: currentPage,
            limit,
          },
        });
        setRoomTimeSlots(response.data.roomTimeSlots);
        setTotalPages(Math.ceil(response.data.total / limit));
      } catch (error) {
        console.error('Failed to fetch room time slots:', error);
      }
    };

    fetchRoomTimeSlots();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  return (
    <div>
      <Row>
        {daysOfWeek.map((day, index) => (
          <Col key={index}>
            <h3>{day}</h3>
            {roomTimeSlots
              .filter((slot) => format(new Date(slot.date), 'EEEE') === day)
              .map((slot) => (
                <Card key={slot.id} style={{ marginBottom: '10px' }}>
                  <Card.Body>
                    <Card.Title>{slot.Room.name}</Card.Title>
                    <Card.Text>
                      Time: {slot.TimeSlot.startTime} - {slot.TimeSlot.endTime}<br />
                      Date: {format(new Date(slot.date), 'd MMMM yyyy')}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
          </Col>
        ))}
      </Row>
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default RoomTimeSlots;
