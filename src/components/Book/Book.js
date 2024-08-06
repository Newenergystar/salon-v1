import React, { useEffect } from 'react'
import { format, } from 'date-fns'
import { DayPicker, } from "react-day-picker";
import {db, storage, auth} from "../firebase";
import { setDoc, documentId, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import "react-day-picker/style.css";
import { ToastContainer, toast } from "react-toastify"
import { useState } from 'react';
import {collection, getDocs} from "firebase/firestore"
import "./Book.css"


const Booking = () => {
  const [selected, setSelected] = useState();
  const tommorow  = new Date()
  tommorow.setDate(tommorow.getDate() + 2)
  const [services, setServices] = useState([]);
  const [userdetails, setUserDetails] = useState('')
  const [appointmentx, setAppointmentx] = useState("")


  async function LoadServices(){
    const q =  await getDocs(collection(db, "Services"));
    const data = []
    q.forEach((doc) =>{ 
 data.push({ id: doc.id, ...doc.data()});
 });

    return data
  }

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
  
  
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
       setUserDetails(docSnap.data())
       console.log(docSnap.data())
      } else {
        console.log("User is not logged in");
      }

    const appointid = docSnap.data().appointmentid;

    
    console.log(appointid)
    
  
    const docRef2 = doc(db, "Appointment", appointid)
    
    const docSnap2 = await getDoc(docRef2);
    if (docSnap2.exists()){
      setAppointmentx(docSnap2.data())
      console.log(docSnap2.data());
    }
    else{ 
      console.log("no appointment found")
    }   
    
    });
  };
  const cancelappoint = async () =>{

    const users = userdetails.userid
    const appoint = appointmentx.appuid

    if (window.confirm("Are you sure?")){

      updateDoc(doc(db, "Users", users), {

        appointmentid: "nothing",
        appointmentmade: false,

      })

    deleteDoc(doc(db, "Appointment",appoint))
  
    }

    else{

      console.log(users)
    }

    fetchUserData();


  }

  const noshowcancelappoint = async () =>{

    const users = userdetails.userid
    const appoint = appointmentx.appuid

    if (window.confirm("Are you sure?")){

      updateDoc(doc(db, "Users", users), {

        appointmentid: "nothing",
        appointmentmade: false,
        hasmissedappoint: true

      })

    deleteDoc(doc(db, "Appointment",appoint))
  
    }

    else{

      console.log(users)
    }

    fetchUserData();


  }
  

