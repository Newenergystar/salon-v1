import React, { useState } from 'react'
import { storage, db } from '../firebase'
import { ToastContainer, toast } from "react-toastify";
import { setDoc, doc, documentId } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import "./AddProduct.css"

const AddProduct = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImg, setProductImg] = useState('');
    const [error, setError] = useState('');
    const [productdescription, setProductDescription] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    async function checkimage() {
      var check = document.getElementById("output");
      console.log(check)
      

      
    }

   
    async function addimage(file){

    const storageRef = ref(storage, `product-images/${file.name}`)
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

            var output = document.getElementById('output2');
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
    const addProduct = async (e) => {
      e.preventDefault();  
      
    if (productImg != null ){

      setDoc(doc(db, "Products", crypto.randomUUID()), {
        productname: productName,
        productprice: productPrice,
        productdescription: productdescription,
        productImg: productImg
      });
      toast.success("Product Added")
      document.getElementById("addform").reset();
      var output = document.getElementById('output2');
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
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete="off" className='form-group' id= "addform"onSubmit={addProduct}>
                
                <input type="text" className='form-control1' id = "addform"  required placeholder='Product Name'
                    onChange={(e) => setProductName(e.target.value)}  />
                <br />
                
                <input type="number" className='form-control1' id = "addform" required placeholder='Product Price'
                    onChange={(e) => setProductPrice(e.target.value)}  />
                <br />
                <textarea type="text" className='form-control2' id= "addform" maxLength={400} required placeholder='Product Description'
                    onChange={(e) => setProductDescription(e.target.value)}  />
                <br />
                <input type="file" className='form-control1' id="file" placeholder="Upload Image" required
                    onChange={(e)=>productImgHandler(e)} />
                    <br/>

                    <img id= "output2" className='imagepreview' ></img>
                <br />
                <button type="submit" className='btnaddproduct'>ADD</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
        </div>
        </div>
    )
}
export default AddProduct