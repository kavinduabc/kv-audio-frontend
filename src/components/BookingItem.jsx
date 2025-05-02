import { useEffect, useState } from "react";
import axios from "axios";
import { addToCart, removeFromCart } from "../Utils/Cart";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";

export default function BookingItems({ productKey, quantity, refresh }) {
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productKey}`)
        .then((res) => {
          setItem(res.data);
          setStatus("success");
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
          removeFromCart(productKey);
          refresh(); 
        });
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="w-full py-4 flex justify-center">
        <div className="w-6 h-6 border-b-2 border-accent animate-spin rounded-full"></div>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="w-full max-w-3xl p-4 mb-4 flex items-center gap-4 bg-white shadow-md rounded-xl">
      <img
        src={item.image?.[0]}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-accent">{item.name}</h2>
        <p className="text-sm text-gray-500">{item.category}</p>
        <p className="text-sm">{item.description}</p>
        <p className="mt-1 font-medium">Dimensions: {item.dimensions}</p>
        <p className="mt-1 font-bold text-lg">₹ {item.price}</p>
      </div>
      <div className="flex flex-col items-end gap-2">

        <span className="text-md font-semibold flex items-center justify-center relative">
            <button className="absolute-left-6 hover:text-accent"
            onClick={()=>{
                addToCart(productKey,+ 1);
                refresh();
            }}><FaArrowUp/></button>

             {quantity}
             <button className="absolute-left-6 hover:text-accent"
            onClick={()=>{

               
                  if(quantity == 1){
                    
                    removeFromCart(productKey);
                    refresh();

                  }
                  else{
                    addToCart(productKey,- 1);
                    refresh();
                  }
            }}><FaArrowDown/></button>
             </span>

        <span className="text-md font-semibold">{item.price *quantity}</span>
        <button
          onClick={() => {
            removeFromCart(productKey);
            refresh();
          }}
          className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
