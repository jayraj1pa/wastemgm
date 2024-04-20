import React from "react";
import { Col, Row } from "react-bootstrap";

function NavFooter() {
  return (
    <div
      style={{
        backgroundColor: "#343A40",
        color: "white",
        paddingTop: "10vh",
        paddingBottom: "10vh",
      }}
    >
      <footer>
        <Row className="mt-5">
          <Col>
            <div className="about-us ms-5 me-3">
              <h4>About Us</h4>
              <p>
                At Eco Community, we're dedicated to making your online shopping
                experience effortless and enjoyable. We understand that finding
                the perfect products and deals can be overwhelming, so we've
                curated a diverse collection of high-quality items from trusted
                brands, all in one place.
              </p>
            </div>
          </Col>

          <Col>
            <div className="quick-links ms-5 me-1">
              <h4 className="ms-4">Quick Links</h4>
              <ul style={{ listStyle: "none" }}>
                <li>Home</li>
                <li>Shop</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </Col>

          <Col>
            <div className="follow-us">
              <h4 className="ms-4">Follow Us</h4>
              <ul style={{ listStyle: "none" }}>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Pinterest</li>
              </ul>
            </div>
          </Col>

          <Col>
            <div className="contact">
              <h4>Contact</h4>
              <p>Email: info@EcoCommunity.com</p>
              <p>Phone: +1 (123) 456–7890</p>
            </div>
            <div className="copyright">
              <p>© 2023 EcoCommunity. All rights reserved.</p>
            </div>
          </Col>
        </Row>

        <p className="mt-5" style={{ textAlign: "center",fontSize:"30px" }}>
          © 2023 EcoCommunity. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default NavFooter;
