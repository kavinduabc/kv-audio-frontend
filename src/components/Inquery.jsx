import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Inquery() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function handleInquery(e) {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    const data = {
      email,
      phone,
      message,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry`, data,{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      })
      .then((res) => {
        console.log(res);
        toast.success("Inquiry submitted successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.error || "Something went wrong");
      });
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Inquiry Form</h2>
      <form onSubmit={handleInquery} className="space-y-4">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-3 rounded-md"
          required
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-3 rounded-md"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
