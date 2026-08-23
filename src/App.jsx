import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import Signup from './pages/Signup';
import LogIn from "./pages/login.jsx";
import ForgetPassword from './pages/ForgetPassword.jsx';

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/signup', '/login' ,'/forgetPassword'];
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
      </Routes>
    </div>
  );
}

export default App;