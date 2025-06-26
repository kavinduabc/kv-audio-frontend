import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function ListInquery(){

   const [inquery,setInquery] =  useState("0");
   const[state,setState] = useState("Loading");

   useEffect(()=>{
     axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry`,{
        headers:{
            Authorization : `Bearer `
        }
     }).then((res)=>{
        setInquery(res.data);
        setState("Loaded");
     }).catch((err)=>{
        console.error(err);
        toast.error("Failed  to load inqueries");
        setState("failed");
     })
   },[])

    return(
        <div>

        </div>
    )
}