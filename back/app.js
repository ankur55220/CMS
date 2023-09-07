import express from 'express'
import { fileURLToPath } from 'url';

import dotenv from 'dotenv'
import { Dbs } from './Database.js/DB.js'
import cors from 'cors'
import path from 'path'
import AdminRoute from './Routes/userRoutes.js'
import EmployeeRoute from './Routes/EmployeeRoutes.js'
const app=express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


dotenv.config({path:".env"})
app.get("/",(req,res)=>{
    res.send({greet:"hello"})
})
app.use(AdminRoute)
app.use(EmployeeRoute)

export default app