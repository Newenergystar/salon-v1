
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// Pages import
import {Home, Contact} from "./pages/"
// Components import
import {Header,Footer} from "./components"

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Header/> 
    <Routes>
      <Route path= "/" element= {<Home/>}/>
      <Route path= "/contact" element= {<Contact/>}/> 
    </Routes>
    <Footer/>  
    </BrowserRouter>
    </>
  );
}

export default App;
