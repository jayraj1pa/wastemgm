import React, { useState, useEffect } from 'react';
import NavComponent from '../NavComponent';
import { Button, Table } from 'react-bootstrap';
import { alladminUsers, blockUser } from '../../service/allAPI';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { BASE_URL } from '../../service/BaseUrl';
import { useContext } from 'react';
import { medalContext } from '../../service/ContextShare';

function AdminUser() {
  const { medal, setMedal } = useContext(medalContext);
  const [userScheduling, setUserScheduling] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [block, setBlock] = useState(false);


  const toast = useToast();

  const getallSchedule = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');

      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const result = await alladminUsers(reqHeader);
      if (result.status === 200) {
        console.log(result.data);
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

  const blockUserFunc = async (userId) => {
    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        console.error('Token not found. Unable to block user.');
        return;
      }

      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `${BASE_URL}/block-user/${userId}`,
        {},
        { headers: reqHeader }
      );

      if (response.status === 200) {
        console.log(`User with ID ${userId} blocked successfully`);

        toast({
          title: 'User Blocked!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-left',
        });

        getallSchedule();
      } else {
        console.error('Failed to block user:', response);
      }
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        console.error('Token not found. Unable to unblock user.');
        return;
      }

      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `${BASE_URL}/unblock/${userId}`,
        {},
        { headers: reqHeader }
      );

      if (response.status === 200) {
        toast({
          title: 'User UnBlocked!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-left',
        });

        console.log(`User with ID ${userId} unblocked successfully`);
        getallSchedule();
      } else {
        console.error('Failed to block user:', response);
      }
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  useEffect(() => {
    // Assuming you have the JSON string stored in sessionStorage
    const userString = sessionStorage.getItem('existingUser');

    // Parse the JSON string into a JavaScript object
    const userObject = JSON.parse(userString);

    // Access the isBlocked property
    const isBlocked = userObject.isBlocked;
    setBlock(isBlocked);

    console.log(isBlocked);
  }, []);

  const loggedInUserId = sessionStorage.getItem('_Id');
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  return (
    <div>
      <NavComponent />
      <h3 style={{ marginTop: '100px', textAlign: 'center' }}>User Details</h3>

      <form>
        <div
          style={{ marginTop: '20px',marginLeft:"500px" }}
          className=" d-flex justify-content-center align-items-center border w-50 rounded"
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

<div className='mt-5' style={{display:"flex",justifyContent:"center"}}>



<Table  style={{width:"80%"}} bordered >
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Schedules</th>
            <th>Joined Communities</th>
            <th>Reports</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterData?.length > 0 &&
            filterData.map((schedule) => (
              // Exclude the logged-in user's account from the list
              schedule._id !== loggedInUserId && !schedule.isAdmin && (
                <tr key={schedule.id}>
                  <td>{schedule.username}</td>
                  <td>{schedule.email}</td>
                  <td>{schedule.address}</td>
                  <td>{schedule.schedulesCount}</td>
                  <td>{schedule.joinedCommunitiesCount}</td>
                  <td>{schedule.reportsCount}</td>
                  <td>{schedule.feedbacks}</td>
                  <td>



                    <Button
                      className="me-3"
                      variant="danger"
                      onClick={() => blockUserFunc(schedule._id)}
                    >
                      Block User
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleUnblockUser(schedule._id)}
                    >
                      Unblock User
                    </Button>
                    
                  </td>
                </tr>
              )
            ))}
        </tbody>
      </Table>

</div>

    </div>
  );
}

export default AdminUser;
