import { getPatients } from "../utils/patientStorage";

import {
  FaCalendarAlt,
  FaClipboardList,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";

function Appointments() {
  const appointments = getPatients().filter(
    (patient) =>
      patient.appointmentDate &&
      patient.appointmentTime
  );

  const confirmedCount = appointments.length;

  const waitingCount = appointments.filter(
    (patient) => patient.status === "Waiting"
  ).length;

  const completedCount = appointments.filter(
    (patient) => patient.status === "Completed"
  ).length;

  return (
    <div className="page-container">
      <h1>Appointments</h1>

      <p>
        Manage today's scheduled appointments.
      </p>

      <div className="stats-container">
        <div className="card">
          <span className="card-icon icon-blue">
            <FaCalendarAlt />
          </span>
          <h3>Total Appointments</h3>
          <h2>{appointments.length}</h2>
        </div>

        <div className="card">
          <span className="card-icon icon-sky">
            <FaClipboardList />
          </span>
          <h3>Scheduled</h3>
          <h2>{confirmedCount}</h2>
        </div>

        <div className="card">
          <span className="card-icon icon-orange">
            <FaHourglassHalf />
          </span>
          <h3>Waiting</h3>
          <h2>{waitingCount}</h2>
        </div>

        <div className="card">
          <span className="card-icon icon-green">
            <FaCheckCircle />
          </span>
          <h3>Completed</h3>
          <h2>{completedCount}</h2>
        </div>
      </div>

      <div className="table-card">
        <table className="queue-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length > 0 ? (
              appointments.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.appointmentDate}</td>
                  <td>{patient.appointmentTime}</td>
                  <td>{patient.name}</td>
                  <td>{patient.doctor}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        patient.status === "Waiting"
                          ? "waiting"
                          : patient.status ===
                            "Consultation"
                          ? "consultation"
                          : "completed"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="empty-state"
                >
                  📅 No Appointments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;