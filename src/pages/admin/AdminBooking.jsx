import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeOrder, setActiveOrder] = useState(null);
	const [modalOpened, setModalOpened] = useState(false);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setOrders(res.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		if (loading) fetchOrders();
	}, [loading]);

	const handleOrderStatusChange = (orderId, status) => {
		const token = localStorage.getItem("token");
		axios
			.put(
				`${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
				{ status },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then(() => {
				setModalOpened(false);
				setLoading(true);
			})
			.catch((err) => {
				console.error(err);
				setLoading(true);
			});
	};

	return (
		<div className="w-full p-6">
			<h2 className="text-2xl font-semibold mb-6 text-gray-800">Manage Orders</h2>

			{loading ? (
				<div className="flex justify-center items-center my-12">
					<div className="border-4 border-b-blue-500 rounded-full animate-spin w-16 h-16"></div>
				</div>
			) : (
				<div className="overflow-x-auto bg-white shadow-lg rounded-lg">
					<table className="w-full table-auto text-sm text-left">
						<thead className="bg-gray-100 text-gray-700 uppercase">
							<tr>
								<th className="px-4 py-3">Order ID</th>
								<th className="px-4 py-3">Email</th>
								<th className="px-4 py-3">Days</th>
								<th className="px-4 py-3">Start</th>
								<th className="px-4 py-3">End</th>
								<th className="px-4 py-3">Total</th>
								<th className="px-4 py-3">Status</th>
								<th className="px-4 py-3">Order Date</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr
									key={order._id}
									className="border-b hover:bg-gray-50 cursor-pointer"
									onClick={() => {
										setActiveOrder(order);
										setModalOpened(true);
									}}
								>
									<td className="px-4 py-3">{order.orderId}</td>
									<td className="px-4 py-3">{order.email}</td>
									<td className="px-4 py-3">{order.days}</td>
									<td className="px-4 py-3">
										{new Date(order.startingDate).toLocaleDateString()}
									</td>
									<td className="px-4 py-3">
										{new Date(order.endingDate).toLocaleDateString()}
									</td>
									<td className="px-4 py-3">₹{order.totalPrice.toFixed(2)}</td>
									<td className="px-4 py-3">
										<span
											className={`px-3 py-1 text-xs font-medium rounded-full ${
												order.status === "approved"
													? "bg-green-100 text-green-700"
													: order.status === "Rejected"
													? "bg-red-100 text-red-700"
													: "bg-yellow-100 text-yellow-700"
											}`}
										>
											{order.status}
										</span>
									</td>
									<td className="px-4 py-3">
										{new Date(order.orderDate).toLocaleDateString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{modalOpened && (
				<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="w-[500px] bg-white p-6 rounded-lg shadow-xl relative">
						<IoMdCloseCircleOutline
							className="absolute top-3 right-3 text-3xl text-gray-600 cursor-pointer hover:text-red-600"
							onClick={() => setModalOpened(false)}
						/>

						<h3 className="text-xl font-semibold mb-4">Order Details</h3>
						<div className="space-y-2 text-sm text-gray-800">
							<p><strong>Order ID:</strong> {activeOrder.orderId}</p>
							<p><strong>Email:</strong> {activeOrder.email}</p>
							<p><strong>Days:</strong> {activeOrder.days}</p>
							<p><strong>Start:</strong> {new Date(activeOrder.startingDate).toLocaleDateString()}</p>
							<p><strong>End:</strong> {new Date(activeOrder.endingDate).toLocaleDateString()}</p>
							<p><strong>Total:</strong> ₹{activeOrder.totalPrice.toFixed(2)}</p>
							<p><strong>Status:</strong> {activeOrder.status}</p>
							<p><strong>Order Date:</strong> {new Date(activeOrder.orderDate).toLocaleDateString()}</p>
						</div>

						<div className="flex justify-center gap-4 mt-5">
							<button
								onClick={() => handleOrderStatusChange(activeOrder.orderId, "approved")}
								className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
							>
								Approve
							</button>
							<button
								onClick={() => handleOrderStatusChange(activeOrder.orderId, "Rejected")}
								className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
							>
								Reject
							</button>
						</div>

						<h4 className="mt-6 font-semibold">Items</h4>
						<table className="w-full mt-2 text-sm border-t">
							<thead>
								<tr className="text-left">
									<th className="py-2">Image</th>
									<th>Name</th>
									<th>Qty</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								{activeOrder.orderedItems.map((item) => (
									<tr key={item.product.key} className="border-t">
										<td className="py-2">
											<img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded" />
										</td>
										<td>{item.product.name}</td>
										<td>{item.quantity}</td>
										<td>₹{item.product.price}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
}
