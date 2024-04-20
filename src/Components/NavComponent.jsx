import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function NavComponent() {

  const [admin, setAdmin] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("admin")) {
      setAdmin(sessionStorage.getItem("admin"));
    } else {
      setAdmin("");
    }
  }, []);

  return (
    <div>
      <Navbar fixed="top" className="justify-content-between" style={{ fontFamily: 'Arial', color: 'white', height: "6vh", backgroundColor: "#69BE91" }}>
        <div>
          <Navbar.Brand as={Link} to={'/loginhome'}>
            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/11164/11164284.png"
              width="30px"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Eco Community
          </Navbar.Brand>
        </div>

        <div className='me-5'>
          <Nav>
         
          {sessionStorage.getItem("admin") === "false" && (
  <>
    <Nav.Link as={Link} to="/feedback" className="hoverEffect" style={{ color: 'white' }}>
      Feedback
    </Nav.Link>
    <Nav.Link as={Link} to="/wasteScheduling" className='hoverEffect' style={{ color: 'white' }}>
      Waste pickup
    </Nav.Link>
    <Nav.Link as={Link} to="/ecoprofile" className='hoverEffect' style={{ color: 'white' }}>
      Eco Profile
    </Nav.Link>
  </>
)}



          

         
              <Nav.Link as={Link} to="/dashboard" className='hoverEffect' style={{ color: 'white' }}>
                Logout
              </Nav.Link>
          
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}

export default NavComponent;
