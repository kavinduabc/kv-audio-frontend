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
      toast.success("Login successful!");
      localStorage.setItem("token", res.data.token);
      const user = res.data.user;
      navigate(user.role === "admin" ? "/admin/" : "/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed. Try again.");
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('lsBackground.jpg')" }}
    >
      <Toaster />
      <div className="flex flex-col justify-center items-center p-10 bg-[#00000099] rounded-2xl shadow-2xl backdrop-blur-md w-full max-w-md text-white">
  <h2 className="text-3xl md:text-4xl font-bold mb-6">Sign In</h2>

  <form onSubmit={login} className="w-full space-y-5">
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
      required
    />

    <button
      type="submit"
      className="w-full py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition duration-300"
    >
      LOGIN
    </button>

    <button
      type="button"
      className="w-full flex items-center justify-center gap-2 border border-white text-white py-2 rounded-lg hover:bg-white hover:text-black transition duration-300"
    >
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" className="w-5 h-5" />
      Login with Google
    </button>

    <p className="text-sm text-center mt-4">
      Are you new to KV Audio?{" "}
      <Link to="/signup" className="text-yellow-400 font-semibold hover:underline">
        Register here
      </Link>
    </p>
  </form>
</div>

</div>
  );
}
