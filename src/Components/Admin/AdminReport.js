import React, { useState, useEffect } from "react";
import NavComponent from "../NavComponent";
import { Row, Col, Button } from "react-bootstrap";
import { BASE_URL } from "../../service/BaseUrl";
import { alladminReport, updateReportStatus } from "../../service/allAPI";

function AdminReport() {
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
      const result = await alladminReport(reqHeader);
      if (result.status === 200) {
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
    const filteredReports = userReports.filter((report) => {
      // Check if userId and username properties are present before filtering
      const hasUserId = report.userId && report.userId.username;
      const includesQuery = hasUserId && report.userId.username.toLowerCase().includes(searchQuery.toLowerCase());
      return includesQuery;
    });
    setFilterData(filteredReports);
  }, [searchQuery, userReports]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const token = sessionStorage.getItem("token");

  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await updateReportStatus(reportId, newStatus, reqHeader);

      if (result.status === 200) {
        // Reload the reports after the status update
        getallReports();
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error("Failed to update report status:", error);
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
            placeholder="Search Your Requests By user"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </form>

      <Row className="mt-4 container-et akkam">
        {filterData?.length > 0 ? (
          filterData.map((report) => (
            <Col
              style={{ width: "25vw" }}
              className="card shadow me-5 ms-5 mb-5"
              sm={4}
              md={4}
              lg={4}
              key={report._id}
            >
              <img
                className="img-fluid"
                src={`${BASE_URL}/uploads/${report?.reportingImage}`}
                alt="Report Image"
              />
              <p className="mt-3">Reported By: {report.userId ? report.userId.username : 'Unknown User'}</p>
              <p>Issue Type: {report.type}</p>
              <p>Location: {report.location}</p>
              <p>status: {report.status}</p>

              {/* Buttons to update status */}
              <div className="mt-3 me-3 ms-3">
                <Button
                  variant="success"
                  onClick={() => handleStatusUpdate(report._id, 'Cleared')}
                >
                  Mark as Cleared
                </Button>
                <Button className="ms-3"
                  variant="warning"
                  onClick={() => handleStatusUpdate(report._id, 'Not Cleared')}
                >
                  Mark as Not Cleared
                </Button>
                <Button className="mt-3 mb-3"
                  variant="info"
                  onClick={() => handleStatusUpdate(report._id, 'Pending')}
                >
                  Mark as Pending
                </Button>
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

export default AdminReport;
