import { Outlet } from 'react-router-dom';
import DoctorSidebar from '../../components/common/DoctorSidebar';

function DoctorDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <DoctorSidebar />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default DoctorDashboard;