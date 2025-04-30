import { useState } from "react"
import { formatDate, loadCart } from "../../Utils/Cart"
import BookingItems from "../../components/BookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage() {
    const [cart, setCart] = useState(loadCart());

    const today = formatDate(new Date());
    const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);

    //const backendurl = import.meta.env.VITE_BACKEND_URL

    function reloadCart() {
        setCart(loadCart());
    }

    function handleBookingCreation(){

        const cart = loadCart();
        
        cart.startDate= startDate;
        cart.endDate = endDate;
        const dayCount = getDayCount(startDate, endDate);
        cart.days = dayCount;

        const token = localStorage.getItem("token");
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orderes`,cart,{
            headers:{
                Authorization : `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }).then((res)=>{
            console.log(res.date);
            localStorage.removeItem("cart");
            toast.success("Booking Created");
            setCart(loadCart());
        }).catch((err)=>{
            console.error(err);
            toast.error("Faild to create booking");
        })
    }

    // Calculate day difference
    function getDayCount(start, end) {
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        const diff = (endTime - startTime) / (1000 * 60 * 60 * 24);
        return diff > 0 ? diff : 0;
    }


    return (
        <div className="w-full h-full flex flex-col items-center gap-4">
            <h1>Create Booking Page</h1>

            {/* Date Inputs */}
            <div className="flex flex-col gap-2">
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border px-2 py-1 ml-2"
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border px-2 py-1 ml-2"
                    />
                </label>
                <p className="text-sm text-gray-600">
                    Duration: {getDayCount(startDate, endDate)} day(s)
                </p>
            </div>

            {/* Booking Items */}
            <div className="w-full flex flex-col items-center">
                {cart.orderedItems.map((item) => (
                    <BookingItems
                        key={item.key}
                        productKey={item.key}
                        quantity={item.quantity}
                        refresh={reloadCart}
                    />
                ))}
            </div>

            <div className="w-full flex justify-center mt-4">
               <button className="bg-accent text-white px-4 py-2 rounded-md"
                onClick={handleBookingCreation}
               >Create Booking</button>
            </div>
        </div>
    );
}
