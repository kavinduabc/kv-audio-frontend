import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import '../../css/gallery.css';
import ImageBox from "../../components/ImageBox";

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
    <div className="background  min-h-screen  px-6 py-8">
      <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">Gallery</h3>

      {state === "Loading" && (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      {state === "success" && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((galery) => (
            <ImageBox key={galery._id} galery={galery} />
          ))}
        </div>
      )}
    </div>
  );
}
