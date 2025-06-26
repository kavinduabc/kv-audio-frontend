import { FaShoppingCart, FaFacebookF, FaTwitter, FaInstagram, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from '../components/Logo'
import { BiMessageAdd } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";

export default function Header() {
  return (
    <div className="bg-[#333] text-white shadow-md">
    <header className="w-full h-[80px] bg-[#333] text-white flex justify-between items-center px-6 ">
      {/* Logo and Title */}
    <div className="flex items-center space-x-4">
        {/* <img src="/logo.png" alt="logo" className="w-[60px] h-[60px] object-contain" /> */}
        <Logo/>
      </div> 

      {/* Navigation */}
      <nav className="flex space-x-6 text-lg font-semibold">
        <Link to="/" className="hover:text-[#aaa] transition">Home</Link>
        <Link to="/gallery" className="hover:text-[#aaa] transition">Gallery</Link>
        <Link to="/contact" className="hover:text-[#aaa] transition">Contacts</Link>
        <Link to="/items" className="hover:text-[#aaa] transition">Items</Link>
      </nav>

      {/* Social + Cart */}
      <div className="flex items-center space-x-4 text-xl">
        {/* <FaFacebookF className="hover:text-[#aaa] cursor-pointer" />
        <FaTwitter className="hover:text-[#aaa] cursor-pointer" />
        <FaInstagram className="hover:text-[#aaa] cursor-pointer" /> */}

        <div className="m-2.5 flex gap-1.5">
        <Link to="/booking" className="hover:text-[#aaa]">
        <div className="flex gap-1.5 items-center border text-[18px] p-2 rounded-md">
          <FaShoppingCart />
          <h4 className="m-0.5" >Cart</h4>
          </div>
        
        </Link>

        <Link to="/login" className="hover:text-[#aaa]">
        <div className="flex gap-1.5 items-center border text-[18px] p-2 rounded-md">
          
          {/* <FaUser/> */}
          <FiLogIn/>
          <h4 className="m-0.5" >Login</h4>
         </div> 
        </Link>


         
        
        </div>
      </div>
      
    </header>

   <div className="flex justify-between items-center text-gray-500 px-10 py-2 text-lg">
  
  <div>
    <h5 className="text-sm font-medium">
      Category <span className="text-gray-700">Audio | Light</span>
    </h5>
  </div>

  
  <div className="flex gap-6 items-center">

    <div className="flex items-center gap-1">
      <FaUser className="text-[19px]"/>
      <h5 className="text-sm">User Profile</h5>
    </div>
     <h4>|</h4>

     <Link to="/inquery" className="hover:text-[#aaa]">
    <div className="flex items-center gap-1">
      <BiMessageAdd />
      <h5 className="text-sm">Message</h5>
    </div>
    </Link>
  </div>
</div>
    </div>
  );
}
