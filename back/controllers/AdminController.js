import mongoose from "mongoose";

import { Admin } from "../modals/Admin.js"


export const AdminLogin=async (req,res)=>{
    try{

        const {username,password}=req.body;

        console.log(req.body)
        

        if(!username || !password){
            return res.status(401).json({error:"fields cant be empty"})
        }

        const admin=await Admin.findOne({name:username});

        if(!admin){

           return res.status(200).json({error:"no such user found ,please register first"})
        }

        if(admin.password == password){
            return res.status(200).json({success:"successfully logged in",username})
        }




    }
    catch(err){

        console.log("something went wrong")
    }
}


export const AdminRegister= async (req,res)=>{

    try{
        const {username,password}=req.body;

        if(!username || !password){


            console.log("here error")
            return res.status(401).json({error:"fields cant be empty"})
        }

        const admin=await Admin.findOne({name:username});

        console.log(admin,"ppppppppppppppppppppppp")


        if(admin){

            console.log("under herreeeeeeeeeeeeeeee")
            return res.status(200).json({error:"user already exist ,please login"})
        }

     
        const newUser=await Admin.create({
            name:username,
            password
        })

        


        await newUser.save()


        return res.status(200).json({success:"successfully registered"})

        // newUser.save()
        // .then((data)=>{
        //     console.log("üser Saved")
            
        // })


        






    }
    catch(err){

        console.log(err,"errrrrrrrrrrrrrrrr")
        console.log(err)
    }
}