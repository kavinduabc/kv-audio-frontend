import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageSlider from "../../components/ImageSlider";
import { addToCart, loadCart } from "../../Utils/Cart";
import toast from "react-hot-toast";

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
    <div className="w-full flex flex-col lg:flex-row p-6 gap-10">
      {/* Left side - Images */}
      <div className="w-full lg:w-1/2">
        <ImageSlider images={product.image} />
      </div>

      {/* Right side - Product details */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
        <span className="text-green-600 font-semibold">Available for Rent</span>

        <div className="text-gray-700">
          <span className="font-semibold">Category:</span> {product.category}
        </div>

        <p className="text-gray-600">{product.description}</p>

        <div className="text-lg font-semibold text-blue-700">LKR {product.price}</div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Dimensions:</span> {product.dimentions}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="number"
            placeholder="Days"
            className="border px-3 py-2 rounded w-[80px]"
            min="1"
          />
          <button
            className="bg-accent text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => {
              addToCart(product.key, 1);
              toast.success("Added to Cart");
              console.log(loadCart());
            }}
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}
