import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAddPhotoAlternate } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import mediaUpload from "../../Utils/MediaUpload";


export default function AddImage() {
  const [imageFile, setImageFile] = useState(null); // Change to null
  const [functionName, setFunctionName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!imageFile || !functionName || !description) {
      toast.error("All fields are required.");
      return;
    }

    const token = localStorage.getItem("token");
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    if (!token) {
      toast.error("You are not authorized to perform this task");
      return;
    }

    try {
      
      const imageUrl = await mediaUpload(imageFile);

      await axios.post(
        `${backendurl}/api/addImage`,
        {
          image: imageUrl,
          functionName: functionName,
          discription: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Image added successfully!");
      navigate("/api/addImage");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Error adding image");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Add Gallery Image</h1>
          <button
            onClick={() => navigate("/api/addImage")}
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Image List
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Upload Image</label>
            <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800">
              <MdAddPhotoAlternate size={24} />
              <span className="underline">Choose Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </label>
            {imageFile && (
              <p className="text-sm mt-1 text-gray-600">{imageFile.name}</p>
            )}
          </div>

          <input
            type="text"
            placeholder="Function Name"
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded resize-none"
            rows={4}
          />

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Add Image
            </button>
            <button
              onClick={() => navigate("/api/addImage")}
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
