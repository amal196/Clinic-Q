import { useEffect, useState } from "react";
import {
  getPatients,
  deletePatient,
  editPatient,
} from "../utils/patientStorage";

import {
  FaSearch,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadPatients = () => {
    const storedPatients = getPatients();
    setPatients(storedPatients);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    deletePatient(id);
    loadPatients();
  };

  const handleEdit = (patient) => {
    const name = prompt(
      "Enter Patient Name",
      patient.name
    );

    if (!name) return;

    const age = prompt(
      "Enter Age",
      patient.age
    );

    if (!age) return;

    const phone = prompt(
      "Enter Phone Number",
      patient.phone
    );

    if (!phone) return;

    const updatedPatient = {
      ...patient,
      name,
      age,
      phone,
    };

    editPatient(updatedPatient);
    loadPatients();
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : patient.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      <h1>Patients</h1>
      <p>All registered patients.</p>

      <div className="filter-bar">
        <div className="search-wrap">
          <FaSearch className="search-wrap-icon" />

          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="search-patient"
          />
        </div>

        <select
          className="status-filter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Patients</option>
          <option value="Waiting">Waiting</option>
          <option value="Consultation">
            Consultation
          </option>
          <option value="Completed">
            Completed
          </option>
        </select>
      </div>

      <div className="table-card">
        <table className="queue-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.phone}</td>
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

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(patient)
                      }
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(patient.id)
                      }
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="empty-state"
                >
                  👨‍⚕️ No Patients Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patients;