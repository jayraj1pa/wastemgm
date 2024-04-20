import React, { useEffect, useState } from "react";
import NavComponent from "../NavComponent";
import { Row, Col } from "react-bootstrap";
import { allRequest, deleteReportAPI } from "../../service/allAPI";
import { BASE_URL } from "../../service/BaseUrl";
import ReportEdit from "./ReportEdit";
import { useContext } from "react";
import { addReportResponseContext } from "../../service/ContextShare";
import { FacebookShareButton , FacebookIcon ,WhatsappIcon,WhatsappShareButton, InstapaperShareButton, InstapaperIcon, TelegramShareButton, TelegramIcon, LinkedinShareButton, LinkedinIcon } from "react-share";

function EcoReporting() {
  const { addReportResponse, setAddReportResponse } = useContext(
    addReportResponseContext
  );
  const [userReports, setUserReports] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssueType, setSelectedIssueType] = useState("All");
  const [selectedStatusType, setSelectedStatusType] = useState("All");
  const [showButton,setShowButton] = useState("")

  const getallReports = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await allRequest(reqHeader);
      if (result.status === 200) {
        setUserReports(result.data);
      } else {
        console.log(result);
      }
    }
  };

  useEffect(()=>{
    setShowButton(new Array(userReports.length).fill(false));


  },[userReports])

  useEffect(() => {
    getallReports();
  }, [addReportResponse, setAddReportResponse]);

  useEffect(() => {
    const filteredReports = userReports.filter(
      (report) =>
        report.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedIssueType === "All" || report.type === selectedIssueType) &&
        (selectedStatusType === "All" || report.status === selectedStatusType) 
    );
    setFilterData(filteredReports);
  }, [searchQuery, userReports, selectedIssueType, selectedStatusType]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleIssueTypeChange = (e) => {
    setSelectedIssueType(e.target.value);
  };

  const handleStatusTypeChange = (e) => {
    setSelectedStatusType(e.target.value);
  };

  const handleDelete = async (Id) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await deleteReportAPI(Id, reqHeader);
      console.log("Deleting report with ID:", Id);

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

      <form >



      <div style={{marginLeft:"500px"}} className=" d-flex justify-content-center align-items-center border w-50 rounded">
          <input
            type="text"
            className="form-control"
            placeholder="Search Your Requests By Issue Type"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </form>


      <div className="mt-4" style={{display:"flex"}}>

    <div className="me-3 mb-5" >
      
<form style={{ border: "1px solid #d3d3d3", marginLeft: "100px", height: "50vh", width: "15vw" }}>
       
        <div  className="ms-4 mt-3">
          <label className="me-2" style={{fontWeight:"bold",fontSize:"21px"}}>Filter by Issue Type:</label>
          <div style={{fontSize:"22px"}}>
            <div>
              <input
                type="radio"
                id="allIssue"
                value="All"
                checked={selectedIssueType === "All"}
                onChange={handleIssueTypeChange}
              />
              <label htmlFor="allIssue" className="me-2 ms-1 mt-2 mb-2">
                All
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Overflow Bins"
                value="Overflow Bins"
                checked={selectedIssueType === "Overflow Bins"}
                onChange={handleIssueTypeChange}
              />
              <label htmlFor="Overflow Bins" className="me-2 ms-1 mb-2">
                Overflow Bins
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Illegal waste disposal"
                value="Illegal waste disposal"
                checked={selectedIssueType === "Illegal waste disposal"}
                onChange={handleIssueTypeChange}
              />
              <label htmlFor="Illegal waste disposal" className="me-2 ms-1 mb-2">
                Illegal waste disposal
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Other"
                value="Other"
                checked={selectedIssueType === "Other"}
                onChange={handleIssueTypeChange}
              />
              <label htmlFor="Other" className="me-2 ms-1">
                Other
              </label>
            </div>
          </div>
        </div>
        <div className="ms-4 mt-3">
          <label className="me-2 mb-2" style={{fontWeight:"bold",fontSize:"21px"}}>Filter by Status:</label>
          <div>
            <div>
              <input
                type="radio"
                id="allStatus"
                value="All"
                checked={selectedStatusType === "All"}
                onChange={handleStatusTypeChange}
              />
              <label htmlFor="allStatus" className="me-2 ms-1 mb-2">
                All
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Pending"
                value="Pending"
                checked={selectedStatusType === "Pending"}
                onChange={handleStatusTypeChange}
              />
              <label htmlFor="Pending" className="me-2 ms-1 mb-2">
                Pending
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Cleared"
                value="Cleared"
                checked={selectedStatusType === "Cleared"}
                onChange={handleStatusTypeChange}
              />
              <label htmlFor="Cleared" className="me-2 ms-1 mb-2">
              Cleared
              </label>
            </div>


            <div>
              <input
                type="radio"
                id="Not Cleared"
                value="Not Cleared"
                checked={selectedStatusType === "Not Cleared"}
                onChange={handleStatusTypeChange}
              />
              <label htmlFor="Not Cleared" className="me-2 ms-1">
              Not Cleared              </label>
            </div>


            {/* Add more status options as needed */}
          </div>
        </div>
      </form>

      
      </div>  


