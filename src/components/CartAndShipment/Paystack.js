import React, { useState } from "react";
import { useAuth } from "../Authentication/useAuth";
import { PaystackButton } from 'react-paystack';
import { useHistory } from "react-router-dom";
import { processOrder } from "../../utilities/databaseManager";
import {toast} from 'react-toastify';
import './Paystack.css'


const Checkout = ({grandTotal, orderAddedPay, clearCart, clearDeliveryDetails}) => {

const history = useHistory()
  
const publicKey = process.env.REACT_APP_PAYKEY

  // init auth
  const auth = useAuth();
  const amountInNaira = grandTotal;
  const amount = grandTotal * 100;
  console.log(amountInNaira);
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");


  const resetForm = () => {
    setEmail('');
    setName('');
    setPhone('');
  };

  // add orders after paystack payment is successful
 const addOrderAfterPayment = () => {
  fetch("https://gifson-backend.onrender.com/addOrders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderAddedPay)
   })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
 }

  // init component props
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: ({reference}) =>{
      toast(`Your transaction is successful, order has been placed!!!: ${reference}`);
      addOrderAfterPayment();
      processOrder();
      resetForm();
      clearCart();
      clearDeliveryDetails();
      history.push("/dashboard")
    },
    onClose: () => alert("Wait!, don't go!!!!")
  }

     return (
        <div className="fill-form">
          <h2>Payment Details</h2>
          <h2 className="fw-bold">Grand Total : {amountInNaira}</h2>
          <p>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              value={name || auth.user.displayName}
              placeholder="Enter your name"
              onChange={e => setName(e.target.value)}
              required
              id="name"
            />
          </p>
          <p>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email || auth.user.email}
              placeholder="Enter your email"
              onChange={e => setEmail(e.target.value)}
              id="email"
              required
            />
          </p>
          <p>
            <label htmlFor="phone">Phone number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              id="phone"
              required
            />
          </p>        
          <p>
           <PaystackButton className = "paystack-button" {...componentProps} />
          </p>
        </div>
  );
};


export default Checkout;
