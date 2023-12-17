import React from "react";
import { Col,Row } from "react-bootstrap";

function About() {
  return (
    <div style={{marginBottom:"200px"}}>
      <p
        style={{
          textAlign: "center",
          color: "#0c3278",
          fontFamily: "revert",
          fontWeight: "bold",
          fontSize: "35px",
        }}
      >
        About us
      </p>

      <Row sm={12} md={4} style={{ marginLeft: '180px' }}>
    <Col className="card shadow p-3">
        <img src="/images/exp.png"/>
        <p style={{
          textAlign: "center",
          color: "#0c3278",
          fontFamily: "revert",
        //   fontWeight: "bold",
          fontSize: "20px",
        }}>Highly experienced</p>
        <p>Founded in 2014, our project is globally recognized for its effective waste collection strategies, contributing to a cleaner and healthier environment.</p>
    </Col>
    <Col className="card shadow p-3 me-5 ms-5">
        <img src="/images/fast.png"/>
        <p style={{
          textAlign: "center",
          color: "#0c3278",
          fontFamily: "revert",
        //   fontWeight: "bold",
          fontSize: "20px",
        }}>Fast Deliveries</p>
        <p>we maintain an efficient waste collection cycle of just 4 days, ensuring swift and timely service for a cleaner environment.</p>
    </Col>
    <Col className="card shadow p-3">
        <img src="/images/sup.png"/>
        <p style={{
          textAlign: "center",
          color: "#0c3278",
          fontFamily: "revert",
        //   fontWeight: "bold",
          fontSize: "20px",
        }}>Quality Support</p>
        <p>We are committed to providing efficient and timely waste collection services, prioritizing our customers' needs for a cleaner environment.</p>
    </Col>
</Row>

    </div>
  );
}

export default About;
