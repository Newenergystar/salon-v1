import React from 'react'
import hairimg from "../../context/hairimg.jpg"
import {Link} from "react-router-dom";
import "./HomeHero.css"

const HomeHero = () => {
  return (<div>

    <div className='hometitle'> <h1>Jallz Hair and Beauty</h1></div>
    <div className='homebg'>
      <div className='Title'>
        <h1>The best salon for afro hair </h1>

        <Link to="/book" > <button className='booknowbtn' > Book Now</button></Link>
        
      </div>
      <div className='homepiccontainer'>
      <img src={hairimg} className='homepicture2'></img>
      
      
      
      </div>
    </div>
    </div>
  )
}

export default HomeHero
