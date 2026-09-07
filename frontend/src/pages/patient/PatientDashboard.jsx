import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";

function PatientDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default PatientDashboard;