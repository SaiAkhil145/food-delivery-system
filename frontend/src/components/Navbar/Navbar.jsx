import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContextProvider';
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { assets } from '../../assets/frontend_assets/assets';

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("Home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  
  const logOut = ()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
  }

  return (
    <div className='navbar'>
      <Link to="/">
        <h2 className='logo'>Foodie</h2>
      </Link>

      {/* Navigation Menu */}
      <ul className="navbar-menu">
        <Link 
          to="/" 
          onClick={() => setMenu("Home")} 
          className={menu === 'Home' ? "active" : ""}
        >
          Home
        </Link>
        <a 
          href="#explore-menu" 
          onClick={() => setMenu("Menu")} 
          className={menu === 'Menu' ? "active" : ""}
        >
          Menu
        </a>
        <a 
          href="#app-download" 
          onClick={() => setMenu("Mobile App")} 
          className={menu === 'Mobile App' ? "active" : ""}
        >
          Mobile App
        </a>
        <a 
          href="#footer" 
          onClick={() => setMenu("Contact Us")} 
          className={menu === 'Contact Us' ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        {/* Search icon */}
        <FaSearch className="icon search-icon" />

        {/* Cart icon with dot */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <FaShoppingCart className="icon cart-icon" />
          </Link>
          <div className={getTotalCartAmount() !== 0 ? "dot" : ""}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logOut}>
                <img  src={assets.logout_icon} alt="" />
                <p>LogOut</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
