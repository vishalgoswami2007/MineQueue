import { User, Camera, Upload, FileText } from "lucide-react";
import { useState } from "react";

function EnhanceProfile() {
  const [degreeCertificate, setDegreeCertificate] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">

      {/* Header */}
      <h1 className="text-center text-3xl font-bold text-blue-600">
        Enhance Profile
      </h1>

      <p className="mb-10 mt-2 text-center text-gray-600 dark:text-gray-400">
        Complete your profile to start accepting appointments
      </p>

      {/* Main Card */}
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">

        {/* Profile Photo */}
        <div className="mb-8 flex flex-col items-center">

          <div className="relative">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
              <User
                size={40}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-700">
              <Camera size={16} />
            </button>

          </div>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Change Photo
          </p>

        </div>

        <div className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          {/* Specialization + Qualification */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Specialization
              </label>

              <input
                type="text"
                placeholder="Cardiologist"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Qualification
              </label>

              <input
                type="text"
                placeholder="MBBS, MD..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

          </div>

          {/* Experience + Fees */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Experience
              </label>

              <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <option>0-1 Year</option>
                <option>1 Year</option>
                <option>2 Years</option>
                <option>3 Years</option>
                <option>4 Years</option>
                <option>5+ Years</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Consultation Fees (₹)
              </label>

              <input
                type="number"
                placeholder="500"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

          </div>

          {/* Bio */}
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Bio / About
            </label>

            <textarea
              placeholder="Tell patients about your experience and expertise..."
              rows="4"
              className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          {/* Hospital */}
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Hospital / Clinic
            </label>

            <input
              type="text"
              placeholder="LifeCare Hospital"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          {/* Verification */}
          <div className="border-t border-gray-200 pt-6 dark:border-gray-800">

            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Verification
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Verify your medical credentials to start accepting appointments.
            </p>

          </div>

          {/* Medical Registration */}
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Medical Registration Number
            </label>

            <input
              type="text"
              placeholder="MMC/12345/2020"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          {/* Degree Certificate */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Degree Certificate
            </label>

            <label
              htmlFor="degreeCertificate"
              className="flex cursor-pointer items-center justify-between rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-4 transition hover:border-blue-500 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/30 dark:hover:bg-blue-950/50"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                  {degreeCertificate ? (
                    <FileText size={20} />
                  ) : (
                    <Upload size={20} />
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {degreeCertificate
                      ? degreeCertificate.name
                      : "Upload Degree Certificate"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    PDF, JPG or PNG • Max 5MB
                  </p>
                </div>

              </div>

              <span className="rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white">
                Choose File
              </span>

            </label>

            <input
              type="file"
              id="degreeCertificate"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => setDegreeCertificate(e.target.files[0])}
            />

          </div>

          {/* Info Box */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">

            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold text-gray-900 dark:text-white">
                Important:
              </span>{" "}
              Your profile will be reviewed before it becomes visible to
              patients.
            </p>

          </div>

        </div>

        {/* Submit */}
        <button className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
          Submit for Verification
        </button>

      </div>

    </div>
  );
}

export default EnhanceProfile;