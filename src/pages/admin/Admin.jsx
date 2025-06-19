import React, { useEffect, useState } from 'react';
import { BsGraphDown, BsBookmarkDash } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { MdAddPhotoAlternate, MdOutlineSpeaker } from 'react-icons/md';
import { Link, Route, Routes } from 'react-router-dom';
import AItems from './AdminItem';
import AddProduct from './AddProduct';
import UpdateItems from './UpdateItemPage';
import Logo from '../../components/Logo';
import AdminUser from './AdminUser';
import AdminOrdersPage from './AdminBooking';
import AdminAddImage from './AdminAddImage'
import axios from 'axios';

const Admin = () => {
  const [userValidated, setUserValidated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      const user = res.data;
      if (user.role === "admin") {
        setUserValidated(true);
      } else {
        window.location.href = "/";
      }
    }).catch((err) => {
      console.error(err);
      setUserValidated(false);
    });
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-gray-100 text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-[230px] bg-[#2e2e2e] text-white shadow-lg flex flex-col">
        <div className="p-4">
          <Logo />
        </div>

        <nav className="mt-6 flex flex-col space-y-2 px-4">
          <AdminNavLink to="/admin/dashboard" icon={<BsGraphDown />} text="Dashboard" />
          <AdminNavLink to="/admin/booking" icon={<BsBookmarkDash />} text="Booking" />
          <AdminNavLink to="/admin/items" icon={<MdOutlineSpeaker />} text="Items" />
          <AdminNavLink to="/admin/users" icon={<FaRegUser />} text="Users" />
          <AdminNavLink to="/admin/addImage" icon={<MdAddPhotoAlternate/>} text="Add Galley"/>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-white rounded-tl-3xl shadow-inner">
        <Routes>
          <Route path="/dashboard" element={<h1 className="text-2xl font-bold">Dashboard</h1>} />
          <Route path="/booking" element={<AdminOrdersPage />} />
          <Route path="/items" element={<AItems />} />
          <Route path="/items/add" element={<AddProduct />} />
          <Route path="/items/eddit" element={<UpdateItems />} />
          <Route path="/users" element={<AdminUser />} />
          <Route path='/addImage' element={<AdminAddImage/>} />
        </Routes>
      </main>
    </div>
  );
};

// Navigation Button Component
const AdminNavLink = ({ to, icon, text }) => (
  <Link to={to}>
    <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#C6C20E] hover:text-black transition">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  </Link>
);

export default Admin;
