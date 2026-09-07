import { useEffect, useMemo, useState } from "react";
import {
  User,
  CalendarDays,
  MapPin,
  Clock,
} from "lucide-react";

import axiosInstance from "../../utils/AxiosInstance";

function MyAppointments() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const [bookingResponse, doctorResponse] = await Promise.all([
          axiosInstance.get("/dashboard/Booking"),
          axiosInstance.get("/dashboard/Doctor"),
        ]);

        setBookings(bookingResponse.data.bookings || []);
        setDoctors(doctorResponse.data.doctor || []);
      } catch (error) {
        console.error("Appointments fetch failed:", error);

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

  const getDoctor = (doctorId) => {
    return doctors.find(
      (doctor) => doctor._id === String(doctorId)
    );
  };

  const appointments = useMemo(() => {
    const now = new Date();

    return bookings.filter((booking) => {
      if (!booking.date) return false;

      const bookingDate = new Date(booking.date);

      if (activeTab === "upcoming") {
        return (
          bookingDate >= now &&
          booking.status !== "cancelled"
        );
      }

      return (
        bookingDate < now ||
        booking.status === "cancelled"
      );
    });
  }, [bookings, activeTab]);

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-600";

      case "cancelled":
        return "bg-red-50 text-red-600";

      default:
        return "bg-yellow-50 text-yellow-600";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg font-semibold text-gray-700">
          Loading appointments...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-blue-600">
        My Appointments
      </h1>

      <p className="mt-2 mb-8 text-center text-gray-600">
        Track your upcoming and past visits
      </p>

      <div className="mb-10 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => setActiveTab("upcoming")}
          className={`rounded-full px-6 py-2 font-semibold transition ${
            activeTab === "upcoming"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Upcoming
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("past")}
          className={`rounded-full px-6 py-2 font-semibold transition ${
            activeTab === "past"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Past
        </button>
      </div>

      {error && (
        <div className="mx-auto mb-6 max-w-3xl rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {!error && appointments.length > 0 ? (
        <div className="mx-auto max-w-3xl space-y-4">
          {appointments.map((appointment) => {
            const doctor = getDoctor(appointment.doctorId);

            return (
              <div
                key={appointment._id}
                className="flex flex-col items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row"
              >
                <div className="flex flex-1 items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <User
                      size={24}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      {doctor?.fullname ||
                        "Doctor"}
                    </h3>

                    <p className="text-sm text-blue-600">
                      {doctor?.specialization ||
                        "General Doctor"}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-400">
                      <MapPin size={14} />
                      {doctor?.hospital ||
                        "Hospital not provided"}
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-44">
                  <p className="flex items-center gap-2 font-semibold text-gray-900">
                    <CalendarDays
                      size={16}
                      className="text-blue-600"
                    />

                    {formatDate(appointment.date)}
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={15} />
                    {appointment.slot ||
                      "Time not available"}
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                      appointment.status
                    )}`}
                  >
                    {appointment.status || "pending"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !error && (
          <div className="mx-auto mt-12 max-w-xl text-center">
            <CalendarDays
              size={42}
              className="mx-auto text-gray-300"
            />

            <p className="mt-4 text-gray-500">
              You have no {activeTab} appointments.
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default MyAppointments;