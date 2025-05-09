import React, { useEffect, useState } from "react";
import axios from "axios";
import PCard from "./ProductCard";
import toast from "react-hot-toast";


const HomePageItems = () => {
  const [state, setState] = useState("loading");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/getHomeproducts`)
        .then((res) => {
          setItems(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setState("error");
        });
    }
  }, [state]);

  return (
    <div className="pt-[50px] bg-gray-100">
      <h3 className="m-3 text-2xl text-[#333] font-medium">NEW  PRODUCTS.</h3>
      {state === "loading" ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin"></div>
        </div>
      ) : (
        <div className="bg-gray-100 w-full h-[400px] flex items-center gap-4 overflow-x-auto px-4">
          {items.map((item) => (
            <PCard key={item._id || item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePageItems;
