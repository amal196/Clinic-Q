import { useEffect, useState } from "react";

import {
  getPatients,
  updatePatientStatus,
} from "../utils/patientStorage";

import {
  saveNotification,
} from "../utils/notificationStorage";

import {
  getPatientsAhead,
  calculateWaitingTime,
} from "../utils/queueHelpers";

import {
  FaUsers,
  FaHourglassHalf,
  FaStethoscope,
  FaCheckCircle,
  FaPlay,
  FaCheck,
} from "react-icons/fa";

const DOCTOR_SPECIALTY = {
  "Dr Jeswin Scaria": "General Physician",
  "Dr Nekha Salbin": "Dermatologist",
  "Dr Abin Saju": "Cardiologist",
};

function QueueManagement() {
  const [patients, setPatients] = useState([]);

  const loadPatients = () => {
    const storedPatients = getPatients();
    setPatients(storedPatients);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleConsultation = (patient) => {
    updatePatientStatus(
      patient.id,
      "Consultation"
    );

    saveNotification({
      id: Date.now(),
      title: "Consultation Started",
      message: `${patient.name} started consultation with ${patient.doctor}`,
      time: new Date().toLocaleString(),
      read: false,
    });

    const updatedPatients =
      getPatients();

    const doctorWaiting =
      updatedPatients.filter(
        (p) =>
          p.doctor === patient.doctor &&
          p.status === "Waiting"
      ).length;

    const specialty =
      DOCTOR_SPECIALTY[patient.doctor] ||
      patient.doctor;

    const queueMessage =
      doctorWaiting === 0
        ? `No patients waiting for ${specialty}`
        : doctorWaiting === 1
        ? `1 patient waiting for ${specialty}`
        : `${doctorWaiting} patients waiting for ${specialty}`;

    saveNotification({
      id: Date.now() + 1,
      title: "Queue Update",
      message: queueMessage,
      time:
        new Date().toLocaleString(),
      read: false,
    });

    loadPatients();
  };

  const handleComplete = (patient) => {
    updatePatientStatus(
      patient.id,
      "Completed"
    );

    saveNotification({
      id: Date.now(),
      title:
        "Consultation Completed",
      message:
        `${patient.name}'s consultation completed successfully`,
      time:
        new Date().toLocaleString(),
      read: false,
    });

    const updatedPatients =
      getPatients();

    const doctorActiveCount =
      updatedPatients.filter(
        (p) =>
          p.doctor === patient.doctor &&
          (p.status === "Waiting" ||
            p.status === "Consultation")
      ).length;

    if (doctorActiveCount === 0) {
      const specialty =
        DOCTOR_SPECIALTY[
          patient.doctor
        ] || patient.doctor;

      saveNotification({
        id: Date.now() + 1,
        title: "Queue Cleared",
        message:
          `${specialty} queue is cleared`,
        time:
          new Date().toLocaleString(),
        read: false,
      });
    }

    loadPatients();
  };

  const waitingCount = patients.filter(
    (patient) => patient.status === "Waiting"
  ).length;

  const consultationCount = patients.filter(
    (patient) =>
      patient.status === "Consultation"
  ).length;

  const completedCount = patients.filter(
    (patient) => patient.status === "Completed"
  ).length;

  const activeQueue = patients.filter(
    (patient) =>
      patient.status !== "Completed"
  );

  const isDoctorBusy = (doctorName) =>
    patients.some(
      (p) =>
        p.doctor === doctorName &&
        p.status === "Consultation"
    );

  return (
    <div className="page-container">
      <h1>Queue Management</h1>
      <p>
        Live view of patients waiting and in
        consultation.
      </p>

      <div className="stats-container">
        <div className="card">
          <span className="card-icon icon-blue">
            <FaUsers />
          </span>
          <h3>Total Patients</h3>
          <h2>{patients.length}</h2>
        </div>

        <div className="card">
          <span className="card-icon icon-orange">
            <FaHourglassHalf />
          </span>
          <h3>Waiting</h3>
          <h2>{waitingCount}</h2>
        </div>

        <div className="card">
          <span className="card-icon icon-sky">
            <FaStethoscope />
          </span>
          <h3>Consultation</h3>
          <h2>{consultationCount}</h2>
        </div>

        <div className="card">
          <span className="card-icon icon-green">
            <FaCheckCircle />
          </span>
          <h3>Completed</h3>
          <h2>{completedCount}</h2>
        </div>
      </div>

      {activeQueue.length === 0 ? (
        <div className="empty-state">
          🎉 No patients waiting or in
          consultation right now.
        </div>
      ) : (
        <div className="table-card">
          <table className="queue-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Patients Ahead</th>
                <th>Estimated Wait</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {activeQueue.map((patient) => {

                const doctorQueue =
                  patients.filter(
                    (p) =>
                      p.doctor ===
                      patient.doctor
                  );

                const patientsAhead =
                  getPatientsAhead(
                    doctorQueue,
                    patient.id
                  );

                return (
                  <tr key={patient.id}>
                    <td className="token-cell">
                      #{patient.tokenNumber}
                    </td>

                    <td>{patient.name}</td>

                    <td>{patient.doctor}</td>

                    <td>{patientsAhead}</td>

                    <td>
                      {patient.status ===
                      "Completed"
                        ? "0 mins"
                        : `${calculateWaitingTime(
                            patientsAhead
                          )} mins`}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          patient.status ===
                          "Waiting"
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

                    <td>
                      {patient.status ===
                        "Waiting" &&
                        (isDoctorBusy(
                          patient.doctor
                        ) ? (
                          <span className="doctor-busy-note">
                            <FaHourglassHalf />
                            Doctor busy
                          </span>
                        ) : (
                          <button
                            className="start-btn"
                            onClick={() =>
                              handleConsultation(
                                patient
                              )
                            }
                          >
                            <FaPlay />
                            Start Consultation
                          </button>
                        ))}

                      {patient.status ===
                        "Consultation" && (
                        <button
                          className="complete-btn"
                          onClick={() =>
                            handleComplete(
                              patient
                            )
                          }
                        >
                          <FaCheck />
                          Complete
                        </button>
                      )}

                      {patient.status ===
                        "Completed" && (
                        <span className="done-badge">
                          <FaCheckCircle />
                          Done
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default QueueManagement;