import { Link } from 'react-router-dom';

export default function PCard({ item }) {
  return (
    // <div className='p-5 mx-auto '>
    <div className="w-64 bg-white rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105">
      
      {/* Image */}
      <img
        src={item.image[0]}
        alt={item.name}
        className="w-full h-40 object-contain p-2"
      />

      {/* Content */}
      <div className="px-4 pb-4">
        <h2 className="text-md font-semibold mt-2 text-gray-800">{item.name}</h2>

        <div className="flex justify-between items-center mt-1 text-sm">
          <span className="text-red-600 font-bold">{item.price}</span>
          <span className="text-gray-600">{item.category}</span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-3">
          {item.description}
        </p>

        {/* Availability */}
        <div className="mt-2">
          {item.availability ? (
            <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
              In Stock
            </span>
          ) : (
            <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Button */}
        <div className="mt-4">
          <Link
            to={`/product/${item.key}`}
            className="block text-center bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
}
