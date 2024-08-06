import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { auth, db } from "../../components/firebase";
import {Link} from "react-router-dom";
import { getDoc,setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import {Booking, Reviews as Rev,DisplayReviews } from "../../components/index";
import "./Review.css"

const Reviews = () => {


  const [userdetails, setUserDetails] = useState("");

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
    <div className='revcontainer' >
       
       
      {userdetails?(<Rev/>):(<h1 className='title'> Please Log in to write a Review</h1>)} 
    
    <DisplayReviews/>
    
    </div>
  )
}

export default Reviews
