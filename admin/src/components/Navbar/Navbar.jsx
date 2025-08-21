import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>
        <h2 className='logo'>Foodie</h2>
        <img src={assets.profile_image} alt="" className='profile'/>
    </div>
  )
}

export default Navbar