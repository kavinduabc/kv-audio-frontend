import { useState } from "react"
import mediaUpload from "../Utils/MediaUpload.js";


export default function Testing(){
  
   // const[count,setCount]=useState(0)
    //coconut , banana ,apple ,other

    const [file,setFile] = useState(null);

   function uploadfile(){
      console.log(file)
      mediaUpload(file).then((url)=>{
         console.log(url)
      })
    }
    
     return(
        <div className="w-full  h-screen" >
           <input type="file"  onChange={(e)=>{setFile(e.target.files[0])}}/>
           <button onClick={uploadfile} >upload</button>
        </div>
     )
}