import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [colg, setColg] = useState(0);
  const [waste, setWaste] = useState(0);
  
  const endCountCustomers = 2500; // your number here
  const endCountColleagues = 180; // your number here
  const endCountWaste = 150000; // your number here
  const duration = 2000; // your number here

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * endCountCustomers));
      setColg(Math.floor(progress * endCountColleagues));
      setWaste(Math.floor(progress * endCountWaste));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [endCountCustomers, endCountColleagues, endCountWaste, duration]);

  return (
    <div style={{marginBottom:"200px"}}>
      <Row sm={12} md={4} style={{marginLeft:"300px"}}>
        <Col className="card rounded-pin shadow p-3" style={{width: "200px", height: "200px"}}>
          <div className="text-center">
            <h3>{count}+</h3>
            <p style={{
          textAlign: "center",
          color: "#0c3278",
          fontFamily: "revert",
        //   fontWeight: "bold",
          fontSize: "20px",
        }}>Happy Customers</p>
        <i class="fa-regular fa-face-smile-beam fa-beat fa-2xl"></i>
          </div>
        </Col>
        <Col className="card shadow p-3" style={{width: "200px", height: "200px",marginLeft:"300px"}}>
          <div className="text-center">
            <h3>{colg}</h3>
            <p style={{
          textAlign: "center",
          color: "#0c3278",
          fontFamily: "revert",
        //   fontWeight: "bold",
          fontSize: "20px",
        }}>Colleagues</p>
        <i class="fa-solid fa-user-tie  fa-beat  fa-2xl"></i>
          </div>
        </Col>
        <Col className="card shadow p-3" style={{width: "200px", height: "200px",marginLeft:"300px"}}>
          <div className="text-center">
            <h3>{waste}+</h3>
            <p style={{
          textAlign: "center",
          color: "#0c3278",
          fontFamily: "revert",
        //   fontWeight: "bold",
          fontSize: "20px",
        }}>Waste Collected</p>
        <i class="fa-solid fa-recycle  fa-beat  fa-2xl"></i>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Counter;
