import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Moon,
  Sun,
  LogOut,
  ShieldCheck,
} from "lucide-react";

function Settings() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/logIn", {
      replace: true,
    });
  };

  return (
    <div className="text-slate-800">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your doctor dashboard preferences
        </p>
      </div>

      <div className="max-w-3xl space-y-6">

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="border-b border-slate-200 p-6 dark:border-slate-800">

            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Customize how your dashboard looks.
            </p>

          </div>

          <div className="flex items-center justify-between gap-4 p-6">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">

                {darkMode ? (
                  <Moon size={21} />
                ) : (
                  <Sun size={21} />
                )}

              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">
                  {darkMode
                    ? "Dark Mode"
                    : "Light Mode"}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {darkMode
                    ? "Dark theme is currently enabled."
                    : "Switch to dark theme for the dashboard."}
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                setDarkMode((previous) => !previous)
              }
              aria-label="Toggle dark mode"
              className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                darkMode
                  ? "bg-blue-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                  darkMode
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>

        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800 dark:text-white">
                Account Security
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your doctor dashboard is protected using authenticated access.
              </p>
            </div>

          </div>

        </div>

        <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm dark:border-red-900/40 dark:bg-slate-900">

          <h2 className="font-semibold text-slate-800 dark:text-white">
            Sign Out
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Sign out from your MineQueue doctor account on this device.
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-5 flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;