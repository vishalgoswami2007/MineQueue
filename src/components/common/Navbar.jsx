import { NavLink } from 'react-router-dom';   
import logo from  '../../assets/logo.png';
import {Moon ,Sun} from 'lucide-react';
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import { useNavigate, useLocation } from 'react-router-dom';


function Navbar() {

          const navigate = useNavigate();
          const location = useLocation();

        const scrollToSection = (id) => {

          if (location.pathname === '/') {
      
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
       } else {
              navigate('/');
          setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
             }, 100);
      }
   };

          const [darkMode, setDarkMode] = useState(() => {
              return localStorage.getItem('theme') === 'dark';
    });
                useEffect(() => {
                if (darkMode) {
                  document.documentElement.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  localStorage.setItem('theme', 'light');
                }
              }, [darkMode]);


  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm">
         <img 
                  src={logo}
                  alt="MineQueue" 
                  className="h-15 w-auto object-contain"
                />
                <Link to="/">
                 <h1 className="text-xl font-bold text-blue-600 cursor-pointer" >MineQueue</h1>
              </Link>
              
      <div className="flex-1 flex justify-center gap-6">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600"}
        >
          Home
        </NavLink>
            
        <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-blue-600 transition">
         Features
        </button>
 
        <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-blue-600 transition">
        How It Works
        </button>

        <NavLink 
          to="/pricing" 
          className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600"}
        >
          Pricing
        </NavLink>
      </div>
      <div>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
        {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
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