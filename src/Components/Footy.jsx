import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='mt-5 ' style={{height:"35vh", backgroundColor: '#69BE91', padding: '50px 0', color: 'white', fontFamily: 'Arial'  }}>
      <Container>
        <Row>
          <Col md={3}>
            <h5>Eco Community</h5>
            <p>Our mission is to promote and educate about eco-friendly practices.</p>
          </Col>
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>
<Link style={{  color: "inherit" }}
                         to={"/shopping"}>
Recycle Shop

</Link>

              </li>
              <li>

<Link style={{  color: "inherit" }}
                         to={"/wasteScheduling"} >

Waste Pickup
</Link>


              </li>
              <li>

<Link  style={{  color: "inherit" }}
                         to={"/ecoprofile"}>
Eco Profile

</Link>


              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact Us</h5>
            <p><i className="fas fa-map-marker-alt"></i> 123 Main Street Springfield, IL 62701 USA</p>
            <p><i className="fas fa-phone"></i> +0499 345222</p>
            <p><i className="fas fa-envelope"></i> beem@info.com</p>
          </Col>
          <Col md={3}>
            <h5>Newsletter</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Your Email" />
              </Form.Group>
              <Button style={{border:"none"}} className='bg-success' type="submit">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-md-center text-center" style={{ marginTop: '20px' }}>
          <Col md={6}>
            <p>© {new Date().getFullYear()} Eco Community. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
