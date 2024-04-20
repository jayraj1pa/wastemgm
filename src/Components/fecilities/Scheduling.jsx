import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import "../fecilities/style.css";
import { schedulingAPI } from "../../service/allAPI";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import OpenCageGeocode from "opencage-api-client";
// Add this import at the beginning of your file
import { BsGeoAlt } from 'react-icons/bs';
// Add this import at the beginning of your file
import { InputGroup } from "react-bootstrap";





function Scheduling() {
  const [wasteScheduling, setWasteScheduling] = useState({
    houseNumber: "",
    wasteQuantity: "",
    edate: "",
    etime: "",
  });

  const [token, setToken] = useState("");

  const history = useNavigate();
  const toast = useToast();


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { houseNumber, wasteQuantity, edate, etime } = wasteScheduling;
    if (!houseNumber || !wasteQuantity || !edate || !etime) {


      toast({
        title: "Error Occured!",
        description: "please fill the form completely ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });


    } else {
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };





       try {
  const result = await schedulingAPI(wasteScheduling, reqHeader);
  if (result.status === 200) {
    setWasteScheduling({
      houseNumber: "",
      wasteQuantity: "",
      edate: "",
      etime: "",
    });
    history("/ecoschedule");
  } else {
    console.log(result);
    console.log(result.response.data);
  }
} catch (error) {
  console.error("An error occurred:", error);
}

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
            const result = await OpenCageGeocode.geocode({
              q: `${latitude},${longitude}`,
              key: '6153e12f88d04583ae94ab9ba01a715e', // Replace with your OpenCage API key
            });
  
            if (result && result.results && result.results.length > 0) {
              const locationName = result.results[0].formatted;
              
              // Update the state with the location name
              setWasteScheduling({
                ...wasteScheduling,
                houseNumber: locationName,
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
    <div className="specific-page">
      <Row style={{ marginTop: "100PX" }}>
        <Col
          className="ms-2"
          sm={12}
          md={9}
          lg={9}
          style={{
            backgroundImage: "url('/images/home.png')",
            height: "100vh",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Col>
        <Col
          style={{ height: "80vh", width: "23%" }}
          sm={12}
          md={3}
          lg={3}
          className="card ms-3   d-flex justify-content-center align-items-center "
        >
          <h3>Waste Scheduling </h3>
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
                  value={wasteScheduling.houseNumber}
                  onChange={(e) =>
                    setWasteScheduling({
                      ...wasteScheduling,
                      houseNumber: e.target.value,
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

          <Form.Group
            style={{ width: "300px" }}
            className="mb-3"
            controlId="formBasicReportType"
          >
            <Form.Label>Waste Quantity</Form.Label>
            <Form.Select
              value={wasteScheduling.wasteQuantity}
              onChange={(e) =>
                setWasteScheduling({
                  ...wasteScheduling,
                  wasteQuantity: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Select Waste Quantity
              </option>
              <option value="Below 1 Kg">Below 1 Kg</option>
              <option value="Below 5 Kg">Below 5 Kg</option>
              <option value="Above 5 Kg">Above 5 Kg</option>
            </Form.Select>
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
              value={wasteScheduling.edate}
              onChange={(e) =>
                setWasteScheduling({
                  ...wasteScheduling,
                  edate: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group
            style={{ width: "300px" }}
            className="mb-3"
            controlId="formBasicTime"
          >
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              value={wasteScheduling.etime}
              onChange={(e) =>
                setWasteScheduling({
                  ...wasteScheduling,
                  etime: e.target.value,
                })
              }
            />
          </Form.Group>

          <Button className="btn btn-success mt-3" onClick={handleAdd}>
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Scheduling;
