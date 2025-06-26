import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");
  const [userImage, setUserImage] = useState(null);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("phoneNumber", phone);
    formData.append("role", role);
    formData.append("profilePicture", userImage);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Registration Success");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "An error occurred");
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col items-center justify-center bg-[#2E2E2E] text-white p-10 space-y-4">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="text-sm text-center">Already have an account? Sign in to explore KV Audio.</p>
          <Link to="/login">
            <button className="mt-4 bg-white text-[#2E2E2E] px-6 py-2 rounded-md font-semibold hover:bg-orange-500 hover:text-white transition duration-200">
              SIGN IN
            </button>
          </Link>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold text-[#2E2E2E] mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            {/* Name Fields */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />

            {/* Address */}
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />

            {/* Phone Number */}
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />

            {/* Role */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>

            {/* File Upload */}
            <input
              type="file"
              onChange={(e) => setUserImage(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-orange-500 outline-none"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition duration-200"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
c:\Users\USER\Downloads\abstract-secure-technology-background\3139256.jpg