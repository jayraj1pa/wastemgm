import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Footer() {
  return (
    <div>
         <p
        style={{
          textAlign: "center",
          color: "#0c3278",
          fontFamily: "revert",
          fontWeight: "bold",
          fontSize: "35px",
          marginBottom:"100px"
        }}
      >
        Contact us
      </p>
    <footer style={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
      <Container>
        <Row>
          <Col md={4}>
            <h5>Address</h5>
            <p><i className="fas fa-map-marker-alt"></i> 123 Main Street Springfield, IL 62701 USA

</p>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p><i className="fas fa-phone"></i> +0499 345222</p>
            <p><i className="fas fa-envelope"></i> beem@info.com</p>
          </Col>
          <Col md={4}>
            <h5>Get in Touch</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Subject" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control as="textarea" rows={3} placeholder="Message" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </footer>
    </div>
  );
}

export default Footer;
