import React, { useEffect, useState } from "react";
import Footer from "../Footy";
import NavComponent from "../NavComponent";
import { Link } from "react-router-dom";
import "../Auth/Home.css";
import WhatsAppWidget from 'react-whatsapp-widget';


function Home() {
  const [admincheck, setAdmincheck] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("admin")) {
      setAdmincheck(sessionStorage.getItem("admin"));
    } else {
      setAdmincheck("");
    }
  }, []);

  return (
    <div>
      <NavComponent />
      <div
        style={{
          backgroundImage:      "url('/images/home.png')",
          height: "100vh",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        style={{
          textAlign: "center",
          fontWeight: "unset",
          fontFamily: "cursive",
          marginTop: "-60px",
          fontSize: "25px",
        }}
        className="me-5 ms-5 "
      >
        We offer comprehensive waste management services, seamlessly addressing
        illegal waste dumping, optimizing waste collection scheduling, promoting
        efficient waste segregation, and fostering community engagement for a
        greener and more sustainable future
      </div>

      <div className="d-flex justify-content-center align-items-center mt-3 ">
       <div className="d-flex me-1 ms-1">



        <Link
  to={admincheck === "true" ? "/adminReport" : "/wasteReporting"}
  style={{ textDecoration: "none", color: "inherit" }}
>
  <div className="text-center me-5 hoverEffect">
    <img
      src="/images/reporting.jpeg"
      style={{ width: "80%", marginBottom: "10px" }}
      alt="Illegal Waste Reporting"
    />
    <h5 style={{marginRight:"100px"}}>Illegal Waste Reporting</h5>
  </div>
</Link>





          <Link
            to={ admincheck === "true" ? '/adminScheduling' :  "/wasteScheduling"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="text-center me-5 hoverEffect">
              <img
                src="/images/scheduling.jpeg"
                style={{ width: "80%", marginBottom: "10px" }}
                alt="Waste Scheduling"
              />
              <h5 style={{marginRight:"80px"}}>Waste Scheduling</h5>
            </div>
          </Link>

         

          <Link
            to={  admincheck === "true" ? '/adminShopping' :    "/shopping"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="text-center me-5 hoverEffect">
              <img
                src="/images/shp.jpeg"
                style={{ width: "80%", marginBottom: "10px" }}
                alt="Shopping Mart"
              />
              <h5 style={{marginRight:"50px"}}>Shopping Mart</h5>
            </div>
          </Link>



          <Link
            to={ admincheck === "true" ? '/adminCommunity' : "/community"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="text-center hoverEffect">
              <img
                src="/images/community.jpeg"
                style={{ width: "75%", marginBottom: "10px" }}
                alt="Community"
              />
              <h5 style={{marginRight:"100px"}}>Community</h5>
            </div>
          </Link>


          
      






        </div>
      </div>

      
      <div style={{display:"flex",justifyContent:"space-around"}}  className=" mt-3 ">
       <div className="d-flex mt-4"></div>
       { admincheck === "true" && <Link
            to={"/adminUsers"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="text-center hoverEffect mt-4  ">
              <img
              
                src="/images/users.jpg"
                style={{ width: "40%", marginBottom: "1px", }}
                alt="Community"
              />
              <h5 className="mt-3" style={{marginRight:"330px"}}>View Users</h5>
            </div>
          </Link>
}




{ admincheck === "true" && <Link
            to={"/adminCheckout"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="text-center hoverEffect mt-5 ">
              <img
              
                src="/images/purchase.png"
                style={{ width: "40%", marginBottom: "1px", }}
                alt="Community"
              />
              <h5 className="mt-3" style={{marginRight:"300px"}}>Purchase Reports</h5>
            </div>
          </Link>
}


</div>
      <Footer />
      

    </div>
  );
}

export default Home;
