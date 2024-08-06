import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { auth, db } from "../firebase";
import {Link} from "react-router-dom";
import { getDoc,setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./Navbar.css";
import {Register, Login} from "../index"
Modal.setAppElement('body');


async function checkadmin() {
  try {
    console.log (auth.currentUser.getIdTokenResult)
  } catch (error) {
    console.error(error.message);
  }
}
 

const Navbar = () => {
const [isMobile, setIsMobile] = useState(false)
const [signbox,boxopen] = useState(false)
const [userDetails, setUserDetails] = useState(null);

 

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

    
  });
},[] );

async function handleLogout() {
  try {
    await auth.signOut();
    window.location.href = "/";
    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
}



return(
<nav className='navbar'>
    
    <Link to="/">
    <div className='logo'>
    <h3 className='logotext' > Jallz Hair & Beauty</h3>
    <img src='logo192.png' className='logoimage'></img>
    </div>
    </Link>
    <ul className= {isMobile?"nav-links-mobile " :'nav-links'}
    onClick={() => setIsMobile(false)}>
      {userDetails? (userDetails.Admin? (<><Link to="/admin" className='admin'> <li>Admin</li></Link><Link to="/appointments" className='admin'> <li>Appointments</li></Link></>
    ):(<></>)):(<></>)}
        <Link to="/products" className='products'> <li>Products</li></Link>
        <Link to="/reviews" className='reviews'> <li>Reviews</li></Link>
        <Link to="/book" className='book'> <li>Book</li></Link>
        {userDetails? ( <button className="logout" onClick={handleLogout}>
            Logout
          </button>):(<Link onClick={() => boxopen(true)} className='signup'> <li>Sign Up/ Login</li></Link>)}
          
        

    </ul>
    
    

    <button className='mobile-menu-icon' onClick={() => setIsMobile(!isMobile)}>
        {isMobile ?<i className='fas fa-times fa-2x'></i> : <i className='fas fa-bars fa-2x'></i>}

    </button>

    {userDetails ? (""):

    (


    <Modal isOpen={signbox} className= "modal" style={{
        overlay:{
         
            
        },
        content:{
          marginTop: "10px",
          marginLeft:"30%",
          background:"rgb(220, 227, 220)",
          display:"flex",
          flexDirection: "column",
          borderRadius:"40px",
            justifyContent: "end",
            width: "20%",
            minWidth: "300px",
            padding:"20px",
            
           
           
            
        }
    }}>
      
        <div className='closebutton'>
        <button className='modelclose' onClick={() => boxopen(false)}><i className='fas fa-times fa-2x'></i>
        </button>
        </div>

        <Register/>
        <div className='ahaa'> Already a user? </div>

        <Login/>
    </Modal>
  )}
    

</nav>


)

}

export default Navbar