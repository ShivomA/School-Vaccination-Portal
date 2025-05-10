import { create } from "zustand";

const useAppStore = create((set) => ({
  // Dashboard state
  dashboardData: {},
  setDashboardData: (dashboardData) => set({ dashboardData }),

  // Student state
  students: [],
  setStudents: (students) => set({ students }),
  addStudentToStore: (student) => {
    set((state) => ({ students: [student, ...state.students] }));
    return "Student added successfully";
  },
  bulkAddStudentsToStore: (students) => {
    set((state) => ({ students: [...state.students, ...students] }));
    return "Students added successfully";
  },
  updateStudentInStore: (id, student) => {
    set((state) => ({
      students: [student, ...state.students.filter((s) => s.id !== id)],
    }));
    return "Student updated successfully";
  },

  // Vaccination drive state
  vaccinationDrives: [],
  setVaccinationDrives: (vaccinationDrives) => set({ vaccinationDrives }),
  addVaccinationDriveToStore: (vaccinationDrive) => {
    set((state) => ({
      vaccinationDrives: [...state.vaccinationDrives, vaccinationDrive],
    }));
    return "Vaccination drive added successfully";
  },
  updateVaccinationDriveInStore: (id, vaccinationDrive) => {
    set((state) => ({
      vaccinationDrives: state.vaccinationDrives.map((vd) =>
        vd.id === id ? vaccinationDrive : vd
      ),
    }));
    return "Vaccination drive updated successfully";
  },

  // Selected vaccination drive state
  selectedVaccinationDrive: null,
  setSelectedVaccinationDrive: (selectedVaccinationDrive) =>
    set({ selectedVaccinationDrive }),

  // Applicable students for drive state
  applicableStudents: [],
  setApplicableStudents: (applicableStudents) => set({ applicableStudents }),
  updateApplicableStudentInStore: (id, student) => {
    set((state) => ({
      applicableStudents: state.applicableStudents.map((s) =>
        s.id === id ? student : s
      ),
      selectedVaccinationDrive: {
        ...state.selectedVaccinationDrive,
        availableDoses: state.selectedVaccinationDrive.availableDoses - 1,
      },
    }));
    return "Student updated successfully";
  },
}));

export default useAppStore;
