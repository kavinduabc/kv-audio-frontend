import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("UserProfile fetch error:", err.response || err.message || err);
        setError(err.response?.data?.error || err.response?.data?.message || "Failed to load user");
        setLoading(false);
      });
  }, [email, navigate]);

  

  useEffect(() => {
    // fetch user's own orders
    const token = localStorage.getItem("token");
    if (!token) return;
    setOrdersLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        // sort descending by orderDate
        data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(data);
      })
      .catch((e) => {
        console.error("Orders fetch error:", e.response || e.message || e);
      })
      .finally(() => setOrdersLoading(false));
  }, [user]);

  function resolveProfilePicture(pic) {
    if (!pic) return "https://via.placeholder.com/160?text=No+Image";
    if (typeof pic === "string" && pic.startsWith("http")) return pic;
    return `${import.meta.env.VITE_BACKEND_URL}/uploads/${pic}`;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <div className="animate-pulse bg-white p-6 rounded-lg shadow w-full max-w-2xl">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <div className="flex justify-center gap-2">
            <Link to="/" className="px-4 py-2 bg-gray-200 rounded">Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-6">
          <img
            src={resolveProfilePicture(user?.profilePicture)}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover border border-gray-200"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.firstname || "-"} {user?.lastname || ""}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                {user?.role || "customer"}
              </span>
              {user?.phoneNumber && (
                <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs">{user.phoneNumber}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h3 className="text-sm text-gray-500">Address</h3>
            <p className="mt-1 text-gray-800">{user?.address || "Not provided"}</p>
            <h3 className="text-sm text-gray-500 mt-4">Member</h3>
            <p className="mt-1 text-gray-800">{user?._id ? user._id.substring(0, 8) : "-"}</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-100 rounded-md text-gray-800">Back</button>
              <button onClick={() => setEditOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Edit Profile</button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Order History</h3>
            {ordersLoading ? (
              <div className="space-y-3">
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
              </div>
            ) : orders.length === 0 ? (
              <p className="text-sm text-gray-500">No orders found.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <OrderCard key={o.orderId} order={o} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    {editOpen && (
      <EditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
        email={email}
        onSaved={(u) => setUser(u)}
      />
    )}
    </>
  );
};

export default UserProfile;

function OrderCard({ order }) {
  const [open, setOpen] = useState(false);

  function fmt(dateStr) {
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return dateStr;
    }
  }

  return (
    <div className="border rounded-lg p-3 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{order.orderId}</div>
          <div className="text-sm text-gray-700">Placed: {fmt(order.orderDate)}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-2 py-1 rounded-full text-xs ${order.status === 'approved' ? 'bg-green-50 text-green-700' : order.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
            {order.status}
          </div>
          <div className="text-sm font-semibold">LKR{order.totalPrice?.toFixed ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
          <button onClick={() => setOpen((s) => !s)} className="px-3 py-1 bg-gray-100 rounded">{open ? 'Hide' : 'Details'}</button>
        </div>
      </div>
      {open && (
        <div className="mt-3 border-t pt-3">
          <div className="text-sm text-gray-600">Duration: {order.days} day(s)</div>
          <div className="text-sm text-gray-600">From: {fmt(order.startingDate)} To: {fmt(order.endingDate)}</div>
          <div className="mt-2">
            {order.orderedItems.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <img src={it.product.image} alt="p" className="w-12 h-12 object-cover rounded" />
                  <div>
                    <div className="text-sm font-medium">{it.product.name}</div>
                    <div className="text-xs text-gray-500">Qty: {it.quantity}</div>
                  </div>
                </div>
                <div className="text-sm font-semibold">LKR{it.product.price}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Edit Modal markup and logic placed at end to avoid cluttering main return
function EditModal({ open, onClose, user, email, onSaved }) {
  const [firstName, setFirstName] = useState(user?.firstname || "");
  const [lastName, setLastName] = useState(user?.lastname || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [file, setFile] = useState(null);
  useEffect(() => {
    setFirstName(user?.firstname || "");
    setLastName(user?.lastname || "");
    setAddress(user?.address || "");
    setPhone(user?.phoneNumber || "");
    setFile(null);
  }, [user]);

  if (!open) return null;

  async function handleSave() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const form = new FormData();
      form.append("firstname", firstName);
      form.append("lastname", lastName);
      form.append("address", address);
      form.append("phoneNumber", phone);
      if (file) form.append("profilePicture", file);

      const targetEmail = email || user?.email;
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/${targetEmail}`, form, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data?.message || "Profile updated");
      onSaved && onSaved(res.data.user);
      onClose();
    } catch (e) {
      console.error("Profile update failed:", e.response || e.message || e);
      toast.error(e.response?.data?.error || e.message || "Update failed");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className="border p-2 rounded" />
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className="border p-2 rounded" />
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="border p-2 rounded md:col-span-2" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="border p-2 rounded" />
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border p-2 rounded md:col-span-2" />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
