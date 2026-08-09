import { BrowserRouter, Routes, Route } from "react-router-dom";


import Notifications from "./pages/Notifications";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

import QueueManagement from "./pages/QueueManagement";
import AddPatient from "./pages/AddPatient";
import DoctorView from "./pages/DoctorView";
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/queue" element={<QueueManagement />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/doctor-view" element={<DoctorView />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />}
/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;