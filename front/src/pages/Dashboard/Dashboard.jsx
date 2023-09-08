import React, { usState, useState,useEffect,useMemo } from "react";
import { url } from "../../url";
import { useTable,useSortBy,useGlobalFilter,usePagination } from "react-table";
import { ErrorMessage } from "@hookform/error-message"
import "./Dashboard.css";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/Input/CustomInput";
import { useNavigate } from "react-router-dom";
//mui dialog box

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import axios from "axios";
import Stack from '@mui/material/Stack';

import CircularProgress from '@mui/material/CircularProgress';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Table } from "@mui/material";

function Dashboard() {

  const navigate=useNavigate()
    const [data,setData]=useState([
        
    ])

    const [activeId,setActiveId]=useState()
    const [msg,setMsg]=useState()
    const [err,setErr]=useState()
    const [select, setSelect] = useState({
        MCA: false,
        BCA: false,
        MSC: false,
      });

    const [update,setUpdate]=useState([])
    const [radio, setRadio] = useState("female");
    const [isUpdate,setIsupdate]=useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
      } = useForm();


 useEffect(()=>{

    getAllEmp()


 },[])


//  columns for the table


const columns=[
   
    {
        Header:'unique id',
        accessor:"_id"
    },
    {
        Header:'Image',
        accessor:"img"
    },
    {
        Header:'Name',
        accessor:"name"
    },
    {
        Header:'Email',
        accessor:"Email"
    },
    {
        Header:'Mobile_no',
        accessor:"MobileNo"
    },
    {
        Header:'Designation',
        accessor:'Designation'
    },
    {
        Header:'Gender',
        accessor:"gender"
    },
    {
        Header:'Course',
        accessor:"course"
    },
    {
        Header:"Action",
        accessor:"Action",
        Cell: ({ cell }) => (
          <>
            <button className="generalButton" value={cell.row.values.name} onClick={()=>{updateEmp(cell.row.values._id)}}>
              update
            </button>
             <button className="generalButton var" value={cell.row.values.name} onClick={()=>{deleteEmp(cell.row.values._id)}}>
              delete
           </button>
           </>
          )
    }
]

const [open, setOpen] = React.useState(false);
const [loading,setloading]= useState("")


function deleteEmp(emp_id){

const address=`${url}/DelEmpl`;

setloading("loading")
axios.post(address,{
  id:emp_id
})
.then((res)=>{

  if(!res.data.error){
     
    getAllEmp()
    setloading("")

  }else{

    setErr(res.data.error)
    setloading("")

  }

})
.catch((err)=>{
  console.log(err)
})

}

function updateEmp(emp_id){

    setOpen(!open)
    setIsupdate(true)
    setloading("loading")
    setActiveId(emp_id)


    const address=`${url}/getSingle`;

    axios.post(address,{
        id:emp_id
    })
    .then((res)=>{
        console.log(res.data)

        if(!res.data.error){

          setSelect((old)=>{
            return {
                ...old,
                [res.data.success.course]:true

            }
        })

        setCheck(res.data.success.Designation)
        setValue("name",res.data.success.name)
        setValue("email",res.data.success.Email)
        setValue("mobile_no",res.data.success.MobileNo)

        setloading("")

        }else{
          setErr(res.data.error)

          setloading("")
        }

       
    })
    .catch((err)=>{
        console.log(err)
    })



}

const col=useMemo(()=>columns,[])
const dat=useMemo(()=>data,[JSON.stringify(data)])

//columns for the table

//useTable


const tableInstance=useTable(
    {
        columns:col,
        data:dat,
    },
    

    useGlobalFilter,
    
    useSortBy,
    usePagination,
)


const {getTableProps,getTableBodyProps,headerGroups,page,prepareRow,state,setGlobalFilter,nextPage,previousPage}=tableInstance



