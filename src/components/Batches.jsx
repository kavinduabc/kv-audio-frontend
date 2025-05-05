import React from 'react'
import { FaVanShuttle } from 'react-icons/fa6'
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiSupport } from 'react-icons/bi';

const Batches = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 divide-x bg-gray-100 text-gray-800 rounded-md overflow-hidden shadow-sm mt-6">
      
      <div className="flex gap-4 p-4 items-center">
        <FaVanShuttle className="text-[32px]" />
        <div>
          <h3 className="text-sm font-semibold uppercase">Wide Range of Products</h3>
          <p className="text-sm text-gray-600">for daily use and events</p>
        </div>
      </div>

      
      <div className="flex gap-4 p-4 items-center">
        <AiOutlineDollarCircle className="text-[32px]" />
        <div>
          <h3 className="text-sm font-semibold uppercase">Special Rates</h3>
          <p className="text-sm text-gray-600">Special rates for more than 3 days or 3 items rent.</p>
        </div>
      </div>

      
      <div className="flex gap-4 p-4 items-center">
        <BiSupport className="text-[32px]" />
        <div>
          <h3 className="text-sm font-semibold uppercase">Support 365 x 24/7</h3>
          <p className="text-sm text-gray-600">We do 365 x 9.00am – 5.00pm Online and Telephone Supports</p>
        </div>
      </div>

    </div>
  )
}

export default Batches;