<div>
  

  {filterData?.length > 0 ? (
    filterData.map((report,index) => (
      <Col
        style={{ width: "60vw", height: "40vh" }}
        className="card shadow mb-5 me-3 card-container" // Apply the hover effect class
        sm={4}
        md={4}
        lg={4}
        key={report._id}
      >
       <Row>
          <Col>
            <img
              className="mt-3 ms-3"
              style={{ height: "80%",width:"80%" }} // Adjust this value as needed
              src={
                report
                  ? `${BASE_URL}/uploads/${report?.reportingImage}`
                  : null
              }
              alt="Report Image"
            />
          </Col>
          <Col>
            <p style={{ color: "green", fontWeight: "bold", fontSize: "22px" }} className="mt-3">
              Issue: {report.type}
            </p>
            <p>Location: {report.location}</p>
            <p>Status: {report.status}</p>
            

<div className="hover" style={{marginLeft:"400px",marginTop:"100px"}}>
  <div style={{display:"flex"}}>
<FacebookShareButton url={"www.facebook.com"}>
              <FacebookIcon size={50} round={true}/>
            </FacebookShareButton>


 <WhatsappShareButton className="ms-3 " url={"case"} >
  
  <WhatsappIcon size={50} round={true}/>
  </WhatsappShareButton>



  <TelegramShareButton className="ms-3" url="https://web.telegram.org/">
    <TelegramIcon size={50} round={true}/>
    </TelegramShareButton>   

    <LinkedinShareButton className="ms-3 mt-4 mb-4"  url="https://www.linkedin.com/">
    <LinkedinIcon size={50} round={true}></LinkedinIcon>
    </LinkedinShareButton>
    </div>       

</div>


          </Col>
          <Col sm={1} md={1} lg={1}>



          <div>
                      <button className="mt-3 " style={{ marginLeft: "20px", color: "green", fontSize: "30px" }} onClick={() => {
                        const updatedButtons = [...showButton];
                        updatedButtons[index] = !updatedButtons[index];
                        setShowButton(updatedButtons);
                      }}>
                        <i className="fa-solid fa-bars"></i>
                      </button>
                    </div>
                    {showButton[index] && <div className="mt-3 mb-3">
                    <div className={`mt-3 mb-3 transition-fade ${showButton[index] ? 'show' : ''}`}>
                        <button onClick={(e) => handleDelete(report._id)} className="btn">
                          <i className="fa-solid fa-trash fa-2x" style={{ color: "#fc030b" }}></i>
                        </button>
                      </div>
                      <ReportEdit report={report} />
                    </div>}

          </Col>
        </Row>
      </Col>
    ))
  ) : (
    <p>No matching reports found.</p>
  )}

</div>
</div>

    </div>
  );
}

export default EcoReporting;
