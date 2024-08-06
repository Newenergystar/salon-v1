
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// Pages import
import {Home, Contact,Products,Reviews,Book, Admin,NotFound,Appointment} from "./pages/"
// Components import
import {Footer,Navbar} from "./components"
import { ToastContainer } from 'react-toastify';



const App = () => {
 
  
  return (
    <>
    <BrowserRouter>
     <Navbar/>
    <Routes>
      <Route path= "/" element= {<Home/>}/>
      <Route path= "/contact" element= {<Contact/>}/>
      <Route path= "/products" element= {<Products/>}/>
      <Route path= "/reviews" element= {<Reviews/>}/>
      <Route path= "/book" element= {<Book/>}/>
      <Route path= "/admin" element= {<Admin/>}/>
      <Route path= "/appointments" element= {<Appointment/>}/>
      <Route path='*' element={<NotFound />}/>
      </Routes>
      <ToastContainer/>
    <Footer/>  
    </BrowserRouter>
    </>
  );
}

export default App;
