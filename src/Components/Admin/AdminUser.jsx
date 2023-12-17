import React from 'react';
import { useState, useEffect } from 'react';
import NavComponent from '../NavComponent';
import { Row, Col, Button } from 'react-bootstrap';
import { alladminUsers } from '../../service/allAPI';


function AdminUser() {
  const [userScheduling, setUserScheduling] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const getallSchedule = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');

      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const result = await alladminUsers(reqHeader);
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
      schedule.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterData(filteredSchedules);
  }, [searchQuery, userScheduling]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  
  return (
    <div>
      <div>
        <NavComponent />
        <h3 style={{ marginTop: '100px', textAlign: 'center' }}>User Details</h3>

        <form>
          <div
            style={{ marginTop: '20px' }}
            className="ms-5 d-flex justify-content-center align-items-center border w-50 rounded"
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search Your Requests By User Name"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </form>

        <Row className="mt-4 container-fluid">
          {filterData?.length > 0
            ? filterData.map((schedule) => (
                <Col
                  style={{
                    height: '30vh',
                    backgroundSize: '100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '25vw',
                  }}
                  className="card shadow me-5 ms-5 mb-5"
                  sm={4}
                  md={4}
                  lg={4}
                  key={schedule.id}
                >
                  <p style={{ fontWeight: 'bolder', fontSize: '20px' }} className="mt-3">
                    Username: {schedule.username}
                  </p>
                  <p style={{ fontWeight: 'bolder', fontSize: '20px' }}>Email: {schedule.email}</p>
                  <p style={{ fontWeight: 'bolder', fontSize: '20px' }}>Address: {schedule.address}</p>

                 
                </Col>
              ))
            : null}
        </Row>
      </div>
    </div>
  );
}

export default AdminUser;
