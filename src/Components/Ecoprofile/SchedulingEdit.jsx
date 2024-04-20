import { useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { editSchedulingAPI } from "../../service/allAPI";
import { useContext } from "react";
import { addScheduleResponseContext } from "../../service/ContextShare";

function SchedulingEdit({ schedule }) {
    const {addScheduleResponse,setAddScheduleResponse} = useContext(addScheduleResponseContext)
  const [wasteScheduling, setWasteScheduling] = useState({
    id: schedule._id,
    houseNumber: schedule.houseNumber,
    wasteQuantity: schedule.wasteQuantity,
    edate: schedule.edate,
    etime: schedule.etime,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setWasteScheduling({
      id: schedule._id,
      houseNumber: schedule.houseNumber,
      wasteQuantity: schedule.wasteQuantity,
      edate: schedule.edate,
      etime: schedule.etime,
    });
  };

  const toast = useToast();

  const handleAdd = async () => {
    const { id, houseNumber, wasteQuantity, edate, etime } = wasteScheduling;
    if (!id || !houseNumber || !wasteQuantity || !edate || !etime) {
      toast({
        title: "Error Occured!",
        description: "please fill the Modal completely ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    } else {
      const token = sessionStorage.getItem("token");
      console.log(token);

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      console.log(reqHeader);

      const result = await editSchedulingAPI(id, wasteScheduling, reqHeader);
      if (result.status === 200) {
        handleClose();
        setAddScheduleResponse(result.data)
      } else {
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
  };

  const handleShow = () => setShow(true);
  return (
    <>
      <div className="hoverEffect">
        <button onClick={handleShow} className="btn">
          <i
            style={{ color: "green",fontSize:"30px" }}
            class="fa-solid fa-pen-to-square "
          ></i>
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Waste Scheduling Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group
            style={{ width: "400px" }}
            className="mb-3 mt-4 "
            controlId="formBasicPAddress"
          >
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Your House Number"
              value={wasteScheduling.houseNumber}
              onChange={(e) =>
                setWasteScheduling({
                  ...wasteScheduling,
                  houseNumber: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group
            style={{ width: "400px" }}
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
            style={{ width: "400px" }}
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
            style={{ width: "400px" }}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SchedulingEdit;
