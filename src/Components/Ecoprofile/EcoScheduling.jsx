import React, { useEffect, useState } from "react";
import NavComponent from "../NavComponent";
import { Row, Col } from "react-bootstrap";
import { allScheduling, deleteScheduleAPI } from "../../service/allAPI";

function EcoScheduling() {
  const [userScheduling, setUserScheduling] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getallSchedule = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await allScheduling(reqHeader);
      if (result.status === 200) {
        setUserScheduling(result.data);
      } else {
        console.log(result);
      }
    }
  };

  useEffect(() => {
    getallSchedule();
  }, []);

  useEffect(() => {
    // Filter schedules based on the search query
    const filteredSchedules = userScheduling.filter((schedule) =>
      schedule.houseNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterData(filteredSchedules);
  }, [searchQuery, userScheduling]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };



  

  return (
    <div>
      <NavComponent />
      <h3 style={{ marginTop: "100px", textAlign: "center" }}>
        User Waste Scheduling
      </h3>

      <form>
        <div
          style={{ marginTop: "20px" }}
          className="ms-5 d-flex justify-content-center align-items-center border w-50 rounded"
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search Your Requests By House Number"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </form>

      <Row  className="mt-4 container-fluid">
        {filterData?.length > 0
          ? filterData.map((schedule) => (
              <Col
              style={{
                backgroundImage: "url('/images/scheduling.jpeg')",
                height: "30vh",
                backgroundSize: "100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "25vw",

              }}
                className="card shadow me-5 ms-5 mb-5"
                sm={4}
                md={4}
                lg={4}
                key={schedule.id}
              >
                <p style={{fontWeight:"bolder",fontSize:"20px"}} className="mt-3">House Number: {schedule.houseNumber}</p>
                <p style={{fontWeight:"bolder",fontSize:"20px"}}>Waste Quantity: {schedule.wasteQuantity}</p>
                <p style={{fontWeight:"bolder",fontSize:"20px"}} >Date: {schedule.edate}</p>
                <p style={{fontWeight:"bolder",fontSize:"20px"}}>Time: {schedule.etime}</p>
                <div className="hoverEffect">
               
               </div>
              </Col>
            ))
          : null}
      </Row>
     
    </div>
  );
}

export default EcoScheduling;
