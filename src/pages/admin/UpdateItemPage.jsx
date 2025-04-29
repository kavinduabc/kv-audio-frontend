import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../Utils/MediaUpload";

export default function AddProduct() {
    const location = useLocation();

    console.log(location);

  const [productKey, setProductKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimension, setProductDimension] = useState(location.state.dimensions);
  const [productDescription, setProductDescription] = useState(location.state.description);
  const [productImages,setProductImages] = useState([]);

  const backendurl = import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate();
 

  async function handleUpadateItem() {

    let updatingImages = location.state.image

    //** create function for cheling the allready add images */
    if(productImages.length > 0){
      
      const promises = [];

      for(let i = 0;i < productImages.length; i++){
        console.log(productImages[i]);
        const promise = mediaUpload(productImages[i]);
        promises.push(promise);

        //** chech the images array length */
        if(i > 5)
        {
          toast.error("you can add only 5 images")
          break;
        }
      }

      updatingImages = await Promise.all(promises)
    }

    console.log(productKey, productName, productPrice, productCategory, productDescription, productDimension);

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not authorized to perform this task");
      return;
    }

    try {
      const result = await axios.put(
        backendurl+"/api/product/"+productKey,
        {
          key: productKey,
          name: productName,
          price: productPrice,
          category: productCategory,
          dimensions: productDimension,
          description: productDescription,
          image : updatingImages,
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
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-2xl font-bold mb-5">Update Product</h1>
      <input
        disabled
        type="text"
        placeholder="Product Key"
        value={productKey}
        onChange={(e) => setProductKey(e.target.value)}
        className="border p-2 mb-3 w-1/2"
      />
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="border p-2 mb-3 w-1/2"
      />
      <input
        type="number"
        placeholder="Product Price"
        value={productPrice}
        onChange={(e) => setProductPrice(Number(e.target.value))}
        className="border p-2 mb-3 w-1/2"
      />
      <select
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
        className="border p-2 mb-3 w-1/2"
      >
        <option value="audio">Audio</option>
        <option value="video">Video</option>
      </select>
      <input
        type="text"
        placeholder="Product Dimension"
        value={productDimension}
        onChange={(e) => setProductDimension(e.target.value)}
        className="border p-2 mb-3 w-1/2"
      />
      <textarea
        placeholder="Product Description"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        className="border p-2 mb-3 w-1/2"
      />
      <input
          onChange={(e) => setProductImages([...e.target.files])}
          type="file"
          multiple
          className="w-full p-2 border rounded"
        />
      <button onClick={handleUpadateItem} className="bg-blue-500 text-white px-4 py-2 rounded">
        Update Product
      </button>
    </div>
  );
}
