import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import logo from "../assets/logo.png";
import axiosInstance from "../utils/AxiosInstance.js";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Patient");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const completeLogin = (data) => {
    const token = data?.token;
    const userRole = data?.user?.role;

    if (!token || !["Doctor", "Patient"].includes(userRole)) {
      throw new Error("Invalid authentication response from server.");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);

    navigate(
      userRole === "Doctor"
        ? "/doctor/profile"
        : "/patient/hospitals",
      { replace: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    if (fullName.trim().length < 2) {
      setError("Please enter a valid full name.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

     await axiosInstance.post("/auth/signup", {
        fullname: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
      });

      navigate("/verifyOtp", {
        state: { email: email.trim().toLowerCase() },
   });
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        error.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      setError("Google did not return a valid credential.");
      return;
    }

    try {
      setGoogleLoading(true);
      setError("");
      setSuccess("");

      const response = await axiosInstance.post("/auth/GoogleOAuth", {
        credential: credentialResponse.credential,
        role,
      });

      completeLogin(response.data);
    } catch (error) {
      console.error("Google signup error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Google signup failed. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 dark:bg-gray-950">
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
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Join MineQueue as a patient or doctor.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setError("");
                setSuccess("");
              }}
              autoComplete="name"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

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
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setSuccess("");
              }}
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
                setSuccess("");
              }}
              autoComplete="new-password"
              required
              minLength={6}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Minimum 6 characters.
            </p>
          </div>

          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Account Type
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setError("");
                setSuccess("");
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <p>{success}</p>
              <Link
                to="/logIn"
                className="mt-2 inline-block font-semibold underline"
              >
                Continue to login
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="text-sm text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        {googleClientId ? (
          <GoogleOAuthProvider clientId={googleClientId}>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() =>
                  setError("Google sign-up was unsuccessful.")
                }
                theme="outline"
                size="large"
                text="continue_with"
                shape="rectangular"
                width="350"
              />
            </div>
          </GoogleOAuthProvider>
        ) : (
          <p className="text-center text-sm text-red-600">
            Google signup is not configured.
          </p>
        )}

        {googleLoading && (
          <p className="mt-3 text-center text-sm text-gray-500">
            Creating your Google account...
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
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

export default Signup;