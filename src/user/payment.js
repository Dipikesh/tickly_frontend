import React from 'react';
import './payment.css';
import Menu from '../core/Menu';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../constant';

const Payment = () => {
  const handlePremiumButtonClick = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/payment`);
      console.log(response.data);
      // handle success response from server
    } catch (error) {
      console.error(error);
      // handle error response from server
    }
  };
  return (
    <>
      <Menu />
      <div className="subscription-plans">
        <div className="plan basic-plan">
          <h3>Basic Plan</h3>
          <p className="price">Free</p>
          <ul>
            <li>30Links/month</li>
            <li>Basic QR</li>
            <li>Basic analytics (click count)</li>
          </ul>
        </div>
        <div className="plan premium-plan">
          <h3>Premium Plan</h3>
          <a href='http://localhost:5000/payment'><button className="price-btn" >₹199/month</button></a>

          <ul>
            <li>Unlimited links</li>
            <li>Custom QR (colour, logo and format)</li>
            <li>Custom links</li>
            <li>Advance click analytics including location, types of devices</li>
            <li>Short in bulk</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Payment;
