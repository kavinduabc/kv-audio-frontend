import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import '../../css/gallery.css'

export default function Gallery(){
    // factch all images from the backend 


    const [images,setImages] = useState([]);
    const [state,setState] = useState("Loading");

    useEffect(() => {
  if (state === "Loading") {

   const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/addImage`,{
         headers:{
            Authorization: `Bearer ${token}`,
         }
      })
      .then((res) => {
        console.log(res.data);
        setImages(res.data);
        setState("success");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Error fetching images");
        setState("error");
      });
  }
}, []);
   
     return(
        <div className=" background flex flex-col  h-screen bg-gray-100"> 
         <div className="flex  justify-between p-4 ">
            
            
         </div>

        </div>
     )
}