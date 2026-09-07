import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import hospitalImg from "../../assets/hospital1.png";
import hospitalImg2 from "../../assets/hospital2.png";
import hospitalImg3 from "../../assets/hospital3.png";

const hospitals = [
  {
    id: 1,
    name: "ZyroHospital",
    city: "Rohtak",
    state: "Haryana",
    doctors: 2,
    image: hospitalImg,
  },
  {
    id: 2,
    name: "City Care Hospital",
    city: "Karnal",
    state: "Haryana",
    doctors: 4,
    image: hospitalImg2,
  },
  {
    id: 3,
    name: "MedLife Hospital",
    city: "Panipat",
    state: "Haryana",
    doctors: 3,
    image: hospitalImg3,
  },
];

function FindHospitals() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const cityMatch = hospital.city
        .toLowerCase()
        .includes(city.trim().toLowerCase());

      const stateMatch = hospital.state
        .toLowerCase()
        .includes(state.trim().toLowerCase());

      return cityMatch && stateMatch;
    });
  }, [city, state]);

  const handleClearFilter = () => {
    setCity("");
    setState("");
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-blue-600">
        Find Hospitals
      </h1>

      <p className="mt-2 mb-8 text-center text-gray-600">
        Choose a hospital near you to get started
      </p>

      <div className="mx-auto mb-8 flex max-w-3xl flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Enter City..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Enter State..."
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />

        {(city || state) && (
          <button
            type="button"
            onClick={handleClearFilter}
            className="rounded-lg border border-gray-300 px-5 py-2 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Clear
          </button>
        )}
      </div>

      {filteredHospitals.length === 0 ? (
        <div className="py-12 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No hospitals found
          </h2>

          <p className="mt-2 text-gray-500">
            Try searching with another city or state.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={hospital.image}
                alt={hospital.name}
                className="h-44 w-full object-cover"
              />

              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {hospital.name}
                  </h3>

                  <span className="whitespace-nowrap rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {hospital.doctors} Doctors
                  </span>
                </div>

                <p className="mb-5 text-sm text-gray-500">
                  {hospital.city}, {hospital.state}
                </p>

                <Link
                  to="/patient/hospitals/doctorList"
                  className="block w-full rounded-lg bg-blue-600 py-2.5 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                  View Doctors
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FindHospitals;