import { NavLink } from 'react-router-dom';
import { UserCog, CalendarDays, ClipboardList, Users, Settings, LogOut } from 'lucide-react';
import logo from '../../assets/logo.png';

function DoctorSidebar() {
  const menuItems = [
    { name: "Enhance Profile", icon: UserCog, path: "/doctor/profile" },
    { name: "My Schedule", icon: CalendarDays, path: "/doctor/schedule" },
    { name: "My Appointments", icon: ClipboardList, path: "/doctor/appointments" },
    { name: "Other Doctors", icon: Users, path: "/doctor/other-doctors" },
    { name: "Settings", icon: Settings, path: "/doctor/settings" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 min-h-screen">
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <img src={logo} alt="MineQueue" className="h-8 w-auto" />
        <span className="text-lg font-bold text-gray-900">MineQueue</span>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
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
      <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition mt-auto">
        <LogOut size={20} />
        <span>Logout</span>
      </button>

    </div>
  );
}

export default DoctorSidebar;