import { useEffect, useState } from "react"
import { formatDate, loadCart } from "../../Utils/Cart"
import BookingItems from "../../components/BookingItem";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../../components/Footer"

export default function BookingPage() {
    const [cart, setCart] = useState(loadCart());

    const today = formatDate(new Date());
    const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
    const [total,setTotal] = useState(0);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);

    //const backendurl = import.meta.env.VITE_BACKEND_URL

    function reloadCart() {
        setCart(loadCart());
        calculateTotal();
    }

    function calculateTotal(){
        const cartInfo = loadCart();
        const dayCount = getDayCount(startDate, endDate);
        cartInfo.startDate = startDate;
        cartInfo.endDate = endDate;
        cartInfo.days = dayCount;
    
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quotetion`, cartInfo)
            .then((res) => {
                console.log(res.data);
                setTotal(res.data.total)
            })
            .catch((err) => {
                console.error(err);
            });
    }
    
    useEffect(()=>{
           
        calculateTotal();
    },[startDate,endDate])

    function handleBookingCreation(){

        const cart = loadCart();
        
        cart.startDate= startDate;
        cart.endDate = endDate;
        const dayCount = getDayCount(startDate, endDate);
        cart.days = dayCount;

        const token = localStorage.getItem("token");
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`,cart,{
            headers:{
                Authorization : `Bearer ${token}`,
               
            }
        }).then((res)=>{
            console.log("Cart being sent:", cart);
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
        <div className="bg-gray-100 ">
        <div className="bg-gray-100 w-full min-h-screen flex justify-center items-start py-10">
        <div className="border border-gray-300 shadow-sm w-full max-w-5xl flex flex-col items-center gap-4 p-6 rounded-md ">
            <h1 className="text-2xl font-bold text-accent">Create Booking Page</h1>

         
            <div className=" flex flex-col gap-3">
                <div className="flex gap-4">
                <label className="flex items-center p-2 border border-white ">
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border px-2 py-1 ml-2"
                    />
                </label>
                <label className="flex items-center p-2 border border-white">
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border px-2 py-1 ml-2"
                    />
                </label>
                </div>
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
                <p className="text-accent font-semibold">
                    Total : {total.toFixed(2)}
                </p>
            </div>
            <div className="w-full flex justify-center mt-4">
               <button className="bg-accent text-white px-4 py-2 rounded-md"
                onClick={handleBookingCreation}
               >Create Booking</button>
            </div>
        </div>
        </div>
        <Footer/>
        </div>
    );
}
