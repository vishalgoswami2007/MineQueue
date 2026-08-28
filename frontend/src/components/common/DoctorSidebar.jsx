import { NavLink } from "react-router-dom";
import {
  UserCog,
  CalendarDays,
  ClipboardList,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

import logo from "../../assets/logo.png";

function DoctorSidebar() {
  const menuItems = [
    { name: "Enhance Profile", icon: UserCog, path: "/doctor/profile" },
    { name: "My Schedule", icon: CalendarDays, path: "/doctor/schedule" },
    {
      name: "My Appointments",
      icon: ClipboardList,
      path: "/doctor/appointments",
    },
    { name: "Other Doctors", icon: Users, path: "/doctor/other-doctors" },
    { name: "Settings", icon: Settings, path: "/doctor/settings" },
  ];

  return (
    <div className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white p-6 text-gray-900 transition-colors dark:border-gray-800 dark:bg-gray-950 dark:text-white">

      {/* Logo */}
      <div className="mb-10 flex items-center gap-2">
        <img src={logo} alt="MineQueue" className="h-8 w-auto" />

        <span className="text-lg font-bold text-gray-900 dark:text-white">
          MineQueue
        </span>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-50 font-semibold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <button className="mt-auto flex items-center gap-3 rounded-lg px-4 py-3 text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default DoctorSidebar;