import { useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";

    export default function AdminInquiries(){
        
        const [inquiries,setInquiries]= useState(0); 
        const [state,setState]= useState("Loading");

        useEffect(()=>{
          if(state == "Loading"){
            const token = localStorage.getItem("token");
            axios(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry`,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }).then((res)=>{
                setInquiries(res.data);
                setState("success");
                console.log("Inqiuries ", res.data);
            }).catch((err)=>{
                toast.error(err?.response?.data?.error || "Error fetching inquiries");
                setState("error");
            })
          }
        },[])
        return(
            <div>
              <h1>hello world</h1>
            </div>
        )
    }