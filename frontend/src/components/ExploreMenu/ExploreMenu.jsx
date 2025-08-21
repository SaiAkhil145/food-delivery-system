import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id="explore-menu">
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Can’t decide what to eat? Let us help! Our smart dish selector recommends tasty options based on your mood, cravings, and past orders, making mealtime effortless and exciting.</p>
        <div className='explore-menu-list'>
            {
                menu_list.map((item,index)=>{
                    return (
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name ? "All" : item.menu_name)}  key={index}  className='explore-menu-list-item'>
                            <img className={category===item.menu_name ? "active" : ""}  src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu