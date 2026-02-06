import { React, useEffect } from 'react'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const App = () => {
    
  
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
    <ToastContainer 
      position="bottom-center"
      autoClose={1000}
      hideProgressBar={true}
      theme="dark"
    />
  </BrowserRouter>
}

export default App