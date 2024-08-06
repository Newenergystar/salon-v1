import React from 'react'
import {Profile, AddProduct, DisplayProducts} from "../../components/index"
import "./Products.css"


const Product = () => {
  return (
    <div>
    <div>

      <h1 className='title'>All Products</h1>
      <p className='producttext'> Our salon prides itself in the products avaliable when you visit us</p>
    </div>

<DisplayProducts/>
</div>
    
  )
}

export default Product
