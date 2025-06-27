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
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Inquiry submitted successfully");
        setEmail("");
        setPhone("");
        setMessage("");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Something went wrong");
      });
  }

  return (
    <form onSubmit={handleInquery} className="space-y-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <input
          type="email"
          placeholder="Name or Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border p-2 rounded mb-2 md:mb-0"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 border p-2 rounded"
          required
        />
      </div>
      <textarea
        placeholder="Comment"
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border p-2 rounded"
        required
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Post Comment
      </button>
    </form>
  );
}