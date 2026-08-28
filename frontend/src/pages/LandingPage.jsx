import Hero from "../components/landing/Hero.jsx"
import About from "../components/landing/About.jsx"
import HowItWorks from "../components/landing/HowItWorks.jsx"
import Features from "../components/landing/Features.jsx"
import CTABanner from "../components/landing/CTA.jsx"
import Footer from '../components/common/Footer';

function LandingPage(){
    return (
        <div>
           <Hero/>
           <About/>
           <HowItWorks/>
           <Features/>
           <CTABanner/>
           <Footer/>
        </div>
    );
}

export default LandingPage;