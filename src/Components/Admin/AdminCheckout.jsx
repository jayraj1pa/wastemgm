import React, { useEffect, useState } from 'react';
import NavComponent from '../NavComponent';
import { checkoutAPIAdmin } from '../../service/allAPI';
import { Table, Form } from 'react-bootstrap';

function AdminCheckout() {
  const [checkout, setCheckout] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getallCheckout = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const result = await checkoutAPIAdmin(reqHeader);
      if (result.status === 200) {
        setCheckout(result.data);
      } else {
        console.log(result);
      }
    }
  };

  useEffect(() => {
    getallCheckout();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCheckout = checkout.filter((schedule) =>
    schedule.items.some(
      (item) =>
        item.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.productPrice.toString().includes(searchQuery) ||
        item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div>
      <NavComponent />

      <h3 style={{ marginTop: '100px', textAlign: 'center' }}>Purchase Reports</h3>

      <form>
        <div
          style={{ marginTop: '35px' ,marginLeft:"500px"}}
          className="d-flex justify-content-center align-items-center border w-50 rounded"
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search Your Requests"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </form>

      <Table className='mt-5 ' style={{ width: '80%',marginLeft:"210px" }} bordered>
        <thead >
          <tr>
            <th>Product ID</th>
            <th>Prodct Name</th>
            <th>Product Price</th>
            <th>user</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredCheckout?.length > 0 &&
            filteredCheckout.map((schedule) =>
              schedule.items.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productId}</td>
                  <td>{item.productName}</td>
                  <td>{item.productPrice}</td>
                  <td>{item.username}</td>
                  <td>{item.address}</td>
                </tr>
              ))
            )}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminCheckout;
