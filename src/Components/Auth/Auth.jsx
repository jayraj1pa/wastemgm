import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../../service/allAPI";

function Authe() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const history = useNavigate()
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
  
    try {
      if (!username || !email || !password) {
        alert("Please fill the form completely");
        return; // Exit the function early if form is not complete
      }
  
      const result = await registerAPI(userData);
  
      if (result && result.status === 200) {
        setUserData({
          username: "",
          email: "",
          password: "",
        });
        history('/login');
      } else {
        alert(result?.response?.data || "An error occurred");
        console.log(result);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("An unexpected error occurred", error);
      alert("An unexpected error occurred");
    }
  }
  


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('/images/Designer2.jpeg')", // replace with your image path
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <div className="card shadow rounded-pil p-5">
        <h2
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            fontSize: "50px",
          }}
        >
          Create An Account
        </h2>
        <p style={{ textAlign: "center", fontFamily: "serif" }}>
          Create an account to enjoy all the services
        </p>
        <p
          style={{
            textAlign: "center",
            marginTop: "-30px",
            fontFamily: "serif",
          }}
        >
          {" "}
          without any delay!
        </p>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) => setUserData({...userData,password:e.target.value})}
            />
          </Form.Group>

          <div className="d-flex justify-content-center align-items-center">
            <Button
              style={{
                width: "200px",
                backgroundColor: "#84DDAE",
                border: "none",
                height: "7vh",
              }}
              className="btn"
              type="submit"
              onClick={handleSignUp}
            >
              <span style={{ fontWeight: "bolder" }}>Create Account</span>
            </Button>
          </div>
        </Form>
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          <Link to={"/login"}> Already a Member? Log In Now</Link>
        </p>
      </div>
    </div>
  );
}

export default Authe;
