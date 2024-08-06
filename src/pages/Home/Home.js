import React from 'react'
import hairimg from "../../context/hairimg.jpg"
import {HomeHero} from "../../components/index"
import "./Home.css"

const Home = () => {
  return (
  
  <div className='homecontainerbg'>

    <HomeHero/>

    <div className='homeintro'> We are delighted to have you here! At Jallz, we believe in providing an exceptional experience that leaves you feeling refreshed, revitalized, and beautiful. Our skilled team of professionals is dedicated to offering personalized services tailored to meet your unique needs.

Whether you're here for a haircut, color, spa treatment, or just some pampering, we strive to create a relaxing and enjoyable atmosphere. Your comfort and satisfaction are our top priorities.

Thank you for choosing Jallz. We look forward to serving you and helping you look and feel your best.

Warm regards,
The Jallz Team</div>

    </div>
  )
}

export default Home
