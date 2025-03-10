import React from 'react'
import {BsGraphDown} from 'react-icons/bs'
import {BsBookmarkDash} from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineSpeaker } from 'react-icons/md'
import { Link, Route, Routes } from 'react-router-dom'

const Admin = () => {
  return (
     <div className='w-full h-screen flex'>
          <div className='w-[300px] h-full bg-green-200'>
            <Link to="/admin/booking">
             <button className='w-full h-[40px] text-[25px] font-bold bg-red-400 flex justify-center items-center ' >
              <BsGraphDown/>
              Dashboard</button></Link>
              <Link to="/admin/booking">
             <button className='w-full h-[40px] text-[25px] font-bold bg-red-400 flex justify-center items-center ' >
              <BsBookmarkDash/>
              Booking</button></Link>
              
             <button className='w-full h-[40px] text-[25px] font-bold bg-red-400  flex justify-center items-center' >
              <MdOutlineSpeaker/>
              Items</button>
             <button className='w-full h-[40px] text-[25px] font-bold bg-red-400  flex justify-center items-center' >
              <FaRegUser/>
              Users</button>
          </div>
          <div className='w-[calc(100vw-400px)] bg-blue-900'>
            <Routes path="/*">
            
            <Route path='/booking' element={<h1>booking</h1>}/>
            <Route path='/booking' element={<h1>items</h1>}/>
            
            </Routes>
          </div>
        </div>
  )
}

export default Admin