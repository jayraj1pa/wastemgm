import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { reportingAPI } from "../../service/allAPI";
import { useNavigate } from "react-router-dom";


function WasteReporting() {
  const [coins, setCoins] = useState(0);

  const [wasteReporting, setWasteReporting] = useState({
    reportingImage: "",
    location: "",
    type: "",
  });
  console.log(wasteReporting);

  const history = useNavigate()


  const [token,setToken] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }else{
      setToken("")
    }
  },[])


  const handleAdd = async (e)=>{
    e.preventDefault()
    const {reportingImage,location,type} = wasteReporting
    if(!reportingImage || !location || !type){
alert("please fill the form completely!!")
    }else{
      const reqBody = new FormData()
      reqBody.append("reportingImage",reportingImage)
      reqBody.append("location",location)
      reqBody.append("type",type)

     if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
     }
     const result = await reportingAPI(reqBody,reqHeader)
     if(result.status===200){
     setWasteReporting({
      reportingImage: "",
    location: "",
    type: "",
     })
     history('/ecoreport')
     setCoins(coins + 1);




     }else{
       console.log(result);
       alert(result.response.data);
      
      }

    
      }

    }
  }
  console.log(coins);

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

            <Form.Group controlId="formBasicImage">
              <Form.Label>Incident Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  // Access the first selected file
                  const selectedFile = e.target.files[0];

                  // Update the state with the selected file
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

            <Form.Group className="mb-3 mt-4 " controlId="formBasicPlaceName">
              <Form.Label>Location</Form.Label>
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicReportType">
              <Form.Label>Issue Type</Form.Label>
              <Form.Select
                value={wasteReporting.type}
                onChange={(e) =>
                  setWasteReporting({ ...wasteReporting, type: e.target.value })
                }
              >
                <option value="" disabled>
                  Select an Issue
                </option>
                <option value="Overflow Bins">Overflow Bins</option>
                <option value="Illegal waste disposal">Illegal waste disposal</option>
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
    </div>
  );
}

export default WasteReporting;