//useTable




 
  const [check, setCheck] = useState("HR");
  
  
  
  const [totalpage,setTotalPage]=useState(0)
  const [limit,setLimit]=useState(5)
 

 

  function pageBackward(){

    if(page>1){
        setPage((old)=>old-1)
    }else{

        return
    }

  }


  function pageForward(){
    if(page<totalpage){
        setPage((old)=>old+1)
    }else{
        return
    }

  }


  function getAllEmp(){

    
    // const urlAdd=`${url}/Pagination?page=${page}&limit=${limit}`;

    const urlAdd=`${url}/getAllEmployee`
    setloading("loading")
     axios.get(urlAdd)
     .then((res)=>{
         
         

         console.log(res.data)
 
         setData(res.data.success)
         return "done"
        //  setTotalPage(Math.ceil(res.data.totalpage))
     })
     .then((res2)=>{

        setloading("")

     })
     .catch((err)=>{
         setloading("")
         setData([])
 
     })

  }

  const handleChange = (event) => {
    setSelect({
      ...select,
      [event.target.name]: event.target.checked,
    });
  };

 

  const onSubmit = (data) => {

    const {name,email,mobile_no}=data
    const course=select
    const gender=radio
    const desig=check

    const address=`${url}/AddEmp`;

    const data2={
        name,
        Email:email,
        MobileNo:mobile_no,
        Designation:check,
        gender:radio,
        course:select,
        img:""





    }


    console.log(data2,address)
    setloading("loading")

    axios.post(address,data2)
    .then((res)=>{

        console.log(res.data)
        setloading("")
        if(res.data.error){
           
            setErr(res.data.error)
        }else{
          getAllEmp()

            setMsg("successfully added")
        }
       

        // setTimeout(()=>{
        //   setMsg("")
        // },1000)

    })
    .catch((err)=>{

        setErr("something went wrong")
        setloading("")
        // setTimeout(()=>{
        //   setMsg("")
        // },1000)


    })



  };

  const onSubmitUpdate=(data)=>{
    const {name,email,mobile_no}=data

    const address=`${url}/updateEmp`;

    const data2={
        name,
        Email:email,
        MobileNo:mobile_no,
        Designation:check,
        gender:radio,
        course:select,
        img:"",
        id:activeId





    }

    axios.post(address,data2)
    .then((res)=>{

        setloading("")
        if(res.data.error){
           
            setErr(res.data.error)
        }else{
          getAllEmp()

            setMsg("successfully updated")
        }
       

        // setTimeout(()=>{
        //   setMsg("")
        // },1000)

    })
    .catch((err)=>{

        setErr("something went wrong")
        setloading("")
        // setTimeout(()=>{
        //   setMsg("")
        // },1000)


    })
    console.log(name,email,mobile_no,check,radio,select,"onSubmitUpdate")
  }

  const {globalFilter}=state

  const handleClickOpen = (pp) => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("triggred when closed")
    setMsg("")
    setErr("")
    setIsupdate(false)
    // getAllEmp()
    setOpen(false);
  };


  //error handlers for forms

  const exp={required:"username is required",
           
}


const EmailErr={
  required:"Email is required",
  pattern:{
    value:/[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g,
    message:"Enter a valid Email"
  }
}

const phoneErr={
  required:"Phone number is required",
  pattern:{
    value:/^[0-9\b]+$/,
    message:"Phone number should only be numbers"
  },
  minLength:{
    value:10,
    message:"phone number cannot be less than 10 digit"
  },
  maxLength:{
    value:10,
    message:"phone number cannot exceed 10 digits"
  }
}

const fileError={
  required:{
    value:false
  },
  validate: {
    lessThan10MB: (files) => files[0]?.size < 10000000 || files[0]?"Max 10MB":null,
    acceptedFormats: (files) =>
      ["image/jpeg", "image/png", "image/gif"].includes(files[0]?.type) ||
      files[0]?"Only PNG, JPEG e GIF":null,
  }
}


  //error handlers for forms

  function logout(){
    window.localStorage.removeItem("login")

    navigate("/")
  }


  function AddEmployee(){
    setSelect((old)=>{
      return {
          ...old,
          [old.MCA]:false,
          [old.BCA]:false,
          [old.MSC]:false

      }
  })

  setCheck("sales")
  setValue("name","")
  setValue("email","")
  setValue("mobile_no","")
  setOpen(true)
  }
  
  if(window.localStorage.getItem("login")){

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div className="adminInfo" style={{display:"flex",alignItems:"center"}}>{window.localStorage.getItem("login")}&nbsp;&nbsp;&nbsp;<Button color="primary" onClick={logout}>LOGUT</Button></div>
      <div className="addAndSearch">
      <Stack direction="row" spacing={2}>
         <Button sx={{cursor:"pointer"}} size="small" variant="contained" color="primary" onClick={AddEmployee}>Add Employee</Button>

         <div className="inputDiv">
            <input value={globalFilter || ""} onChange={(e)=>{setGlobalFilter(e.target.value)}} type="text" placeholder="Search" />
         </div>
</Stack>



      </div>

{/* <div className="overhead">
    <div className="over1">Unique Id</div>
    <div className="over">Image</div>
    <div className="over">Name</div>
    <div className="over">Email</div>
    <div className="over">Mobile No</div>
    <div className="over">Designation</div>
    <div className="over">gender</div>
    <div className="over">Course</div>
    <div className="over">Action</div>

</div> */}
      {
        // loading=="loading"?<CircularProgress/>:data.length==0?<h1>no data to show</h1>:

        
        //     data.map((item)=>{
        //         return <EmployeeList
        //         handleClickOpen={handleClickOpen}
        //         id={item._id}
        //         image={item.img}
        //         Action={"Action"}
        //         course={item.course}
        //         name={item.name}
        //         Email={item.Email}
        //         Mobile_No={item.MobileNo}
        //         Design={item.Designation}
        //         gender={item.gender}
        //       />
        //     })
        
        
      }
       
     {
        loading=="loading"?<CircularProgress/>:
        <Table {...getTableProps()}>

        <thead>
            {
                headerGroups.map((headerGroup)=>(

                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map((column)=>(
                               <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                
                                {column.render("Header")}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc?<ArrowDropUpIcon/>:<ArrowDropDownIcon/>):""}
                                </span>
                                
                                </th>
                            ))
                        }
                

            </tr>


                ))
            }
            

        </thead>

        <tbody {...getTableBodyProps()}>
            {
                page.map((row)=>{
                    prepareRow(row)


                    return (
                        <tr {...row.getRowProps()}>

                            {
                                row.cells.map((cell)=>(
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))
                            }
                       
        
                    </tr>

                    )
                 })
            }
           

        </tbody>
      </Table>
     }
     
