import React from 'react';
import './payment.css';

function Payment() {
  return (
    <div className="subscription-plans">
      <div className="plan">
        <h3>Basic Plan</h3>
        <p className="price">Free</p>
        <ul>
          <li>30Links/month</li>
          <li>Basic QR</li>
          <li>Basic analytics(click count)</li>
        </ul>
      </div>
      <div className="plan">
        <h3>Premium Plan</h3>
        <button className="price-btn">₹199/month</button>

        <ul>
          <li>Unlimited links</li>
          <li>Custom QR (colour,logo and format)</li>
          <li>Custom links</li>
          <li>Advance click analytics including location,types of devices</li>
          <li>Short in bulk</li>
        </ul>
      </div>
    </div>
  );
}

export default Payment;
