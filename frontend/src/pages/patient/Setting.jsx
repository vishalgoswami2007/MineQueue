import { useState } from 'react';
import { Sun, Moon, Bell, Lock, LogOut } from 'lucide-react';

function Setting() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-600 text-center">Settings</h1>
      <p className="text-gray-600 text-center mt-2 mb-10">Manage your account preferences</p>

      <div className="max-w-2xl mx-auto space-y-6">

        {/* Appearance */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon size={20} className="text-blue-600" /> : <Sun size={20} className="text-yellow-500" />}
              <span className="text-gray-700">{darkMode ? "Dark Mode" : "Light Mode"}</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition relative ${darkMode ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                  darkMode ? "left-6" : "left-0.5"
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-gray-600" />
              <span className="text-gray-700">Email Notifications</span>
            </div>
            <button className="w-12 h-6 rounded-full bg-blue-600 relative">
              <span className="absolute top-0.5 left-6 w-5 h-5 bg-white rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Security</h3>
          <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <Lock size={20} />
            <span>Change Password</span>
          </button>
        </div>

        {/* Logout */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <button className="flex items-center gap-3 text-red-500 font-medium hover:underline">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default Setting;