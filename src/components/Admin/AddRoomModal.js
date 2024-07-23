import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddRoomModal = ({ show, handleClose, handleSave, roomToEdit }) => {
  const [roomData, setRoomData] = useState({ room_number: '', room_type: '', capacity: '', price_per_slot: '', status: '' });
  
  useEffect(() => {
    // console.log(roomData)
    if (roomToEdit) {
      setRoomData(roomToEdit);
    }
  }, [roomToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    // e.preventDefault();
    handleSave(roomData);
    // console.log(roomData);
    setRoomData('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>{roomToEdit ? 'Edit Room' : 'Add New Room'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formRoomName">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              type="text"
              name="room_number"
              placeholder="Room Number"
              value={roomData.room_number}
              onChange={handleChange}
            />
            <Form.Label>Room Type</Form.Label>
            <Form.Control
              type="text"
              name="room_type"
              placeholder="Room Type"
              value={roomData.room_type}
              onChange={handleChange}
            />
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="text"
              name="capacity"
              placeholder="Room Capacity"
              value={roomData.capacity}
              onChange={handleChange}
            />
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price_per_slot"
              placeholder="Room Price"
              value={roomData.price_per_slot}
              onChange={handleChange}
            />
            {/* <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              placeholder="Room Status"
              value={roomData.status}
              onChange={handleChange}
            /> */}
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={roomData.status}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button variant="primary" onClick={handleSubmit}>
        {roomToEdit ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRoomModal;
