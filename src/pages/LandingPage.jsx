import Hero from "../components/landing/Hero.jsx"
import About from "../components/landing/About.jsx"
import HowItWorks from "../components/landing/HowItWorks.jsx"

function LandingPage(){
    return (
        <div>
           <Hero/>
           <About/>
           <HowItWorks/>
        </div>
    );
}

export default LandingPage;