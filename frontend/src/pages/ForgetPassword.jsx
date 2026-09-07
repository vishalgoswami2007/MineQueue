import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [message, setMessage] = useState("");

  const handleSendOtp = () => {
    if (!email.trim()) {
      setMessage("Please enter your email first.");
      return;
    }

    setMessage(
      "OTP sending is not connected to the backend yet."
    );
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    if (!otp.trim()) {
      setMessage("Please enter the OTP.");
      return;
    }

    setMessage(
      "OTP verification is not connected to the backend yet."
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center justify-center gap-2">

          <img
            src={logo}
            alt="MineQueue Logo"
            className="h-10 w-auto"
          />

          <Link
            to="/"
            className="text-xl font-bold text-gray-900"
          >
            MineQueue
          </Link>

        </div>

        <div className="mb-6 text-center">

          <h1 className="text-2xl font-bold text-gray-900">
            Forgot Password
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email to recover your account.
          </p>

        </div>

        <form
          className="space-y-4"
          onSubmit={handleVerifyOtp}
        >

          <div>

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
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
                  setMessage("");
                }}
                required
                className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />

              <button
                type="button"
                onClick={handleSendOtp}
                className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Send OTP
              </button>

            </div>

          </div>

          <div>

            <label
              htmlFor="otp"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              OTP
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => {
                setOtp(
                  e.target.value.replace(/\D/g, "")
                );
                setMessage("");
              }}
              maxLength={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

          </div>

          {message && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Verify OTP
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
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