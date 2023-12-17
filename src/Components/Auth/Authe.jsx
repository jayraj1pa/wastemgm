import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../service/allAPI";

function Authe() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginAPI(userData);
    console.log(result);
    if (result.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);
        console.log(result.data.token);
        sessionStorage.setItem("admin", result.data.existingUser.isAdmin);
        // console.log("checking");
        console.log(JSON.parse(sessionStorage.getItem("admin")));

        // Add session storage for admin
        if (result.data.existingUser.isAdmin) {
          console.log(result.data.existingUser.isAdmin);
            sessionStorage.setItem("adminData", JSON.stringify(result.data.existingUser.adminData));
        }
        console.log(result.data);
        setUserData({
            email: "",
            password: ""
        });
        history('/loginhome');

        if (sessionStorage.getItem("admin") === "true") {
          console.log("The user is an admin.");
      } else {
          console.log("The user is not an admin.");
      }
      
  


      
    }else{
      alert(result.response.data)
      console.log(result);
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
          Welcome Back!
        </h2>
        <p style={{ textAlign: "center", fontFamily: "serif" }}>
          Access all our services instantly by logging in!
        </p>
        <p
          style={{
            textAlign: "center",
            marginTop: "-30px",
            fontFamily: "serif",
          }}
        >
          {" "}
          Your seamless experience awaits as you sign in to your account
        </p>
        <Form>
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
              onClick={handleLogin}
            >
              <span style={{ fontWeight: "bolder" }}>LogIn</span>
            </Button>
          </div>
        </Form>
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          <Link to={"/register"}> New User? Get Access</Link>
        </p>
      </div>
    </div>
  );
}

export default Authe;
