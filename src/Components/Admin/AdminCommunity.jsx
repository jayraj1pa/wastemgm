import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import NavComponent from "../NavComponent";
import { adminAddCommunity, deleteCommunityAPI, viewCommunity } from "../../service/allAPI";
import { BASE_URL } from "../../service/BaseUrl";
import { Toast, useToast } from "@chakra-ui/react";




function AdminCommunity() {
  const [vCommunity, setVCommunity] = useState([]);
  const [addCommunity, setAddCommunity] = useState({
    communityImage: "",
    title: "",
    eDate: "", 
    Desc:"",
  });
  const [show, setShow] = useState(false);
  const [token, setToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { communityImage, title, eDate  ,Desc} = addCommunity; // Corrected here
    if (!communityImage || !title || !eDate ||!Desc) {
      toast({
        title: "Error Occurred!",
        description: "Fill the form completely ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } else {
      const reqBody = new FormData();
      reqBody.append("communityImage", communityImage);
      reqBody.append("title", title);
      reqBody.append("eDate", eDate);
      reqBody.append("Desc", Desc);

  
      if (token) {
        // console.log("Token:", token);

        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await adminAddCommunity(reqBody, reqHeader);
          if (result.status === 200) {
            setAddCommunity({
              communityImage: "",
              title: "",
              eDate: "", // Include eDate in the reset state
              Desc:"",
            });
            handleClose();
            getCommunity()
          } else {
            // console.log(result.data);
            alert(result.response.data);
          }
        } catch (error) {
          console.error("Error adding community:", error);
        }
      }
    }
  };
  

  const toast = useToast();


  const getCommunity = async () => {
    try {
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const result = await viewCommunity();
        if (result.status === 200) {
          setVCommunity(result.data);
        } else {
          // console.log(result);
        }
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    getCommunity();
    
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCommunity = vCommunity.filter((community) =>
    community.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleDelete = async (Id) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await deleteCommunityAPI(Id, reqHeader);
      // console.log("Deleting Community with ID:", Id); // Add this line

      if (result.status === 200) {
        console.log("success");
        getCommunity();
      } else {
        console.log(result.response.data);
      }
    } catch (error) {
      console.error(error);
    }
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

        

        <Button
          style={{ marginRight: "200px" }}
          className="p-3 bg-success"
          onClick={handleShow}
        >
          Add a community
        </Button>
      </div>

      <Row className="mt-4 container-et akkam">
        {filteredCommunity.length > 0 ? (
          filteredCommunity.map((community) => (
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
                    ? `${BASE_URL}/uploads/${community?.communityImage}`
                    : null
                }
                alt="community Image"
              />
              <p className="mt-3" style={{textAlign:"center"}}> Community  : {community.title}</p>
              <p className="mt-3" style={{textAlign:"center"}}> Date  : {community.eDate}</p>
              <p className="mt-3" style={{textAlign:"center"}}> Desc  : {community.Desc}</p>



              
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
          <p>No matching communities found.</p>
        )}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>Add Community</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3 mt-4 " controlId="formBasicPlaceName">
            <Form.Label>Community Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Community Name"
              value={addCommunity.title}
              onChange={(e) =>
                setAddCommunity({
                  ...addCommunity,
                  title: e.target.value,
                })
              }
            />
          </Form.Group>


          <Form.Group className="mb-3 mt-4 " controlId="formBasicPlaceName">
            <Form.Label>Community Details</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Community Details"
              value={addCommunity.Desc}
              onChange={(e) =>
                setAddCommunity({
                  ...addCommunity,
                  Desc: e.target.value,
                })
              }
            />
          </Form.Group>


          <Form.Group
            style={{ width: "300px" }}
            className="mb-3"
            controlId="formBasicDate"
          >
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={addCommunity.eDate}
              onChange={(e) =>
                setAddCommunity({
                  ...addCommunity,
                  eDate: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group controlId="formBasicImage">
            <Form.Label>Community Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setAddCommunity({
                  ...addCommunity,
                  communityImage: selectedFile,
                });
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminCommunity;