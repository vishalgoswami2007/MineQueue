import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance.js";
import logo from "../assets/logo.png";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !/^\d{6}$/.test(otp)) {
      setError("Enter your email and valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post("/auth/verifyOtp", {
        email: email.trim().toLowerCase(),
        otp,
      });

      setSuccess(response.data?.message || "Email verified successfully.");
      setOtp("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900">
        <div className="mb-8 flex items-center justify-center gap-2">
          <img src={logo} alt="MineQueue Logo" className="h-10 w-auto" />
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            MineQueue
          </Link>
        </div>

        <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Verify your email
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleVerify} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium dark:text-gray-300">
              Verification code
            </label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              <p>{success}</p>
              <button
                type="button"
                onClick={() => navigate("/logIn", { replace: true })}
                className="mt-2 font-semibold underline"
              >
                Continue to login
              </button>
            </div>
          )}

          {!success && (
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already verified?{" "}
          <Link to="/logIn" className="font-semibold text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default VerifyOtp;