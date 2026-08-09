import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Link } from "react-router-dom";
import {
  FaBell,
  FaUsers,
  FaHourglassHalf,
  FaStethoscope,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaChartLine,
  FaHeartbeat,
  FaClipboardList,
  FaTrophy,
} from "react-icons/fa";

import { getPatients } from "../utils/patientStorage";
import { getNotifications } from "../utils/notificationStorage";

function Dashboard() {
  const patients = getPatients();

  const notifications =
    getNotifications();

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;

  const waitingCount = patients.filter(
    (p) => p.status === "Waiting"
  ).length;

  const consultationCount =
    patients.filter(
      (p) =>
        p.status ===
        "Consultation"
    ).length;

  const completedCount =
    patients.filter(
      (p) =>
        p.status ===
        "Completed"
    ).length;

  const totalForPercent =
    patients.length || 1;

  const waitingPercent = Math.round(
    (waitingCount / totalForPercent) * 100
  );

  const consultationPercent = Math.round(
    (consultationCount / totalForPercent) * 100
  );

  const completedPercent = Math.round(
    (completedCount / totalForPercent) * 100
  );

  const completionRate = patients.length
    ? Math.round(
        (completedCount / patients.length) * 100
      )
    : 0;

  const queueLoadLabel =
    waitingCount === 0
      ? "None"
      : waitingCount <= 2
      ? "Low"
      : waitingCount <= 5
      ? "Medium"
      : "High";

  const queueMessage =
  waitingCount === 0
    ? "No patients are waiting in queue."
    : waitingCount <= 3
    ? "Your clinic queue is running smoothly."
    : waitingCount <= 6
    ? "Queue is getting busy. Monitor waiting times."
    : "High queue volume detected. Immediate attention recommended.";

  const queueLevel =
    waitingCount === 0
      ? "excellent"
      : waitingCount <= 3
      ? "healthy"
      : waitingCount <= 6
      ? "busy"
      : "overloaded";

  const queueStatusLabel =
    waitingCount === 0
      ? "Excellent"
      : waitingCount <= 3
      ? "Healthy"
      : waitingCount <= 6
      ? "Busy"
      : "Overloaded";

  const queueBadgeText =
    queueLevel === "busy" || queueLevel === "overloaded"
      ? "Queue Busy"
      : "Queue Healthy";


const doctorStats = {};

patients.forEach((patient) => {
  if (!doctorStats[patient.doctor]) {
    doctorStats[patient.doctor] = 0;
  }

  doctorStats[patient.doctor]++;
});

const topDoctors = Object.entries(
  doctorStats
)
  .map(([doctor, count]) => ({
    doctor,
    count,
  }))
  .sort((a, b) => b.count - a.count);


  const chartData = [
    {
      name: "Waiting",
      value: waitingCount,
    },
    {
      name: "Consultation",
      value: consultationCount,
    },
    {
      name: "Completed",
      value: completedCount,
    },

  ];



  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#10b981",
  ];

  return (
    <main className="dashboard">

      <div className="top-header">

        <div className="header-right">

          <Link
            to="/notifications"
            className="notification-bell"
          >
            <FaBell />

            {unreadCount > 0 && (
              <span className="notification-count">
                {unreadCount}
              </span>
            )}
          </Link>

          <div className="profile">
            <strong>
              Receptionist
            </strong>

            <small>
              Green Life Clinic
            </small>
          </div>

          <button className="date-btn">
  {new Date().toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  )}
