import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setInquiries(res.data);
        setLoading(false);
        console.log("Inquiries", res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Error fetching inquiries");
        setLoading(false);
      });
  }, []);

  const handleDeleteInquiry = (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      const token = localStorage.getItem("token");

      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setInquiries(inquiries.filter((inq) => inq.id !== id));
          toast.success("Inquiry deleted successfully");
        })
        .catch((err) => {
          toast.error("Failed to delete inquiry");
          console.error(err);
        });
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Inquiries</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center my-12">
          <div className="border-4 border-b-blue-500 rounded-full animate-spin w-16 h-16"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length > 0 ? (
                inquiries.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.email}</td>
                    <td className="px-4 py-2">{item.phone}</td>
                    <td className="px-4 py-2">{item.message}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteInquiry(item.id)}
                        className="text-red-600 hover:text-red-800"
                      > 
                     <FiTrash2 size={18} />

                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No inquiries found.
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
