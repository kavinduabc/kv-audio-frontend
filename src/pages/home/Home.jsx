import { Link, Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import Items from "./Items";
import Gallery from "./Gallary";
import Contact from "./Contact";
import HomeC from "./HomeControlle";
import Error from "./Error"



export default function Home(){
    return(
        <>
            <Header/>

            <div className="h-[calc(100vh-100px)] w-full bg-primary">
               <Routes path="/*">
               <Route  path="/" element={<HomeC/>}/> 
               <Route  path="/contact" element={<Contact/>}/> 
               <Route  path="/gallery" element={<Gallery/>}/> 
               <Route  path="/items" element={<Items/>}/> 
               <Route path="/*" element={<Error/>}/>
               </Routes> 
            </div>
        </>
    )
}