import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../Utils/MediaUpload";

export default function UpdateProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  const [productKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimension, setProductDimension] = useState(location.state.dimensions);
  const [productDescription, setProductDescription] = useState(location.state.description);
  const [productImages, setProductImages] = useState([]);
  const [featured, setFeatured] = useState(location.state.featured || false);
  const [homeProducts, setHomeProducts] = useState(location.state.homepProduct || false);

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  async function handleUpdateItem() {
    let updatingImages = location.state.image;

    if (productImages.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    if (productImages.length > 0) {
      const promises = productImages.map((img) => mediaUpload(img));
      updatingImages = await Promise.all(promises);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authorized to perform this task");
      return;
    }

    try {
      const result = await axios.put(
        `${backendurl}/api/product/${productKey}`,
        {
          key: productKey,
          name: productName,
          price: productPrice,
          category: productCategory,
          dimensions: productDimension,
          description: productDescription,
          image: updatingImages,
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
      <h1 className="text-2xl font-semibold mb-6">Update Product</h1>

      <div className="max-w-xl bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
        <input
          type="text"
          disabled
          value={productKey}
          className="border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
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
          onChange={(e) => setProductPrice(Number(e.target.value))}
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
          <label className="font-medium mb-1 block">Upload New Images (optional, max 5)</label>
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
          onClick={handleUpdateItem}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Product
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
