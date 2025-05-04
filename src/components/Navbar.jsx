const Navbar = () => {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      Navbar
      <a href="/login">Login</a>
      <a href="/dashboard">Dashboard</a>
      <a href="/students">Students</a>
      <a href="/vaccination-drives">Vaccination Drives</a>
      <a href="/reports">Reports</a>
    </div>
  );
};

export default Navbar;