const BookAppointment = async (e) => {

      e.preventDefault(); 
try{
      var date = format(new Date(selected), "dd/MM/yyyy")
}catch{
  alert("pick a date")
  return
}
      var e = document.getElementById("timeslot");
      try{
      var ele = document.querySelector("input[type='radio'][name=servicechoosen]:checked").value;
      } catch{

        alert("pick a service")
        return 
        
      }
      const user = userdetails.userid
      const email = userdetails.email
      
      var str_array = ele.split(',');
      

      
for(var i = 0; i < str_array.length; i++) {
   // Trim the excess whitespace.
   str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
   // Add additional code here, such as:
}
const service = str_array[0]
const serviceid = str_array[2]
     


      console.log(user)
      console.log(serviceid)
      console.log(date)
      console.log (e.value)
      const appuid = crypto.randomUUID()


      setDoc(doc(db, "Appointment", appuid), {
        service: service,
        price: str_array[1],
        useruid: user,
        date: date,
        time: e.value,
        appuid: appuid,
        confirmed: false,
        client: userdetails.firstName
      });

      if(userdetails.hasmissedappoint){

        updateDoc(doc(db, "Appointment", appuid), {

          hasmissedappoint: true
        })
      }

      updateDoc(doc(db, "Users", user),{
        appointmentmade : true,
        appointmentid: appuid
      });


      if (window.confirm("Appoitment Booked")){

        fetchUserData();

        const data = await LoadServices();
        setServices(data)
        
    
      }
  
      else{
  
        fetchUserData();
        const data = await LoadServices();
        setServices(data)
      }

      console.log(userdetails.appointmentmade)
      fetchUserData();

      


    

  } 
  const RemoveService = async (e) => {

    if(window.confirm("Are you sure you want to delete this product")){

    const id = e.target.value
    
    deleteDoc(doc(db, "Services", id))

    
    async function fetchData() {
      const data = await LoadServices();
      setServices(data)
            }
            fetchData();
  }
}

    useEffect(() => { 

async function fetchData() {
const data = await LoadServices();
setServices(data)
      }
      const unsub = auth.onAuthStateChanged((authObj) => {
        unsub();
        if (authObj) {
      
          fetchUserData();
          
        }else {
  
        }
        fetchData();
  
      })
    },[]);
  return (
    <div>

      {userdetails.appointmentmade?  (
        
 // The Appointment Details after booking.       
<div className='containerapp1'>
  {appointmentx.cancel?(<h1>Your appointment has been Canceled</h1>):(<h1>Your appointment has been booked</h1>)}
  <div className='appdetails'>

<div> Service: {appointmentx.service}</div>
<div> Date: {appointmentx.date}</div>
<div> Time: {appointmentx.time} </div>
</div>
<br/>
<br/>





{appointmentx.noshow?(""):(appointmentx.cancel?(<button className='cancelbtn2' onClick={cancelappoint}> Book New Appointment </button>):(appointmentx.confirmed?(""):(<button className='cancelbtn' onClick={cancelappoint}> Cancel Appointment </button>)))}
<br/><br/>
<br/>
<div className='detailsbook'>
Once confirmed you can no longer cancel the appointment unless you contact us directly.
<br/>
You can do this by phoning: xxxxxxx
</div>
<br/>
{appointmentx.cancel?(<div className='containerapp2'><h1>Status:</h1> <h1 className='notconfirmed'>Canceled</h1><p>Sorry for the inconvience but this appointment was canceled, please book for a different day</p></div>):(appointmentx.noshow?(<div className='containerapp2'><h1>Status:</h1> <h2 className='notconfirmed'>You did not come to your appointment. Your account is now marked.</h2> <button className='cancelbtn' onClick={noshowcancelappoint}> Book Another Appointment </button></div>):
(appointmentx.confirmed?(<div><h1>Status:</h1> <h1 className='confirmed'>Confirmed</h1></div>):
(<div className='containerapp2'><h1>Status:</h1> <h1 className='notconfirmed'>Not Confirmed</h1></div>)))}
<br/>
<br/>
<div>ID: {userdetails.appointmentid}</div>
</div>


):(
  
  //The form to book appointment
  
  <div className='formappointment'>
<form onSubmit={BookAppointment}>

<div className='formappointment1'>
<DayPicker
required
    mode='single'
    selected={selected}
    onSelect={setSelected}
      disabled = {
            [{before: tommorow}, { dayOfWeek: [0, 6] }]
        }
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a timeslot"
      }
    />
    <div className='customselect'>
<select  className='select1' id='timeslot' required>
    <option value={null}></option>
    <option value="10:00">10:00</option>
    <option value="11:30">11:30</option>
    <option value="13:00">13:00</option>
    <option value="14:30">14:30</option>
    <option value="16:00">16:00</option>
    <option value="17:30">17:30</option>
    
  </select>
  </div>
  <button className='bookappoint'>Book Appointment</button>
  <div className='servicecontainer'>
  {services.map((services)=>{
        return(
          
            <div className='servicebook' key={services.id}> 
            <input type='radio' name='servicechoosen' value={[services.service, services.price,services.id]}>
            </input>
            <div className='servicedetails'>


<div> {services.service} </div>

<div> £{services.price} </div>  
<br/>
<div className='servicedescription'> {services.description} </div> 
</div>
<div className='imgcontainer'> <img  className= "serviceimg"src={services.Img}></img></div>     
{userdetails.Admin?(<button className="removeservicebtn" onClick={(e) => RemoveService(e)} value={services.id}>Remove service</button>):("")}
     
    </div>
       )})}
       </div>


</div>
</form>



</div>)}

    </div>
    




  )
}

export default Booking
