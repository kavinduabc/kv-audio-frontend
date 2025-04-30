import { useState } from "react"
import { loadCart } from "../../Utils/Cart"
import BookingItems from "../../components/BookingItem";


export default function BookingPage(){

    const [cart,setCart] = useState(loadCart());

    //** creating function for reloading the cart */
    function reloadCart(){
        setCart(loadCart());
    }
    return(

        <div className="w-full h-full flex flex-col items-center">
            <h1>Create Booking Page</h1>
             <div className="w-full flex flex-col items-center">
               {
                cart.orderedItems.map((item)=>{
                    return <BookingItems productKey={item.key} quantity={item.quantity} refresh={reloadCart} />
                })
               }
             </div>
        
        </div>
    )
}