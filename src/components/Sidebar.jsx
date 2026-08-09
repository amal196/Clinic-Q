import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaUserMd,
  FaCalendarAlt,
  FaHospitalUser,
  FaChartBar,
  FaFileAlt,
  FaCog,
  FaBell,
  FaShieldAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-row">
          <span className="logo-icon">
            <FaShieldAlt />
          </span>
          <h2>Clinic Q</h2>
        </div>
        <p>Clinic Queue Management System</p>
      </div>

      <ul>

        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/queue"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaUsers />
            Queue Management
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-patient"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaUserPlus />
            Add Patient
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/doctor-view"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaUserMd />
            Doctor View
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaCalendarAlt />
            Appointments
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/patients"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaHospitalUser />
            Patients
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaChartBar />
            Analytics
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaFileAlt />
            Reports
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaBell />
            Notifications
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FaCog />
            Settings
          </NavLink>
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;