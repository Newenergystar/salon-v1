import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { auth, db } from "../../components/firebase";
import {Link} from "react-router-dom";
import { getDoc,setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import {Booking} from "../../components/index";
import "./Book.css"

const Book = () => {

  const [userdetails, setUserDetails] = useState("");
  const [appointmentx, setAppointmentx] = useState("")
  const delay = ms => new Promise(res => setTimeout(res, ms));


  

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
    <>

    {userdetails?(<Booking/>):(<h1 className='title'>Please Sign in to make a Booking</h1>)}




</>
    
  )
}

export default Book