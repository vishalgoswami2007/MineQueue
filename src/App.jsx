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
import PatientDashboard from "./pages/patient/PatientDashboard.jsx";
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx"

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/signup', '/logIn' ,'/forgetPassword' , '/privacy-policy', '/terms-of-service' , '/contact'];
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
        <Route path="/patientDashboard" element={<PatientDashboard/>}/>
        <Route path="/doctorDashboard" element={<DoctorDashboard/>}/>

      </Routes>
    </div>
  );
}

export default App;