import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import { useAuth } from "./components/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Students from "./pages/students/Students";
import AddStudent from "./pages/students/AddStudent";
import EditStudent from "./pages/students/EditStudent";

import VaccinationDrives from "./pages/vaccinationDrives/VaccinationDrives";
import AddVaccinationDrive from "./pages/vaccinationDrives/AddVaccinationDrive";
import EditVaccinationDrive from "./pages/vaccinationDrives/EditVaccinationDrive";

import NotFound from "./pages/NotFound";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Students */}
        <Route
          path="/students"
          element={
            <PrivateRoute>
              <Students />
            </PrivateRoute>
          }
        />
        <Route
          path="/students/add"
          element={
            <PrivateRoute>
              <AddStudent />
            </PrivateRoute>
          }
        />
        <Route
          path="/students/edit/:id"
          element={
            <PrivateRoute>
              <EditStudent />
            </PrivateRoute>
          }
        />

        {/* Vaccination drives */}
        <Route
          path="/vaccination-drives"
          element={
            <PrivateRoute>
              <VaccinationDrives />
            </PrivateRoute>
          }
        />
        <Route
          path="/vaccination-drives/add"
          element={
            <PrivateRoute>
              <AddVaccinationDrive />
            </PrivateRoute>
          }
        />
        <Route
          path="/vaccination-drives/edit/:id"
          element={
            <PrivateRoute>
              <EditVaccinationDrive />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
