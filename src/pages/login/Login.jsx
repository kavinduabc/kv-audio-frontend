import { useState } from "react";
import "./Login.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Ensure Toaster is included
import { useNavigate } from "react-router-dom";

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
    <div className="m-5 flex h-screen w-full shadow-2xl">
    {/* Left Panel */}
    <div className="bg-picture hidden md:flex w-1/2 bg-gradient-to-br items-center justify-center text-white px-10">
      <div>
        <div className="mb-6">
          <div className="text-2xl font-bold mb-2">YOUR LOGO</div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Hello, welcome!</h1>
        <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi risus.</p>
      </div>
    </div>
  
    {/* Right Panel (Login Form) */}
    <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
      <form
        onSubmit={login}
        className="bg-white p-10 rounded-lg shadow-lg w-[350px]"
      >
        <Toaster />
  
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
  
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
  
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
  
        <div className="flex justify-between items-center mb-4 text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
        </div>
  
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
  
        <button
          type="button"
          className="w-full py-3 mt-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
        >
          Sign up
        </button>
  
        <div className="mt-6 text-center text-sm text-gray-500">
          FOLLOW
          <div className="flex justify-center gap-4 mt-2 text-blue-600">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </form>
    </div>
  </div>
  
  );
}
