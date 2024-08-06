import React, { useEffect } from 'react'
import {db, storage, auth} from "../firebase";
import { setDoc, documentId, doc, getDoc, updateDoc, deleteDoc, collection,getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify"
import { useState } from 'react';
import "./AppointmentHandler.css"

const AppointmentHandler = () => {

  
    const [Appointments1, setAppointments] = useState([]);
    const [userdetails, setUserDetails] = useState();



    const Confirm = async (e) => {

      const id = e.target.value
      
      updateDoc(doc(db, "Appointment", id), {

        confirmed: true,
        noshow: false,
        cancel: false

      })

      async function fetchData() {
        const data = await LoadAppointments();
        setAppointments(data)
              }
        
              fetchData();


    }

    const Decline = async (e) => {

      const id = e.target.value

      var str_array = id.split(',');
     
      for(var i = 0; i < str_array.length; i++) {
        // Trim the excess whitespace.
        str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
        // Add additional code here, such as:
     }
     
     const idx = str_array[0]

     console.log(str_array)

     const user = str_array[1]

     

     updateDoc(doc(db, "Appointment", idx),{

       cancel: true

     })




     async function fetchData() {
      const data = await LoadAppointments();
      setAppointments(data)
            }
      
            fetchData();
    
    }

    const NoShow = async (e) => {

      const id = e.target.value

      var str_array = id.split(',');
     
      for(var i = 0; i < str_array.length; i++) {
        // Trim the excess whitespace.
        str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
        // Add additional code here, such as:
     }
     
     const idx = str_array[0]

     const user = str_array[1]

     

     updateDoc(doc(db, "Appointment", idx),{

       noshow : true,
       cancel :false


     })

     async function fetchData() {
      const data = await LoadAppointments();
      setAppointments(data)
            }
      
            fetchData();



    
    }

    const Completed = async (e) => {
      const id = e.target.value

      var str_array = id.split(',');
     
      for(var i = 0; i < str_array.length; i++) {
        // Trim the excess whitespace.
        str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
        // Add additional code here, such as:
     }
     
     const idx = str_array[0]

     const user = str_array[1]

     

     if (window.confirm("Are you sure?")){

      updateDoc(doc(db, "Users", user), {

        appointmentid: "nothing",
        appointmentmade: false,
        hasmissedappoint: false

      })

      deleteDoc(doc(db, "Appointment",idx))
    
    
    
    } else{


    }

     async function fetchData() {
      const data = await LoadAppointments();
      setAppointments(data)
            }
      
            fetchData();
    }



    async function LoadAppointments(){
        const q =  await getDocs(collection(db, "Appointment"));
        const data = []
        q.forEach((doc) =>{ 
     data.push({ id: doc.id, ...doc.data()});
     });
     console.log(data)
     return data


    }
    

    useEffect(() => {
        async function fetchData() {
  const data = await LoadAppointments();
  setAppointments(data)
        }
  
        fetchData();
       
      },[]);

/* <div className='reviewcontainer2'>

{Appointments1.map((appointments)=>{
  return(
    <div>

    </div>

  )})}
</div>


*/


  return (
    <div className='appointmentsc'>

<h1>Appointments</h1>
      
    <div className='appointmentsc2'>
    


{Appointments1.map((appointments)=>{
  return(

    <div className='appointmentid' key={appointments.id}>

      <div className='appointdetails'> 

        Date:

      <div> {appointments.date}</div>

      Time:

      <div> {appointments.time}</div>
      </div>

      <div className='appointdetails2'> 

      Service:

      <div> {appointments.service} </div>

      Client:

      <div> {appointments.client} </div>

      
      </div>

      
      <div className='appointdetails3'> 

   <button className='appointctrl1' onClick={(e) => Confirm(e)} value={appointments.id} id={appointments.id}>Confirm</button>
   <button className='appointctrl2' onClick={(e) => Decline(e)} value={[appointments.id, appointments.useruid]} > Decline</button>
   </div>  
   <div className='appointdetails3'>
   <button className='appointctrl3' onClick={(e) => NoShow(e)} value={[appointments.id, appointments.useruid]} >No-Show</button>
   <button className='appointctrl4' onClick={(e) => Completed(e)} value={[appointments.id, appointments.useruid]} >Completed</button>
   

</div>

<div className='appointdetails4'> 

      Status:

      <div> {appointments.cancel?(<div> Declined </div>):(appointments.noshow?(<div> No Show </div>):(appointments.confirmed?(<div>Confirmed</div>):(<div> Not Confirmed</div>)))} </div>
      

      <div className='detailsappuid'> ID: {appointments.appuid} </div>
      
      </div>

      


      <div className='Marked'>{appointments.hasmissedappoint?(<div className='Marked'> ! </div>):("")} </div>
    </div>

    
    

  )})}

    

     
    </div>

    <h1> Instructions</h1>

    <p>Confirm = Accept the appointment</p>
    <p>Decline = Rejects appointment and asks client to book a different date </p>
    <p>No-Show = Marks client as No-Show and asks them to book a different date</p>
    <p>Completed = Removes appointment and removed marked client</p>
    <p>The Red exclamation point means that this user has missed a previous booking</p>
    
    </div>
  )
}

export default AppointmentHandler
