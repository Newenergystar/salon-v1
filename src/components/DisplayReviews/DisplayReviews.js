import React, { useEffect } from 'react'
import { useState } from 'react';
import {db, storage, auth} from "../firebase"
import { ToastContainer, toast } from "react-toastify";
import {collection, getDocs, query, where, getDoc,doc, deleteDoc} from "firebase/firestore"

import "./DisplayReviews.css"

const DisplayReviews =  () => {
    const [Reviews, setReviews] = useState([]);
    const [userdetails, setUserDetails] = useState("")

   async function LoadReviews(){
     const q =  await getDocs(collection(db, "Reviews"));
     const data = []
     q.forEach((doc) =>{ 
  data.push({ id: doc.id, ...doc.data()});
  });

     return data
   }
   const deletereview = async (e) => {

    
    if(window.confirm("Are you sure you want to delete this review")){

    const id = e.target.value
    
    deleteDoc(doc(db, "Reviews", id))
      
            async function fetchData() {
              const data = await LoadReviews();
     setReviews(data)
              
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
const data = await LoadReviews();
setReviews(data)

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


    <div className='reviewcontainer1'> 

    <div className='reviewcontainer2'>
      {Reviews.map((reviews)=>{
        return(
            <div>
          <div class="reviewd" key={reviews.id}>

          <div class="reviewrate">
            <div className='reviewrating'>Rating: {reviews.rating}★</div>
            <div class="reviewusername">User: {reviews.username}</div>
           <div className='reviewtext'>{reviews.review}</div>
      </div>
    <div className='reviewimgcontainer'>
    <img src ={reviews.productImg} className='reviewimg' />
    </div>
    
    </div>

    {userdetails.Admin?(<button onClick={(e) => deletereview(e)} value={reviews.id}> Remove Review </button>):("")}
    
    </div>
    

        )

      })}
      </div>

     
     
     </div>
   
  )

}


export default DisplayReviews 
