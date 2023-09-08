import React,{useState} from 'react'
import CustomInput from '../Input/CustomInput'
import {useForm} from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { NavLink } from 'react-router-dom'
import { url } from '../../url'
import { useNavigate } from 'react-router-dom'
import "./wrapper.css"
import { CircularProgress } from '@mui/material'
import axios from 'axios'
function Wrapper({type}) {

  const{register,formState: { errors },handleSubmit}=useForm()


  const navigate=useNavigate()
  const [msg,setMsg]=useState()
  const [err,setErr]=useState()
  const [loading,setloading]=useState("")



  const onSubmit=(data)=>{
    
    const {username,password}=data
    
    if(type=="signup"){
      signup(username,password);
    }else{

      login(username,password);

    }
   
  
  
  }


  const login=(username,pass)=>{
    const address= `${url}/login`

    setloading("loading")

    axios.post(address,{
      username,
      password:pass
    })

    .then((res)=>{


      console.log(res.data)
       
      if(res.data.error){
       setErr(res.data.error)
       setMsg("")
 
       return "error"
      }else{
       setMsg(res.data.success)
       setErr("")

       window.localStorage.setItem("login",res.data.username)
 
       return "success"
      }
      


    })
    .then((res2)=>{


      setloading("")

      setTimeout(()=>{

        if(res2=="success"){
          navigate("/dashboard")

        }
      },500)


    }).catch((err)=>{
      setErr(err)
      setMsg("")

    })


     
                    

  }


  const signup=(username,pass)=>{

    const address= `${url}/signup`

    setloading("loading")
    axios.post(address,{
      username,
      password:pass
    })
    .then((res)=>{


      console.log(res.data)
       
     if(res.data.error){
      setErr(res.data.error)
      setMsg("")

      return "error"
     }else{
      setMsg(res.data.success)
      setErr("")

      return "success"
     }
     

    })
    .then((res2)=>{

    

      setloading("")

      setTimeout(()=>{

        if(res2=="success"){
          navigate("/")

        }
      },10000)
     
      
      


    })
    .catch((err)=>{
      setErr(err)
      setMsg("")

    })

  }

  const exp={required:"username is required",
           
          }

  const passError={
    required:"password is required",
    minLength:{
      value:8,
      message:"password should be atleast 8 character long"
    }
  }

  if(window.localStorage.getItem("login")){

    return <div className="test" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>


      <div className="anouncement">
        <h2>you are already loged in ,go to <NavLink to="/dashboard" style={({ isActive }) => ({ 
                              color: isActive ? 'blue' : 'purple' })}>
                              Dashboard
                          </NavLink></h2>
      </div>



    </div>

  }else{


    return (

      <div className='test'>

        <div className="wrapper">

          <h1 style={{textAlign:"center"}}>CMS</h1>
       
        <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom:"1rem"}}>
        <CustomInput register={register} name="username" placeholder={"USERNAME"} err={exp}/>
        <div><ErrorMessage errors={errors} name="username" /></div>
        
        <CustomInput register={register} name="password" placeholder={"PASSWORD"} err={passError}/>
        <div><ErrorMessage errors={errors} name="password" /></div>
        <button type='submit' className='generalButton'>{type=="signup"?"SignUp":"LOGIN"}</button>
        </form>
         
         {
          type=="signup"?<div>
  
            already a member?&nbsp;&nbsp;&nbsp;  <NavLink to="/" style={({ isActive }) => ({ 
                              color: isActive ? 'blue' : 'purple' })}>
                              Login
                          </NavLink>
    
  
          </div>:<div>
  
            are you not a member yet?&nbsp;&nbsp;&nbsp;<NavLink to="/signup" style={({ isActive }) => ({ 
                              color: isActive ? 'blue' : 'purple' })}>
                              Signup
                          </NavLink>
          </div>
         }
         {
          <div className="msg" style={{color:msg?"green":"red"}}>
            {
              loading=="loading"?<CircularProgress/>:
  
              msg?msg:err?err:null
  
              
            }
  
          </div>
         }
  
  </div>
      </div>
    )


  }


}

export default Wrapper