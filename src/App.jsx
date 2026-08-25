import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import Signup from './pages/Signup';
import LogIn from "./pages/login.jsx";
import ForgetPassword from './pages/ForgetPassword.jsx';
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx"
import TermsOfService from './pages/TermsOfService.jsx';
import Contactus from "./pages/Contactus.jsx"
import PatientDashboard from './pages/patient/PatientDashboard.jsx';
import FindHospitals from './pages/patient/FindHospitals.jsx';
import MyAppointments from './pages/patient/MyAppointments.jsx';
import SearchDoctor from './pages/patient/SearchDoctors.jsx'
import MyProfile from './pages/patient/MyProfile.jsx';
import Setting from './pages/patient/Setting.jsx';
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx';
import EnhanceProfile from './pages/doctor/EnhanceProfile.jsx';
import MySchedule from './pages/doctor/MySchedule.jsx';
import MyAppointment from './pages/doctor/MyAppointments.jsx';
import OtherDoctors from './pages/doctor/OtherDoctors.jsx';
import Settings from './pages/doctor/Settings.jsx'

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/signup', '/logIn' ,'/forgetPassword' , '/privacy-policy', '/terms-of-service' , '/contact' , '/patient' , '/doctor', '/hospitals'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logIn" element={<LogIn/>}/>
        <Route path='/forgetPassword' element={<ForgetPassword/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />}/>
        <Route path="/contact" element={<Contactus/>}/>
        <Route path="/patient" element={<PatientDashboard />}>
              <Route path="hospitals" element={<FindHospitals />} />
              <Route path="searchDoctor" element={<SearchDoctor/>}/>
              <Route path="appointments" element={<MyAppointments />} />
              <Route path="profile" element={<MyProfile />} />
              <Route path="setting" element={<Setting />} />
         </Route>
         <Route path="/doctor" element={<DoctorDashboard />}>
              <Route path="profile" element={<EnhanceProfile />} />
              <Route path="schedule" element={<MySchedule />} />
              <Route path="appointments" element={<MyAppointment />} /> 
              <Route path="other-doctors" element={<OtherDoctors />} />
              <Route path="settings" element={<Settings />} />
         </Route>
        
   </Routes>
    </div>
  );
}

export default App;