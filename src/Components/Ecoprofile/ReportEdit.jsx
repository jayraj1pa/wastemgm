import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { BASE_URL } from "../../service/BaseUrl";
import { editProfileAPI } from "../../service/allAPI";

function ReportEdit({ report }) {
  const [show, setShow] = useState(false);

  const [reportDetails, setReportDetails] = useState({
    reportImage: report.reportingImage,
    location: report.location,
    issueType: report.type,
    id:report._id
  });

  console.log(reportDetails.reportImage);

  const [preview, setPreview] = useState("");

  
  const handleClose = () => {
    setShow(false);
    const setupdateReport = {
      reportImage: report.reportingImage,
      location: report.location,
      issueType: report.type,
      id: report._id,
    };
    setReportDetails(setupdateReport);
    setPreview("");
  };
  

  const handleShow = () => setShow(true);


  useEffect(() => {
    if (reportDetails.reportImage) {
      if (reportDetails.reportImage instanceof Blob) {
        const objectUrl = URL.createObjectURL(reportDetails.reportImage);
        setPreview(objectUrl);
  
        // Don't forget to revoke the object URL to avoid memory leaks
        return () => URL.revokeObjectURL(objectUrl);
      } else if (typeof reportDetails.reportImage === 'string') {
        setPreview(reportDetails.reportImage);
      }
    }
  }, [reportDetails.reportImage]);

  
  

const handleUpdate = async()=>{
    const {id,reportImage,location,issueType} = reportDetails
    if(!location || !issueType){
        alert("please fill them completely")
    }
    else{
        const reqBody = new FormData()
        reqBody.append("location",location)
        reqBody.append("issueType",issueType)
        reqBody.append("reportImage",reportImage)
        const token = sessionStorage.getItem("token")
        console.log("g",token);
        const reqHeader = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          };
          
          const result = await editProfileAPI(id,reqBody,reqHeader)
          if(result.status===200){
            handleClose()
            console.log("hii");
          }else{
            console.log(result);
            console.log(result.response.data);
          }

    }
}








  return (
    <div>
      <div className="hoverEffect">
        <button onClick={handleShow} className="btn">
          <i class="fas fa-edit fa-2x" style={{ color: "#07ed1e" }}></i>
        </button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Waste Report Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
            <Form.Group controlId="formBasicImage">
  <Form.Label>Incident Image</Form.Label>
  <Form.Control
    type="file"
    onChange={(e) => {
      const newImage = e.target.files[0];
      setReportDetails({
        ...reportDetails,
        reportImage: newImage ? newImage : reportDetails.reportImage,
      });
    }}
  />
  <Form.Text className="text-muted">Please upload an image.</Form.Text>
</Form.Group>


            </div>

            <div className="col-lg-6">
              <input
                type="text"
                className="form-control"
                placeholder="Enter location"
                value={reportDetails.location}
                onChange={(e) =>
                  setReportDetails({
                    ...reportDetails,
                    location: e.target.value,
                  })
                }
              />

              <Form.Group className="mb-3" controlId="formBasicReportType">
                <Form.Label>Issue Type</Form.Label>
                <Form.Select
                  defaultValue=""
                  value={reportDetails.issueType}
                  onChange={(e) =>
                    setReportDetails({
                      ...reportDetails,
                      issueType: e.target.value,
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
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdate} variant="primary">Edit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ReportEdit;
