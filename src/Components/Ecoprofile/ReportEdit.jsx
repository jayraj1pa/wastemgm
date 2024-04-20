import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { BASE_URL } from "../../service/BaseUrl";
import WasteReporting from "../fecilities/WasteReporting";
import { useToast } from "@chakra-ui/react";
import { editReportAPI } from "../../service/allAPI";
import { useContext } from "react";
import { addReportResponseContext } from "../../service/ContextShare";


function ReportEdit({ report }) {
  const {addReportResponse,setAddReportResponse} = useContext(addReportResponseContext)
  const [wasteReporting, setWasteReporting] = useState({
    id: report._id,
    reportingImage: "",
    location: report.location,
    type: report.type,
  });

  const [preview, setPreview] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => {
  setShow(false);
  setWasteReporting({
    id: report._id,
    reportingImage: "",
    location: report.location,
    type: report.type,
  })
  setPreview("")
  }








  const handleShow = () => setShow(true);

  useEffect(() => {
    if (wasteReporting.reportingImage) {
      setPreview(URL.createObjectURL(wasteReporting.reportingImage));
    }
  }, [wasteReporting.reportingImage]);



  const toast = useToast();



  const handleAdd = async()=>{
    const  { id ,location ,type,reportingImage } = wasteReporting
    if(!id || !location || !type ){      
      console.log("id:", id);
console.log("location:", location);
console.log("type:", type);

      toast({
        title: "Error Occured!",
        description: "please fill the Modal completely ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }else{
      const reqBody = new FormData()
      reqBody.append("location",location)
      reqBody.append("type",type)
      preview?reqBody.append("reportingImage",reportingImage):reqBody.append("reportingImage",report.reportingImage)

      const token = sessionStorage.getItem("token")
      if(preview){
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };

        const result = await editReportAPI(id,reqBody,reqHeader)
        if(result.status===200){
          handleClose()
          setAddReportResponse(result.data)
        }else{
          console.log(result);
          toast({
            title: "Error Occured!",
            description: result.response.data,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });

        }

      }else{
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const result = await editReportAPI(id,reqBody,reqHeader)
        if(result.status===200){
          handleClose()
          setAddReportResponse(result.data)
        }else{
          console.log(result);
          toast({
            title: "Error Occured!",
            description: result.response.data,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
        }
      }



    }
  }

  return (
    <div>
      <div className="hoverEffect">
        <button onClick={handleShow} className="btn">
          <i className="fas fa-edit fa-2x" style={{ color: "green" }}></i>
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
              <label>
                <input
                  type="file"
                  style={{
                    display: "none",
                  }}
                  onChange={(e) =>
                    setWasteReporting({
                      ...wasteReporting,
                      reportingImage: e.target.files[0],
                    })
                  }
                />
                <img
                  className="img-fluid"
                  src={
                    preview
                      ? preview
                      : `${BASE_URL}/uploads/${report.reportingImage}`
                  }
                  alt="Incident"
                />
              </label>
            </div>

            <div className="col-lg-6">
              <input
                type="text"
                className="form-control"
                placeholder="Enter location"
                value={wasteReporting.location}
                onChange={(e) =>
                  setWasteReporting({
                    ...wasteReporting,
                    location: e.target.value,
                  })
                }
              />

              <Form.Group className="mb-3" controlId="formBasicReportType">
                <Form.Label>Issue Type</Form.Label>
                <Form.Select
                  defaultValue=""
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
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">
            update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ReportEdit;
