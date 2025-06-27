import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setUsers(res.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			} finally {
				setLoading(false);
			}
		};

		if (loading) fetchUsers();
	}, [loading]);

	const handleBlockUser = (email) => {
		const token = localStorage.getItem("token");
		axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`, {}, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(() => setLoading(true))
		.catch((err) => console.error(err));
	};

	return (
		<div className="w-full h-full bg-gray-100 p-6">
			<div className="mb-6 flex justify-between items-center">
				<h2 className="text-2xl font-semibold text-gray-800">Manage Users</h2>
			</div>

			{loading ? (
				<div className="flex justify-center items-center my-12">
					<div className="border-4 border-b-blue-500 rounded-full animate-spin w-16 h-16"></div>
				</div>
			) : (
				<div className="overflow-x-auto bg-white p-5 shadow-lg rounded-lg">
					<table className="w-full table-auto text-sm text-left">
						<thead className="bg-gray-100 text-gray-700 uppercase">
							<tr>
								<th className="px-4 py-3">Profile</th>
								<th className="px-4 py-3">Name</th>
								<th className="px-4 py-3">Email</th>
								<th className="px-4 py-3">Role</th>
								<th className="px-4 py-3">Phone</th>
								<th className="px-4 py-3">Address</th>
								<th className="px-4 py-3">Status</th>
							</tr>
						</thead>
						<tbody>
							{users.length > 0 ? (
								users.map((user) => (
									<tr key={user._id} className="border-b hover:bg-gray-50">
										<td className="px-4 py-3">
										<img
                                         src={user.profilePicture || "https://via.placeholder.com/50"}
                                         alt="Profile"
                                         className="w-10 h-10 rounded-full object-cover"
                                        />
										</td>
										<td className="px-4 py-3">
											{user.firstname} {user.lastname}
										</td>
										<td className="px-4 py-3">{user.email}</td>
										<td className="px-4 py-3 capitalize">{user.role}</td>
										<td className="px-4 py-3">{user.phone || user.phoneNumber}</td>
										<td className="px-4 py-3">{user.address}</td>
										<td className="px-4 py-3">
											<button
												onClick={() => handleBlockUser(user.email)}
												className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
													user.isBlocked
														? "bg-red-100 text-red-700 hover:bg-red-200"
														: "bg-green-100 text-green-700 hover:bg-green-200"
												}`}
											>
												{user.isBlocked ? "BLOCKED" : "ACTIVE"}
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="7" className="text-center py-6 text-gray-500">
										No users found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
