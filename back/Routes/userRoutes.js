import express from 'express'
import {AdminLogin,AdminRegister} from "../controllers/AdminController.js"


const router=express.Router();


router.route('/login').post(AdminLogin);
router.route('/signup').post(AdminRegister)

export default router