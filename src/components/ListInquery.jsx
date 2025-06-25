import { useEffect, useState } from "react";


export default function ListInquery(){

   const [inquery,setInquery] =  useState("0");
   const[state,setState] = useState("Loading");

   useEffect(()=>{
     axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry`,{
        headers:{
            Authorization : `Bearer `
        }
     })
   },[])

    return(
        <div>

        </div>
    )
}