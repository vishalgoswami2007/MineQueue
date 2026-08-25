import { useState } from 'react';
import { User, CalendarDays, MapPin } from 'lucide-react';

const upcomingAppointments = [
  { id: 1, doctorName: "Dr. Priya Sharma", specialization: "Cardiologist", hospital: "ZyroHospital", date: "28 Aug 2026", time: "10:00 AM", status: "Confirmed" },
  { id: 2, doctorName: "Dr. Ravi Kumar", specialization: "Orthopedic", hospital: "MedLife Hospital", date: "02 Sep 2026", time: "3:30 PM", status: "Confirmed" },
];

const pastAppointments = [
  { id: 3, doctorName: "Dr. Ankit Verma", specialization: "Dermatologist", hospital: "City Care Hospital", date: "10 Jul 2026", time: "11:00 AM", status: "Completed" },
];

function MyAppointments() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const appointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-600 text-center">My Appointments</h1>
      <p className="text-gray-600 text-center mt-2 mb-8">Track your upcoming and past visits</p>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-10">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === 'upcoming'
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === 'past'
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Past
        </button>
      </div>

      {/* Appointment List */}
      {appointments.length > 0 ? (
        <div className="max-w-3xl mx-auto space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
            >
              {/* Left - Doctor Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center shrink">
                  <User size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{appt.doctorName}</h3>
                  <p className="text-sm text-gray-500">{appt.specialization}</p>
                  <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin size={14} /> {appt.hospital}
                  </p>
                </div>
              </div>

              {/* Middle - Date/Time */}
              <div className="text-center sm:text-left">
                <p className="flex items-center gap-2 font-semibold text-gray-900">
                  <CalendarDays size={16} className="text-blue-600" />
                  {appt.date}
                </p>
                <p className="text-sm text-gray-500 mt-1">{appt.time}</p>
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mt-2 ${
                    appt.status === "Confirmed"
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {appt.status}
                </span>
              </div>

              {/* Right - Actions */}
              <div className="flex gap-2">
                {activeTab === 'upcoming' ? (
                  <>
                    <button className="px-4 py-2 border border-red-300 text-red-500 text-sm font-semibold rounded-lg hover:bg-red-50 transition">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
                      Reschedule
                    </button>
                  </>
                ) : (
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
                    Book Again
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">
          You have no {activeTab} appointments.
        </p>
      )}
    </div>
  );
}

export default MyAppointments;