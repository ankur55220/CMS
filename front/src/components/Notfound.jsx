import React from 'react'
import { NavLink } from 'react-router-dom'
function Notfound() {


    const style={
        height:"100vh",
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }

    const style2={
        height:"40%",

        width:"30%"
    }
  return (
    <div style={style}>
        <div style={style2}>
          
          <h1>no such page exist go back to <NavLink to="/" style={({ isActive }) => ({ 
                              color: isActive ? 'blue' : 'purple' })}>
                              Home
                          </NavLink></h1>
        </div>
        
    </div>
  )
}

export default Notfound