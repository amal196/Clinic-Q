import { useState } from "react";
import { savePatient } from "../utils/patientStorage";

import {
  saveNotification,
} from "../utils/notificationStorage";

import { FaUserPlus } from "react-icons/fa";

function AddPatient() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [doctor, setDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingPatients =
  JSON.parse(
    localStorage.getItem("patients")
  ) || [];

const newPatient = {
  id: Date.now(),

  tokenNumber:
    existingPatients.length + 1,

  name,
  age,
  phone,
  doctor,

  appointmentDate,
  appointmentTime,

  status: "Waiting",
};

    savePatient(newPatient);

    saveNotification({
  id: Date.now(),

  title: "Appointment Confirmed",

  message: `${name} added successfully for ${doctor}`,

  time: new Date().toLocaleString(),

  read: false,
});

    alert("Patient Added Successfully");

    setName("");
    setAge("");
    setPhone("");
    setDoctor("");
    setAppointmentDate("");
    setAppointmentTime("");
  };



  return (
    <div className="page-container">
      <h1>Add New Patient</h1>
      <p>Register a patient into the queue.</p>

      <form
        className="patient-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Doctor</label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            <option>Dr Jeswin Scaria</option>
            <option>Dr Nekha Salbin</option>
            <option>Dr Abin Saju</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Appointment Date</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) =>
                setAppointmentDate(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Appointment Time</label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) =>
                setAppointmentTime(e.target.value)
              }
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          <FaUserPlus />
          Add Patient
        </button>
      </form>
    </div>
  );
}

export default AddPatient;