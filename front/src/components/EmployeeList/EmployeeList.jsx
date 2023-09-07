import React from 'react'
import "./employeeL.css"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
function EmployeeList({handleClickOpen,id,image,name,Email,Mobile_No,Desig,gender,course,create_date,Action,Design}) {
  return (
<div className="listBody">
    <div className="boxes1">{id}</div>
    <div className="boxes">{image}</div>
    <div className="boxes">{name}</div>
    <div className="boxes">{Email}</div>
    <div className="boxes">{Mobile_No}</div>
    <div className="boxes">{Design}</div>
    <div className="boxes">{course}</div>
    <div className="boxes">{gender}</div>
    <div className="boxes">

    </div>
    <Stack direction="row" spacing={2}>
      <Button variant='contained' size='small' onClick={()=>{handleClickOpen("hhuu")}}>update</Button>
      <Button variant='contained' color='error' size='small'>delete</Button>

      
    </Stack>

   </div>
  )
}

export default EmployeeList