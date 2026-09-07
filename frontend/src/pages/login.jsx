import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import axiosInstance from "../utils/AxiosInstance";

function LogIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.post(
        "/auth/login",
        {
          email: email.trim(),
          password,
        }
      );

      const token = response.data?.token;
      const userRole = response.data?.user?.role;

      if (!token || !userRole) {
        setError("Invalid login response from server.");
        return;
      }

      localStorage.setItem("token", token);

      if (userRole === "Doctor") {
        navigate("/doctor/profile", {
          replace: true,
        });

        return;
      }

      if (userRole === "Patient") {
        navigate("/patient/hospitals", {
          replace: true,
        });

        return;
      }

      localStorage.removeItem("token");

      setError("Your account role is not supported.");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
            Login to your account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your credentials to continue.
          </p>

        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
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
              }}
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">

              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <Link
                to="/forgetPassword"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>

            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-sm text-gray-400">
            or
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}

          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default LogIn;