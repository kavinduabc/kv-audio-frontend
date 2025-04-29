import { Link }  from 'react-router-dom'

export default function PCard({ item }) {
  return (
    <div className="w-72 bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105">
      {/* Product Image */}
      <img 
        src={item.image[0]} 
        alt={item.name} 
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        {/* Product Name */}
        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>

        {/* Price & Category */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-green-600 font-bold text-lg">${item.price}</span>
          <span className="text-sm text-gray-500">{item.category}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {item.description}
        </p>

        {/* Availability Badge */}
        <div className="mt-3">
          {item.availability ? (
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-md">
              In Stock
            </span>
          ) : (
            <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-md">
              Out of Stock
            </span>
          )}
        </div>
        <div className="flex justify-end h-full p-4 border-t border-gray-200">
            <Link to={"/product/"+item.key} className='w-[90%] h-[40px] bg-blue-500 text-white py- ounded-bg hover:bg-blue-600 transition'>
            View Details
            </Link>
        </div>
      </div>
    </div>
  );
}
