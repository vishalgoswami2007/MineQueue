import { Outlet } from "react-router-dom";
import DoctorSidebar from "../../components/common/DoctorSidebar";

function DoctorDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorSidebar />

      <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DoctorDashboard;