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

  // Vaccine drive state
  drives: [],
  setDrives: (drives) => set({ drives }),
  addDrive: (drive) => set((state) => ({ drives: [...state.drives, drive] })),
}));

export default useAppStore;
