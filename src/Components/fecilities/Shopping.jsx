import React, { useContext, useEffect, useState } from 'react'
import { checkoutAPI, viewProducts } from '../../service/allAPI';
import { Button, Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../../service/BaseUrl';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import NavShopping from './NavShopping';
import NavFooter from './NavFooter';
import ImageSlider from './ImageSlider';
import { addPriceContext, paymentContext } from '../../service/ContextShare';











function Shopping() {
  const {payment,setPayment} =  useContext(paymentContext)
  const {payPrice,setPayPrice} = useContext(addPriceContext)
  const [viewProduct, setViewProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




const nav = useNavigate()
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




  const handleAdd = async (Product) =>{
    const { _id: productId, productName, productPrice } = Product;
   const token = sessionStorage.getItem("token")
   const reqHeader = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const NewPrice =  productPrice.split(" ")[1]
  // console.log(NewPrice);
  const user = sessionStorage.getItem("existingUser")
const detail = JSON.parse(user)

  console.log(detail.username);

  const items = [
    {
      productId: productId,
      productName: productName,
      productPrice: NewPrice,
      username:detail.username,
      address:detail.address
      // Add any other necessary product fields
    }
  ];
  

  try {
    const result = await checkoutAPI({items},reqHeader)
    console.log(Product);
    if(result.status=== 200){
      console.log(result.data);
    } else {
      console.log(result);
      console.log(result.response.data);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  }





  return (
    <div>


  
<NavShopping/>


<div>


<Row>
  <Col sm={12} md={6} lg={6}>

<div style={{marginLeft:"200px",marginTop:"130px"}}>


<p style={{fontSize:"70px",fontWeight:"bolder"}}>
Welcome to Our
</p>

<p style={{fontSize:"70px",marginTop:"-45px",fontWeight:"bolder"}}>
Online Store
</p>


<p style={{fontSize:"29px",fontColor:"#6F3A40"}}>



Discover the latest and greatest in fashion. Our collection features premium products for every style and occasion. From casual to formal, we've got you covered.
</p>

</div>


  </Col>


  <Col>

<ImageSlider/>

  
  </Col>
</Row>

  
</div>





      <div
        style={{ marginTop: "10%",marginBottom:"10%" }}
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
              placeholder="Search By Product Name"
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
              style={{ width: "22vw", backgroundColor: "#F0F0F0", marginLeft: "150px", transition: "transform 0.2s" }}
              className="card rounded shadow me-3 mb-5"
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
                style={{ width: "100%", height: "auto", transition: "transform 0.2s" }}
              />
             
                <p className="mt-3">{community.productName}</p>
                <p className="mt-2">{community.productDesc}</p>
                <hr style={{ marginTop: "-20px" }} />
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                 

                <Button
      style={{ width: "200px" }}
      className="mb-1 btn-success rounded"
      onClick={() => {
        
        handleAdd(community);
        setPayPrice(community.productPrice);
        nav("/payment", { price: community.productPrice });
      }}
    >
      {community.productPrice}
    </Button>

                  
                </div>
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

<NavFooter/>

    </div>
  )
}

export default Shopping