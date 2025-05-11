import { MdOutlinePreview ,MdOutlineRateReview} from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import Batches from "../../components/Batches";
import HomePageItems from "../../components/HomePageItems";
import Slider from "../../components/Slider";
import './home.css'
import Footer from "../../components/Footer"
import { Link, Route,Routes} from 'react-router-dom'



export default function HomeC(){
    return(
        <div className="m-2 bg-primary ">

         <div className="w-[90%] h-[350px] mx-auto flex">

         <div className="w-[20%] bg-white p-6 shadow-md flex flex-col justify-start gap-6 ">

          <Link to="/uprofile">
    <div className="flex items-center gap-3 text-gray-700 hover:text-accent cursor-pointer">
      <FaRegUserCircle className="text-2xl" />
      <h3 className="text-lg font-semibold">User Profile</h3>
    </div>
    </Link>

    <div className="flex items-center gap-3 text-gray-700 hover:text-accent cursor-pointer">
      <MdOutlinePreview className="text-2xl" />
      <h3 className="text-lg font-semibold">View Reviews</h3>
    </div>
    <div className="flex items-center gap-3 text-gray-700 hover:text-accent cursor-pointer">
      <MdOutlineRateReview className="text-2xl" />
      <h3 className="text-lg font-semibold">Add Reviews</h3>
    </div>
  </div>

 
  <div className="flex items-center justify-center w-[70%] h-[350px] m-4  bg-cover bg-center">
  <div className="flex flex-col items-center text-center px-4">
    <h1 className="text-2xl font-bold text-black mb-2">Welcome To KV Audio</h1>
    <p className="text-gray-500 max-w-xl mb-4">
      KV Audio provides professional audio equipment for events, rentals, and more. Explore our wide range of sound systems and services tailored for your needs.
    </p>
    <Link
      to="/gallery"
      className="bg-[#333] text-white px-6 py-2 rounded-md hover:bg-[#444] transition"
    >
      View Gallery
    </Link>
  </div>
</div>


</div>


            <div>
            <Slider/>
            <Batches/>
            <HomePageItems/>
            </div>

            <div>
              <Footer/>
            </div>
        </div>
    )
}