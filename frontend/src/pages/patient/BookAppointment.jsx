import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  CalendarDays,
  Clock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import AxiosInstance from "../../utils/AxiosInstance";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!doctorId) {
        setError("Doctor information is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await AxiosInstance.get(
          `/schedule/doctor/${doctorId}`
        );

        setSchedules(response.data?.schedules || []);
      } catch (err) {
        console.error("Schedule fetch error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load doctor's schedule."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [doctorId]);

  const selectedDay = useMemo(() => {
    if (!selectedDate) {
      return "";
    }

    const [year, month, day] = selectedDate
      .split("-")
      .map(Number);

    const date = new Date(
      year,
      month - 1,
      day
    );

    return dayNames[date.getDay()];
  }, [selectedDate]);

  const availableSlots = useMemo(() => {
    if (!selectedDay) {
      return [];
    }

    const schedule = schedules.find(
      (item) => item.day === selectedDay
    );

    return schedule?.slots || [];
  }, [selectedDay, schedules]);

  
  const getMinimumDate = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleBooking = async () => {
    if (!selectedDate) {
      setError(
        "Please select an appointment date."
      );

      return;
    }

    if (!selectedTime) {
      setError(
        "Please select an appointment time."
      );

      return;
    }

    try {
      setBooking(true);
      setError("");
      setSuccess("");

      const response =
        await AxiosInstance.post(
          "/booking/create",
          {
            doctorId,
            date: selectedDate,
            time: selectedTime,
          }
        );

      setSuccess(
        response.data?.message ||
          "Appointment booked successfully."
      );

      setTimeout(() => {
        navigate(
          "/patient/appointments"
        );
      }, 1200);
    } catch (err) {
      console.error(
        "Booking error:",
        err
      );

      if (err.response?.status === 409) {
        setError(
          err.response?.data?.message ||
            "This slot has already been booked. Please choose another slot."
        );

        setSelectedTime("");

        return;
      }

      setError(
        err.response?.data?.message ||
          "Unable to book appointment."
      );
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 dark:bg-gray-950 dark:text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-4xl">

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft size={18} />

          Back
        </button>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">

          <div className="mb-8">

            <h1 className="text-2xl font-bold sm:text-3xl">
              Book Appointment
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Select a date and one of the
              doctor's available schedule
              slots.
            </p>

          </div>

          {loading ? (
            <div className="py-16 text-center text-gray-500 dark:text-gray-400">
              Loading doctor's schedule...
            </div>
          ) : (
            <div className="space-y-8">

              <div>

                <label
                  htmlFor="appointment-date"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold"
                >
                  <CalendarDays size={18} />

                  Appointment Date
                </label>

                <input
                  id="appointment-date"
                  type="date"
                  min={getMinimumDate()}
                  value={selectedDate}
                  onChange={(event) => {
                        setSelectedDate(event.target.value);
                        setSelectedTime("");
                        setError("");
                        setSuccess("");
                 }}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-950"
                />

                {selectedDate && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Selected day:{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      {selectedDay}
                    </span>
                  </p>
                )}

              </div>

              {selectedDate && (
                <div>

                  <div className="mb-4 flex items-center gap-2">

                    <Clock size={18} />

                    <h2 className="font-semibold">
                      Select Time
                    </h2>

                  </div>

                  {availableSlots.length >
                  0 ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">

                      {availableSlots.map(
                        (slot) => (
                          <button
                            key={
                              slot._id ||
                              slot.time
                            }
                            type="button"
                            onClick={() => {
                              setSelectedTime(
                                slot.time
                              );

                              setError("");
                              setSuccess("");
                            }}
                            className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                              selectedTime ===
                              slot.time
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-blue-950/30"
                            }`}
                          >
                            {slot.time}
                          </button>
                        )
                      )}

                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Doctor has no schedule
                        available for{" "}
                        {selectedDay}.
                      </p>

                    </div>
                  )}

                </div>
              )}

              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400">

                  <AlertCircle
                    size={20}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{error}</span>

                </div>
              )}

              {success && (
                <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-400">

                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{success}</span>

                </div>
              )}

              <div className="border-t border-gray-200 pt-6 dark:border-gray-800">

                <button
                  type="button"
                  disabled={
                    !selectedDate ||
                    !selectedTime ||
                    booking
                  }
                  onClick={handleBooking}
                  className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {booking
                    ? "Booking..."
                    : selectedTime
                      ? `Book ${selectedTime}`
                      : "Select a Slot"}
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default BookAppointment;