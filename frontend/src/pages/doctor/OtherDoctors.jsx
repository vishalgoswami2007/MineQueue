import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Stethoscope,
  Building2,
  Mail,
  BadgeCheck,
  Users,
} from "lucide-react";

import axiosInstance from "../../utils/AxiosInstance";

function OtherDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] =
    useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosInstance.get(
          "/dashboard/Doctor"
        );

        setDoctors(response.data.doctor || []);
      } catch (error) {
        console.error(
          "Doctors fetch failed:",
          error
        );

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

  const specializations = useMemo(() => {
    const values = doctors
      .map((doctor) => doctor.specialization)
      .filter(Boolean);

    return [
      "All",
      ...new Set(values),
    ];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return doctors.filter((doctor) => {
      const name =
        doctor.fullname?.toLowerCase() || "";

      const doctorSpecialization =
        doctor.specialization?.toLowerCase() || "";

      const hospital =
        doctor.hospital?.toLowerCase() || "";

      const matchesSearch =
        name.includes(query) ||
        doctorSpecialization.includes(query) ||
        hospital.includes(query);

      const matchesSpecialization =
        specialization === "All" ||
        doctor.specialization ===
          specialization;

      return (
        matchesSearch &&
        matchesSpecialization
      );
    });
  }, [doctors, search, specialization]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg font-semibold text-slate-700">
          Loading doctors...
        </p>
      </div>
    );
  }

  return (
    <div className="text-slate-800">

      <div className="mb-7">
        <h1 className="text-3xl font-bold text-blue-600">
          Other Doctors
        </h1>

        <p className="mt-2 text-slate-500">
          Explore doctors registered on MineQueue
        </p>
      </div>

      <div className="mb-7 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">

        <div className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-2.5 lg:w-96">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search name, specialization or hospital..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />

        </div>

        <select
          value={specialization}
          onChange={(e) =>
            setSpecialization(
              e.target.value
            )
          }
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
        >
          {specializations.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {!error && (
        <>
          <div className="mb-4 flex items-center justify-between">

            <div className="flex items-center gap-2">
              <Users
                size={20}
                className="text-blue-600"
              />

              <h2 className="text-lg font-semibold text-slate-800">
                Doctors
              </h2>
            </div>

            <span className="text-sm text-slate-500">
              {filteredDoctors.length} doctors found
            </span>

          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                      {doctor.fullname
                        ?.charAt(0)
                        .toUpperCase() || "D"}
                    </div>

                    <div className="min-w-0">

                      <div className="flex items-center gap-1">
                        <h3 className="truncate font-semibold text-slate-800">
                          {doctor.fullname}
                        </h3>

                        {doctor.isDoctorVerified && (
                          <BadgeCheck
                            size={17}
                            className="shrink-0 text-green-600"
                          />
                        )}
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-sm text-blue-600">
                        <Stethoscope size={14} />

                        <span className="truncate">
                          {doctor.specialization ||
                            "General Doctor"}
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

                <div className="mt-5 space-y-3 rounded-lg bg-slate-50 p-4">

                  <div className="flex items-start gap-3">

                    <Building2
                      size={17}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">
                        Hospital / Clinic
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                        {doctor.hospital ||
                          "Not added"}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <Mail
                      size={17}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">
                        Email
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                        {doctor.email}
                      </p>
                    </div>

                  </div>

                </div>

                <div className="mt-5 flex items-center justify-between">

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      doctor.isDoctorVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {doctor.isDoctorVerified
                      ? "Verified"
                      : "Verification Pending"}
                  </span>

                </div>

              </div>
            ))}

          </div>

          {filteredDoctors.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">

              <Stethoscope
                size={42}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-700">
                No doctors found
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Try another name, hospital or specialization.
              </p>

            </div>
          )}
        </>
      )}

    </div>
  );
}

export default OtherDoctors;