import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login/Login'
import Signup from './pages/Register/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import './App.css'
import Wrapper from './components/Wrapper/Wrapper'
import Notfound from './components/Notfound'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {


  return (
    <>


      <Routes>

      <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Notfound />} />
        
         
        
      </Routes>
    



  
      
    </>
  )
}

export default App
