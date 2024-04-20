import React, { createContext } from 'react'
import NavComponent from "../NavComponent";
import { Row, Col,Button, Table } from "react-bootstrap";
import { useState,useEffect } from 'react';
import { alladminSchedulings, updateScheduleStatus } from '../../service/allAPI';
import { schedulingData } from '../../service/ContextShare';
import { useContext } from 'react';


function AdminScheduling() {
  const {scheduleStatus,setScheduleStatus} = useContext(schedulingData)
 

const [userScheduling, setUserScheduling] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getallSchedule = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await alladminSchedulings(reqHeader);
      if (result.status === 200) {
        setUserScheduling(result.data);
      } else {
        console.log(result);
      }
    }
  };

  useEffect(() => {
    getallSchedule();
  }, []);

  useEffect(() => {
    // Filter schedules based on the search query
    const filteredSchedules = userScheduling.filter((schedule) =>
      schedule.houseNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterData(filteredSchedules);
  }, [searchQuery, userScheduling]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const token = sessionStorage.getItem("token");



  const handleStatusUpdate = async (scheduleId, newStatus) => {
    try {
      // console.log('Updating status...', reportId, newStatus);
  
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
  
      const result = await updateScheduleStatus(scheduleId, newStatus, reqHeader);
  
      // console.log('Update result:', result);
  
      if (result.status === 200) {
        // Reload the reports after the status update
        getallSchedule();
        // console.log("hii", ); // Incorrect casing (Status instead of status)

         setScheduleStatus(result.data.status)

      } else {
        console.log(result);
      }
    } catch (error) {
      console.error("Failed to update schedule status:", error);
    }
  };





  

  return (
    <div>
      <NavComponent />
      <h3 style={{ marginTop: "100px", textAlign: "center" }}>
        User Waste Scheduling
      </h3>

      <form>
        <div
          style={{ marginTop: "20px" ,marginLeft:"500px"}}
          className="mt-4 d-flex justify-content-center align-items-center border w-50 rounded"
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

<div style={{display:"flex",justifyContent:"center"}}>

      <Table className='mt-5' style={{width:"90%"}} bordered >
  <thead>
    <tr>
      <th>Id</th>
      <th>Scheduled By</th>
      <th>Location</th>
      <th>Waste Quantity</th>
      <th>Date</th>
      <th>Time</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filterData?.length > 0 &&
      filterData.map((schedule,index) => (
        <tr key={schedule.id}>
          <td>{index + 1}</td>
          <td>{schedule.userId ? schedule.userId.username : 'Unknown User'}</td>
          <td>{schedule.houseNumber}</td>
          <td>{schedule.wasteQuantity}</td>
          <td>{schedule.edate}</td>
          <td>{schedule.etime}</td>
          <td>{schedule.status}</td>
          <td>
            <Button
              variant="success"
              onClick={() => handleStatusUpdate(schedule._id, 'Collected')}
            >
              Mark as Collected
            </Button>

           

            <Button
              className="ms-2"
              variant="warning"
              onClick={() => handleStatusUpdate(schedule._id, 'Make Payment')}
            >
              Pay
            </Button>
          </td>
        </tr>
      ))}
  </tbody>
</Table>

</div>

    </div>


  )
}

export default AdminScheduling