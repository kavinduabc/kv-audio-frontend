import React from 'react'
import {BsGraphDown} from 'react-icons/bs'
import {BsBookmarkDash} from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineSpeaker } from 'react-icons/md'
import { Link, Route, Routes } from 'react-router-dom'
import AItems from './AdminItem'
import AddProduct from './AddProduct'

const Admin = () => {
  return (
     <div className='w-full h-screen flex'>
          <div className='w-[200px] h-full bg-green-200'>
            <Link to="/admin/dashboard">
             <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center ' >
              <BsGraphDown/>
              Dashboard</button></Link>
              <Link to="/admin/booking">
             <button className='w-full h-[40px] text-[25px] font-bold  flex justify-center items-center ' >
              <BsBookmarkDash/>
              Booking</button></Link>

             <Link to="/admin/items"> 
             <button className='w-full h-[40px] text-[25px] font-bold   flex justify-center items-center' >
              <MdOutlineSpeaker/>
              Items</button></Link>

             <Link to="/admin/users">
             <button className='w-full h-[40px] text-[25px] font-bold   flex justify-center items-center' >
              <FaRegUser/>
              Users</button></Link>
          </div>
          <div className='w-[calc(100vw-200px)] '>
            <Routes path="/*">
            
            <Route path='/dashboard' element={<h1>dashboard</h1>}/>
            <Route path='/booking' element={<h1>booking</h1>}/>
            <Route path='/items' element={<AItems/>}/>
            <Route path='/items/add' element={<AddProduct/>} /> 


            <Route path='/users' element={<h1>user</h1>}/>
            
            </Routes>
          </div>
        </div>
  )
}

export default Admin