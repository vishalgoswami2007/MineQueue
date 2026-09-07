import { useNavigate } from "react-router-dom";

import {
  Sun,
  Moon,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { useTheme } from "../../hooks/useTheme";

function Setting() {
  const navigate = useNavigate();

  const { darkMode, setDarkMode } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/logIn", {
      replace: true,
    });
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-blue-600">
        Settings
      </h1>

      <p className="mb-10 mt-2 text-center text-gray-600 dark:text-gray-400">
        Manage your account preferences
      </p>

      <div className="mx-auto max-w-2xl space-y-6">

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Appearance
          </h3>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              {darkMode ? (
                <Moon
                  size={20}
                  className="text-blue-500"
                />
              ) : (
                <Sun
                  size={20}
                  className="text-yellow-500"
                />
              )}

              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  {darkMode
                    ? "Dark Mode"
                    : "Light Mode"}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Change the dashboard appearance
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                setDarkMode((previous) => !previous)
              }
              aria-label="Toggle dark mode"
              aria-pressed={darkMode}
              className={`relative h-6 w-12 rounded-full transition ${
                darkMode
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                  darkMode
                    ? "left-6"
                    : "left-0.5"
                }`}
              />
            </button>

          </div>

        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

          <div className="flex items-center gap-3">

            <ShieldCheck
              size={20}
              className="text-blue-600"
            />

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Account Security
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Your account uses authenticated access for protected dashboard features.
              </p>
            </div>

          </div>

        </div>

        <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm dark:border-red-900/40 dark:bg-gray-900">

          <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
            Sign Out
          </h3>

          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Sign out from your MineQueue account on this device.
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 font-semibold text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Setting;