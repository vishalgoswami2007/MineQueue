import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';


function LogIn() {
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
            LogIn Your account
          </h2>

          <form className="space-y-4">
        
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>


            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
            <Link to="/forgetPassword" className='text-black cursor-pointer'>Forget Password?</Link>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>



          {/* Login link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            do not have an account?{' '}
            <Link to="/Signup" className="text-blue-600 font-semibold hover:underline">
              Signup
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default LogIn;