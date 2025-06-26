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
        <div className=" bg-primary ">

    <div
  className="relative w-full h-[490px]  bg-cover bg-center  flex items-center justify-center"
  style={{
    backgroundImage: "url('homef.jpg')", 
  }}
>
  <div className="flex flex-col items-center text-center px-4  bg-opacity-80 p-6 rounded-md">
    <h1 className="text-2xl font-bold text-accent mb-2">Welcome To KV Audio</h1>
    <p className="text-gray-600 max-w-xl mb-4">
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



            <div>
              <div className="p-5">
                <div className="p-5">
            <Slider/>
            </div>
            </div>
            <Batches/>

            <div className="p-5 bg-gray-100">
            <HomePageItems/>
            </div>

            </div>

            <div>
              <Footer/>
            </div>
        </div>
    )
}