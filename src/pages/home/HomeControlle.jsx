import Batches from "../../components/Batches";
import Slider from "../../components/Slider";
import './home.css'
import { Link} from 'react-router-dom'


export default function HomeC(){
    return(
        <div className="m-2 bg-primary">
           <div className="w-[90%] h-[350px] items-center justify-center flex flex-col mx-auto home_background ">
           <h1 className="text-2xl font-bold mb-2">Welcome To KV Audio</h1>

          <p className="text-gray-700 text-center max-w-xl mb-4">
          KV Audio provides professional audio equipment for events, rentals, and more. Explore our wide range of sound systems and services tailored for your needs.
         </p>

         <Link
        to="/gallery"
        className="bg-[#333] text-white px-6 py-2 rounded-md hover:bg-[#444] transition"
        >
        View Gallery
        </Link>


        </div>

            <div>
            <Slider/>
            <Batches/>
            </div>
        </div>
    )
}