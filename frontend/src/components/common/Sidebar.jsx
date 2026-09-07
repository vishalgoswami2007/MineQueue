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
} from "lucide-react";

import logo from "../../assets/logo.png";

function Sidebar() {
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

    navigate("/logIn", {
      replace: true,
    });
  };

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white p-5 text-gray-900 transition-colors dark:border-gray-800 dark:bg-gray-950 dark:text-white">

      <div className="mb-8 flex items-center gap-2 px-2">

        <img
          src={logo}
          alt="MineQueue"
          className="h-8 w-auto"
        />

        <span className="text-lg font-bold text-gray-900 dark:text-white">
          MineQueue
        </span>

      </div>

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
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
  );
}

export default Sidebar;