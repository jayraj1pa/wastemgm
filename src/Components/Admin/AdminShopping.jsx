import React, { useEffect } from 'react'
import NavComponent from '../NavComponent'
import { Button, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { adminAddProducts, deleteProductAPI, viewProducts } from '../../service/allAPI';
import { BASE_URL } from '../../service/BaseUrl';
import { useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import { addPriceContext } from '../../service/ContextShare';





function AdminShopping() {
  const {payPrice,setPayPrice} = useContext(addPriceContext)
      const [vProducts, setVProducts] = useState([]);

    const [show, setShow] = useState(false);
    const[ addProduct,setAddProduct]= useState({
        prductName:"",
        productImage:"",
        productPrice:"",
        productDesc:""
    })
    const [searchQuery, setSearchQuery] = useState("");


    const [token,setToken] = useState("")


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
          setToken(sessionStorage.getItem("token"));
        } else {
          setToken("");
        }
      }, []);


      const toast = useToast();

      

      const handleAdd = async (e) => {
        e.preventDefault();
        const { productImage,productPrice,prductName,productDesc } = addProduct;
        if (!prductName || !productImage || !productPrice || !productDesc) {
          


          toast({
            title: "Error Occured!",
            description: "Complete the form ",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });



        } else {
          const reqBody = new FormData();
          reqBody.append("productName", prductName);
          reqBody.append("productImage", productImage);
          reqBody.append("productPrice", productPrice);
          reqBody.append("productDesc",productDesc)

    
          if (token) {
            const reqHeader = {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            };
            const result = await adminAddProducts(reqBody, reqHeader);
            if (result.status === 200) {
              setAddProduct({
                prductName:"",
                productImage:"",
                productPrice:"",
                productDesc:""
              });
              handleClose();
            } else {
              console.log(result);
              alert(result.response.data);
            }
          }
        }
      };



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
              setVProducts(result.data);
            } else {
              console.log(result);
            }
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };


      useEffect(() => {
        getProducts();
      }, []);

      const handleSearch = (e) => {
        setSearchQuery(e.target.value);
      };


      const filteredProducts = vProducts.filter((community) =>
      community.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );


    // const handleAddProducts = (title) => {
    //     // Customize the alert message with the community title
    //     alert(`Thank you for joining the community: ${title}`);
    //   };



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleDelete = async (Id) => {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await deleteProductAPI(Id, reqHeader);
        console.log("Deleting Products with ID:", Id); // Add this line
  
        if (result.status === 200) {
          console.log("success");
          getProducts();
        } else {
          console.log(result.response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };




  return (



    <div>

<NavComponent/>

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
              placeholder="Search By Products Name"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </form>

        <Button
          style={{ marginRight: "200px" }}
          className="p-3 bg-success"
          onClick={handleShow}
        >
          Add Product
        </Button>
      </div>


      <Row className="mt-4 container-et akkam">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((community) => (

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
              <p className="mt-3" style={{textAlign:"center"}}> price  : {community.productPrice}</p>
              <p className="mt-3" style={{textAlign:"center"}}> Desc  : {community.productDesc}</p>

              {/* <Button
                className="mt-3 bd-success"
                onClick={() => handleAddProducts(community.productName)}
              >
                Join
              </Button> */}



<div className="hoverEffect">
                  <button
                    onClick={(e) => handleDelete(community._id)}
                    className="btn"
                  >
                    <i
                      class="fa-solid fa-trash fa-2x"
                      style={{ color: "#fc030b" }}
                    ></i>
                  </button>
                </div>





            </Col>
          ))
        ) : (
          <p>No matching Products found.</p>
        )}
      </Row>




   

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <Form.Group className="mb-3 mt-4 " controlId="formBasicPlaceName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              value={addProduct.prductName}
              onChange={(e) =>
                setAddProduct({
                  ...addProduct,
                  prductName: e.target.value,
                })
              }
            />
          </Form.Group>


          <Form.Group controlId="formBasicImage">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setAddProduct({
                  ...addProduct,
                  productImage: selectedFile,
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4 " controlId="formBasicPlaceName">
            <Form.Label>Product price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product price"
              value={addProduct.productPrice}
              onChange={(e) =>
                setAddProduct({
                  ...addProduct,
                  productPrice: e.target.value,
                })
              }
            />
          </Form.Group>


          <Form.Group className="mb-3 mt-4 " controlId="formBasicPlaceName">
            <Form.Label>Product Desc</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Desc"
              value={addProduct.productDesc}
              onChange={(e) =>
                setAddProduct({
                  ...addProduct,
                  productDesc: e.target.value,
                })
              }
            />
          </Form.Group>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>


      



    </div>
  )
}

export default AdminShopping