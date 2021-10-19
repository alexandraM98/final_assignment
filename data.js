const ROLE = {
    PATIENT: 'patient',
    RESEARCHER: 'researcher',
    DOCTOR: 'doctor'
  }
  
  module.exports = {
    ROLE: ROLE,
    users: [
      { id: 1, name: 'Jane Doe', role: ROLE.PATIENT },
      { id: 2, name: 'John Doe', role: ROLE.PATIENT },
      { id: 3, name: 'Dr. Jones', role: ROLE.DOCTOR },
      { id: 4, name: 'Dr. Roberts', role: ROLE.DOCTOR },
      { id: 5, name: 'Dr. Roberts', role: ROLE.RESEARCHER }
    ],
    projects: [
      { id: 1, name: "Kyle's Project", userId: 1 },
      { id: 2, name: "Sally's Project", userId: 2 },
      { id: 3, name: "Joe's Project", userId: 3 }
    ]
  }