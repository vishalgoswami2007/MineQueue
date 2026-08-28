import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';

function PatientDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default PatientDashboard;