import { useState } from "react";

function MyAppointments() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const appointments = [
    {
      id: 1,
      name: "Rahul Sharma",
      age: 34,
      gender: "Male",
      date: "25 Aug 2026",
      time: "10:30 AM",
      reason: "Fever & Cold",
      type: "In-Person",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Singh",
      age: 25,
      gender: "Female",
      date: "25 Aug 2026",
      time: "11:30 AM",
      reason: "Follow-up",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 3,
      name: "Amit Kumar",
      age: 28,
      gender: "Male",
      date: "25 Aug 2026",
      time: "01:00 PM",
      reason: "General Checkup",
      type: "In-Person",
      status: "Completed",
    },
    {
      id: 4,
      name: "Neha Verma",
      age: 31,
      gender: "Female",
      date: "26 Aug 2026",
      time: "10:00 AM",
      reason: "Consultation",
      type: "In-Person",
      status: "Cancelled",
    },
    {
      id: 5,
      name: "Rohit Mehta",
      age: 40,
      gender: "Male",
      date: "26 Aug 2026",
      time: "12:30 PM",
      reason: "Blood Pressure",
      type: "Video Call",
      status: "Pending",
    },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesFilter =
      filter === "All" || appointment.status === filter;

    const matchesSearch =
      appointment.name.toLowerCase().includes(search.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 text-slate-800 transition-colors dark:bg-slate-950 dark:text-white md:px-10">

      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            My Appointments
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            View and manage all your patient appointments
          </p>
        </div>

        <div className="w-fit rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          {appointments.length} Total
        </div>

      </div>

      {/* Search + Filters */}
      <div className="mb-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}
        <div className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800 lg:w-80">

          <span className="text-lg text-slate-400">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search patient or reason..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-white"
          />

        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">

          {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                }`}
              >
                {item}
              </button>
            )
          )}

        </div>

      </div>

      {/* Appointments Card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

        {/* Card Header */}
        <div className="flex flex-col justify-between gap-2 border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:flex-row sm:items-center">

          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              All Appointments
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {filteredAppointments.length} appointments
            </p>
          </div>

        </div>

        {/* List */}
        <div>

          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="grid gap-5 border-b border-slate-100 px-6 py-5 dark:border-slate-800 lg:grid-cols-[1.5fr_1fr_1.2fr_110px_180px] lg:items-center"
            >

              {/* Patient */}
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  {appointment.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    {appointment.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {appointment.age} Years • {appointment.gender}
                  </p>
                </div>

              </div>

              {/* Date & Time */}
              <div>

                <p className="text-xs text-slate-400">
                  Date
                </p>

                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {appointment.date}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  Time
                </p>

                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {appointment.time}
                </p>

              </div>

              {/* Reason */}
              <div>

                <p className="text-xs text-slate-400">
                  Reason
                </p>

                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {appointment.reason}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {appointment.type}
                </p>

              </div>

              {/* Status */}
              <div>

                <span
                  className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                    appointment.status === "Pending"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                      : appointment.status === "Confirmed"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                      : appointment.status === "Completed"
                      ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400"
                  }`}
                >
                  {appointment.status}
                </span>

              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">

                {appointment.status === "Pending" && (
                  <>
                    <button className="rounded-md bg-green-50 px-3 py-2 text-xs font-semibold text-green-600 transition hover:bg-green-100 dark:bg-green-950/40 dark:text-green-400 dark:hover:bg-green-950/70">
                      Accept
                    </button>

                    <button className="rounded-md bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/70">
                      Reject
                    </button>
                  </>
                )}

                {appointment.status === "Confirmed" && (
                  <button className="rounded-md bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-950/70">
                    Complete
                  </button>
                )}

                <button className="rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                  View
                </button>

              </div>

            </div>
          ))}

          {/* No Result */}
          {filteredAppointments.length === 0 && (
            <div className="px-6 py-16 text-center">

              <h3 className="font-semibold text-slate-700 dark:text-slate-200">
                No appointments found
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Try changing your search or filter.
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default MyAppointments;