import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import NavComponent from "../NavComponent";
import { Link, useNavigate } from "react-router-dom";
import { deleteMyProfile, editProfileAPI } from "../../service/allAPI";

function Eco() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });


  const history = useNavigate();

  

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"));
    setProfile({
      username: user.username,
      email: user.email,
      password: user.password,
      address: user.address,
    });
  }, []);

 

  const handleEdit = async () => {
    const { username, email, password, address } = profile;
    if (!address) {
      alert("please fill the form completely");
    } else {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const result = await editProfileAPI(profile, reqHeader);
        if (result.status === 200) {
          history("/ecoprofile");
          sessionStorage.setItem("existingUser", JSON.stringify(result.data));
        } else {
          console.log(result);
          console.log(result.response.data);
        }
      }
    }
  };



  const handleDelete = async (Id) => {
    const token = sessionStorage.getItem("token");



    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };



    const result = await deleteMyProfile(reqHeader);
    if (result.status === 200) {
      history("/login");
    } else {
      console.log(result);
      console.log(result.response.data);
    }
  };



  let existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
  let _id = existingUser._id;

  return (
    <div>
      <NavComponent />
      <div
        style={{
          backgroundColor: "#96A695",
          height: "100vh",
          marginTop: "34px",
        }}
      >
        <div className="">
          <Row>
            <Col
              className="card shadow me-3 ms-4"
              style={{ marginTop: "5px", height: "100vh" }}
              sm={12}
              md={3}
              lg={3}
            >
              <h2 className="mt-3 ms-3 fw-bold">Profile</h2>

             
                <img
                  style={{ width: "20vw", height: "40vh", marginLeft: "20px" }}
                  className="rounder-pill,hoverEffect"
                  src="/images/profilr.png"
                  alt="image"
                />
            

              <div className="mt-5">
                <input
                  type="text"
                  className="form-control shadow-none "
                  placeholder="username"
                  value={profile.username}
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                />
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  className="form-control shadow-none "
                  placeholder="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  className="form-control shadow-none "
                  placeholder="password"
                  value={profile.password}
                  onChange={(e) =>
                    setProfile({ ...profile, password: e.target.value })
                  }
                />
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  className="form-control shadow-none "
                  placeholder="address"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                />
              </div>
              <div className="mt-3 text-center d-grid">
                <button onClick={handleEdit} className="btn btn-success">
                  Update
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="mt-2 btn btn-danger"
                >
                  Delete My Account
                </button>
              </div>
            </Col>
            <Col>
              <Row>
                <Col
                  className="me-5 rounded"
                  sm={12}
                  lg={12}
                  md={12}
                  style={{
                    backgroundImage: "url('/images/backp.png')",
                    height: "62vh",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    marginTop: "2px",
                  }}
                ></Col>

                <Row style={{ marginTop: "2%" }}>
                  <Col
                    style={{ backgroundColor: "#F6FBF5" }}
                    className="card shadow rounded me-3 text-center hoverEffect"
                  >
                    <div className="mt-5 hoverEffect">
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to={"/ecoreport"}
                      >
                        <img
                          src="/images/reporting.jpeg"
                          style={{ width: "60%", marginBottom: "10px" }}
                          alt=" Waste Reporting"
                        />
                        <h5
                          style={{
                            fontWeight: "lighter",
                            fontStyle: "oblique",
                          }}
                        >
                          {" "}
                          Waste Reporting
                        </h5>
                      </Link>
                    </div>
                  </Col>

                  <Col
                    style={{ backgroundColor: "#F6FBF5" }}
                    className="card shadow rounded pill me-3 text-center hoverEffect"
                  >
                    <div className="mt-5 hoverEffect">
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={"/ecoschedule"}
                      >
                        {" "}
                        <img
                          src="/images/scheduling.jpeg"
                          style={{ width: "60%", marginBottom: "10px" }}
                          alt=" Waste Scheduling"
                        />
                        <h5
                          style={{
                            fontWeight: "lighter",
                            fontStyle: "oblique",
                          }}
                        >
                          {" "}
                          Waste Scheduling
                        </h5>
                      </Link>
                    </div>
                  </Col>

                  <Col
                    style={{ backgroundColor: "#F6FBF5" }}
                    className="card shadow rounded pill me-3 text-center hoverEffect"
                  >
                    <div className="mt-5 hoverEffect">
                     <Link  style={{ textDecoration: "none", color: "inherit" }}
                        to={"/shopping"} >
                     
                     <img
                        src="/images/shp.jpeg"
                        style={{ width: "60%", marginBottom: "10px" }}
                        alt=" Shopping"
                      />
                      <h5
                        style={{ fontWeight: "lighter", fontStyle: "oblique" }}
                      >
                        Shopping Mart
                      </h5>
                     </Link>
                    </div>
                  </Col>

                  <Col
                    style={{ backgroundColor: "#F6FBF5" }}
                    className="card shadow rounded pill me-3 text-center hoverEffect"
                  >
                    <div className="mt-5 hoverEffect">
                     <Link style={{ textDecoration: "none", color: "inherit" }}
                        to={"/community"} >
                     
                     <img
                        src="/images/community.jpeg"
                        style={{ width: "60%", marginBottom: "10px" }}
                        alt=" Waste community"
                      />
                      <h5
                        style={{ fontWeight: "lighter", fontStyle: "oblique" }}
                      >
                        Community
                      </h5>
                     
                     </Link>
                    </div>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Eco;
