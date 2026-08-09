export const getPatients = () => {
  const patients = localStorage.getItem("patients");
  return patients ? JSON.parse(patients) : [];
};

export const savePatient = (patient) => {
  const patients = getPatients();

  patients.push(patient);

  localStorage.setItem(
    "patients",
    JSON.stringify(patients)
  );
};

export const updatePatientStatus = (id, status) => {
  const patients = getPatients();

  const updatedPatients = patients.map((patient) =>
    patient.id === id
      ? { ...patient, status }
      : patient
  );

  localStorage.setItem(
    "patients",
    JSON.stringify(updatedPatients)
  );
};

export const deletePatient = (id) => {
  const patients = getPatients();

  const updatedPatients = patients.filter(
    (patient) => patient.id !== id
  );

  localStorage.setItem(
    "patients",
    JSON.stringify(updatedPatients)
  );
};

export const editPatient = (updatedPatient) => {
  const patients = getPatients();

  const updatedPatients = patients.map((patient) =>
    patient.id === updatedPatient.id
      ? updatedPatient
      : patient
  );

  localStorage.setItem(
    "patients",
    JSON.stringify(updatedPatients)
  );
};