import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div style={{ display: "flex", gap: 6 }}>
      Navbar
      <a href="/login">Login</a>
      <a href="/dashboard">Dashboard</a>
      <a href="/students">Students</a>
      <a href="/vaccination-drives">Vaccination Drives</a>
      {isAuthenticated && <button onClick={logout}>Logout</button>}
    </div>
  );
};

export default Navbar;
