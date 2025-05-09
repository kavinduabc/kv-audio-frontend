import { useState } from "react";
import axios from "axios";
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

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        address,
        phoneNumber: phone,
        role,
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
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
       
        <div className="bg-[#2E2E2E] text-white flex flex-col items-center justify-center p-10 hidden md:flex">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-sm mb-6 text-center">
            Already have an account? Sign in to explore KV Audio.
          </p>
          <Link to="/login">
            <button className="bg-white text-[#2E2E2E] px-6 py-2 rounded font-semibold hover:bg-accent hover:text-white transition">
              SIGN IN
            </button>
          </Link>
        </div>

      
        <div className="flex flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold text-[#2E2E2E] mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              className="w-full py-2 bg-accent text-white font-semibold rounded hover:opacity-90 transition"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
