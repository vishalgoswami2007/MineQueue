import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, CalendarDays, UserRound } from "lucide-react";

function DoctorsList() {
  const { hospitalId } = useParams();
  const navigate = useNavigate();

  const doctors = [
    {
      id: 1,
      name: "Dr. Rahul Sharma",
      specialization: "Cardiologist",
      experience: "12 Years",
      rating: "4.9",
      fees: "₹600",
    },
    {
      id: 2,
      name: "Dr. Priya Mehta",
      specialization: "Dermatologist",
      experience: "8 Years",
      rating: "4.8",
      fees: "₹500",
    },
    {
      id: 3,
      name: "Dr. Amit Verma",
      specialization: "Orthopedic",
      experience: "10 Years",
      rating: "4.7",
      fees: "₹700",
    },
    {
      id: 4,
      name: "Dr. Neha Kapoor",
      specialization: "Gynecologist",
      experience: "7 Years",
      rating: "4.9",
      fees: "₹600",
    },
    {
      id: 5,
      name: "Dr. Arjun Singh",
      specialization: "Neurologist",
      experience: "15 Years",
      rating: "4.8",
      fees: "₹800",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
      >
        <ArrowLeft size={18} />
        Back to Hospitals
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Hospital Doctors
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Choose a doctor and book your appointment
        </p>
      </div>

      {/* Hospital Info */}
      <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/30">
        <p className="text-sm text-blue-600 dark:text-blue-400">
          Hospital ID
        </p>

        <p className="mt-1 font-semibold text-slate-800 dark:text-white">
          {hospitalId}
        </p>
      </div>

      {/* Doctors Count */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Available Doctors
        </h2>

        <span className="text-sm text-slate-500 dark:text-slate-400">
          {doctors.length} Doctors
        </span>
      </div>

      {/* Doctors */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >

            {/* Doctor Info */}
            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                <UserRound
                  size={30}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">
                  {doctor.name}
                </h3>

                <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                  {doctor.specialization}
                </p>
              </div>

            </div>

            {/* Details */}
            <div className="mt-5 grid grid-cols-3 divide-x rounded-lg bg-slate-50 py-3 dark:bg-slate-800">

              <div className="text-center">
                <p className="text-xs text-slate-400">
                  Experience
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {doctor.experience}
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <p className="text-xs text-slate-400">
                  Rating
                </p>

                <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  {doctor.rating}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-400">
                  Fees
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {doctor.fees}
                </p>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-3">

              <button
                onClick={() =>
                  navigate(`/patient/doctor/${doctor.id}`)
                }
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                View Profile
              </button>

              <button
                onClick={() =>
                  navigate(`/patient/doctor/${doctor.id}/book`)
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

    </div>
  );
}

export default DoctorsList;