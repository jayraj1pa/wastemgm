import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../service/BaseUrl';
import { useToast } from '@chakra-ui/react';
import { feedbackAPI } from '../service/allAPI';




function FeedBack() {
  const [show, setShow] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    nav('/loginhome');
  };

  const nav = useNavigate();

//   const handleFeedbackChange = (e) => {
//     setFeedback(e.target.value);
//   };

const toast = useToast();
const token = sessionStorage.getItem("token")


const handleSubmit = async (e)=>{
    e.preventDefault()
    if ( !feedback) {


        toast({
          title: "Error Occured!",
          description: "please fill the form completely ",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });


}
else {
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await feedbackAPI({message:feedback}, reqHeader);
      if (result.status === 200) {
        setFeedback("");
        nav('/loginhome')
      } else {
        console.log(result);
        console.log(result.response.data);
      }
    }
  }
}



  useEffect(() => {
    // Call handleShow when the component is mounted to open the modal
    handleShow();
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render

  return (
    <div  style={{
      backgroundImage:      "url('/images/home.png')",
      height: "100vh",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>User Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="feedbackTextarea">
            <Form.Label>Feedback:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedback}
              onChange={(e)=>setFeedback(e.target.value)}
              placeholder="Type your feedback here..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FeedBack;
