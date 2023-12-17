import React, { useEffect, useState } from 'react'
import { viewProducts } from '../../service/allAPI';
import NavComponent from '../NavComponent';
import { Button, Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../../service/BaseUrl';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';






function Shopping() {
  const [viewProduct, setViewProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  useEffect(() => {
    const getProducts = async () => {
      try {
        if (sessionStorage.getItem("token")) {
          const token = sessionStorage.getItem("token");
          const reqHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const result = await viewProducts();
          if (result.status === 200) {
            setViewProduct(result.data);
          } else {
            console.log(result);
          }
        }
      } catch (error) {
        console.error("Error fetching community:", error);
      }
    };

    getProducts();
  }, []);


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredProduct = viewProduct.filter((community) =>
    community.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleAddProducts = (title) => {
    // Customize the alert message with the community title
    alert(`contact the admin directly via email: ${title}`);
  };





  return (
    <div>


  
<NavComponent />

      <div
        style={{ marginTop: "5%" }}
        className="d-flex justify-content-between align-items-center"
      >
        <form>
          <div
            style={{ marginTop: "20px", width: "20%" }}
            className="ms-5  border    rounded"
          >
            <input
              style={{ width: "1000%" }}
              type="text"
              className="form-control"
              placeholder="Search By Community Name"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </form>
      </div>




      <Row className="mt-4 container-et akkam">
        {filteredProduct.length > 0 ? (
          filteredProduct.map((community) => (
            <Col
              style={{ width: "25vw" }}
              className="card shadow me-5 ms-5 mb-5"
              sm={4}
              md={4}
              lg={4}
              key={community._id}
            >
              <img
                className="img-fluid"
                src={
                  community
                    ? `${BASE_URL}/uploads/${community?.productImage}`
                    : null
                }
                alt="community Image"
              />
              <p className="mt-3" style={{textAlign:"center"}}> Name : {community.productName}</p>
              <p className="mt-3" style={{textAlign:"center"}}> Price  : {community.productPrice}</p>

              <Button
                className="mt-3 bg-success"
                onClick={() => handleShow()}
              >
                Buy
              </Button>
            </Col>
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </Row>






      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Make Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       


        <Form.Group controlId="cvv">
  <InputGroup className="mb-3">
    <Form.Control type="text" placeholder="Enter Amount" aria-label="CVV Number" />
  </InputGroup>
</Form.Group>


<Form.Group controlId="cvv">
  <InputGroup className="mb-3">
    <Form.Control type="text" placeholder="Enter Card Number" aria-label="CVV Number" />
  </InputGroup>
</Form.Group>


      <Form.Group controlId="cvv">
  <InputGroup className="mb-3">
    <Form.Control type="text" placeholder="Enter CVV" aria-label="CVV Number" />
  </InputGroup>
</Form.Group>




     



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className='btn-btn-success' variant="primary">Make payment</Button>
        </Modal.Footer>
      </Modal>



    </div>
  )
}

export default Shopping