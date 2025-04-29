import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function AItems() {
    const [items, setItems] = useState([]);
    const [itemloaded, SetItemLoaded] = useState(false);
    const navigate = useNavigate()

    const backendurl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {

        if(!itemloaded){
            const token = localStorage.getItem("token");

        axios.get(backendurl+"/api/product", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then((res) => {
            console.log(res.data);
            setItems(res.data);
            SetItemLoaded(true);
        })
        .catch((err) => {
            console.error(err);
        });

        }
      
    }, [itemloaded]);

    const handleDelete = (key) => {
       
        if(window.confirm("Are you sure you want to delete this item?"))
        {
            setItems(items.filter((item)=>item.key !== key));

            const token = localStorage.getItem("token");

            axios.delete(`${backendurl}/api/product/${key}`,{
                headers: { Authorization: `Bearer ${token}`},
            }).then(
                (res) =>{
                    console.log(res.data);
                    SetItemLoaded(false);
                }
            ).catch(
                (err) =>{
                    console.error(err);
                }
            )
        }
    };

    

    return (
        <div className="w-full h-full p-6 bg-gray-100 relative flex flex-col items-center">
           { !itemloaded &&<div className="border-4 my-4 border-b-green-500 rounded-full animate-spin w-[100px] h-[100px]"></div>}
           {itemloaded && <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full max-w-full text-left border-collapse bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="px-4 py-2">Key</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Dimensions</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Availability</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((product) => (
                                <tr key={product.key} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2">{product.key}</td>
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">${product.price}</td>
                                    <td className="px-4 py-2">{product.category}</td>
                                    <td className="px-4 py-2">{product.dimensions}</td>
                                    <td className="px-4 py-2">{product.description}</td>
                                    <td className="px-4 py-2">{product.availability ? "Available" : "Not Available"}</td>
                                    <td className="px-4 py-2 flex space-x-3">
                                        <button onClick={()=>{
                                            navigate(`/admin/items/eddit`,{state:product})
                                        }} className="text-blue-600 hover:text-blue-800">
                                            <FiEdit size={20} />
                                        </button>
                                        <button onClick={() => handleDelete(product.key)} className="text-red-600 hover:text-red-800">
                                            <FiTrash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-4">No products available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>}
            <Link to="/admin/items/add" className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition">
                <CiCirclePlus size={40} />
            </Link>
        </div>
    );
}
