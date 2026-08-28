
import { useTheme } from "../../context/ThemeContext";

function Settings() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 text-slate-800 transition-colors dark:bg-slate-950 dark:text-white md:px-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Settings
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage your dashboard preferences
        </p>
      </div>

      {/* Appearance */}
      <div className="max-w-3xl rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

        <div className="border-b border-slate-200 p-6 dark:border-slate-800">
          <h2 className="text-lg font-semibold">
            Appearance
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Customize how your dashboard looks.
          </p>
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-xl dark:bg-blue-950">
              {darkMode ? "🌙" : "☀️"}
            </div>

            <div>
              <h3 className="font-semibold">
                Dark Mode
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {darkMode
                  ? "Dark theme is currently enabled"
                  : "Use dark theme across your dashboard"}
              </p>
            </div>

          </div>

          {/* Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative h-7 w-12 rounded-full transition ${
              darkMode ? "bg-blue-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                darkMode ? "left-6" : "left-1"
              }`}
            />
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;