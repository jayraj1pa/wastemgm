import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import NavComponent from "../NavComponent";
import { updateCommunityJoin, viewCommunity } from "../../service/allAPI";
import { BASE_URL } from "../../service/BaseUrl";
import { useToast } from "@chakra-ui/react";
import NavCommunity from "./NavCommunity";
import NavFooter from './NavFooter';
import CommunitySlider from "./CommunitySlider";




function Community() {
  const [vCommunity, setVCommunity] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

    const getCommunity = async () => {
      try {
        if (sessionStorage.getItem("token")) {
          const token = sessionStorage.getItem("token");
          const reqHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const result = await viewCommunity(reqHeader);
          if (result.status === 200) {
            setVCommunity(result.data);
          } else {
            console.log(result);
          }
        }
      } catch (error) {
        console.error("Error fetching community:", error);
      }
    };

    
  useEffect(()=>{
    getCommunity()
  },[])



  
  const toast = useToast();


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCommunity = vCommunity.filter((community) =>
    community.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const token = sessionStorage.getItem("token");


  const handleJoinCommunity = async (id, status) => {
    try {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
  
      const result = await updateCommunityJoin(id, status, reqHeader);
  
      if (result.status === 200) {
        getCommunity()

        // Reload the reports after the status update
  
        // Conditionally render toast based on the status
        const toastMessage =
          status === "join"
            ? "Thanks for Showing Interest in Joining the community"
            :  "You have left the community"
            

            const toastStatus = 
            status === "join"
            ? "success"
            : "error"

  
        if (toastMessage) {
          toast({
            title: "",
            description: toastMessage,
            status: toastStatus,
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
  
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error("Failed to update community status:", error);
    }
  };
  
  




  return (
    <div>
    <NavCommunity/>



    <div>


    <Row>
  <Col sm={12} md={6} lg={6}>

<div style={{marginLeft:"200px",marginTop:"130px"}}>


<p className="slide-in-animation" style={{fontSize:"70px",fontWeight:"bolder"}}>
        Join Our
      </p>
      <p className="slide-in-animation" style={{fontSize:"70px",marginTop:"-45px",fontWeight:"bolder"}}>
        Community
      </p>


<p style={{fontSize:"29px",fontColor:"#6F3A40"}}>



Embark on a journey with our vibrant community, uniting individuals passionate about sustainable living, waste recycling, and impactful campaigns. Join us in fostering positive change,</p>

</div>


  </Col>


  <Col>

<CommunitySlider/>

  
  </Col>
</Row>


    </div>
    


     

      <div
        style={{ marginTop: "5%" }}
        className="d-flex justify-content-between align-items-center"
      >
        <form>
          <div
            style={{ marginTop: "20px", width: "20%" }}
            className="ms-5  border    rounded"
          >
            <input
              style={{ width: "1000%" }}
              type="text"
              className="form-control"
              placeholder="Search By Community Name"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </form>
      </div>

      <Row className="mt-4 container-et akkam">
        {filteredCommunity.length > 0 ? (
          filteredCommunity.map((community) => (
            <Col
              style={{ width: "25vw",marginLeft:"100px" }}
              className="card shadow me-5  mb-5"
              sm={4}
              md={4}
              lg={4}
              key={community._id}
            >
              <img
                className="img-fluid"
                src={
                  community
                    ? `${BASE_URL}/uploads/${community?.communityImage}`
                    : null
                }
                alt="community Image"
              />
              <p className="mt-3" style={{textAlign:"center"}}> Community  : {community.title}</p>
              <p className="mt-3" style={{textAlign:"center"}}> Date  : {community.eDate}</p>
              <p className="mt-3" style={{textAlign:"center"}}> Desc  : {community.Desc}</p>

              {
  community.status === "Left" || community.status === null ?
    <Button
      className="mt-3 bg-success"
      onClick={() => handleJoinCommunity(community._id, "join")}
    >
      Join
    </Button>
    :
    <Button
      className="mt-3 bg-danger mb-3"
      onClick={() => handleJoinCommunity(community._id, "Left")}
    >
      Left Community
    </Button>
}




            </Col>
          ))
        ) : (
          <p>No matching communities found.</p>
        )}
      </Row>
      <NavFooter/>
    </div>
  );
}

export default Community;
