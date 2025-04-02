import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

  export default function Items(){
    
    const [state,setState] = useState("loading")//loading,success,error
    const [items,setItems] = useState([])

    useEffect(()=>{
    
      //** feaching data in backend */
      if(state == "loadong"){
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product`).then((res)=>{
          setItems(res.data)
          setState("success")
       }).catch((err)=>{
          toast.error(err?.response?.data?.error||"An error occured")
          setState("error")
       })
      }
      
    },[])

    return(
        <div>
          
        </div>
    )
  }