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

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
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
    <div className="bg-picture w-full h-screen flex justify-center items-center">
      <Toaster /> {/* Ensure Toaster is included to show toast notifications */}
      <form onSubmit={login}>
        <div
          className="w-[400px] h-[400px] backdrop-blur-xl rounded-2xl flex justify-center
           items-center flex-col relative"
        >
          <img src="/logo.png" alt="logo" className="w-[80px] h-[80px] object-cover" />
          <input
            type="email"
            placeholder="Email"
            className="w-[300px] h-[50px] bg-transparent border-b-2 mt-6 border-white text-white text-2xl outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-[300px] h-[50px] bg-transparent border-b-2 mt-6 border-white text-white text-2xl outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="my-8 w-[300px] h-[50px] bg-[#efac38] text-2xl text-white rounded-lg">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
