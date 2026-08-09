import {
  FaUserMd,
  FaCheckCircle,
  FaBriefcaseMedical,
  FaMapMarkerAlt,
} from "react-icons/fa";

const DOCTOR_COLORS = [
  "#6366f1",
  "#14b8a6",
  "#8b5cf6",
];

const getInitials = (fullName) => {
  const parts = fullName
    .replace("Dr ", "")
    .split(" ");

  return parts
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
};

function DoctorView() {
  const doctors = [
    {
      name: "Dr Jeswin Scaria",
      specialty: "General Physician",
      department: "General Medicine",
      status: "Available Today",
      description:
        "Experienced in General Consultation, Fever Management and Preventive Care.",
    },
    {
      name: "Dr Nekha Salbin",
      specialty: "Dermatologist",
      department: "Skin Care Specialist",
      status: "Available Today",
      description:
        "Experienced in Skin Treatments, Acne Management and Cosmetic Dermatology.",
    },
    {
      name: "Dr Abin Saju",
      specialty: "Cardiologist",
      department: "Heart Care Specialist",
      status: "Available Today",
      description:
        "Experienced in Heart Health, ECG Evaluation and Cardiac Consultation.",
    },
  ];

  return (
    <div className="page-container">
      <h1>Doctor Dashboard</h1>

      <p>
        View doctor profiles and clinic
        specialist information.
      </p>

      <div className="stats-container">
        <div className="card">
          <span className="card-icon icon-blue">
            <FaUserMd />
          </span>
          <h3>Total Doctors</h3>
          <h2>3</h2>
        </div>

        <div className="card">
          <span className="card-icon icon-green">
            <FaCheckCircle />
          </span>
          <h3>Available Today</h3>
          <h2>3</h2>
        </div>

        <div className="card">
          <span className="card-icon icon-sky">
            <FaBriefcaseMedical />
          </span>
          <h3>Specializations</h3>
          <h2>3</h2>
        </div>
      </div>

      <div className="doctor-grid">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="doctor-card"
          >
            <div className="doctor-card-top">
              <span
                className="doctor-card-avatar"
                style={{
                  background:
                    DOCTOR_COLORS[
                      index % DOCTOR_COLORS.length
                    ],
                }}
              >
                {getInitials(doctor.name)}
              </span>

              <span className="doctor-status-pill">
                {doctor.status}
              </span>
            </div>

            <h3>{doctor.name}</h3>

            <div className="doctor-meta">
              <span className="doctor-meta-row">
                <FaUserMd className="doctor-meta-icon" />
                {doctor.specialty}
              </span>

              <span className="doctor-meta-row">
                <FaMapMarkerAlt className="doctor-meta-icon" />
                {doctor.department}
              </span>
            </div>

            <p className="doctor-description">
              {doctor.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorView;