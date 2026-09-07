import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/common/Navbar";

import LandingPage from "./pages/LandingPage";
import PricingPage from "./pages/PricingPage";
import Signup from "./pages/Signup";
import LogIn from "./pages/login.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import Contactus from "./pages/Contactus.jsx";

import PatientDashboard from "./pages/patient/PatientDashboard.jsx";
import FindHospitals from "./pages/patient/FindHospitals.jsx";
import MyAppointments from "./pages/patient/MyAppointments.jsx";
import SearchDoctor from "./pages/patient/SearchDoctors.jsx";
import DoctorsList from "./pages/patient/DoctorsList.jsx";
import DoctorsProfile from "./pages/patient/DoctorProfile.jsx";
import BookAppointment from "./pages/patient/BookAppointment.jsx";
import MyProfile from "./pages/patient/MyProfile.jsx";
import Setting from "./pages/patient/Setting.jsx";

import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";
import EnhanceProfile from "./pages/doctor/EnhanceProfile.jsx";
import MySchedule from "./pages/doctor/MySchedule.jsx";
import DoctorAppointments from "./pages/doctor/MyAppointments.jsx";
import OtherDoctors from "./pages/doctor/OtherDoctors.jsx";
import Settings from "./pages/doctor/Settings.jsx";

function App() {
  const location = useLocation();

  const dashboardRoute =
    location.pathname.startsWith("/patient") ||
    location.pathname.startsWith("/doctor");

  const authOrStandaloneRoute = [
    "/signup",
    "/logIn",
    "/forgetPassword",
    "/privacy-policy",
    "/terms-of-service",
    "/contact",
  ].includes(location.pathname);

  const shouldHideNavbar =
    dashboardRoute || authOrStandaloneRoute;

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/pricing"
          element={<PricingPage />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/logIn"
          element={<LogIn />}
        />

        <Route
          path="/forgetPassword"
          element={<ForgetPassword />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms-of-service"
          element={<TermsOfService />}
        />

        <Route
          path="/contact"
          element={<Contactus />}
        />

        {/* Patient Dashboard */}
        <Route
          path="/patient"
          element={<PatientDashboard />}
        >
          <Route
            index
            element={
              <Navigate
                to="hospitals"
                replace
              />
            }
          />

          <Route
            path="hospitals"
            element={<FindHospitals />}
          />

          <Route
            path="hospitals/doctorList"
            element={<DoctorsList />}
          />

          <Route
            path="searchDoctor"
            element={<SearchDoctor />}
          />

          <Route
            path="doctor/:doctorId"
            element={<DoctorsProfile />}
          />

          <Route
            path="doctor/:doctorId/book"
            element={<BookAppointment />}
          />

          <Route
            path="appointments"
            element={<MyAppointments />}
          />

          <Route
            path="profile"
            element={<MyProfile />}
          />

          <Route
            path="setting"
            element={<Setting />}
          />
        </Route>

        {/* Doctor Dashboard */}
        <Route
          path="/doctor"
          element={<DoctorDashboard />}
        >
          <Route
            index
            element={
              <Navigate
                to="profile"
                replace
              />
            }
          />

          <Route
            path="profile"
            element={<EnhanceProfile />}
          />

          <Route
            path="schedule"
            element={<MySchedule />}
          />

          <Route
            path="appointments"
            element={<DoctorAppointments />}
          />

          <Route
            path="other-doctors"
            element={<OtherDoctors />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>

        {/* Invalid Route */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;