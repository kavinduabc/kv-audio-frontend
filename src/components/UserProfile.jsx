import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className='w-full p-1 h-screen flex flex-col '>
     <div className='w-[25%] h-full bg-gray-100'>
       <div>
       <img src={`http://localhost:3000/uploads/${user.profilePicture}`} alt="Profile" /> 
       </div>
       <div>
       <h2>{user.firstname} {user.lastname}</h2>
       <p>Email: {user.email}</p>
       <p>Phone: {user.phoneNumber}</p>
       </div>
     </div>
    
      
    </div>
  );
};

export default UserProfile;
