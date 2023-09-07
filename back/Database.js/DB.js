import mongoose from "mongoose";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}



export const Dbs= async()=>{

   
    try{
        const conn=await mongoose.connect(process.env.mongour,connectionParams);
        console.log(`mongoDb connected {conn.connection.host} `)
    }
    catch(error){
        console.log("something went wrong",error)
       
    }
}