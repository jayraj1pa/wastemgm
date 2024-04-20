import React, { useEffect, useState } from "react";
import NavComponent from "../NavComponent";
import { Row, Col, Button, Table } from "react-bootstrap";
import { allScheduling, deleteScheduleAPI } from "../../service/allAPI";
import { Link } from "react-router-dom";
import SchedulingEdit from "./SchedulingEdit";
import { useContext } from "react";
import { addScheduleResponseContext, paymentContext, schedulingData } from "../../service/ContextShare";

function EcoScheduling() {

  const { payment, setPayment } = useContext(paymentContext);
  const { scheduleStatus, setScheduleStatus } = useContext(schedulingData);
  



  
  const { addScheduleResponse, setAddScheduleResponse } = useContext(
    addScheduleResponseContext
  );
  const [userScheduling, setUserScheduling] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [quantity, setQuantity] = useState("");

  const getallSchedule = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await allScheduling(reqHeader);
      if (result.status === 200) {
        setUserScheduling(result.data);
      } else {
        console.log(result);
      }
    }
  };


  console.log('Schedule Status:', scheduleStatus);


  useEffect(() => {
    getallSchedule();
  }, [addScheduleResponse, setAddScheduleResponse]);



  useEffect(() => {
    getallSchedule()
  }, [scheduleStatus]);
  

  useEffect(() => {
    // Filter schedules based on the search query, date, and type
    const filteredSchedules = userScheduling.filter(
      (schedule) =>
        schedule.houseNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (dateFilter ? schedule.edate.includes(dateFilter) : true) &&
        (typeFilter ? schedule.status === typeFilter : true) &&
        (quantity ? schedule.wasteQuantity === quantity : true)
    );
    setFilterData(filteredSchedules);
  }, [searchQuery, userScheduling, dateFilter, typeFilter, quantity]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateFilter = (e) => {
    setDateFilter(e.target.value);
  };

  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleWasteQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleDelete = async (Id) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await deleteScheduleAPI(Id, reqHeader);
      console.log("Deleting schedule with ID:", Id); // Add this line

      if (result.status === 200) {
        console.log("success");
        getallSchedule();
      } else {
        console.log(result.response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <NavComponent />
        <h3 style={{ marginTop: "100px", textAlign: "center" }}>
          User Waste Scheduling
        </h3>

        <form>
          <div
            style={{ marginTop: "20px" ,marginLeft:"500px"}}
            className=" d-flex justify-content-center align-items-center border w-50 rounded"
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search Your Requests By Location"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </form>



<div style={{display:"flex"}}>

<div className="me-5 p-4" style={{display:"flex",flexDirection:"column",marginLeft:"200px",}}>
{/* className="card" style={{border:"1px solid greyx",marginLeft:"200px"}}> */}
      {/* Date Filter */}
      <label className="mt-2">Filter by Date:</label>

      <input 
style={{width:"80%"}}
  type="date"
  className="form-control mt-2"
  placeholder="Filter by Date"
  value={dateFilter}
  onChange={handleDateFilter}
/>

{/* Type Filter */}
<div className="mt-4 ">
  <label>Filter by Type:</label>
  <div className="form-check">
    <input
      type="radio"
      className="form-check-input"
      name="typeFilter"
      id="allTypes"
      value=""
      checked={typeFilter === ""}
      onChange={handleTypeFilter}
    />
    <label className="form-check-label" htmlFor="allTypes">
      All
    </label>
  </div>
  <div className="form-check mt-2">
    <input
      type="radio"
      className="form-check-input"
      name="typeFilter"
      id="collected"
      value="Collected"
      checked={typeFilter === "Collected"}
      onChange={handleTypeFilter}
    />
    <label className="form-check-label" htmlFor="collected">
      Collected
    </label>
  </div>
  <div className="form-check mt-2">
    <input
      type="radio"
      className="form-check-input"
      name="typeFilter"
      id="Pending"
      value="Pending"
      checked={typeFilter === "type2"}
      onChange={handleTypeFilter}
    />
    <label className="form-check-label" htmlFor="Pending">
    Pending
    </label>
    {/* Add more radio buttons based on your actual types */}
  </div>
</div>



<div className="mt-4">
  <label>Filter by Quantity:</label>
  <div className="form-check ">
    <input
      type="radio"
      className="form-check-input"
      name="quantity"
      id="allQuantity"
      value=""
      checked={quantity === ""}
      onChange={handleWasteQuantity}
    />
    <label className="form-check-label" htmlFor="allQuantity">
      All
    </label>
  </div>
  <div className="form-check mt-2 ">
    <input
      type="radio"
      className="form-check-input"
      name="quantity"
      id="below1kg"
      value="Below 1 Kg"
      checked={quantity === "Below 1 Kg"}
      onChange={handleWasteQuantity}
    />
    <label className="form-check-label" htmlFor="below1kg">
      Below 1 Kg
    </label>
  </div>
  <div className="form-check mt-2 ">
    <input
      type="radio"
      className="form-check-input"
      name="quantity"
      id="Below 5 Kg"
      value="Below 5 Kg"
      checked={quantity === "Below 5 Kg"}
      onChange={handleWasteQuantity}
    />
    <label className="form-check-label" htmlFor="type2">
    Below 5 Kg
    </label>
    {/* Add more radio buttons based on your actual types */}
  </div>
  <div  className="form-check mt-2 ">
    <input 
      type="radio"
      className="form-check-input"
      name="quantity"
      id="Above 5 Kg"
      value="Above 5 Kg"
      checked={quantity === "Above 5 Kg"}
      onChange={handleWasteQuantity}
    />
    <label className="form-check-label" htmlFor="type2">
    Above 5 Kg
    </label>
  </div>
</div>

</div>






        {filterData?.length > 0 ? (
  <div style={{display:"flex",justifyContent:"center"}}>
<Table bordered className="table-hover mt-5" style={{width:"60vw",height:"20vh"}}>      <thead>
         <tr>
          <th style={{ fontWeight: 'bolder', fontSize: '20px' }}>Location</th>
          <th style={{ fontWeight: 'bolder', fontSize: '20px' }}> Quantity</th>
          <th style={{ fontWeight: 'bolder', fontSize: '20px' }}>Date</th>
          <th style={{ fontWeight: 'bolder', fontSize: '20px' }}>Time</th>
          <th style={{ fontWeight: 'bolder', fontSize: '20px' }}>Status</th>
          <th style={{ fontWeight: 'bolder', fontSize: '20px' }}>Edit</th>
          <th style={{ fontWeight: 'bolder', fontSize: '20px' }}>Delete</th>
          <th style={{ fontWeight: 'bolder', fontSize: '20px' }}>Payment</th>


        </tr>
      </thead>
      {filterData.map((schedule) => (
        <tbody key={schedule.id}>
          <tr>
            <td>{schedule.houseNumber}</td>
            <td>{schedule.wasteQuantity}</td>
            <td>{schedule.edate}</td>
            <td>{schedule.etime}</td>
            <td>{schedule.status}</td>
            <td>
            {schedule.status !== 'Collected' && (
     
        <div className="hoverEffect">
        <SchedulingEdit schedule={schedule} />
</div>
)}

        </td>

        <td>

          <button
            onClick={(e) => handleDelete(schedule._id)}
            className="btn"
          >
            <i
              className="fa-solid fa-trash "
              style={{ color: "#fc030b",fontSize:"30px" }}
            ></i>
          </button>
          </td>


<td>
{schedule.status === "Pending" && <p>Not paid</p>}
{schedule.status === "Collected" && <p>Paid</p>}
{schedule.status === 'Make Payment' && (
           
                <Link to='/payment'>
                  <Button style={{fontSize:"17px"}} className='btn btn-success'>Make Payment</Button>
                </Link>
             
          )}



</td>


          </tr>
        
        </tbody>
      ))}
    </Table>
   
  </div>
) : null}
</div>


      </div>
    </>
  );
}

export default EcoScheduling;
