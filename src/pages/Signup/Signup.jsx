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
    <div
  className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
  style={{ backgroundImage: "url('LoginSignUp.jpg')" }}
>
  <div className="w-full max-w-lg bg-[#00000099] backdrop-blur-md text-white rounded-2xl shadow-2xl p-8">
    <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Fields */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-1/2 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-1/2 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
          required
        />
      </div>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
        required
      />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
        required
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
        required
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>

      <input
        type="file"
        onChange={(e) => setUserImage(e.target.files[0])}
        className="w-full px-4 py-2 rounded-lg bg-white text-black border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <button
        type="submit"
        className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition duration-300"
      >
        SIGN UP
      </button>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-yellow-400 font-semibold hover:underline">
          Sign in here
        </Link>
      </p>
    </form>
  </div>
</div>

  );
}
