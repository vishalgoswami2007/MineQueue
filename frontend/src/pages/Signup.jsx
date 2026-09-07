import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import axiosInstance from "../utils/AxiosInstance.js";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Patient");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    if (fullName.trim().length < 2) {
      setError("Please enter a valid full name.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters long."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response =
        await axiosInstance.post(
          "/auth/signup",
          {
            fullname: fullName.trim(),
            email: email.trim().toLowerCase(),
            password,
            role,
          }
        );

      setSuccess(
        response.data?.message ||
          "Account created successfully."
      );

      setTimeout(() => {
        navigate("/logIn", {
          replace: true,
        });
      }, 1000);
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
            Create your account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join MineQueue as a patient or doctor.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => {
                setFullName(
                  e.target.value
                );
                setError("");
                setSuccess("");
              }}
              autoComplete="name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

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
                setSuccess("");
              }}
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => {
                setPassword(
                  e.target.value
                );
                setError("");
                setSuccess("");
              }}
              autoComplete="new-password"
              required
              minLength={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <p className="mt-1 text-xs text-gray-500">
              Minimum 6 characters.
            </p>
          </div>

          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-gray-700"
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
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="Patient">
                Patient
              </option>

              <option value="Doctor">
                Doctor
              </option>
            </select>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating account..."
              : "Sign Up"}
          </button>

        </form>

        <div className="my-6 h-px bg-gray-200" />

        <p className="text-center text-sm text-gray-600">
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