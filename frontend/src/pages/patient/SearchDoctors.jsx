import { useState } from 'react';
import { User, Search as SearchIcon } from 'lucide-react';

const dummyDoctors = [
  { id: 1, name: "Dr. Priya Sharma", specialization: "Cardiologist", hospital: "ZyroHospital", experience: "8 years" },
  { id: 2, name: "Dr. Ankit Verma", specialization: "Dermatologist", hospital: "City Care Hospital", experience: "5 years" },
  { id: 3, name: "Dr. Ravi Kumar", specialization: "Orthopedic", hospital: "MedLife Hospital", experience: "10 years" },
  { id: 4, name: "Dr. Neha Gupta", specialization: "Cardiologist", hospital: "City Care Hospital", experience: "6 years" },
  { id: 5, name: "Dr. Sameer Khan", specialization: "General Physician", hospital: "ZyroHospital", experience: "12 years" },
  { id: 6, name: "Dr. Anjali Mehta", specialization: "Dermatologist", hospital: "MedLife Hospital", experience: "4 years" },
];

function SearchDoctors() {
  const [nameQuery, setNameQuery] = useState('');
  const [specializationQuery, setSpecializationQuery] = useState('');

  const filteredDoctors = dummyDoctors.filter((doctor) => {
    const matchesName = doctor.name.toLowerCase().includes(nameQuery.toLowerCase());
    const matchesSpecialization = doctor.specialization.toLowerCase().includes(specializationQuery.toLowerCase());
    return matchesName && matchesSpecialization;
  });

  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-600 text-center">Search Doctors</h1>
      <p className="text-gray-600 text-center mt-2 mb-8">Find the right doctor by name or specialization</p>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Dr. Sharma"
          value={nameQuery}
          onChange={(e) => setNameQuery(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Enter specialization..."
          value={specializationQuery}
          onChange={(e) => setSpecializationQuery(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
          <SearchIcon size={18} />
          Search
        </button>
      </div>

      {/* Doctor Cards Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="border border-gray-200 rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition bg-white"
            >
              {/* Avatar */}
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={36} className="text-blue-600" />
              </div>

              {/* Name */}
              <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>

              {/* Specialization Badge */}
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mt-2">
                {doctor.specialization}
              </span>

              {/* Hospital + Experience */}
              <p className="text-sm text-gray-500 mt-3">{doctor.hospital}</p>
              <p className="text-sm text-gray-500">{doctor.experience} experience</p>

              {/* Button */}
              <button className="w-full mt-5 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
                View Profile
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">No doctors found matching your search.</p>
      )}
    </div>
  );
}

export default SearchDoctors;