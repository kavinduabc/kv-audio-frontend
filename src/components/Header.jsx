import { FaShoppingCart, FaFacebookF, FaTwitter, FaInstagram, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from '../components/Logo'

export default function Header() {
  return (
    <header className="w-full h-[80px] bg-[#333] text-white flex justify-between items-center px-6 shadow-md">
      {/* Logo and Title */}
    <div className="flex items-center space-x-4">
        {/* <img src="/logo.png" alt="logo" className="w-[60px] h-[60px] object-contain" /> */}
        <Logo/>
      </div> 

      {/* Navigation */}
      <nav className="flex space-x-6 text-lg font-semibold">
        <Link to="/" className="hover:text-[#aaa] transition">Home</Link>
        <Link to="/about" className="hover:text-[#aaa] transition">Gallery</Link>
        <Link to="/contact" className="hover:text-[#aaa] transition">Contacts</Link>
        <Link to="/items" className="hover:text-[#aaa] transition">Items</Link>
      </nav>

      {/* Social + Cart */}
      <div className="flex items-center space-x-4 text-xl">
        <FaFacebookF className="hover:text-[#aaa] cursor-pointer" />
        <FaTwitter className="hover:text-[#aaa] cursor-pointer" />
        <FaInstagram className="hover:text-[#aaa] cursor-pointer" />

        <div className="m-2.5 flex gap-1.5">
        <Link to="/booking" className="hover:text-[#aaa]">
          <FaShoppingCart />
        </Link>
        <Link to="/login" className="hover:text-[#aaa]">
          <FaUser/>
        </Link>
        </div>
      </div>
    </header>
  );
}
