import { useState } from "react";
import {
  CalendarDays,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
} from "lucide-react";

import axiosInstance from "../../utils/AxiosInstance";

function MySchedule() {
  const [day, setDay] = useState("Monday");

  const [slots, setSlots] = useState([
    {
      time: "",
      isBooked: false,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleSlotChange = (index, value) => {
    const updatedSlots = [...slots];

    updatedSlots[index] = {
      ...updatedSlots[index],
      time: value,
    };

    setSlots(updatedSlots);
  };

  const addSlot = () => {
    setSlots((previousSlots) => [
      ...previousSlots,
      {
        time: "",
        isBooked: false,
      },
    ]);
  };

  const removeSlot = (index) => {
    if (slots.length === 1) return;

    setSlots((previousSlots) =>
      previousSlots.filter(
        (_, slotIndex) => slotIndex !== index
      )
    );
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validSlots = slots
      .filter((slot) => slot.time.trim())
      .map((slot) => ({
        time: slot.time.trim(),
        isBooked: false,
      }));

    if (!day) {
      setError("Please select a day.");
      return;
    }

    if (validSlots.length === 0) {
      setError("Please add at least one time slot.");
      return;
    }

    const uniqueTimes = new Set(
      validSlots.map((slot) => slot.time)
    );

    if (uniqueTimes.size !== validSlots.length) {
      setError("Duplicate time slots are not allowed.");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        "/schedule/create",
        {
          day,
          slots: validSlots,
        }
      );

      setSuccess(
        response.data.message ||
          "Schedule created successfully."
      );

      setSlots([
        {
          time: "",
          isBooked: false,
        },
      ]);
    } catch (error) {
      console.error(
        "Schedule creation failed:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to create schedule."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-slate-800">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">
          My Schedule
        </h1>

        <p className="mt-2 text-slate-500">
          Create your available appointment slots for patients
        </p>
      </div>

      <div className="mx-auto max-w-3xl">

        <form
          onSubmit={handleCreateSchedule}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          <div className="mb-7 flex items-center gap-3 border-b border-slate-100 pb-5">

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <CalendarDays size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Create Availability
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select a day and add the times when you are available.
              </p>
            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Day
            </label>

            <select
              value={day}
              onChange={(e) =>
                setDay(e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500"
            >
              {days.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

          </div>

          <div className="mt-7">

            <div className="mb-3 flex items-center justify-between gap-4">

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Available Time Slots
                </label>

                <p className="mt-1 text-xs text-slate-400">
                  Add one or more appointment times.
                </p>
              </div>

              <button
                type="button"
                onClick={addSlot}
                className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
              >
                <Plus size={17} />
                Add Slot
              </button>

            </div>

            <div className="space-y-3">

              {slots.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 p-3"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <Clock size={18} />
                  </div>

                  <input
                    type="time"
                    value={slot.time}
                    onChange={(e) =>
                      handleSlotChange(
                        index,
                        e.target.value
                      )
                    }
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeSlot(index)
                    }
                    disabled={slots.length === 1}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:text-slate-300"
                    aria-label="Remove slot"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              ))}

            </div>

          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
              <CheckCircle2 size={18} />
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading
              ? "Creating Schedule..."
              : "Create Schedule"}
          </button>

        </form>

        <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">

          <p className="text-sm text-slate-600">
            Once created, these slots are stored against your doctor account.
            Booked slots will later be marked unavailable when a patient books them.
          </p>

        </div>

      </div>

    </div>
  );
}

export default MySchedule;