<div className="pagination">
<Stack direction="row" spacing={2}>
     <ArrowLeftIcon sx={{cursor:"pointer"}} onClick={()=>{previousPage()}}/>

        
      <ArrowRightIcon sx={{cursor:"pointer"}} onClick={()=>{nextPage()}}/>
</Stack>
</div>
      

      <div>



        
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">
            {"Add new employee"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form onSubmit={handleSubmit(isUpdate?onSubmitUpdate:onSubmit)}>
                <CustomInput
                  register={register}
                  name="name"
                  placeholder={"NAME"}
                  err={exp}
                />
                <div><ErrorMessage errors={errors} name="name" /></div>
                <CustomInput
                  register={register}
                  name="email"
                  placeholder={"EMAIL"}
                
                  err={EmailErr}
                />

              <div><ErrorMessage errors={errors} name="email" /></div>
                <CustomInput
                  register={register}
                  name="mobile_no"
                  placeholder={"MOBILE"}
                  err={phoneErr}
                />
              <div><ErrorMessage errors={errors} name="mobile_no" /></div>
                <div className="checkBox" style={{ marginBottom: "1rem" }}>
                  <label htmlFor="labelC">Designation</label>
                  <select
                    id="labelC"
                    value={check}
                    onChange={(e) => {

                        console.log(e)
                        setCheck(e.target.value);
                    }}
                  >
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>

                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    
                    name="radio-buttons-group"
                    onChange={(e) => {
                      setRadio(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      checked={radio=="female"?true:false}
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      checked={radio=="male"?true:false}
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                    checked={radio=="other"?true:false}
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>

                <div className="courses" style={{ marginTop: "0.5rem" }}>
                  <h3>Courses</h3>
                </div>
                <FormGroup>
                  <FormControlLabel

                  control={
                    <Checkbox
                    
                    checked={select.MCA}
                    onChange={handleChange}
                    name="MCA"
                    
                    
                    />

                  }
                  label="MCA"
                    
                  />

                 
                  <FormControlLabel

                  control={
                    <Checkbox

                    checked={select.BCA}
                    onChange={handleChange}
                    name="BCA"
                    label="BCA"

                    
                    
                    />
                  }
                  label="BCA"
                    
                  />
                  <FormControlLabel

                  control={
                    <Checkbox
                    
                    checked={select.MSC}
                    onChange={handleChange}
                    name="MSC"
                    value="MSC"
                    />
                  }
                  label="MSC"
                   
                  />
                </FormGroup>

                <CustomInput
                  register={register}
                  name="filename"
                  placeholder={"upload"}
                  err={fileError}
                  formType="file"
                />

              <div><ErrorMessage errors={errors} name="filename" /></div>
               <div>
               <button type="submit">{isUpdate?"update member":"Add member"}</button>

               </div>

               {
                loading=="loading"?<CircularProgress/>:msg?<span style={{color:"green"}}>{msg}</span>:err?<span style={{color:"red"}}>{err}</span>:null
               }
              </form>

              {
                loading=="loading"?<CircularProgress/>:msg
              }
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
            }else{
                return navigate("/")

            }
}

export default Dashboard;
