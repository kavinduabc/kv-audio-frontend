import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "../../css/gallery.css";
import ImageBox from "../../components/ImageBox";
import Footer from "../../components/Footer";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [state, setState] = useState("Loading");

  useEffect(() => {
    if (state === "Loading") {
      const token = localStorage.getItem("token");
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/addImage`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setImages(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "Error fetching images");
          setState("error");
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">GALLERY TITLE</h1>
        <p className="text-gray-600">
          Gallery description. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Mauris vitae ultricies leo integer malesuada nunc vel
          risus commodo.
        </p>
      </div>

      {/* Loading Spinner */}
      {state === "Loading" && (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Image Grid */}
      {state === "success" && (
        <div className="grid gap-4 px-4 pb-12 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {images.map((galery) => (
            <ImageBox key={galery._id} galery={galery} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
