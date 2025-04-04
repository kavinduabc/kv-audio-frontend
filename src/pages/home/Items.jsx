import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import PCard from "../../components/ProductCard"

  export default function Items(){
    
    const [state,setState] = useState("loading")//loading,success,error
    const [items,setItems] = useState([])

    useEffect(()=>{
    
      //** feaching data in backend */
      if(state == "loading"){ 
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product`).then((res)=>{
          console.log(res.data)
          setItems(res.data)
          setState("success")
       }).catch((err)=>{
          toast.error(err?.response?.data?.error||"An error occured")
          setState("error")
       })
      }
      
    },[])

    return(
        <div className="w-full h-full flex flex-wrap justify-center pt-[50px]">
           
           {
            //** start codding in rendaring method  */
             state == "loading"&&<div className="w-full h-full b flex justify-center items-center">
                 <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin">

                 </div>
             </div>
           } 
           {
            state == "success"&&
            items.map((item)=>{
              return(
                <PCard key={item.key} item={item} />
              )
            })
           }
        </div>
    )
  }