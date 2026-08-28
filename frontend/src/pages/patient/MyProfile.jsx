import { User, Camera } from 'lucide-react';

function MyProfile() {
  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-600 text-center">My Profile</h1>
      <p className="text-gray-600 text-center mt-2 mb-10">Manage your personal information</p>

      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-8">

        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition">
              <Camera size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3">Change Photo</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
            <input
              type="text"
              placeholder="Rohtak"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Save Button */}
        <button className="w-full mt-8 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
          Save Changes
        </button>

        {/* Danger Zone */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button className="text-red-500 text-sm font-medium hover:underline">
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
}

export default MyProfile;