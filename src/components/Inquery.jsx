import { useNavigate } from "react-router-dom";


export default function Inquery(){
     
   const [email,setEmail] = useState("");
   const [phone,setPhone] = useState("");
   const [message,setMessage] = useState("");

   const navigate = useNavigate();
   


     return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Inquiry Form</h2>
      <form className="space-y-4">
        {/* <input
          type="number"
          placeholder="Inquiry ID"
          className="w-full border p-3 rounded-md"
        /> */}
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-3 rounded-md"
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border p-3 rounded-md"
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          className="w-full border p-3 rounded-md"
        ></textarea>
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}