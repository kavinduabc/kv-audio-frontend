import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Ensure Toaster is included
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    console.log(email, password);

    //** import backend url in env */
    const backendurl = import.meta.env.VITE_BACKEND_URL

    try {
      //** `${backendurl}/api/user/login` */
      const res = await axios.post(backendurl + "/api/users/login", {
        email,
        password,
      });

      console.log(res);
      toast.success("Login success");
      const user = res.data.user;

      /** save token in localstorage  */
      localStorage.setItem("token",res.data.token)

      if (user.role === "admin") {
        navigate("/admin/");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="m-5 flex h-screen w-full rounded-3xl overflow-hidden shadow-2xl">
    {/* Left Panel */}
    <div className="bg-[#003F4E] hidden md:flex w-1/2 items-center justify-center text-white px-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p className="mb-6 text-sm">Provide your personal details to use all features</p>
        <Link to='/signup'>
        <button className="border border-white py-2 px-6 rounded font-semibold hover:bg-white hover:text-[#003F4E] transition">
          SIGN UP
        </button>
        </Link>
      </div>
    </div>
  
    {/* Right Panel */}
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-10">
      <h2 className="text-3xl font-bold mb-4">SIGN IN</h2>
  
      {/* Social Icons */}
      <div className="flex gap-4 mb-6">
        {["G+", "f", <i className="fab fa-github" />, <i className="fab fa-linkedin-in" />].map((icon, i) => (
          <button
            key={i}
            className="border border-gray-400 text-gray-700 w-10 h-10 flex items-center justify-center rounded"
          >
            {icon}
          </button>
        ))}
      </div>
  
      <p className="text-sm mb-4 font-medium">OR</p>
      <p className="text-xs text-gray-600 mb-4">Fill Out The Following Info For sign in</p>
  
      <form onSubmit={login} className="w-full max-w-[300px] space-y-4">
       
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded bg-gray-100"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded bg-gray-100"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#C6C20E] text-white font-semibold rounded hover:opacity-90 transition"
        >
          SIGN IN
        </button>
      </form>
    </div>
  </div>
  )
}
