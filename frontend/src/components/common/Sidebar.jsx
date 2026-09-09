import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  Building2,
  Search,
  CalendarCheck,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import logo from "../../assets/logo.png";

function Sidebar({ isOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Find Hospitals",
      icon: Building2,
      path: "/patient/hospitals",
    },
    {
      name: "Search Doctors",
      icon: Search,
      path: "/patient/searchDoctor",
    },
    {
      name: "My Appointments",
      icon: CalendarCheck,
      path: "/patient/appointments",
    },
    {
      name: "My Profile",
      icon: User,
      path: "/patient/profile",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/patient/setting",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    onClose();

    navigate("/logIn", {
      replace: true,
    });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-screen w-72 flex-col
          border-r border-gray-200
          bg-white p-5 text-gray-900
          shadow-xl transition-transform duration-300
          dark:border-gray-800 dark:bg-gray-950 dark:text-white

          md:sticky md:top-0 md:z-auto md:w-64 md:shrink-0
          md:translate-x-0 md:shadow-none

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 px-2">
            <img
              src={logo}
              alt="MineQueue"
              className="h-8 w-auto"
            />

            <span className="text-lg font-bold text-gray-900 dark:text-white">
              MineQueue
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900 md:hidden"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white"
                  }`
                }
              >
                <Icon
                  size={20}
                  className="shrink-0"
                />

                <span>
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            <LogOut
              size={20}
              className="shrink-0"
            />

            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;