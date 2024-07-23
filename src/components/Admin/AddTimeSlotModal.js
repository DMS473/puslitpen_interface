import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import axios from 'axios';
// import './Admin.css';

const AddTimeslotModal = ({ showModal, handleCloseModal, handleAddTimeslot, newTimeslot, handleChange }) => {
    const [roomData, setRoomData] = useState({ start_time: '', end_time: '' });

//   }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setRoomData({ ...roomData, [name]: value });
    //     console.log(roomData)
    // };

    const handleSubmit = async (e) => {
    //     setRoomData('');
        handleAddTimeslot();
    };


  return (

    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
      <Modal.Title>Add New Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formRoomName">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="text"
              name="start_time"
              placeholder="Start Time"
              value={newTimeslot.start_time}
              onChange={handleChange}
            />
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="text"
              name="end_time"
              placeholder="End Time"
              value={newTimeslot.end_time}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
         Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTimeslotModal;
