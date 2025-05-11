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
    <div>
      <h2>{user.firstname} {user.lastname}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phoneNumber}</p>
    </div>
  );
};

export default UserProfile;
