import React, { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { addPriceContext, paymentContext } from '../../service/ContextShare';
import { useNavigate } from 'react-router-dom';


function App() {
  const { payment,setPayment} = useContext(paymentContext)
  const {payPrice,setPayPrice} = useContext(addPriceContext)
 const NewPrice =  payPrice.split(" ")[1]
 const price = NewPrice * 100;
 console.log("india",payment);



 const nav = useNavigate()

  useEffect(() => {
    const options = {
      key: 'rzp_test_daJnqYwT9GBle2', // Enter your Key ID here
      amount: price?price:'10000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Eco Community',
      description: 'Test Transaction',
      image: '/images/shp.jpeg',
      handler: function (response){
          // alert(response.razorpay_payment_id);
          // setPayment(response.razorpay_payment_id)
          // console.log(setPayment);
          // console.log("hiii",payment);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
          nav('/loginhome')
      },
      
      notes: {
          address: 'Razorpay Corporate Office'
      },
      theme: {
          color: '#3399cc'
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
