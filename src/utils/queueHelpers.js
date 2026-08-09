export const AVG_CONSULTATION_TIME = 8;

// Get how many active patients are ahead
export const getPatientsAhead = (
  patients,
  currentPatientId
) => {
  const activePatients = patients.filter(
    (patient) =>
      patient.status === "Waiting" ||
      patient.status === "Consultation"
  );

  const currentIndex = activePatients.findIndex(
    (patient) => patient.id === currentPatientId
  );

  return currentIndex < 0 ? 0 : currentIndex;
};

// Waiting time calculation
export const calculateWaitingTime = (
  patientsAhead
) => {
  return patientsAhead * AVG_CONSULTATION_TIME;
};

// Current token being consulted
export const getCurrentToken = (
  patients
) => {
  const consultingPatient = patients.find(
    (patient) =>
      patient.status === "Consultation"
  );

  return consultingPatient
    ? consultingPatient.tokenNumber
    : 0;
};