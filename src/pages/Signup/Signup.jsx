import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    <div className="m-5 flex h-screen w-full rounded-3xl overflow-hidden shadow-2xl">
      {/* Left Panel */}
      <div className="bg-[#003F4E] hidden md:flex w-1/2 items-center justify-center text-white px-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="mb-6 text-sm">Provide your personal details to use all features</p>
          <button className="border border-white py-2 px-6 rounded font-semibold hover:bg-white hover:text-[#003F4E] transition">
            SIGN IN
          </button>
        </div>
      </div>

      {/* Right Panel with Glassmorphic Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-picture">
        <form
          onSubmit={handleSubmit}
          className="w-[400px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col p-6"
        >
          <img src="/logo.png" alt="logo" className="w-[80px] h-[80px] object-cover mb-4" />

          <input
            type="text"
            placeholder="First Name"
            className="w-full h-[50px] bg-transparent border-b-2 border-white  text-xl outline-none mb-4"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full h-[50px] bg-transparent border-b-2 border-white  text-xl outline-none mb-4"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[50px] bg-transparent border-b-2 border-white  text-xl outline-none mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[50px] bg-transparent border-b-2 border-white  text-xl outline-none mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full h-[50px] bg-transparent border-b-2 border-white  text-xl outline-none mb-4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full h-[50px] bg-transparent border-b-2 border-white  text-xl outline-none mb-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <select
            className="w-full h-[50px] bg-transparent border-b-2 border-white  text-xl outline-none mb-6"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="customer" className="text-black">Customer</option>
            <option value="admin" className="text-black">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full h-[50px] bg-[#efac38] text-xl  rounded-lg hover:bg-yellow-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
