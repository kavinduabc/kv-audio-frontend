import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer'

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [order,setOrder] = useState(null);
  const [loadingOrder,setLoadingOrder] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const decoded = jwtDecode(token);
        const email = decoded.email;

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/up/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (loading) fetchUser();
  }, [loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
    <div className='w-full p-1 h-screen flex flex-col '>
     <div className="w-[25%] h-full bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center gap-4">
    <img
    src={`http://localhost:3000/uploads/${user.profilePicture}`}
    alt="Profile"
    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
    />
    <div className="text-center space-y-1">
    <h2 className="text-xl font-semibold text-gray-800">{user.firstname} {user.lastname}</h2>
    <p className="text-sm text-gray-600">📧 {user.email}</p>
    <p className="text-sm text-gray-600">🏠 {user.address}</p>
    <p className="text-sm text-gray-600">📞 {user.phoneNumber}</p>
    </div>
</div>

    
      
    </div>
    <Footer/>
    </>
  );
};

export default UserProfile;
