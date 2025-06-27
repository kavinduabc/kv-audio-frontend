import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Inquery from "./Inquery";

export default function ListInquery() {
  const [inqueries, setInqueries] = useState([]);
  const [state, setState] = useState("Loading");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInqueries(res.data);
        setState("Loaded");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load inquiries");
        setState("failed");
      });
  }, []);

  // ...existing code...
return (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
    <div className="flex flex-col items-center justify-center w-full">
      <div className="bg-white w-full max-w-2xl shadow-lg rounded-xl">
        <div className="bg-gray-100 border-white p-6 mb-8 rounded-t-xl">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Inquiry Form</h2>
          <Inquery />
        </div>
        <div className="bg-white rounded-b-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Comments:</h3>
          <div className="space-y-4">
            {state === "Loading" ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : inqueries.length === 0 ? (
              <div className="text-center text-gray-500">No comments yet.</div>
            ) : (
              inqueries.map((inq, idx) => (
                <div key={inq._id} className="border-b pb-3">
                  <div className="font-semibold text-gray-800">
                    {inq.email} <span className="text-xs text-gray-500">({inq.phone})</span>
                  </div>
                  <div className="text-gray-700 mt-1">{inq.message}</div>
                  <div className="text-xs text-gray-500 mt-1 flex justify-between">
                    <span>{new Date(inq.date).toLocaleString()}</span>
                    <span>
                      {inq.isResolved ? (
                        <span className="text-green-600">Resolved</span>
                      ) : (
                        <span className="text-yellow-600">Pending</span>
                      )}
                    </span>
                  </div>
                  {inq.response && inq.response !== "No response yet" && (
                    <div className="mt-2 bg-gray-50 border-l-4 border-blue-400 p-2 text-sm text-blue-700">
                      <strong>Response:</strong> {inq.response}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          {/* Pagination placeholder */}
          <div className="flex justify-center mt-6">
            <div className="space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">1</button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">2</button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">3</button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">4</button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">5</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}