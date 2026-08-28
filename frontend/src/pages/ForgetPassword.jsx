import {Link} from "react-router-dom"
import logo from '../assets/logo.png';

function ForgetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">

      {/* LEFT SIDE - Form */}
      <div className="w-full md:w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Logo + Name */}
          <div className="flex items-center justify-center gap-2 mb-8 cursor-pointer">
            <img src={logo} alt="MineQueue Logo" className="h-10 w-auto" />
            <Link to="/" className="text-xl font-bold text-gray-900">MineQueue</Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Forget Password
          </h2>

          <form className="space-y-4">
        
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email/Number" 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button 
                type="button"
                className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
              >
                Send OTP
              </button>
            </div>

            <div>
              <input
                type="otp"
                placeholder="EnterOtp"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                Verify OTP
            </button>
          </form>
        

        </div>
      </div>

    </div>
  );
}

export default ForgetPassword;