import React, { useEffect, useState } from "react";
import NavComponent from "../NavComponent";
import { Row, Col } from "react-bootstrap";
import { allRequest, deleteReportAPI } from "../../service/allAPI";
import { BASE_URL } from "../../service/BaseUrl";
import ReportEdit from "./ReportEdit";

function EcoReporting() {
  const [userReports, setUserReports] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getallReports = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await allRequest(reqHeader);
      if (result.status === 200) {
        console.log("working");
        setUserReports(result.data);
      } else {
        console.log(result);
      }
    }
  };

  useEffect(() => {
    getallReports();
  }, []);

  useEffect(() => {
    // Filter reports based on the search query
    const filteredReports = userReports.filter((report) =>
      report.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterData(filteredReports);
  }, [searchQuery, userReports]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleDelete = async (Id) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await deleteReportAPI(Id, reqHeader);
      console.log("Deleting report with ID:", Id); // Add this line

      if (result.status === 200) {
        getallReports();
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

      <h3 style={{ marginTop: "100px", textAlign: "center" }}>
        User Waste Reports
      </h3>

      <form>
        <div
          style={{ marginTop: "20px" }}
          className="ms-5 d-flex justify-content-center align-items-center border w-50  rounded"
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search Your Requests By Issue Type"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </form>

      <Row className="mt-4 container">
        {filterData?.length > 0 ? (
          filterData.map((report) => (
            <Col
              style={{ width: "25vw" }}
              className="card shadow me-5 ms-5 mb-5"
              sm={4}
              md={4}
              lg={4}
            >
              <img
                className="img-fluid"
                src={
                  report
                    ? `${BASE_URL}/uploads/${report?.reportingImage}`
                    : null
                }
                alt="Report Image"
              />
              <p className="mt-3">Issue Type: {report.type}</p>
              <p>Location: {report.location}</p>
              <div
                className="mt-3 mb-3"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
               <div className="hoverEffect">
               <button onClick={(e)=>handleDelete(report._id)} className="btn">
                  
                  
                  <i
                    class="fa-solid fa-trash fa-2x"
                    style={{ color: "#fc030b" }}
                  ></i>
                </button>
               </div>

<ReportEdit report={report} />
               

              </div>
            </Col>
          ))
        ) : (
          <p>No matching reports found.</p>
        )}
      </Row>
    </div>
  );
}

export default EcoReporting;
