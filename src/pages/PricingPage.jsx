import { Check, X } from 'lucide-react';
import Footer from "../components/common/Footer.jsx"
import FAQ from "../components/common/Faq.jsx"


function PricingPage() {
  return(
  <div>
      <h1 className="text-5xl font-extrabold text-blue-600 text-center">Pricing</h1>
      <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto mt-4">Simple, transparent pricing built for doctors and hospitals. 
        Patients always book appointments for free — no hidden charges, 
        no surprises. Choose a plan that fits your practice, and upgrade anytime as you grow.
      </p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 px-8">
    <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
  
          <h3 className="text-2xl font-bold text-gray-900">Basic</h3>
          
          <div className="mt-4">
            <span className="text-4xl font-extrabold text-gray-900">Free</span>
          </div>
          
          <p className="text-gray-500 text-sm mt-2">Perfect for getting started</p>

          <hr className="my-6 border-gray-200" />

          <ul className="space-y-4 text-left">
            <li className="flex items-center gap-2">
              <Check size={18} className="text-blue-600" />
              <span className="text-gray-700">Basic profile listing</span>
            </li>
            <li className="flex items-center gap-2">
              <Check size={18} className="text-blue-600" />
              <span className="text-gray-700">Up to 20 appointments/month</span>
            </li>
            <li className="flex items-center gap-2">
              <Check size={18} className="text-blue-600" />
              <span className="text-gray-700">Schedule management</span>
            </li>
            <li className="flex items-center gap-2">
              <X size={18} className="text-gray-300" />
              <span className="text-gray-400">Patient reviews</span>
            </li>
            <li className="flex items-center gap-2">
              <X size={18} className="text-gray-300" />
              <span className="text-gray-400">Priority listing</span>
            </li>
          </ul>

          <button className="mt-8 w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition">
            Get Started
          </button>
  </div>


   <div className="border-2 border-blue-600 rounded-xl p-8 bg-white shadow-lg relative">
  
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
          Most Popular
        </span>

        <h3 className="text-2xl font-bold text-gray-900">Professional</h3>
        
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-gray-900">₹499</span>
          <span className="text-gray-500">/month</span>
        </div>
        
        <p className="text-gray-500 text-sm mt-2">For growing practices</p>

        <hr className="my-6 border-gray-200" />

        <ul className="space-y-4 text-left">
          <li className="flex items-center gap-2">
            <Check size={18} className="text-blue-600" />
            <span className="text-gray-700">Enhanced profile + photo</span>
          </li>
          <li className="flex items-center gap-2">
            <Check size={18} className="text-blue-600" />
            <span className="text-gray-700">Unlimited appointments</span>
          </li>
          <li className="flex items-center gap-2">
            <Check size={18} className="text-blue-600" />
            <span className="text-gray-700">Advanced calendar management</span>
          </li>
          <li className="flex items-center gap-2">
            <Check size={18} className="text-blue-600" />
            <span className="text-gray-700">Patient reviews</span>
          </li>
          <li className="flex items-center gap-2">
            <Check size={18} className="text-blue-600" />
            <span className="text-gray-700">Priority listing</span>
          </li>
        </ul>

        <button className="mt-8 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
          Upgrade Now
        </button>
   </div>


            <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
            
            <h3 className="text-2xl font-bold text-gray-900">Hospital/Clinic</h3>
            
            <div className="mt-4">
              <span className="text-4xl font-extrabold text-gray-900">Custom</span>
            </div>
            
            <p className="text-gray-500 text-sm mt-2">For multi-doctor institutions</p>

            <hr className="my-6 border-gray-200" />

            <ul className="space-y-4 text-left">
              <li className="flex items-center gap-2">
                <Check size={18} className="text-blue-600" />
                <span className="text-gray-700">Multi-doctor hospital page</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-blue-600" />
                <span className="text-gray-700">Unlimited appointments</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-blue-600" />
                <span className="text-gray-700">Team-wide schedule management</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-blue-600" />
                <span className="text-gray-700">Patient reviews</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-blue-600" />
                <span className="text-gray-700">Top priority + verified badge</span>
              </li>
            </ul>

            <button className="mt-8 w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition">
              Contact Us
            </button>

    </div>
</div>
      <FAQ/>
     <Footer/>
     </div>
  )
}

export default PricingPage;