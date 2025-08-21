import React, { useContext, useState,useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, userId } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId, 
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
      headers: {token},
      });

      if (response.data.success) {

        const { session_url } = response.data;
        window.location.href = session_url; 
        console.log(session_url)
      } else {
        alert("Error creating order!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong with checkout.");
    }
  };
  const navigate =useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }else if(getTotalCartAmount()===0){
      navigate('/cart');
    }
  },[token])
  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              type="text"
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              placeholder="First name"
              required
            />
            <input
              type="text"
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              placeholder="Last name"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Email address"
            required
          />
          <input
            type="text"
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            placeholder="Street"
            required
          />
          <div className="multi-fields">
            <input
              type="text"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              placeholder="City"
              required
            />
            <input
              type="text"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              placeholder="State"
              required
            />
          </div>
          <div className="multi-fields">
            <input
              type="number"
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              placeholder="Zip code"
              required
            />
            <input
              type="text"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              placeholder="Country"
              required
            />
          </div>
          <input
            type="number"
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            placeholder="Phone"
            required
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery</p>
                <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button type="submit">Proceed to Payment</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
