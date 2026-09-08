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
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post("/auth/verifyOtp", {
        email: cleanEmail,
        otp,
      });

      setVerified(true);
      setOtp("");

      setMessage(
        response.data?.message ||
          "Email verified successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email first.");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        "/auth/resendVerificationOtp",
        {
          email: cleanEmail,
        }
      );

      setVerified(false);
      setOtp("");

      setMessage(
        response.data?.message ||
          "Verification OTP sent successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to resend verification OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900">

        <div className="mb-8 flex items-center justify-center gap-2">
          <img
            src={logo}
            alt="MineQueue Logo"
            className="h-10 w-auto"
          />

          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            MineQueue
          </Link>
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Verify your email
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter the 6-digit verification code sent to your email.
          </p>
        </div>

        <form
          onSubmit={handleVerify}
          className="space-y-4"
        >

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setMessage("");
              }}
              placeholder="Enter your email"
              required
              disabled={verified}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:disabled:bg-gray-800/60"
            />
          </div>

          {!verified && (
            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                OTP
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(
                    e.target.value.replace(/\D/g, "")
                  );

                  setError("");
                  setMessage("");
                }}
                maxLength={6}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300">
              {message}
            </div>
          )}

          {!verified && (
            <>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : "Verify Email"}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="w-full rounded-lg border border-blue-600 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-blue-950/30"
              >
                Resend OTP
              </button>
            </>
          )}

          {verified && (
            <button
              type="button"
              onClick={() =>
                navigate("/logIn", {
                  replace: true,
                })
              }
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Continue to Login
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already verified?{" "}
          <Link
            to="/logIn"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default VerifyOtp;