import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer' id="footer">
      <div className='footer-content'>
        
        {/* Left Section */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Logo" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            deserunt ullam explicabo sunt fuga aliquam velit corporis
            reprehenderit aliquid itaque.
          </p>
          <div className="footer-social-icons">
            <FaFacebookF className="icon" />
            <FaTwitter className="icon" />
            <FaLinkedinIn className="icon" />
          </div>
        </div>

        {/* Center Section */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 1234567890</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>

      </div>

      <hr />
      <p className='copyright-text'>
        Copyright 2025 &copy; Tomato.com - All rights Reserved.
      </p>
    </div>
  )
}

export default Footer
