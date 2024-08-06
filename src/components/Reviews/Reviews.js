import React, { useEffect, useState } from 'react'
import { auth,storage, db } from '../firebase'
import { ToastContainer, toast } from "react-toastify";
import { setDoc, documentId, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import "./Reviews.css"
import {Link} from "react-router-dom";




const Reviews = () => {
    const [userdetails, setUserDetails] = useState('')
    const [username, setUserName] = useState('')
    const [productImg, setProductImg] = useState('');
    const [reviewtext, setReviewText] = useState('');
    const [productdescription, setProductDescription] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    async function checkimage() {
      var check = document.getElementById("output");
      console.log(check)
      
    }
let stars = document.querySelectorAll(".star");
const rating = document.getElementById("rating");

stars.forEach((star) => {
    star.addEventListener("click", () => {
        const value = parseInt(star.getAttribute("data-value"));
        rating.innerText = value;
        
        

        
        stars.forEach((s) => s.classList.remove("one", 
                                                "two", 
                                                "three", 
                                                 "four", 
                                                "five"));

      
        stars.forEach((s, index) => {
            if (index < value) {
                s.classList.add(getStarColorClass(value));
            }
        });

       
  
    });
});


function getStarColorClass(value) {
    switch (value) {
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        default:
            return "one";
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

   
    async function addimage(file){

    const storageRef = ref(storage, `review-images/${file.name}`)
      uploadBytes(storageRef, file).then(data =>{
        getDownloadURL(data.ref).then(val=>{ console.log(val)
          setProductImg(val)
          console.log(productImg)
        })
      });
    }

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            toast.success("Image is Valid");
            
            console.log(selectedFile)
            addimage(selectedFile);

            var output = document.getElementById('output');
            output.src = URL.createObjectURL(e.target.files[0]);
            output.onload = function() {
              URL.revokeObjectURL(output.src) // free memory
            }
            
        }
        else {
            setProductImg(null);
            toast.error(" Please Choose a Valid Image");
        }
    }

    // add product
    const addReview = async (e) => {
      e.preventDefault();  
      
    if (productImg != null ) {

       setDoc(doc(db, "Reviews", crypto.randomUUID()), {
        username: userdetails.firstName,
        review: reviewtext,
        productImg: productImg,
        rating : rating.innerText
      });
      toast.success("Review Added")
      document.getElementById("addform").reset();
      var output = document.getElementById('output');
      output.src = ""

    }
    else{
      toast.error("Change Image File")
    }
  
  }

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

    return (
      <div className="containpositon">
        <div className="containerreview">
          <br />
         
          <form
            autoComplete="off"
            className="form-group1"
            id="addform"
            onSubmit={addReview}
            
          >

            <div className='formgroup2'>
            <textarea
              type="text"
              className="form-control5"
              id="addform"
              required
              placeholder="Review"
              maxLength={200}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <br />
<div className='columreview'>
            <div class="rating">
              <span id="rating">5</span>/5
            </div>
            <div class="stars" id="stars">
              <span class="star" data-value="1" >
                ★
              </span>
              <span class="star" data-value="2" >
                ★
              </span>
              <span class="star" data-value="3" >
                ★
              </span>
              <span class="star" data-value="4" >
                ★
              </span>
              <span class="star" data-value="5" >
                ★
              </span>
            </div>
            <button type="submit" className="btnaddreview">
              Leave Review
            </button>
</div>
<div>
            <input
              type="file"
              className="form-control9"
              id="file"
              placeholder="Upload Image"
              onChange={(e) => productImgHandler(e)}
            />
            <br />

            <img id="output" className="imagepreview"></img>
            <br />
           

            </div>
            <script>
              
            </script>
            </div>
          </form>
        </div>
      </div>
    );
    
}

export default Reviews