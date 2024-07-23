import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddRoomTimeslotModal = ({ showModal, handleCloseModal, handleAddRoomTimeslot, newRoomTimeslot, handleChange }) => {
    const [roomData, setRoomData] = useState({ room_id: '', timeslot_id: '' });
    // console.log("Tes")
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setRoomData({ ...roomData, [name]: value });
    // };

    const handleSubmit = async (e) => {

        handleAddRoomTimeslot();
    };


  return (

    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New RoomTimeSlot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formRoomID">
            <Form.Label>Room ID</Form.Label>
            <Form.Control
              type="text"
              name="room_id"
              value={newRoomTimeslot.room_id}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTimeslotID">
            <Form.Label>Timeslot ID</Form.Label>
            <Form.Control
              type="text"
              name="timeslot_id"
              value={newRoomTimeslot.timeslot_id}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={newRoomTimeslot.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={newRoomTimeslot.status}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button> */}
        <Button variant="primary" onClick={handleSubmit}>
          Add RoomTimeSlot
        </Button>
      </Modal.Footer>
    </Modal>

    // <Modal show={showModal} onHide={handleCloseModal}>
    //   <Modal.Header closeButton>
    //   <Modal.Title>Add New Room Time Slot</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <Form>
    //       <Form.Group controlId="formRoomName">
    //         <Form.Label>Room ID</Form.Label>
    //         <Form.Control
    //           type="text"
    //           name="room_id"
    //           placeholder="Room Id"
    //           value={newRoomTimeslot.room_id}
    //           onChange={handleChange}
    //         />
    //         <Form.Label>TimeSlot Id</Form.Label>
    //         <Form.Control
    //           type="text"
    //           name="timeslot_id"
    //           placeholder="Timeslot Id"
    //           value={newRoomTimeslot.timeslot_id}
    //           onChange={handleChange}
    //         />
    //       </Form.Group>
    //     </Form>
    //   </Modal.Body>
    //   <Modal.Footer>
    //     {/* <Button variant="secondary" onClick={handleClose}>
    //       Close
    //     </Button> */}
    //     <Button variant="primary" onClick={handleSubmit}>
    //      Add
    //     </Button>
    //   </Modal.Footer>
    // </Modal>


    // <div className="modal">
    //   <div className="modal-content">
    //     <span className="close" onClick={handleCloseModal}>
    //       &times;
    //     </span>
    //     <h2>Add New RoomTimeSlot</h2>
    //     <form>
    //       <label>
    //         Room ID:
    //         <input
    //           type="text"
    //           name="room_id"
    //           value={newRoomTimeslot.room_id}
    //           onChange={handleChange}
    //         />
    //       </label>
    //       <label>
    //         Timeslot ID:
    //         <input
    //           type="text"
    //           name="timeslot_id"
    //           value={newRoomTimeslot.timeslot_id}
    //           onChange={handleChange}
    //         />
    //       </label>
    //       <label>
    //         Date:
    //         <input
    //           type="date"
    //           name="date"
    //           value={newRoomTimeslot.date}
    //           onChange={handleChange}
    //         />
    //       </label>
    //       <label>
    //         Status:
    //         <select
    //           name="status"
    //           value={newRoomTimeslot.status}
    //           onChange={handleChange}
    //         >
    //           <option value="available">Available</option>
    //           <option value="reserved">Reserved</option>
    //         </select>
    //       </label>
    //       <button type="button" onClick={handleSubmit}>Add RoomTimeSlot</button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default AddRoomTimeslotModal;
