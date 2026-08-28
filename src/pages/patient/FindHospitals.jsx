import { useState } from 'react';
import hospitalImg from '../../assets/hospital1.png';
import hospitalImg2 from '../../assets/hospital2.png';
import hospitalImg3 from '../../assets/hospital3.png';
import { Link } from 'react-router-dom';
import DoctorList from '../patient/DoctorsList.jsx';

const dummyHospitals = [
  { id: 1, name: "ZyroHospital", city: "Rohtak", state: "Haryana", doctors: 2, image: hospitalImg },
  { id: 2, name: "City Care Hospital", city: "Karnal", state: "Haryana", doctors: 4, image: hospitalImg2 },
  { id: 3, name: "MedLife Hospital", city: "Panipat", state: "Haryana", doctors: 3, image: hospitalImg3 },
];

function FindHospitals() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-600 text-center">Find Hospitals</h1>
      <p className="text-gray-600 text-center mt-2 mb-8">Choose a hospital near you to get started</p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Enter City..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Enter State..."
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
          Filter
        </button>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dummyHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-44 object-cover"
            />

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">{hospital.name}</h3>
                <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {hospital.doctors} Doctors
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-4">{hospital.city}, {hospital.state}</p>

              <Link to={DoctorList} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
                View Doctors
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindHospitals;