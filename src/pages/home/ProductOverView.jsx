import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios"
import ImageSlider from "../../components/ImageSlider";
import { addToCart, loadCart } from "../../Utils/Cart";
import toast from "react-hot-toast";

export default function ProductOverView(){

    const params = useParams();

    const key = params.key;
    const [loadingStatus,SteLoadingStatus] = useState("loading");
    const [product,setProduct] = useState({});

    useEffect(()=>{
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${key}`).then((res)=>{
        setProduct(res.data);
        SteLoadingStatus("loaded");
        
      }).catch((err)=>{
        console.log(err);
        SteLoadingStatus("error");
      })
    },[])

    return (
      <div className="w-full h-full flex justify-center">
        {loadingStatus === "loading" && (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[70px] h-[70px] animate-spin border-b-2 rounded-full border-b-accent"></div>
          </div>
        )}
        {
          loadingStatus === "loaded" && <div className="w-full h-full flex justify-center items-center">
            <div className="w-[49%] h-full">
             <ImageSlider images={product.image}/>
            </div>
            <div className="w-[49%] h-full flex flex-col items-center">
                  <h1 className="text-3xl font-bold text-accent">{product.name}</h1>
                  <h3>{product.category}</h3>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                  <div className="mt-4 text-sm text-gray-600">
                    <span className="font-medium">Dimensinos:</span>{product.dimentions}
                  </div>

                  <button className="mt-4 bg-accent text-white px-4 py-2 rounded-md" onClick={()=>{
                    addToCart(product.key,1);
                    toast.success("Added to Cart");
                    console.log(loadCart())
                  }}>Add to Cart</button>
            </div>
          </div>
        }
        {
          loadingStatus == "error" && <div className="w-full h-full flex justify-center">
               <h1 className="text-3xl font-accent text-cover">Error Occured</h1>
          </div>
        }
      </div>
    );
    
}