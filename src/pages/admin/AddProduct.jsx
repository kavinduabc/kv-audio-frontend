import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimension, setProductDimension] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const navigate = useNavigate()

  //** Function to add a product */
  async function handleAddItem() {
    console.log(productKey, productName, productPrice, productCategory, productDescription, productDimension);

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not authorized to perform this task");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:3000/api/product",  
        {
          key: productKey,
          name: productName,
          price: productPrice,
          category: productCategory,
          dimensions: productDimension,
          description: productDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" 
          },
        }
      );
      toast.success(result.data.message);
      navigate("/admin/items")
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
        <input
          onChange={(e) => setProductDescription(e.target.value)}
          value={productDescription}
          type="text"
          placeholder="Product Description"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleAddItem} className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
          Add Product
        </button>
        <button onClick={() => navigate("/admin/items")} className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
        Cancel
    </button>
      </div>
    </div>
  );
}
