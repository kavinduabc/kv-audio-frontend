import { useEffect, useState } from "react";


const UserProfile = () => {

  const [user,setUser] = useState("0");
  const [loading,setLoading] = useState("false");

  useEffect(()=>{

    const token = localStorage.getItem("token");

   


  },[loading])
  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
};

export default UserProfile;

