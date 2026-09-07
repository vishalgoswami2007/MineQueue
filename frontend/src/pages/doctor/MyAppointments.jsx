import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  User,
  Search,
  ClipboardList,
} from "lucide-react";

import axiosInstance from "../../utils/AxiosInstance";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosInstance.get(
          "/dashboard/Booking"
        );

        setAppointments(
          response.data.bookings || []
        );
      } catch (error) {
        console.error(
          "Appointments fetch failed:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to fetch appointments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const status =
        appointment.status || "pending";

      const matchesFilter =
        filter === "All" ||
        status.toLowerCase() ===
          filter.toLowerCase();

      const patientId =
        String(appointment.patientId || "");

      const matchesSearch =
        patientId
          .toLowerCase()
          .includes(search.trim().toLowerCase()) ||
        String(appointment.slot || "")
          .toLowerCase()
          .includes(search.trim().toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [appointments, filter, search]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-600";

      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg font-semibold text-slate-700">
          Loading appointments...
        </p>
      </div>
    );
  }

  return (
    <div className="text-slate-800">
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            My Appointments
          </h1>

          <p className="mt-2 text-slate-500">
            View your patient bookings and appointment status
          </p>
        </div>

        <div className="w-fit rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          {appointments.length} Total
        </div>

      </div>

      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">

        <div className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-2.5 lg:w-80">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search patient ID or slot..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />

        </div>

        <div className="flex flex-wrap gap-2">

          {[
            "All",
            "Pending",
            "Confirmed",
            "Cancelled",
          ].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                filter === item
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <h2 className="text-lg font-semibold text-slate-800">
            Appointments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredAppointments.length} appointments
          </p>

        </div>

        {!error &&
          filteredAppointments.map(
            (appointment) => (
              <div
                key={appointment._id}
                className="grid gap-5 border-b border-slate-100 px-6 py-5 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_130px] xl:items-center"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <User size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">
                      Patient
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                      {appointment.patientId ||
                        "Patient unavailable"}
                    </p>
                  </div>

                </div>

                <div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <CalendarDays size={16} />

                    <span className="text-xs">
                      Appointment Date
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {formatDate(
                      appointment.date
                    )}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock size={16} />

                    <span className="text-xs">
                      Time Slot
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {appointment.slot ||
                      "Not provided"}
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusClasses(
                      appointment.status
                    )}`}
                  >
                    {appointment.status ||
                      "pending"}
                  </span>
                </div>

              </div>
            )
          )}

        {!error &&
          filteredAppointments.length === 0 && (
            <div className="px-6 py-16 text-center">

              <ClipboardList
                size={42}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-700">
                No appointments found
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Your patient bookings will appear here.
              </p>

            </div>
          )}

      </div>
    </div>
  );
}

export default MyAppointments;