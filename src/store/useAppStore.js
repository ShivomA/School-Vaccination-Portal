import { create } from "zustand";

const useAppStore = create((set) => ({
  // Student state
  students: [],
  setStudents: (students) => set({ students }),
  addStudentToStore: (student) => {
    set((state) => ({ students: [...state.students, student] }));
    return "Student added successfully";
  },
  updateStudentInStore: (id, student) => {
    set((state) => ({
      students: state.students.map((s) => (s.id === id ? student : s)),
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
}));

export default useAppStore;
