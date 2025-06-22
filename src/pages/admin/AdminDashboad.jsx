import { FaBox, FaCog, FaShoppingCart, FaUser } from "react-icons/fa";
import ADashCard from "../../components/ADashCard";
import {Line,Bar} from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);


export default function AdminDashboard(){
  //database connection and fecting data 
  const [users,setUsers] = useState();
  const [state,setState] = useState("Loading");

  useEffect(()=>{
   if(state == "Loading"){
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/cuctomerCount`,{
        headers:{
            Authorization :`Bearer ${token}`,
        }
    }).then((res)=>{
        setUsers(res.data);
        setState("success");
        console.log(res.data);
    }).catch((err)=>{
        toast.error(err?.response?.data?.error || "Error fetching Users");
        setState("error");
    })
   }
  },[])

   //duny data ...
    const dataLine = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [
    {
      label: 'Sales',
      data: [30, 40, 50],
      borderColor: 'blue',
      tension: 0.3,
    },
  ],
};

const dataBar = {
  labels: ['Product A', 'Product B', 'Product C'],
  datasets: [
    {
      label: 'Stock',
      data: [100, 80, 60],
      backgroundColor: 'orange',
    },
  ],
};

    return(
        <div className="grow p-8">
            <h2 className="text-2xl mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <ADashCard icon={<FaShoppingCart/>} title="Orders" values="140" />
                <ADashCard icon={<FaBox/>} title="Products" values="140" />
                <ADashCard icon={<FaUser/>} title="Users" values="140" />
                <ADashCard icon={<FaCog/>} title="Settings" values="140" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg  shadow-md">
                    <h3 className="text-lg font-semiblod mb-4">Sales Data</h3>
                    <Line data={dataLine} />
                </div>
                <div className="bg-white p-4 rounded-lg  shadow-md">
                    <h3 className="text-lg font-semiblod mb-4">Products Data</h3>
                    <Bar data={dataBar} />
                </div>
            </div>
        </div>
    )
}