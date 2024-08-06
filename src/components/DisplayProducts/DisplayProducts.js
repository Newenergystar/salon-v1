import React, { useEffect } from 'react'
import { useState } from 'react';
import {db, storage, auth} from "../firebase"
import { ToastContainer, toast } from "react-toastify";
import {collection, getDocs, query, where, doc, getDoc, deleteDoc} from "firebase/firestore"

import "./DisplayProducts.css"

const DisplayProducts =  () => {
    const [Products, setProducts] = useState([]);
    const [userdetails, setUserDetails] = useState("")

   async function LoadProducts(){
     const q =  await getDocs(collection(db, "Products"));
     const data = []
     q.forEach((doc) =>{ 
  data.push({ id: doc.id, ...doc.data()});
  });

     return data
   }

   const DelectProduct = async (e) => {

    if(window.confirm("Are you sure you want to delete this product")){

    const id = e.target.value
    
    deleteDoc(doc(db, "Products", id))

    async function fetchData() {
      const data = await LoadProducts();
      setProducts(data)
      
            }
      
            fetchData();
            fetchUserData();
          }else{


          }


  }

   const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
  
  
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };

    useEffect(() => {
      async function fetchData() {
const data = await LoadProducts();
setProducts(data)

      }

      fetchData();

      
      const unsub = auth.onAuthStateChanged((authObj) => {
        unsub();
        if (authObj) {
          fetchUserData();
          
          
        } else {
          // not logged in
        }
      }
    )


     
    },[]);
    

  return (
    <div className='productcontainer1'>
    <div className='productcontainer2'> 

      {Products.map((products)=>{
        return(

    <div class="productcard" key={products.id}>
    {userdetails.Admin?(<button onClick={(e) =>{DelectProduct(e)}} value={products.id}> Delete Product</button>):("")}
    <div className='imgcontainer'>
    <img src ={products.productImg} className='productimg' />
    </div>
    <div className='proddescrip'>
    <div class="title1"><h2>{products.productname}</h2>

    
    </div>
    <div class="description">{products.productdescription}</div>
    <div class="description2">£{products.productprice}</div>
    </div>
   
    
    </div>


        )

      })}

     
     
     </div>
     </div>
  )

}


export default DisplayProducts
