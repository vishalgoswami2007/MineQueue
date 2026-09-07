import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  UserRound,
  Building2,
  BadgeCheck,
} from "lucide-react";

import { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";

function DoctorsList() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosInstance.get("/dashboard/Doctor");

        setDoctors(response.data.doctor || []);
      } catch (error) {
        console.error("Doctors fetch failed:", error);

        setError(
          error.response?.data?.message ||
            "Unable to fetch doctors"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-lg font-semibold text-slate-700 dark:text-white">
          Loading doctors...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
      >
        <ArrowLeft size={18} />
        Back to Hospitals
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Available Doctors
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Choose a doctor and book your appointment
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Doctors
        </h2>

        <span className="text-sm text-slate-500 dark:text-slate-400">
          {doctors.length} {doctors.length === 1 ? "Doctor" : "Doctors"}
        </span>
      </div>

      {!error && doctors.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
          <UserRound
            size={42}
            className="mx-auto text-slate-400"
          />

          <h2 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">
            No doctors available
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Doctors will appear here once they register.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                  <UserRound
                    size={30}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      {doctor.fullname}
                    </h3>

                    {doctor.isDoctorVerified && (
                      <BadgeCheck
                        size={17}
                        className="text-blue-600"
                      />
                    )}
                  </div>

                  <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                    {doctor.specialization || "General Doctor"}
                  </p>
                </div>

              </div>

              <div className="mt-5 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">

                <div className="flex items-center gap-3">
                  <Building2
                    size={18}
                    className="text-blue-600 dark:text-blue-400"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Hospital
                    </p>

                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {doctor.hospital || "Not provided"}
                    </p>
                  </div>
                </div>

              </div>

              <div className="mt-5 flex gap-3">

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/patient/doctor/${doctor._id}`)
                  }
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300"
                >
                  View Profile
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/patient/doctor/${doctor._id}/book`)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <CalendarDays size={16} />
                  Book
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorsList;