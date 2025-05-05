
import React from 'react'
import { FaLocationCrosshairs, FaWhatsapp } from 'react-icons/fa6'
import { FiClock, FiMail } from 'react-icons/fi'

const ContactUs = () => {
  return (
    <div className="bg-zinc-900 text-white p-6">
      <h2 className="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">CONTACT US</h2>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 text-green-400">
          <FaLocationCrosshairs />
          <span className="font-semibold">Address:</span>
        </div>
        <p className="ml-6 text-gray-300">501/5, Pitipana South, Homagama</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 text-green-400">
          <FaWhatsapp />
          <span className="font-semibold">Phone:</span>
        </div>
        <p className="ml-6 text-gray-300">072-4455678</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 text-green-400">
          <FiMail />
          <span className="font-semibold">Email:</span>
        </div>
        <p className="ml-6 text-gray-300">kvaudio22@gmail.com</p>
      </div>

      <div>
        <div className="flex items-center gap-2 text-green-400">
          <FiClock />
          <span className="font-semibold">Working Days/Hours:</span>
        </div>
        <p className="ml-6 text-gray-300">365 Days, 9.00am - 4.00pm</p>
      </div>
    </div>
  )
}

export default ContactUs
