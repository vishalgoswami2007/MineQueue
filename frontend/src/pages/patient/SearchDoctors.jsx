import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Search as SearchIcon,
  Building2,
  BadgeCheck,
} from "lucide-react";

import axiosInstance from "../../utils/AxiosInstance";

function SearchDoctors() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [specializationQuery, setSpecializationQuery] = useState("");
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

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const name = doctor.fullname || "";
      const specialization = doctor.specialization || "";

      const matchesName = name
        .toLowerCase()
        .includes(nameQuery.trim().toLowerCase());

      const matchesSpecialization = specialization
        .toLowerCase()
        .includes(specializationQuery.trim().toLowerCase());

      return matchesName && matchesSpecialization;
    });
  }, [doctors, nameQuery, specializationQuery]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg font-semibold text-gray-700">
          Loading doctors...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-blue-600">
        Search Doctors
      </h1>

      <p className="mt-2 mb-8 text-center text-gray-600">
        Find the right doctor by name or specialization
      </p>

      <div className="mx-auto mb-12 flex max-w-3xl flex-col gap-4 sm:flex-row">

        <div className="relative flex-1">
          <SearchIcon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search doctor name..."
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <input
          type="text"
          placeholder="Enter specialization..."
          value={specializationQuery}
          onChange={(e) => setSpecializationQuery(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />

      </div>

      {error && (
        <div className="mx-auto mb-8 max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {!error && filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <User
                  size={36}
                  className="text-blue-600"
                />
              </div>

              <div className="flex items-center justify-center gap-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {doctor.fullname}
                </h3>

                {doctor.isDoctorVerified && (
                  <BadgeCheck
                    size={18}
                    className="text-blue-600"
                  />
                )}
              </div>

              <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {doctor.specialization || "General Doctor"}
              </span>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Building2 size={16} />

                <span>
                  {doctor.hospital || "Hospital not provided"}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(`/patient/doctor/${doctor._id}`)
                }
                className="mt-5 w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
              >
                View Profile
              </button>

            </div>
          ))}

        </div>
      ) : (
        !error && (
          <div className="mt-12 text-center">
            <User
              size={42}
              className="mx-auto text-gray-300"
            />

            <p className="mt-4 text-gray-500">
              No doctors found matching your search.
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default SearchDoctors;