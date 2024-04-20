import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Container, InputGroup } from "react-bootstrap";
import { coinsApi, reportingAPI } from "../../service/allAPI";
import { useNavigate } from "react-router-dom";
import { BsGeoAlt } from "react-icons/bs"; // Import the GeoAlt icon from react-icons/bs
import { Img, useToast } from "@chakra-ui/react";
import Modal from 'react-bootstrap/Modal';
import { useContext } from "react";
import { medalContext } from "../../service/ContextShare";
import opencage from 'opencage-api-client';



function WasteReporting() {
  const {medal,setMedal} = useContext(medalContext)
  // const [coins, setCoins] = useState(0);
  const [getcoin,setGetCoin] = useState()

  const [smShow, setSmShow] = useState(false);


  const [wasteReporting, setWasteReporting] = useState({
    reportingImage: "",
    location: "",
    type: "",
  });

  const history = useNavigate();
  const toast = useToast();

  const getCoins = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const result = await coinsApi(reqHeader);
      if (result.status === 200) {
        setGetCoin(result.data.coins);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };
  
  useEffect(() => {
    getCoins();
  }, []);
  

  console.log(getcoin);

  const [token, setToken] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { reportingImage, location, type } = wasteReporting;
  
    if (!reportingImage || !location || !type) {


      toast({
        title: "Error Occured!",
        description: "please fill the form completely ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });


      return;
    }
  
    const reqBody = new FormData();
    reqBody.append("reportingImage", reportingImage);
    reqBody.append("location", location);
    reqBody.append("type", type);
  
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
  
      try {
        const result = await reportingAPI(reqBody, reqHeader);
        
        console.log("Result:", result); // Log the result for debugging
        setSmShow(true)

        setTimeout(()=>{
          setSmShow(false)
          history("/ecoreport");
        },4000)
  
        if (result && result.status === 200) {
          setWasteReporting({
            reportingImage: "",
            location: "",
            type: "",
          });
          // setCoins(coins + 1);
        

        } else {
          console.error("Error submitting report:", result?.response?.data || "Unknown error");
          alert(result?.response?.data || "Unknown error");
        }
      } catch (error) {
        console.error("Error submitting report:", error.message || "Unknown error");
        alert("Error submitting report. Please try again.");
      }
    }
  };
  

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          try {
            const result = await opencage.geocode({
              q: `${latitude},${longitude}`,
              key: '6153e12f88d04583ae94ab9ba01a715e', // Replace with your OpenCage API key
            });
  
            if (result && result.results && result.results.length > 0) {
              const locationName = result.results[0].formatted;
              
              // Update the state with the location name
              setWasteReporting({
                ...wasteReporting,
                location: locationName,
              });
            } else {
              console.error('Error getting location name from coordinates');
              alert('Error getting location name. Please try again.');
            }
          } catch (error) {
            console.error('Error getting location name:', error.message);
            alert('Error getting location name. Please try again.');
          }
        },
        (error) => {
          console.error('Error getting user location:', error.message);
          alert('Error getting user location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };
  




  return (
    <div>
      <Row style={{ marginTop: "100px" }}>
        <Col className="me-2 ms-2" sm={12} md={9} lg={9}>
          <div
            style={{
              backgroundImage: "url('/images/home.png')",
              height: "100vh",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Col>

        <Col
          style={{ height: "80vh" }}
          className=" card p-3 d-flex justify-content-center align-items-center me-4"
        >
          <Container>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "20px",
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Waste Reporting
            </h2>

            <Form.Group className="mb-3 mt-4" controlId="formBasicPlaceName">
              <Form.Label>
                <span className="d-flex align-items-center">
                  Location <BsGeoAlt className="ms-2" />
                </span>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Please provide the Location Details"
                  value={wasteReporting.location}
                  onChange={(e) =>
                    setWasteReporting({
                      ...wasteReporting,
                      location: e.target.value,
                    })
                  }
                />
                <Button
                  variant="btn btn-success"
                  onClick={getUserLocation}
                >
                  <BsGeoAlt />
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicImage">
              <Form.Label>Incident Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  setWasteReporting({
                    ...wasteReporting,
                    reportingImage: selectedFile,
                  });
                }}
              />
              <Form.Text className="text-muted">
                Please upload an image.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicReportType">
              <Form.Label>Issue Type</Form.Label>
              <Form.Select
                value={wasteReporting.type}
                onChange={(e) =>
                  setWasteReporting({
                    ...wasteReporting,
                    type: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Select an Issue
                </option>
                <option value="Overflow Bins">Overflow Bins</option>
                <option value="Illegal waste disposal">
                  Illegal waste disposal
                </option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="btn btn-success mt-1"
              onClick={handleAdd}
            >
              Submit
            </Button>
          </Container>
        </Col>
      </Row>


    

      
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        size="md" // Set the size to "lg" for a larger modal
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

<img src="https://cdn.dribbble.com/users/43762/screenshots/1097917/media/2230725fb3405868d4ce6cd4c735288b.gif"/>


<p style={{textAlign:"center",fontSize:"20px"}}>Congrats for <span style={{fontWeight:"bold",color:"#F05835"}}>{getcoin + 1}</span>  medals and </p>
<p  style={{textAlign:"center",fontSize:"20px"}}>A new Medal was added to your account</p>



          
        </Modal.Body>
      </Modal>
     



    </div>
  );
}

export default WasteReporting;
