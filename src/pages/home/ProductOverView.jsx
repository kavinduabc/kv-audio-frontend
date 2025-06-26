import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageSlider from "../../components/ImageSlider";
import { addToCart, loadCart } from "../../Utils/Cart";
import toast from "react-hot-toast";
import Footer from "../../components/Footer";

export default function ProductOverView() {
  const { key } = useParams();
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${key}`)
      .then((res) => {
        setProduct(res.data);
        setLoadingStatus("loaded");
      })
      .catch((err) => {
        console.log(err);
        setLoadingStatus("error");
      });
  }, []);

  if (loadingStatus === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[60px] h-[60px] animate-spin border-b-2 rounded-full border-b-accent"></div>
      </div>
    );
  }

  if (loadingStatus === "error") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="text-3xl font-semibold text-red-500">Error loading product</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
    <div className="w-full flex flex-col lg:flex-row items-center p-6 px-36 bg-gray-100 gap-10">
  <div className="flex gap-8 p-5 m-4 bg-gray-100 border border-gray-300 shadow-sm">
  {/* Left Side - Image Gallery */}
  <div className="w-full lg:w-1/2">
    <ImageSlider images={product.image} />
  </div>

  {/* Right Side - Product Info */}
  <div className="w-full lg:w-1/2 space-y-5">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{product.name}</h1>

    <div className="flex items-center gap-2">
      <span className="text-green-600 font-semibold">Available for Rent</span>
    </div>

    <div className="text-gray-700 text-base">
      <span className="font-semibold">Category:</span> {product.category}
    </div>

    <p className="text-gray-600 leading-relaxed">{product.description}</p>

    <div className="text-xl font-bold text-accent">LKR {product.price}</div>

    <div className="text-sm text-gray-600">
      <span className="font-medium">Dimensions:</span> {product.dimentions}
    </div>

    {/* Rent Section */}
    <div className="flex items-center gap-3 mt-6">
      <input
        type="number"
        placeholder="Days"
        className="border border-gray-300 px-3 py-2 rounded w-[90px] focus:outline-none focus:ring-2 focus:ring-blue-400"
        min="1"
      />
      <button
        className="bg-accent text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => {
          addToCart(product.key, 1);
          toast.success("Added to Cart");
          console.log(loadCart());
        }}
      >
        Rent Now
      </button>
    </div>

    {/* Satisfaction Line (Optional) */}
    <div className="pt-4 text-sm text-gray-500 border-t border-gray-200">
      Satisfaction Guaranteed. If this isn't the product you're looking for, contact us for more options.
    </div>
  </div>
</div>

</div>
    <Footer/>
    </div>
  );
}
