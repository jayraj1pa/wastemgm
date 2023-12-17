import React from "react";
import Header from "./Header";
import { Row, Col } from "react-bootstrap";
import "../Home/Body.css";
import Features from "./Features";
import About from "./About";
import Counter from "./Counter"; // adjust the path as needed
import ContactUs from "./ContactUs";
import { Link } from "react-router-dom";

function Body() {
  const imageStyles = {
    marginLeft: "120px",
    marginTop: "70px",
    height: "70vh",
    animation: "moveUpDown 1s ease infinite alternate",
  };
  return (
    <div>
      <Header />

      <Row>
        <Col sm={12} md={6}>
          <div
            style={{
              marginLeft: "130px",
              marginTop: "130px",
              color: "#0c3278",
            }}
          >
            <p
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "bold",
                fontSize: "45px",
              }}
            >
              <span>Revolutionize your </span>
            </p>
            <p
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "bold",
                fontSize: "45px",
                marginTop: "-25px",
              }}
            >
              {" "}
              <span> waste management process </span>{" "}
            </p>
            <p
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "bold",
                fontSize: "45px",
                marginTop: "-25px",
              }}
            >
              {" "}
              <span>with Put2Recycle</span>
            </p>
            <p
              style={{
                color: "black",
                fontSize: "23px",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              We provide intuitive and robust digital solutions to
            </p>
            <p
              style={{
                color: "black",
                fontSize: "23px",
                marginTop: "-25px",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              streamline your waste management process{" "}
            </p>
          </div>

          <div>
          <Link style={{textDecoration:"none",color:"inherit"}} to={"/login"}>

            <p
              className="border p-3 rounded  "
              style={{
                marginLeft: "130px",
                backgroundColor: "#59c53b",
                color: "white",
                fontSize: "22px",
                width: "250px",
                height: "7vh",
                textAlign: "center",
                boxShadow:
                  "0 4px 8px rgba(65, 84, 241, 0.3)" /* Added boxShadow for lighter blue shadow */,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
                {" "}
                Get Started{" "}
                <i className="fa-solid fa-arrow-right fa-beat-fade ms-2 "></i>
              
            </p>
            </Link>
          </div>
        </Col>
        <Col sm={12} md={6}>
          <img src="/images/9a.png" alt="Moving Image" style={imageStyles} />
        </Col>
      </Row>
      <Features />
      <About />
      <Counter />
      <ContactUs />
    </div>
  );
}

export default Body;
