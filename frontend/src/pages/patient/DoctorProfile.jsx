import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Stethoscope,
  Building2,
  UserRound,
} from "lucide-react";

function DoctorProfile() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosInstance.get(
          `/dashboard/Doctor/${doctorId}`
        );

        setDoctor(response.data.doctor);
      } catch (error) {
        console.error("Doctor fetch failed:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load doctor profile"
        );
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-lg font-semibold text-slate-700 dark:text-white">
          Loading doctor profile...
        </p>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Doctor not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    navigate(`/patient/doctor/${doctor._id}/book`);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
      >
        <ArrowLeft size={18} />
        Back to Doctors
      </button>

      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

        <div className="border-b border-slate-200 p-6 dark:border-slate-800 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                <UserRound
                  size={42}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                  {doctor.fullname}
                </h1>

                <p className="mt-1 flex items-center gap-2 font-medium text-blue-600 dark:text-blue-400">
                  <Stethoscope size={17} />
                  {doctor.specialization || "General Doctor"}
                </p>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {doctor.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleBookAppointment}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <CalendarDays size={18} />
              Book Appointment
            </button>

          </div>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2 md:p-8">

          <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800">
            <div className="flex items-center gap-3">
              <Building2
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />

              <div>
                <p className="text-sm text-slate-400">
                  Hospital
                </p>

                <p className="font-semibold text-slate-800 dark:text-white">
                  {doctor.hospital || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800">
            <div className="flex items-center gap-3">
              <MapPin
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />

              <div>
                <p className="text-sm text-slate-400">
                  Doctor Status
                </p>

                <p className="font-semibold text-slate-800 dark:text-white">
                  {doctor.isDoctorVerified
                    ? "Verified Doctor"
                    : "Verification Pending"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;