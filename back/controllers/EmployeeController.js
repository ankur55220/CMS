
import mongoose from "mongoose";

import { Employee } from "../modals/Employee.js";



export const AddEmployee = async (req,res)=>{

    
    const {name,Email,MobileNo,Designation,gender,course,img}=req.body

    let selectedCourse

    const coursesSent=Object.keys(course)

    if(course[`${coursesSent[0]}`]){
        selectedCourse=coursesSent[0]


    }else if(course[`${coursesSent[1]}`]){
     selectedCourse=coursesSent[1]

    }else{
        selectedCourse=coursesSent[2]

    }


    if(!name,!Email,!MobileNo,!Designation,!gender,!course){

        return res.status(401).json({error:"feilds cant be empty"})
    }

    const Emp=await Employee.findOne({name})

    if(Emp){
        return res.status(401).json({error:"employee already present"})
    }

    const newEmp=await Employee.create({
        ...req.body,
        course:selectedCourse
    })

    newEmp.save()
    .then(()=>{
        console.log("done")
    })

   return res.status(200).json({success:"new Employee saved"})
}

export const DeleteEmployee= async (req,res)=>{

    const {id}=req.body

    const found= await Employee.findById(id)

    if(!found){

        return res.status(404).json({errror:"no such employee exists"})
    }

    const delEmployee=await Employee.findByIdAndDelete(id);

    return res.status(200).json({success:"successfully deleted"})

}

export const updateEmployee= async (req,res)=>{
       try{


        const {name,Email,MobileNo,Designation,gender,course,img,id}=req.body

        let selectedCourse

    const coursesSent=Object.keys(course)

    if(course[`${coursesSent[0]}`]){
        selectedCourse=coursesSent[0]


    }else if(course[`${coursesSent[1]}`]){
     selectedCourse=coursesSent[1]

    }else{
        selectedCourse=coursesSent[2]

    }

        // const emplExists = await Employee.findOne({name})
    
        // if(!emplExists){
        //     return res.status(401).json({error:"no such employee exists"})
        // }
    
        console.log(req.body)
        const updatedEmployee= await Employee.findByIdAndUpdate
        (id,
        {$set:
        {name:name,Email:Email,MobileNo:MobileNo,Designation:Designation,
        gender:gender,course:selectedCourse,img:img}})
        return res.status(200).json({success:"successfully updated"})

       }catch(err){

        console.log(err)
        return res.status(401).json({error:"something went wrong"})

       }

    
        
   
       

   




}

export const getAllEmployee=async (req,res)=>{

    
    const allEmp=await Employee.find()
    
    return res.status(200).json({success:allEmp})
}

export const searchEmployee=async(req,res)=>{

    const {searchTerm}=req.body

    const SearchedEmployees=await Employee.find({name:searchTerm}) 
    
    return res.status(200).json({success:SearchedEmployees})

}



export const Pagination= async(req,res)=>{

    const AllEmployees=await Employee.find({});

    const page=req.query.page

    const limit=req.query.limit

    const totalPages=AllEmployees.length/limit

    const startingIndex=(page-1)*limit

    const endingIndex=page * limit

    const result= AllEmployees.slice(startingIndex,endingIndex+1)

    return res.status(200).json({totalPages,result})

        

}


export const getSingle = async(req,res)=>{

    const {id}=req.body

    const emp= await Employee.findById(id)

    if(!emp){
        return res.status(401).json({error:"something went wrong"})
    }


    return res.status(200).json({success:emp})



}