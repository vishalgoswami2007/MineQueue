import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/logo.png';
import {useState} from 'useState';

function Signup() {

  const [fullName , setFullName] =useState("");
  const [password , setPassword] = useState('');
  const [email , setEmail] = useState('');
  const [role , setRole] = useState('patient');


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
            Create your account
          </h2>

          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <select
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition">
            <FcGoogle size={20} />
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Signup;