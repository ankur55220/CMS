import React from 'react'



function CustomInput({register,name,placeholder,err,formType}) {

  

  const style={
    width:"80%",
    padding:"2%",
    bordeRadius:"10px",
    marginBottom:"1.5rem"
    
  }
  
  return (
    
    <input type={formType?formType:"text"} style={style} {...register(name,err)} placeholder={placeholder} 
    
   
    />
      
    
  )
}

export default CustomInput

