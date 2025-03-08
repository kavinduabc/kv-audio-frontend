import { useState } from 'react'
import {BsGraphDown} from 'react-icons/bs'
import {BsBookmarkDash} from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineSpeaker } from 'react-icons/md'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='w-full h-screen flex'>
      <div className='w-[300px] h-full bg-green-200'>
         <button className='w-full h-[40px] text-[25px] font-bold bg-red-400 flex justify-center items-center ' >
          <BsGraphDown/>
          Dashboard</button>
         <button className='w-full h-[40px] text-[25px] font-bold bg-red-400 flex justify-center items-center ' >
          <BsBookmarkDash/>
          Booking</button>
         <button className='w-full h-[40px] text-[25px] font-bold bg-red-400  flex justify-center items-center' >
          <MdOutlineSpeaker/>
          Items</button>
         <button className='w-full h-[40px] text-[25px] font-bold bg-red-400  flex justify-center items-center' >
          <FaRegUser/>
          Users</button>
      </div>
      <div className='w-full bg-red-900'>
        
      </div>
    </div>
    </>
  )
}

export default App
