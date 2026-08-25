import { useState } from "react";


function MySchedule() {
  const [filter, setFilter] = useState("All");

  const appointments = [
    {
      id: 1,
      time: "09:00 AM",
      name: "Amit Kumar",
      age: 28,
      reason: "General Checkup",
      type: "In-Person",
      status: "Completed",
    },
    {
      id: 2,
      time: "10:30 AM",
      name: "Rahul Sharma",
      age: 34,
      reason: "Fever & Cold",
      type: "In-Person",
      status: "Upcoming",
    },
    {
      id: 3,
      time: "11:30 AM",
      name: "Priya Singh",
      age: 25,
      reason: "Follow-up",
      type: "Video Call",
      status: "Upcoming",
    },
    {
      id: 4,
      time: "01:00 PM",
      name: "Neha Verma",
      age: 31,
      reason: "Consultation",
      type: "In-Person",
      status: "Cancelled",
    },
  ];

  const completed = appointments.filter(
    (item) => item.status === "Completed"
  ).length;

  const upcoming = appointments.filter(
    (item) => item.status === "Upcoming"
  ).length;

  const cancelled = appointments.filter(
    (item) => item.status === "Cancelled"
  ).length;

  const filteredAppointments =
    filter === "All"
      ? appointments
      : appointments.filter((item) => item.status === filter);

  return (
    <div className="schedule-page">

      {/* Page Header */}
      <div className="schedule-header">
        <div>
          <h1>My Schedule</h1>
          <p>Manage your appointments and daily consultations</p>
        </div>

        <div className="date-box">
          <button>‹</button>
          <span>August 25, 2026</span>
          <button>›</button>
        </div>
      </div>

      {/* Statistics */}
      <div className="schedule-stats">

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div>
            <p>Total Appointments</p>
            <h2>{appointments.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div>
            <p>Completed</p>
            <h2>{completed}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div>
            <p>Upcoming</p>
            <h2>{upcoming}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✕</div>
          <div>
            <p>Cancelled</p>
            <h2>{cancelled}</h2>
          </div>
        </div>

      </div>

      {/* Next Appointment */}
      {upcoming > 0 && (
        <div className="next-appointment">

          <div>
            <small>NEXT APPOINTMENT</small>
            <h2>Rahul Sharma</h2>
            <p>Fever & Cold • 34 Years • In-Person</p>
          </div>

          <div className="next-appointment-right">
            <h3>10:30 AM</h3>
            <button>View Details</button>
          </div>

        </div>
      )}

      {/* Appointment List */}
      <div className="appointments-card">

        <div className="appointments-header">
          <div>
            <h2>Today's Appointments</h2>
            <p>{appointments.length} appointments scheduled</p>
          </div>

          <div className="filter-buttons">
            <button
              className={filter === "All" ? "active" : ""}
              onClick={() => setFilter("All")}
            >
              All
            </button>

            <button
              className={filter === "Upcoming" ? "active" : ""}
              onClick={() => setFilter("Upcoming")}
            >
              Upcoming
            </button>

            <button
              className={filter === "Completed" ? "active" : ""}
              onClick={() => setFilter("Completed")}
            >
              Completed
            </button>

            <button
              className={filter === "Cancelled" ? "active" : ""}
              onClick={() => setFilter("Cancelled")}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Appointments */}
        <div className="appointment-list">

          {filteredAppointments.map((appointment) => (
            <div className="appointment-item" key={appointment.id}>

              <div className="appointment-time">
                <strong>{appointment.time}</strong>
              </div>

              <div className="patient">
                <div className="patient-avatar">
                  {appointment.name.charAt(0)}
                </div>

                <div>
                  <strong>{appointment.name}</strong>
                  <span>{appointment.age} Years</span>
                </div>
              </div>

              <div className="appointment-reason">
                <strong>{appointment.reason}</strong>
                <span>{appointment.type}</span>
              </div>

              <div>
                <span
                  className={`appointment-status ${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>
              </div>

              <button className="view-button">
                View
              </button>

            </div>
          ))}

          {filteredAppointments.length === 0 && (
            <div className="no-appointments">
              No appointments found.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default MySchedule;