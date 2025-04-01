import { useState } from "react";
import "./Ssignup.css";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ firstName, lastName, email, password, address, phone });
  }

  return (
    <div className="bg-picture h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-[400px] h-[600px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col relative">
        <img src="/logo.png" alt="logo" className="w-[80px] h-[80px] object-cover" />
        <input
          type="text"
          placeholder="First Name"
          className="w-[300px] h-[50px] bg-transparent border-b-2 mt-4 border-white text-white text-2xl outline-none"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-[300px] h-[50px] bg-transparent border-b-2 mt-4 border-white text-white text-2xl outline-none"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-[300px] h-[50px] bg-transparent border-b-2 mt-4 border-white text-white text-2xl outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-[300px] h-[50px] bg-transparent border-b-2 mt-4 border-white text-white text-2xl outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="w-[300px] h-[50px] bg-transparent border-b-2 mt-4 border-white text-white text-2xl outline-none"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-[300px] h-[50px] bg-transparent border-b-2 mt-4 border-white text-white text-2xl outline-none"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="my-4 w-[300px] h-[50px] bg-[#efac38] text-2xl text-white rounded-lg">
          Sign Up
        </button>
      </form>
    </div>
  );
}