import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import DoctorSidebar from "../../components/common/DoctorSidebar";
import logo from "../../assets/logo.png";

function DoctorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex min-h-screen">

        <DoctorSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="min-w-0 flex-1">

          {/* Mobile Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95 md:hidden">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="MineQueue"
                className="h-8 w-auto"
              />

              <span className="font-bold text-gray-900 dark:text-white">
                MineQueue
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-gray-200 p-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
              aria-label="Open navigation menu"
            >
              <Menu size={23} />
            </button>
          </header>

          {/* Content */}
          <main className="w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;