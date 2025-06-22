import { FaBox, FaCog, FaShoppingCart, FaUser } from "react-icons/fa";
import ADashCard from "../../components/ADashCard";
import { Line, Bar } from "react-chartjs-2";
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

export default function AdminDashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [monthlyOrders,setMonthlyOrders]=useState({labels:[],datasets:[]});
  const [productCount, setProductCount] = useState(0);
  const [state, setState] = useState("Loading");

  useEffect(()=>{
   if(state == "Loading"){
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/customerCount`,{
        headers:{
            Authorization :`Bearer ${token}`,
        }
    }).then((res)=>{
        setCustomerCount(res.data.customerCount);
        setState("success");
        console.log(res.data);
    }).catch((err)=>{
        toast.error(err?.response?.data?.error || "Error fetching Users");
        setState("error");
    })
   }
  },[])

  useEffect(()=>{
    const token = localStorage.getItem("token");

     axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/orderCount`,{
            headers:{
                Authorization:`Bearer ${token}`,
            },
        }).then((res)=>{
            setOrderCount(res.data.totalOrders);
            setState("Success");
            console.log("order count:", res.data.totalOrders);
        }).catch((err)=>{
            toast.error(err?.response?.data?.error || "Error fetch order count");
            setState(err);
        })

  },[])

   useEffect(()=>{
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/productCount`,{
        headers:{
            Authorization:`Bearer ${token}`
        },
    }).then((res)=>{
        setProductCount(res.data.totalProducts);
        console.log("Product count:",res.data.totalProducts)
        setState("success");
    }).catch((err)=>{
        toast.error(err?.response?.data?.error || "Error fetchin the total product ");
        setState(err);
    })

  },[])

  const dataLine = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Sales",
        data: [30, 40, 50],
        borderColor: "blue",
        tension: 0.3,
      },
    ],
  };

  const dataBar = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        label: "Stock",
        data: [100, 80, 60],
        backgroundColor: "orange",
      },
    ],
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ADashCard icon={<FaShoppingCart />} title="Orders" value={orderCount} />
        <ADashCard icon={<FaBox />} title="Products" value={productCount} />
        <ADashCard icon={<FaUser />} title="Users" value={customerCount} />
        <ADashCard icon={<FaCog />} title="Settings" value="140" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Oders Dependencies</h3>
          <Line data={dataLine} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Products Data</h3>
          <Bar data={dataBar} />
        </div>
      </div>
    </div>
  );
}
