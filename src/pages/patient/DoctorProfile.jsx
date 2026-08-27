import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  CalendarDays,
  MapPin,
  Clock,
  UserRound,
} from "lucide-react";

function DoctorProfile() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const doctors = [
    {
      id: 1,
      name: "Dr. Rahul Sharma",
      specialization: "Cardiologist",
      qualification: "MBBS, MD Cardiology",
      experience: "12 Years",
      rating: "4.9",
      reviews: "124",
      fees: "₹600",
      hospital: "LifeCare Hospital",
      location: "Delhi, India",
      availability: "Mon - Sat",
      timing: "10:00 AM - 2:00 PM",
      about:
        "Dr. Rahul Sharma is an experienced cardiologist specializing in heart health, preventive cardiology and cardiovascular care.",
    },
    {
      id: 2,
      name: "Dr. Priya Mehta",
      specialization: "Dermatologist",
      qualification: "MBBS, MD Dermatology",
      experience: "8 Years",
      rating: "4.8",
      reviews: "98",
      fees: "₹500",
      hospital: "LifeCare Hospital",
      location: "Delhi, India",
      availability: "Mon - Fri",
      timing: "11:00 AM - 3:00 PM",
      about:
        "Dr. Priya Mehta provides expert dermatology consultations for skin, hair and cosmetic concerns.",
    },
    {
      id: 3,
      name: "Dr. Amit Verma",
      specialization: "Orthopedic",
      qualification: "MBBS, MS Orthopedics",
      experience: "10 Years",
      rating: "4.7",
      reviews: "86",
      fees: "₹700",
      hospital: "LifeCare Hospital",
      location: "Delhi, India",
      availability: "Mon - Sat",
      timing: "9:00 AM - 1:00 PM",
      about:
        "Dr. Amit Verma specializes in orthopedic treatment, joint problems, fractures and sports injuries.",
    },
    {
      id: 4,
      name: "Dr. Neha Kapoor",
      specialization: "Gynecologist",
      qualification: "MBBS, MD Gynecology",
      experience: "7 Years",
      rating: "4.9",
      reviews: "112",
      fees: "₹600",
      hospital: "LifeCare Hospital",
      location: "Delhi, India",
      availability: "Mon - Sat",
      timing: "10:00 AM - 2:00 PM",
      about:
        "Dr. Neha Kapoor provides comprehensive women's healthcare and gynecological consultations.",
    },
    {
      id: 5,
      name: "Dr. Arjun Singh",
      specialization: "Neurologist",
      qualification: "MBBS, MD Neurology",
      experience: "15 Years",
      rating: "4.8",
      reviews: "156",
      fees: "₹800",
      hospital: "LifeCare Hospital",
      location: "Delhi, India",
      availability: "Mon - Fri",
      timing: "12:00 PM - 4:00 PM",
      about:
        "Dr. Arjun Singh is an experienced neurologist specializing in neurological disorders and patient care.",
    },
  ];

  const doctor = doctors.find(
    (item) => item.id === Number(doctorId)
  );

  if (!doctor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Doctor not found
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
      >
        <ArrowLeft size={18} />
        Back to Doctors
      </button>

      {/* Profile Card */}
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

        {/* Top Section */}
        <div className="border-b border-slate-200 p-6 dark:border-slate-800 md:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            {/* Doctor */}
            <div className="flex items-center gap-5">

              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                <UserRound
                  size={42}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                  {doctor.name}
                </h1>

                <p className="mt-1 font-medium text-blue-600 dark:text-blue-400">
                  {doctor.specialization}
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {doctor.qualification}
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm">
                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {doctor.rating}
                  </span>

                  <span className="text-slate-400">
                    ({doctor.reviews} reviews)
                  </span>
                </div>
              </div>

            </div>

            {/* Book Button */}
            <button
              onClick={() =>
                navigate(`/patient/doctor/${doctor.id}/book`)
              }
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <CalendarDays size={18} />
              Book Appointment
            </button>

          </div>

        </div>

        {/* Details */}
        <div className="grid gap-5 border-b border-slate-200 p-6 dark:border-slate-800 md:grid-cols-3 md:p-8">

          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-400">
              Experience
            </p>

            <p className="mt-1 font-semibold text-slate-800 dark:text-white">
              {doctor.experience}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-400">
              Consultation Fee
            </p>

            <p className="mt-1 font-semibold text-slate-800 dark:text-white">
              {doctor.fees}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-400">
              Hospital
            </p>

            <p className="mt-1 font-semibold text-slate-800 dark:text-white">
              {doctor.hospital}
            </p>
          </div>

        </div>

        {/* About */}
        <div className="p-6 md:p-8">

          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            About Doctor
          </h2>

          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
            {doctor.about}
          </p>

          {/* Location & Availability */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-700">

              <MapPin
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Location
                </p>

                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {doctor.location}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-700">

              <Clock
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Availability
                </p>

                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {doctor.availability}
                </p>

                <p className="text-xs text-slate-400">
                  {doctor.timing}
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