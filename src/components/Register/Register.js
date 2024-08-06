import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "./Register.css"

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const[phoneNumber, setphoneNumber] = useState("")
  const[cpassword, setcPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault();
    if(cpassword != password){
      toast.error("password doesnt match", {
        position: "top-center",
      });


    }
    else{
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: email,
          firstName: fname,
          lastName: lname,
          phoneNumber: phoneNumber,
          userid: user.uid,
          appointmentmade : false,
        appointmentid: "nothing"
        });
      
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error("User Already Exists", {
        position: "bottom-center",
      });
    }}
try{
  await signInWithEmailAndPassword(auth, email, password);
  console.log("User logged in Successfully");
  window.location.href = "/";
  toast.success("User logged in Successfully", {
    position: "top-center",
  });
} catch (error) {
  console.log(error.message);
}
  };

  return (
    
    <form onSubmit={handleRegister} className="loginform">
      <h3>Sign Up</h3>

      <div className="mb-3">
        
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div className="mb-3">
       
        <input
          type="number"
          className="form-control"
          placeholder="Phone Number"
          onChange={(e) => setphoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      

      <div className="mb-3">
       
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
       
        <input
          type="password"
          className="form-control"
          placeholder="Retype password"
          onChange={(e) => setcPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btnsubmit">
          Sign Up
        </button>
      </div>
    
    </form>
  );
}

export default Register



