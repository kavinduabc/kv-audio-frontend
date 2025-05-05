import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../Utils/MediaUpload";

export default function AddProduct() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimension, setProductDimension] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [featured,setFeatured] = useState(false);

  const navigate = useNavigate();

  async function handleAddItem() {
    if (productImages.length > 5) {
      toast.error("You can upload maximum 5 images only.");
      return;
    }

    const promises = [];
    for (let i = 0; i < productImages.length; i++) {
      const promise = mediaUpload(productImages[i]);
      promises.push(promise);
    }

    const token = localStorage.getItem("token");
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    if (!token) {
      toast.error("You are not authorized to perform this task");
      return;
    }

    try {
      const imageUrl = await Promise.all(promises);

      const result = await axios.post(
        backendurl + "/api/product",
        {
          key: productKey,
          name: productName,
          price: productPrice,
          category: productCategory,
          dimensions: productDimension,
          description: productDescription,
          image: imageUrl,
          featured : featured,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(result.data.message);
      navigate("/admin/items");
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Product</h1>
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4">
        <input
          onChange={(e) => setProductKey(e.target.value)}
          value={productKey}
          type="text"
          placeholder="Product Key"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
          type="number"
          placeholder="Product Price"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="audio">Audio</option>
          <option value="light">Light</option>
        </select>
        <input
          onChange={(e) => setProductDimension(e.target.value)}
          value={productDimension}
          type="text"
          placeholder="Product Dimension"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          onChange={(e) => setProductDescription(e.target.value)}
          value={productDescription}
          placeholder="Product Description"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          onChange={(e) => setProductImages([...e.target.files])}
          type="file"
          multiple
          className="w-full p-2 border rounded"
        />
        <div>
          <input type="checkbox" onChange={(e)=>setFeatured(e.target.checked)}
          className="mr-2" />
        </div>
        <span>add to home slider</span>
        <button
          onClick={handleAddItem}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Add Product
        </button>
        <button
          onClick={() => navigate("/admin/items")}
          className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
