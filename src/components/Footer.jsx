import React from 'react'

import Logo from '../components/Logo'
import CantactUs from './CantactUs'

const Footer = () => {
  return (
    <div className='bg-[#333] mt-3'>
        <div className="flex flex-col  sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
          <div>
          <CantactUs/>
           
          </div>
          <div>
            <p className="text-xl font-medium mb-5 text-primary">
                COMPANY
            </p>
            <ul className="flex flex-col gap-1 text-primary">
                <li>Home</li>
                <li>About us</li>
                <li>Contact</li>
                <li>Items</li>
            </ul>
          </div>
          <div>
            <p className='text-xl font-medium mb-5 text-primary'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-primary'>
               <li>+1234567890</li>
               <li>abc2gmail.com</li>
            </ul>
          </div>

        </div>
        <div>
          <hr className='text-primary'/>
          <p className='py-5 text-sm text-center text-[#ffff] '>
            Coopyright 20242 KV-audio.com - All right reserve
          </p>
        </div>

    </div>
  )
}

export default Footer