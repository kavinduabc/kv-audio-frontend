import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function AItems() {
    const [items, setItems] = useState([]);
    const [itemloaded, SetItemLoaded] = useState(false);
    const navigate = useNavigate();
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (!itemloaded) {
            const token = localStorage.getItem("token");
            axios.get(`${backendurl}/api/product`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                setItems(res.data);
                SetItemLoaded(true);
            })
            .catch((err) => {
                console.error(err);
            });
        }
    }, [itemloaded]);

    const handleDelete = (key) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            setItems(items.filter((item) => item.key !== key));
            const token = localStorage.getItem("token");

            axios.delete(`${backendurl}/api/product/${key}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => SetItemLoaded(false))
            .catch((err) => console.error(err));
        }
    };

    return (
        <div className="w-full p-6 bg-gray-100">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Manage Products</h2>
                <Link to="/admin/items/add" className="bg-[#C6C20E] hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg flex items-center gap-2 shadow-md transition">
                    <CiCirclePlus size={24} />
                    Add Product
                </Link>
            </div>

            {!itemloaded ? (
                <div className="flex justify-center items-center my-12">
                    <div className="border-4 border-b-blue-500 rounded-full animate-spin w-16 h-16"></div>
                </div>
            ) : (
                <div className="overflow-x-auto p-6 bg-white shadow-lg rounded-lg">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-4 py-3">Key</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Dimensions</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Availability</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                items.map((product) => (
                                    <tr key={product.key} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">{product.key}</td>
                                        <td className="px-4 py-2">{product.name}</td>
                                        <td className="px-4 py-2">${product.price}</td>
                                        <td className="px-4 py-2">{product.category}</td>
                                        <td className="px-4 py-2">{product.dimensions}</td>
                                        <td className="px-4 py-2">{product.description}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {product.availability ? 'Available' : 'Not Available'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 flex space-x-3">
                                            <button
                                                onClick={() => navigate(`/admin/items/eddit`, { state: product })}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <FiEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.key)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-6 text-gray-500">
                                        No products available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
