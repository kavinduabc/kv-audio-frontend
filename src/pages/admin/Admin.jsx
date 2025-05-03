import React, { useEffect, useState } from 'react'
import { BsGraphDown} from 'react-icons/bs'
import {BsBookmarkDash} from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineSpeaker } from 'react-icons/md'
import { Link, Route, Routes } from 'react-router-dom'
import AItems from './AdminItem'
import AddProduct from './AddProduct'
import UpdateItems from './UpdateItemPage'
import Logo from '../../components/Logo'
import AdminUser from './AdminUser'
import AdminOrdersPage from './AdminBooking'
import axios from 'axios'


const Admin = () => {

  const [userValidated, setUserValidated] = useState(false);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      window.location.href = "/login";
    }
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      console.log(res.data);
      const user = res.data;
      if(user.role == "admin"){
        setUserValidated(true);        
      }else{
        window.location.href = "/";
      }
      
    }).catch((err)=>{
      console.error(err);
      setUserValidated(false);
    })
  },[])

  return (
     <div className='w-full h-screen flex'>
          <div className='w-[230px] h-full bg-gradient-to-b from-[#333] to-[#101eb4]'>


            <div className='p-2 mt-3'>
              <Logo/>
            </div>

          <div className="flex flex-col p-1 m-1">
           <Link to="/admin/dashboard" className="w-full">
           <button className="w-full h-[45px] text-lg font-semibold flex justify-center items-center gap-2  bg-primary text-secondary rounded-xl shadow-md hover:bg-[--color-secondary] hover:text-[acce] transition duration-300">
           <BsGraphDown className="text-xl" />
            Dashboard
           </button>
           </Link>
          </div>


          <div className="flex flex-col p-1 m-1">
           <Link to="/admin/booking" className="w-full">
           <button className="w-full h-[45px] text-lg font-semibold flex justify-center items-center gap-2  bg-primary text-secondary rounded-xl shadow-md hover:bg-[--color-secondary] hover:text-[acce] transition duration-300">
           <BsBookmarkDash className="text-xl" />
            Booking 
           </button>
           </Link>
          </div>

          <div className="flex flex-col p-1 m-1">
           <Link to="/admin/items" className="w-full">
           <button className="w-full h-[45px] text-lg font-semibold flex justify-center items-center gap-2  bg-primary text-secondary rounded-xl shadow-md hover:bg-[--color-secondary] hover:text-[acce] transition duration-300">
           <MdOutlineSpeaker className="text-xl" />
            Items
           </button>
           </Link>
          </div>

          <div className="flex flex-col p-1 m-1">
           <Link to="/admin/users" className="w-full">
           <button className="w-full h-[45px] text-lg font-semibold flex justify-center items-center gap-2  bg-primary text-secondary rounded-xl shadow-md hover:bg-[--color-secondary] hover:text-[acce] transition duration-300">
           <FaRegUser className="text-xl" />
            Users
           </button>
           </Link>
          </div>

          </div>
          <div className='w-[calc(100vw-200px)] bg-primary '>
            <Routes path="/*">
            
            <Route path='/dashboard' element={<h1>dashboard</h1>}/>
            <Route path='/booking' element={<AdminOrdersPage/>}/>
            <Route path='/items' element={<AItems/>}/>
            <Route path='/items/add' element={<AddProduct/>} /> 
            <Route path='/items/eddit' element={<UpdateItems/>}/>
            <Route path='/users' element={<AdminUser/>}/>
            
            </Routes>
          </div>
        </div>
  )
}

export default Admin