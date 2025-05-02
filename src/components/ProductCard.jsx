import { Link }  from 'react-router-dom'

export default function PCard({ item }) {
  return (
    <div className="w-72 h-105 bg-white shadow-lg shadow-black/40 rounded-2xl overflow-hidden transition-transform hover:scale-105">

      {/* Product Image */}
      <img 
        src={item.image[0]} 
        alt={item.name} 
        className="w-64  h-48 object-cover p-1.5"
      />

     
      <div className="p-4  relative  ">
        <div className='p-2  '>
       
        <h2 className="p-2   text-lg font-mono  font-semibold text-[#333]">{item.name}</h2>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-accent font-bold text-lg">${item.price}</span>
          <span className="text-sm text-gray-900">{item.category}</span>
        </div>
        </div>
     {
      /**  Description
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {item.description}
        </p> */
     }

        {/* Availability Badge */}
        <div className="mt-3">
          {item.availability ? (
            <span className="text-xs font-semibold text-[#101eb4] bg-green-100 px-2 py-1 rounded-md">
              In Stock
            </span>
          ) : (
            <span className="text-xs font-semibold text-accent bg-red-100 px-2 py-1 rounded-md">
              Out of Stock
            </span>
          )}
        </div>
        <div className="flex justify-center h-full p-4 border-t border-gray-200">
  <Link
    to={`/product/${item.key}`}
    className="w-[90%] h-[40px] flex items-center justify-center 
               rounded-xl bg-[#333] text-white font-medium 
               hover:bg-[#333339] transition duration-300 shadow-md"
  >
    View Details
  </Link>
</div>

      </div>
    </div>
  );
}
