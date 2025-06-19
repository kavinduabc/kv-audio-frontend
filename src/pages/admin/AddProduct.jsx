import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../Utils/MediaUpload";
import { MdAddPhotoAlternate } from "react-icons/md";

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
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Add New Product</h1>
          <button
            onClick={() => navigate("/admin/items")}
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Item List
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Key"
            value={productKey}
            onChange={(e) => setProductKey(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="audio">Audio</option>
            <option value="light">Light</option>
          </select>
          <input
            type="text"
            placeholder="Product Dimensions"
            value={productDimension}
            onChange={(e) => setProductDimension(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            placeholder="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded resize-none"
            rows={4}
          />

          <div>
            <label className="block font-medium mb-1">Upload Images (Max 5)</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800">
                <MdAddPhotoAlternate size={24} />
                <span className="underline">Add Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setProductImages([...e.target.files])}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-500">{productImages.length} selected</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <label>Mark as Featured</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={homeProducts}
              onChange={(e) => setHomeProducts(e.target.checked)}
            />
            <label>Add to Home Page</label>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddItem}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Add Product
            </button>
            <button
              onClick={() => navigate("/admin/items")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
