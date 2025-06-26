import React from 'react'
import { FaVanShuttle } from 'react-icons/fa6'
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiSupport } from 'react-icons/bi';

const Batches = () => {
  const features = [
    {
      icon: <FaVanShuttle className="text-4xl text-black" />,
      title: "Wide Range of Products",
      desc: "For daily use and events",
    },
    {
      icon: <AiOutlineDollarCircle className="text-4xl text-black" />,
      title: "Special Rates",
      desc: "Special rates for more than 3 days or 3 items rent.",
    },
    {
      icon: <BiSupport className="text-4xl text-black" />,
      title: "Support 365 x 24/7",
      desc: "9.00am to 5.00pm Online and Telephone Support all year round.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 text-gray-800 rounded-lg p-6 mt-6 w-full mx-auto shadow">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-start gap-4  p-4 rounded-lg hover:shadow-md transition"
        >
          {feature.icon}
          <div>
            <h3 className="text-base font-semibold uppercase text-gray-700 mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Batches;
