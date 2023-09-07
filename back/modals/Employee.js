
import mongoose from "mongoose"



const employeeSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    MobileNo:{
        type:String,
        required:true
    },
    Designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    img:{
        type:String,

    },
    Action:{
        type:String,

    },

}



,{timestamps:true})


export const Employee= mongoose.model("Employee",employeeSchema)