import React from "react";
import { Col, Row } from "react-bootstrap";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function Features() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div>
      <motion.div
        ref={ref}
        animate={controls}
        initial='hidden'  
        transition={{ duration: 0.5 }}
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0 }
        }}
      >
        <p
          style={{
            marginTop: "120px",
            textAlign: "center",
            color: "#0c3278",
            fontFamily: "revert",
            fontWeight: "bold",
            fontSize: "35px",
          }}
        >
          Features
        </p>

        <div>
          <Row sm={12} md={4}>
          <Col>
            <img
              style={{
                marginLeft: "60px",
                marginBottom: "200px",
                height: "60vh",
              }}
              src="/images/12.png"
            />
          </Col>

          <Col>
            <ol
              style={{
                marginLeft: "120px",
                listStyle: "none",
                color: "#0c3278",
                fontSize: "20px",
                marginTop: "50px",
              }}
            >
              <li style={{ marginBottom: "35px" }}>
                {" "}
                <i
                  className="fa-regular fa-file-lines me-2"
                  style={{ color: "#1459d2" }}
                ></i>{" "}
                Waste Reporting
              </li>
              <li  >
                {" "}
                <i
                  className="fa-regular fa-calendar me-2"
                  style={{ color: "#1459d2" }}
                ></i>{" "}
                waste Scheduling
              </li>
              <li>
                {" "}
                <i
                  className="fa-solid fa-award me-3"
                  style={{ color: "#1459d2", marginTop: "35px" }}
                ></i>
                Rewards
              </li>
              <li>
                {" "}
                <i
                  className="fa-solid fa-user-group me-3"
                  style={{ color: "#1459d2", marginTop: "35px" }}
                ></i>
                Community
              </li>
              <li>
                {" "}
                <i
                  className="fa-solid fa-cart-shopping me-3"
                  style={{ color: "#1459d2", marginTop: "35px" }}
                ></i>
                EcoTrade
              </li>
            </ol>
          </Col>
          <Col>
          <ol
              style={{
                marginLeft: "120px",
                listStyle: "none",
                color: "#0c3278",
                fontSize: "20px",
                marginTop: "23px",
                
              }}
            >
            
            <li>
                <i
                  className="fa-regular fa-credit-card me-3"
                  style={{ color: "#1459d2", marginTop: "35px" }}
                ></i>
                payBill
              </li>
              <li>
                <i
                  className="fa-regular fa-trash-can me-3"
                  style={{ color: "#1459d2", marginTop: "35px" }}
                ></i>
                Waste Segregation
              </li>
              <li>
                <i
                  className="fa-solid fa-recycle me-3"
                  style={{ color: "#1459d2", marginTop: "35px" }}
                ></i>
                Recycle Centers
              </li>
              <li>
                <i
                  className="fa-regular fa-comments me-3"
                  style={{ color: "#1459d2", marginTop: "35px" }}
                ></i>
                Chat
              </li>
              </ol>
          </Col>
          </Row>
        </div>
      </motion.div>
    </div>
  );
}

export default Features;
