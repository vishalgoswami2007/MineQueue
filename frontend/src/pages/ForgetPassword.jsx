import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axiosInstance from "../utils/AxiosInstance.js";

function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    const cleanEmail = email.trim().toLowerCase();

    setError("");
    setMessage("");

    if (!cleanEmail) {
      setError("Please enter your email first.");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post("/auth/forgetPassword", {
        email: cleanEmail,
      });

      setOtpSent(true);
      setMessage(
        response.data?.message ||
          "If an eligible account exists, a reset code has been sent."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send reset code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    setError("");
    setMessage("");

    if (!cleanEmail) {
      setError("Please enter your email.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post("/auth/resetPassword", {
        email: cleanEmail,
        otp,
        newPassword,
      });

      setMessage(
        response.data?.message ||
          "Password reset successfully."
      );

      setTimeout(() => {
        navigate("/logIn", { replace: true });
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Password reset failed. Please try again."
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
            Forgot Password
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter your email to receive a password reset code.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleResetPassword}
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>

            <div className="flex gap-2">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setMessage("");
                }}
                required
                disabled={otpSent}
                className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:disabled:bg-gray-800/60"
              />

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && !otpSent ? "Sending..." : otpSent ? "Resend" : "Send OTP"}
              </button>
            </div>
          </div>

          {otpSent && (
            <>
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
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ""));
                    setError("");
                    setMessage("");
                  }}
                  maxLength={6}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  New Password
                </label>

                <input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError("");
                    setMessage("");
                  }}
                  minLength={8}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300">
              {message}
            </div>
          )}

          {otpSent && (
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{" "}
          <Link
            to="/logIn"
            className="font-semibold text-blue-600 hover:underline"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;