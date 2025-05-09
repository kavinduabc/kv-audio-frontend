import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  async function login(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendurl}/api/users/login`, {
        email,
        password,
      });
      toast.success("Login success");
      localStorage.setItem("token", res.data.token);
      const user = res.data.user;
      navigate(user.role === "admin" ? "/admin/" : "/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]">
      <Toaster />
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
       
        <div className="bg-[#2E2E2E] text-white flex flex-col items-center justify-center p-10 hidden md:flex">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-sm mb-6 text-center">
            Sign in to access your dashboard and continue exploring KV Audio.
          </p>
          <Link to="/signup">
            <button className="bg-white text-[#2E2E2E] px-6 py-2 rounded font-semibold hover:bg-accent hover:text-white transition">
              SIGN UP
            </button>
          </Link>
        </div>

       
        <div className="flex flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold text-[#2E2E2E] mb-6">Sign In</h2>

          <form onSubmit={login} className="w-full max-w-xs space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none bg-gray-100"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none bg-gray-100"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-accent text-white font-semibold rounded hover:opacity-90 transition"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