</button>

        </div>

      </div>

      {patients.length === 0 ? (
  <>
    <h1>🏥 ClinicQ Ready
</h1>

    <p>
      Add your first patient to explore
      the dashboard.
    </p>
  </>
) : (
  <>
    <h1>
      Good Morning,
      Receptionist 👋
    </h1>

    <p>
      Here's what's happening
      in your clinic today.
    </p>
  </>
)}

      <div className="stats-container">

        <div className="card">
          <span className="card-icon icon-blue">
            <FaUsers />
          </span>
          <h3>Total Patients</h3>
          <h2>{patients.length}</h2>
          <span className="card-sub">Today</span>
          <svg
            className="sparkline spark-blue"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
          >
            <polyline points="0,20 15,18 30,22 45,15 60,17 75,10 90,14 100,8" />
          </svg>
        </div>

        <div className="card">
          <span className="card-icon icon-orange">
            <FaHourglassHalf />
          </span>
          <h3>Waiting Patients</h3>
          <h2>{waitingCount}</h2>
          <span className="card-sub">Today</span>
          <svg
            className="sparkline spark-orange"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
          >
            <polyline points="0,10 15,14 30,9 45,16 60,11 75,18 90,13 100,17" />
          </svg>
        </div>

        <div className="card">
          <span className="card-icon icon-sky">
            <FaStethoscope />
          </span>
          <h3>In Consultation</h3>
          <h2>{consultationCount}</h2>
          <span className="card-sub">Today</span>
          <svg
            className="sparkline spark-sky"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
          >
            <polyline points="0,18 15,12 30,16 45,9 60,13 75,7 90,10 100,5" />
          </svg>
        </div>

        <div className="card">
          <span className="card-icon icon-green">
            <FaCheckCircle />
          </span>
          <h3>Completed</h3>
          <h2>{completedCount}</h2>
          <span className="card-sub">Today</span>
          <svg
            className="sparkline spark-green"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
          >
            <polyline points="0,22 15,19 30,15 45,17 60,10 75,13 90,8 100,6" />
          </svg>
        </div>

      </div>

      <div className="charts-section">

        <div className="chart-card">

          <h3>
            Patient Status Distribution
          </h3>

          <div className="donut-flex">

            <div className="donut-chart-wrap">
              <ResponsiveContainer
                width="100%"
                height={120}
              >
                <PieChart>

                  <Pie
      data={chartData}
      dataKey="value"
      outerRadius={46}
      innerRadius={26}
      paddingAngle={4}
    >
                    {chartData.map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />

                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-legend">

              <div className="legend-row">
                <span className="legend-label">
                  <span className="dot dot-waiting"></span>
                  Waiting
                </span>
                <span className="legend-value">
                  {waitingCount} ({waitingPercent}%)
                </span>
              </div>

              <div className="legend-row">
                <span className="legend-label">
                  <span className="dot dot-consultation"></span>
                  Consultation
                </span>
                <span className="legend-value">
                  {consultationCount} ({consultationPercent}%)
                </span>
              </div>

              <div className="legend-row">
                <span className="legend-label">
                  <span className="dot dot-completed"></span>
                  Completed
                </span>
                <span className="legend-value">
                  {completedCount} ({completedPercent}%)
                </span>
              </div>

            </div>

          </div>

        </div>

        <div className="chart-card">

  <h3>
    <FaHeartbeat className="heading-icon" />
    Queue Health
  </h3>

  <div className={`queue-health-banner banner-${queueLevel}`}>
    <span className="banner-icon">
      <FaShieldAlt />
    </span>
    <div>
      <h2>{queueStatusLabel}</h2>
      <p>{queueMessage}</p>
    </div>
  </div>

  <div className="queue-health-grid">

    <div className="qh-box">
      <FaClock className="qh-icon" />
      <span className="qh-label">Avg Wait Time</span>
      <span className="qh-value">{waitingCount * 8} mins</span>
    </div>

    <div className="qh-box">
      <FaUsers className="qh-icon" />
      <span className="qh-label">Waiting Patients</span>
      <span className="qh-value">{waitingCount}</span>
    </div>

    <div className="qh-box">
      <FaChartLine className="qh-icon" />
      <span className="qh-label">Queue Load</span>
      <span className="qh-value">{queueLoadLabel}</span>
    </div>

    <div className="qh-box">
      <FaCheckCircle className="qh-icon" />
      <span className="qh-label">Completion Rate</span>
      <span className="qh-value">{completionRate}%</span>
    </div>

  </div>

</div>
      </div>

      <div className="bottom-section">

  <div className="activity-card">

    <h3>
      <FaClipboardList className="heading-icon" />
      Today's Summary
    </h3>

    <div className="summary-row">
      <span className="summary-label">
        <span className="icon-box icon-blue">
          <FaUsers />
        </span>
        Total Patients
      </span>
      <span className="summary-value">{patients.length}</span>
    </div>

    <div className="summary-row">
      <span className="summary-label">
        <span className="icon-box icon-orange">
          <FaHourglassHalf />
        </span>
        Waiting Patients
      </span>
      <span className="summary-value">{waitingCount}</span>
    </div>

    <div className="summary-row">
      <span className="summary-label">
        <span className="icon-box icon-sky">
          <FaStethoscope />
        </span>
        In Consultation
      </span>
      <span className="summary-value">{consultationCount}</span>
    </div>

    <div className="summary-row">
      <span className="summary-label">
        <span className="icon-box icon-green">
          <FaCheckCircle />
        </span>
        Completed
      </span>
      <span className="summary-value">{completedCount}</span>
    </div>

    <div className="summary-row">
      <span className="summary-label">
        <span className="icon-box icon-green">
          <FaHeartbeat />
        </span>
        Queue Status
      </span>
      <span className={`status-pill pill-${queueLevel}`}>
        {queueBadgeText}
      </span>
    </div>

  </div>

  <div className="doctors-card">

    <h3>
      <FaTrophy className="heading-icon gold" />
      Top Doctors Today
    </h3>

    {topDoctors.length > 0 ? (
      topDoctors.map(
        (doctor, index) => {
          const percent = Math.round(
            (doctor.count / totalForPercent) * 100
          );

          return (
            <div
              className="doctor-item"
              key={doctor.doctor}
            >
              <div className="doctor-row">
                <span className="doctor-avatar">
                  {doctor.doctor.charAt(0)}
                </span>

                <div className="doctor-info">
                  <span className="doctor-name">
                    {doctor.doctor}
                  </span>
                  <span className="doctor-count">
                    {doctor.count}{" "}
                    {doctor.count === 1
                      ? "Patient"
                      : "Patients"}
                  </span>
                </div>

                <span className="doctor-percent">
                  {percent}%
                </span>
              </div>

              <div className="progress">
                <div
                  className={`progress-fill fill-${
                    (index % 3) + 1
                  }`}
                  style={{
                    width: `${percent}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        }
      )
    ) : (
      <p>No doctor data available</p>
    )}

  </div>

</div>
    </main>
  );
}

export default Dashboard;