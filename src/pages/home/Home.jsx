import { Link, Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import Items from "./Items";
import Gallery from "./Gallary";
//import Contact from "./Contact";
import HomeC from "./HomeControlle";
import Error from "./Error"
import ProductOverView from "./ProductOverView";
import BookingPage from "./Booking";
import Footer from "../../components/Footer"
import Login from '../login/Login'
import SignUp from '../Signup/Signup'
import  UserProfile  from '../../components/UserProfile';
import Inquery from "../../components/Inquery";
import ListInquery from "../../components/ListInquery";




export default function Home(){
    return(
        <>
            <Header/>

            <div className="h-[calc(100vh-100px)] w-full bg-primary">
               <Routes path="/*">
               <Route  path="/" element={<HomeC/>}/> 
               <Route path="/userprofile" element={<UserProfile />} />
               <Route  path="/gallery" element={<Gallery/>}/> 
               <Route path='/booking' element={<BookingPage/>}/>
               <Route  path="/items" element={<Items/>}/> 
               <Route path='/login' element={<Login/>} />
               <Route path='/signup' element={<SignUp/>} />
               <Route path='/inquery' element={<ListInquery/>} />
               <Route path="/product/:key" element={<ProductOverView/>} />
               <Route path="/*" element={<Error/>}/>
               </Routes> 
            </div>

        
        
        </>
    )
}