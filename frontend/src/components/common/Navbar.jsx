import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      navigate("/");

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 150);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 transition";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={logo}
              alt="MineQueue"
              className="h-9 sm:h-10 w-auto object-contain"
            />

            <h1 className="text-lg sm:text-xl font-bold text-blue-600">
              MineQueue
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
            >
              How It Works
            </button>

            <NavLink to="/pricing" className={navLinkClass}>
              Pricing
            </NavLink>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>

            <NavLink
              to="/login"
              className="px-4 py-2 text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 transition"
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

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun size={21} className="text-yellow-500" />
              ) : (
                <Moon
                  size={21}
                  className="text-gray-600 dark:text-gray-300"
                />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-5 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col gap-1">

              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`
                }
              >
                Home
              </NavLink>

              <button
                onClick={() => scrollToSection("features")}
                className="text-left px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                Features
              </button>

              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                How It Works
              </button>

              <NavLink
                to="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`
                }
              >
                Pricing
              </NavLink>

              <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-4 py-3 text-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </NavLink>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;