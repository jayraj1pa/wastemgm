import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

function NavShopping() {
  return (
    <div style={{ backgroundColor: "#3498DB", height: "35vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <img
          className="ms=5"
          style={{ width: "250px" }}
          src="https://cdn-icons-png.flaticon.com/512/1332/1332753.png"
          alt="image"
        />

        <div style={{ display: "flex" }}>
          <Link style={{ marginTop: "100px" }} to={"/loginhome"}>
            <p style={{ color: "white", fontSize: "25px", fontWeight: "bold" }}>
              Home
            </p>
          </Link>
          <Dropdown
            style={{ marginTop: "93px", display: "flex", alignItems: "center" }}
          >
            <Dropdown.Toggle
              style={{
                backgroundColor: "transparent",
                border: "none",
                marginRight: "10px",
              }}
              id="dropdown-basic"
            >
              <p
                style={{
                  color: "white",
                  fontSize: "25px",
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                Account
              </p>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {" "}
                <Dropdown.Item as={Link} to={"/ecoprofile"}>Profile</Dropdown.Item>
          <Dropdown.Item as={Link} to="/dashboard" >Logout</Dropdown.Item>
                  </Dropdown.Menu>
          </Dropdown>



          
        </div>
      </div>
    </div>
  );
}

export default NavShopping;
