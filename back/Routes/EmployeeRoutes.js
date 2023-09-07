import express from 'express'
import {getSingle,Pagination,searchEmployee,AddEmployee,DeleteEmployee,updateEmployee,getAllEmployee} from "../controllers/EmployeeController.js"


const router=express.Router();


router.route('/AddEmp').post(AddEmployee);
router.route('/DelEmpl').post(DeleteEmployee)
router.route('/updateEmp').post(updateEmployee)
router.route("/getAllEmployee").get(getAllEmployee)
router.route("/search").post(searchEmployee)
router.route("/Pagination").get(Pagination)
router.route("/getSingle").post(getSingle)


export default router