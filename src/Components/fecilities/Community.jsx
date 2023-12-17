import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import NavComponent from "../NavComponent";
import { viewCommunity } from "../../service/allAPI";
import { BASE_URL } from "../../service/BaseUrl";

function Community() {
  const [vCommunity, setVCommunity] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getCommunity = async () => {
      try {
        if (sessionStorage.getItem("token")) {
          const token = sessionStorage.getItem("token");
          const reqHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const result = await viewCommunity();
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

    getCommunity();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCommunity = vCommunity.filter((community) =>
    community.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinCommunity = (title) => {
    // Customize the alert message with the community title
    alert(`Thank you for joining the community: ${title}`);
  };

  return (
    <div>
      <NavComponent />

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
              style={{ width: "25vw" }}
              className="card shadow me-5 ms-5 mb-5"
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
              <Button
                className="mt-3 bg-success"
                onClick={() => handleJoinCommunity(community.title)}
              >
                Join
              </Button>
            </Col>
          ))
        ) : (
          <p>No matching communities found.</p>
        )}
      </Row>
    </div>
  );
}

export default Community;
