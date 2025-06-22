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
  const [monthlyOrders, setMonthlyOrders] = useState({ labels: [], datasets: [] });
  const [productCount, setProductCount] = useState(0);
  const [state, setState] = useState("Loading");

  useEffect(() => {
    if (state === "Loading") {
      const token = localStorage.getItem("token");
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/customerCount`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCustomerCount(res.data.customerCount);
          setState("success");
          console.log("Customer Count:", res.data.customerCount);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "Error fetching Users");
          setState("error");
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/orderCount`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const orders = res.data.monthlyOrders || [];

        setMonthlyOrders({
         labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],

          datasets: [
            {
              label: "Monthly Orders",
              data: orders,
              borderColor: "blue",
              backgroundColor: "rgba(0,0,255,0.1)",
              tension: 0.3,
              fill: true,
            }
          ]
        });

        setOrderCount(res.data.totalOrders);
        console.log("Order count:", res.data.totalOrders);
        console.log("Monthly Orders:",res.data.monthlyOrders);
        setState("success");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Error fetching order count");
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/productCount`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProductCount(res.data.totalProducts);
        console.log("Product count:", res.data.totalProducts);
        setState("success");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Error fetching product count");
        setState(err);
      });
  }, []);

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
          <h3 className="text-lg font-semibold mb-4">Orders by Month</h3>
          <Line data={monthlyOrders} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Products Data</h3>
          <Bar data={dataBar} />
        </div>
      </div>
    </div>
  );
}
