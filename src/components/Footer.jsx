import React from 'react'
import { FaLocationCrosshairs, FaWhatsapp } from 'react-icons/fa6'
import { FiClock, FiMail } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-white px-6 py-10 mt-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">CONTACT US</h2>
          <div className="space-y-3 text-sm">
            <div className="flex gap-2 items-start">
              <FaLocationCrosshairs className="mt-1 text-green-400" />
              <div>
                <p className="text-gray-400 font-semibold">Address:</p>
                <p>501/5, Pitipana South, Homagama</p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <FaWhatsapp className="mt-1 text-green-400" />
              <div>
                <p className="text-gray-400 font-semibold">Phone:</p>
                <p>072-4455678</p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <FiMail className="mt-1 text-green-400" />
              <div>
                <p className="text-gray-400 font-semibold">Email:</p>
                <p>kvaudio22@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <FiClock className="mt-1 text-green-400" />
              <div>
                <p className="text-gray-400 font-semibold">Working Days/Hours:</p>
                <p>365 Days, 9.00am - 4.00pm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">COMPANY</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">Items</li>
          </ul>
        </div>

        
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">About US</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white ">At KV-Audio, we deliver high-performance audio solutions for events,
               venues, and installations 
              of all sizes. Our goal is to ensure powerful, crystal-clear sound that enhances every experience.</li>
            <li className="hover:text-white ">We provide tailored audio solutions with expert support and the latest technology. 
              Our team ensures every setup meets your needs, delivering immersive sound and complete satisfaction.</li>
          </ul>
        </div>
      </div>

      <hr className="border-t border-gray-700 mt-10" />
      <p className="text-center text-sm text-gray-400 mt-4">
        &copy; 2025 KV-audio.com - All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
