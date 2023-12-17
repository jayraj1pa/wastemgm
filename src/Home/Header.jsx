import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Header() {
  return (
    <div>
      <>
        <Navbar style={{marginLeft:"130px",width:"100%"}} className="bg-body-tertiary   " fixed="top">
          <Container>
            <Navbar.Brand href="#home">
              <i class="fa-regular fa-registered fa-2xl" style={{ color: "#073a92" }}></i>
            </Navbar.Brand>
          </Container>

          <Container>
            <Nav className="" style={{ marginLeft: "300px", fontFamily: 'Poppins, sans-serif' }}>
              <Nav.Link style={{ color: "#0c3278", fontSize: "20px", fontWeight: "-moz-initial" }} href="#home">Home</Nav.Link>
              <Nav.Link style={{ color: "#0c3278", fontSize: "20px", fontWeight: "-moz-initial" }} href="#features">About</Nav.Link>
              <Nav.Link style={{ color: "#0c3278", fontSize: "20px", fontWeight: "-moz-initial" }} href="#pricing">Contact</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    </div>
  );
}

export default Header;
