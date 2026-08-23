import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import Features from "./components/landing/Features.jsx";
import HowItsWork from './components/landing/HowItWorks.jsx';
import Signup from "./pages/Signup.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/howItsWork" element={<HowItsWork/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;