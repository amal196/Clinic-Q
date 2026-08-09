import { getPatients } from "../utils/patientStorage";

import { FaFileExport } from "react-icons/fa";

function Reports() {
  const patients = getPatients();

  const completedPatients = patients.filter(
    (patient) => patient.status === "Completed"
  );

  const exportCSV = () => {
    if (completedPatients.length === 0) {
      alert("No completed consultations to export");
      return;
    }

    const headers = [
      "Token",
      "Patient",
      "Doctor",
      "Status",
    ];

    const rows = completedPatients.map(
      (patient) => [
        patient.tokenNumber,
        patient.name,
        patient.doctor,
        patient.status,
      ]
    );

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      `ClinicQ_Report_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div className="page-container">
      <div className="reports-header">
        <div>
          <h1>Reports</h1>

          <p>
            Completed Consultation
            History
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="export-btn"
        >
          <FaFileExport />
          Export CSV
        </button>
      </div>

      <div className="table-card">
        <table className="queue-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {completedPatients.length >
            0 ? (
              completedPatients.map(
                (patient) => (
                  <tr key={patient.id}>
                    <td className="token-cell">
                      #
                      {
                        patient.tokenNumber
                      }
                    </td>

                    <td>
                      {patient.name}
                    </td>

                    <td>
                      {patient.doctor}
                    </td>

                    <td>
                      <span className="status-badge completed">
                        Completed
                      </span>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="empty-state"
                >
                  📄 No completed consultations yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;