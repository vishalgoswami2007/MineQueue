import { NavLink } from 'react-router-dom';   
import logo from  '../../assets/logo.png';
import {Moon} from 'lucide-react';


function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm">
         <img 
                  src={logo}
                  alt="MineQueue" 
                  className="h-15 w-auto object-contain"
                />
      <h1 className="text-xl font-bold text-blue-600 cursor-pointer">MineQueue</h1>

      <div className="flex-1 flex justify-center gap-6">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600"}
        >
          Home
        </NavLink>

         <NavLink 
          to="/Features" 
          className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600"}
        >
          Features
        </NavLink>

         <NavLink 
          to="/HowItsWork" 
          className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600"}
        >
          How It Works
        </NavLink>

        <NavLink 
          to="/pricing" 
          className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600"}
        >
          Pricing
        </NavLink>
      </div>
      <div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
                  <Moon size={20} className="text-gray-600" />
        </button>
      </div>
         <div>
            <NavLink 
                to="/login" 
                className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition"
            >
                   Login
            </NavLink>

            <NavLink 
                to="/signup" 
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition"
            >
                  Sign Up
            </NavLink>
         </div>
    </nav>
  );
}

export default Navbar;