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
  const [featured, setFeatured] = useState(false);
  const [homeProducts, setHomeProducts] = useState(false);

  const navigate = useNavigate();

  async function handleAddItem() {
    if (productImages.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    const token = localStorage.getItem("token");
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    if (!token) {
      toast.error("You are not authorized to perform this task");
      return;
    }

    try {
      const imageUrls = await Promise.all(
        productImages.map((img) => mediaUpload(img))
      );

      const result = await axios.post(
        `${backendurl}/api/product`,
        {
          key: productKey,
          name: productName,
          price: productPrice,
          category: productCategory,
          dimensions: productDimension,
          description: productDescription,
          image: imageUrls,
          featured,
          homepProduct: homeProducts,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(result.data.message);
      navigate("/admin/items");
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Product</h1>

      <div className="max-w-xl bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Key"
          value={productKey}
          onChange={(e) => setProductKey(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="audio">Audio</option>
          <option value="light">Light</option>
        </select>
        <input
          type="text"
          placeholder="Product Dimensions"
          value={productDimension}
          onChange={(e) => setProductDimension(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <div>
          <label className="font-medium mb-1 block">Upload Images (max 5)</label>
          <input
            type="file"
            multiple
            onChange={(e) => setProductImages([...e.target.files])}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            onChange={(e) => setFeatured(e.target.checked)}
            checked={featured}
          />
          <label>Mark as Featured</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) => setHomeProducts(e.target.checked)}
            checked={homeProducts}
          />
          <label>Add to Home Page</label>
        </div>

        <button
          onClick={handleAddItem}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
        <button
          onClick={() => navigate("/admin/items")}
          className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
