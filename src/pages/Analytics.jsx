import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaChartPie,
  FaChartBar,
  FaLightbulb,
  FaTrophy,
} from "react-icons/fa";

import { getPatients } from "../utils/patientStorage";

function Analytics() {
  const patients = getPatients();

  const totalPatients = patients.length;

  const waitingPatients = patients.filter(
    (patient) => patient.status === "Waiting"
  ).length;

  const consultationPatients = patients.filter(
    (patient) => patient.status === "Consultation"
  ).length;

  const completedPatients = patients.filter(
    (patient) => patient.status === "Completed"
  ).length;

  const totalForPercent = patients.length || 1;

  const waitingPercent = Math.round(
    (waitingPatients / totalForPercent) * 100
  );

  const consultationPercent = Math.round(
    (consultationPatients / totalForPercent) * 100
  );

  const completedPercent = Math.round(
    (completedPatients / totalForPercent) * 100
  );

  const activePatients =
    waitingPatients + consultationPatients;

  const queueStatusLabel =
    waitingPatients > 5 ? "Busy" : "Normal";

  const queueStatusClass =
    waitingPatients > 5 ? "tile-orange" : "tile-green";

const doctorData = [
  {
    doctor: "Dr Jeswin",
    patients: patients.filter(
      (p) =>
        p.doctor ===
        "Dr Jeswin Scaria"
    ).length,
  },
  {
    doctor: "Dr Nekha",
    patients: patients.filter(
      (p) =>
        p.doctor ===
        "Dr Nekha Salbin"
    ).length,
  },
  {
    doctor: "Dr Abin",
    patients: patients.filter(
      (p) =>
        p.doctor ===
        "Dr Abin Saju"
    ).length,
  },
];

  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#10b981",
  ];

  const busiestDoctor = doctorData.reduce(
    (top, current) =>
      current.patients > top.patients
        ? current
        : top,
    doctorData[0]
  );

  return (
    <div className="page-container">
      <h1>Analytics</h1>
      <p>
        Clinic performance overview and
        patient statistics.
      </p>

      <div className="kpi-strip">

        <div className="kpi-item">
          <span className="kpi-dot dot-blue"></span>
          <div>
            <span className="kpi-value">{totalPatients}</span>
            <span className="kpi-label">Total Patients</span>
          </div>
        </div>

        <div className="kpi-divider"></div>

        <div className="kpi-item">
          <span className="kpi-dot dot-orange"></span>
          <div>
            <span className="kpi-value">{waitingPatients}</span>
            <span className="kpi-label">Waiting</span>
          </div>
        </div>

        <div className="kpi-divider"></div>

        <div className="kpi-item">
          <span className="kpi-dot dot-sky"></span>
          <div>
            <span className="kpi-value">{consultationPatients}</span>
            <span className="kpi-label">Consultation</span>
          </div>
        </div>

        <div className="kpi-divider"></div>

        <div className="kpi-item">
          <span className="kpi-dot dot-green"></span>
          <div>
            <span className="kpi-value">{completedPatients}</span>
            <span className="kpi-label">Completed</span>
          </div>
        </div>

      </div>

      <div className="analytics-charts-row">

        <div className="analytics-panel">
          <h3>
            <FaChartPie className="heading-icon" />
            Patient Flow Analysis
          </h3>

          {patients.length === 0 ? (
            <div className="flow-bar">
              <div className="flow-segment seg-empty"></div>
            </div>
          ) : (
            <div className="flow-bar">
              <div
                className="flow-segment seg-waiting"
                style={{ width: `${waitingPercent}%` }}
              ></div>
              <div
                className="flow-segment seg-consultation"
                style={{ width: `${consultationPercent}%` }}
              ></div>
              <div
                className="flow-segment seg-completed"
                style={{ width: `${completedPercent}%` }}
              ></div>
            </div>
          )}

          <div className="flow-legend">

            <div className="flow-legend-item">
              <span className="dot dot-waiting"></span>
              <span>Waiting</span>
              <strong>
                {waitingPatients} ({waitingPercent}%)
              </strong>
            </div>

            <div className="flow-legend-item">
              <span className="dot dot-consultation"></span>
              <span>Consultation</span>
              <strong>
                {consultationPatients} ({consultationPercent}%)
              </strong>
            </div>

            <div className="flow-legend-item">
              <span className="dot dot-completed"></span>
              <span>Completed</span>
              <strong>
                {completedPatients} ({completedPercent}%)
              </strong>
            </div>

          </div>
        </div>

        <div className="analytics-panel">
          <h3>
            <FaChartBar className="heading-icon" />
            Doctor Performance
          </h3>

          <ResponsiveContainer
            width="100%"
            height={150}
          >
            <BarChart data={doctorData}>
              <XAxis
                dataKey="doctor"
                tick={{ fontSize: 11 }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11 }}
              />
              <Tooltip />

              <Bar
                dataKey="patients"
                radius={[6, 6, 0, 0]}
              >
                {doctorData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {busiestDoctor && busiestDoctor.patients > 0 && (
            <p className="busiest-line">
              <FaTrophy className="busiest-icon" />
              Busiest today: <strong>{busiestDoctor.doctor}</strong>
              {" "}({busiestDoctor.patients}{" "}
              {busiestDoctor.patients === 1 ? "patient" : "patients"})
            </p>
          )}
        </div>

      </div>

      <div className="analytics-panel insights-panel">
        <h3>
          <FaLightbulb className="heading-icon gold" />
          Clinic Insights
        </h3>

        <div className="insight-grid">

          <div className="insight-tile tile-blue">
            <span className="tile-value">{totalPatients}</span>
            <span className="tile-label">Registered Patients</span>
          </div>

          <div className="insight-tile tile-sky">
            <span className="tile-value">{activePatients}</span>
            <span className="tile-label">Active Patients</span>
          </div>

          <div className="insight-tile tile-green">
            <span className="tile-value">{completedPatients}</span>
            <span className="tile-label">Completed Visits</span>
          </div>

          <div className={`insight-tile ${queueStatusClass}`}>
            <span className="tile-value">{queueStatusLabel}</span>
            <span className="tile-label">Queue Status</span>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Analytics;