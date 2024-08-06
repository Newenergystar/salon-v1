import React, { useState } from 'react'
import { storage, db } from '../firebase'
import { ToastContainer, toast } from "react-toastify";
import { setDoc, doc, documentId } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import "./AddService.css"

const AddService = () => {

    const [service, setService] = useState('');
    const [price, setPrice] = useState('');
    const [serviceImg, setServiceImg] = useState('');
    const [error, setError] = useState('');
    const [description, setDescription] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    async function checkimage() {
      var check = document.getElementById("output");
      console.log(check)
      

      
    }

   
    async function addimage(file){

    const storageRef = ref(storage, `service-images/${file.name}`)
      uploadBytes(storageRef, file).then(data =>{
        getDownloadURL(data.ref).then(val=>{ console.log(val)
          setServiceImg(val)
          console.log(serviceImg)
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
            setServiceImg(null);
            toast.error(" Please Choose a Valid Image");
        }
    }

    // add product
    const addService = async (e) => {
      e.preventDefault();  
      
    if (serviceImg != null ){

      setDoc(doc(db, "Services", crypto.randomUUID()), {
        service: service,
        price: price,
        description: description,
        Img: serviceImg
      });
      toast.success("Service Added")
      document.getElementById("addform").reset();
      var output = document.getElementById('output');
      output.src = ""

    }
    else{
      toast.error("Change Image File")
    }

  }

    return (
    <div className='containpositon'>
        <div className='containerproduct1'>
            <br />
            <h2>Add Service</h2>
            <hr />
            <form autoComplete="off" className='form-group' id= "addform"onSubmit={addService}>
                
                <input type="text" className='form-control1' id = "addform"  required placeholder='Service Name'
                    onChange={(e) => setService(e.target.value)}  />
                <br />
                
                <input type="number" className='form-control1' id = "addform" required placeholder='Service Price'
                    onChange={(e) => setPrice(e.target.value)}  />
                <br />
                <textarea type="text" className='form-control2' id= "addform" maxLength={50} required placeholder='Service Description'
                    onChange={(e) => setDescription(e.target.value)}  />
                <br />
                <input type="file" className='form-control1' id="file" placeholder="Upload Image" required
                    onChange={(e)=>productImgHandler(e)} />
                    <br/>

                    <img id= "output" className='imagepreview' ></img>
                <br />
                <button type="submit" className='btnaddproduct'>ADD</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
        </div>
        </div>
    )
}
export default AddService