import React,{useState} from 'react'

function UseInput(InitialValue) {

    const [value,setValue]=useState(InitialValue)

    function handleChange(e){

        setValue(e.target.value)

    }

    return{
        value,
        onChange:handleChange
    }

 
}

