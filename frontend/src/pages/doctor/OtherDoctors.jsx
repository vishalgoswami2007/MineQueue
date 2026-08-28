import  { useState } from "react";

function OtherDoctors() {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All");

  const doctors = [
    {
      id: 1,
      name: "Dr. Ankit Sharma",
      specialization: "Cardiologist",
      experience: "12 Years",
      patients: "2.4K",
      rating: "4.9",
      status: "Available",
    },
    {
      id: 2,
      name: "Dr. Priya Mehta",
      specialization: "Dermatologist",
      experience: "8 Years",
      patients: "1.8K",
      rating: "4.8",
      status: "Available",
    },
    {
      id: 3,
      name: "Dr. Rahul Verma",
      specialization: "Orthopedic",
      experience: "10 Years",
      patients: "2.1K",
      rating: "4.7",
      status: "Busy",
    },
    {
      id: 4,
      name: "Dr. Neha Kapoor",
      specialization: "Gynecologist",
      experience: "7 Years",
      patients: "1.5K",
      rating: "4.9",
      status: "Available",
    },
    {
      id: 5,
      name: "Dr. Amit Gupta",
      specialization: "Neurologist",
      experience: "15 Years",
      patients: "3.2K",
      rating: "4.8",
      status: "Available",
    },
    {
      id: 6,
      name: "Dr. Riya Singh",
      specialization: "Pediatrician",
      experience: "6 Years",
      patients: "1.2K",
      rating: "4.6",
      status: "Busy",
    },
  ];

  const specializations = [
    "All",
    "Cardiologist",
    "Dermatologist",
    "Orthopedic",
    "Gynecologist",
    "Neurologist",
    "Pediatrician",
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase());

    const matchesSpecialization =
      specialization === "All" ||
      doctor.specialization === specialization;

    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 md:px-10">

      {/* Header */}
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-blue-600">
          Other Doctors
        </h1>

        <p className="mt-2 text-slate-500">
          Find and connect with other doctors and specialists
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-7 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}
        <div className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-2.5 lg:w-96">
          <span className="text-lg text-slate-400">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search doctor or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Specialization */}
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
        >
          {specializations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Result Count */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Doctors
        </h2>

        <span className="text-sm text-slate-500">
          {filteredDoctors.length} doctors found
        </span>
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >

            {/* Doctor Top */}
            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                {/* Avatar */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                  {doctor.name
                    .replace("Dr. ", "")
                    .charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {doctor.name}
                  </h3>

                  <p className="mt-1 text-sm text-blue-600">
                    {doctor.specialization}
                  </p>
                </div>

              </div>

              {/* Status */}
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  doctor.status === "Available"
                    ? "bg-green-100 text-green-600"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                {doctor.status}
              </span>

            </div>

            {/* Details */}
            <div className="mt-5 grid grid-cols-3 divide-x rounded-lg bg-slate-50 py-3">

              <div className="text-center">
                <p className="text-xs text-slate-400">
                  Experience
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {doctor.experience}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-400">
                  Patients
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {doctor.patients}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-400">
                  Rating
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  ★ {doctor.rating}
                </p>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-2">

              <button className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
                View Profile
              </button>

              <button className="flex-1 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                Connect
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* No Doctors */}
      {filteredDoctors.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
          <h3 className="font-semibold text-slate-700">
            No doctors found
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Try searching for another doctor or specialization.
          </p>
        </div>
      )}

    </div>
  );
}

export default OtherDoctors;