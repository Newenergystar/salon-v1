import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {

  const [userDetails, setUserDetails] = useState(null);
  const [uid, setuid] = useState(null)


  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (a) => {
      console.log(a);
     
const docRef = doc(db, "Users", a.uid);
const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        setuid(docSnap);
        console.log(docSnap.data());
        console.log(docSnap);
      } else {
        console.log("User is not logged in");
      }
    
    });
    
  };


  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        //logged in
        fetchUserData();
      } 
    });
  },[] );



  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div>
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={userDetails.photo}
              width={"40%"}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>   </p>
          
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout 
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Profile;