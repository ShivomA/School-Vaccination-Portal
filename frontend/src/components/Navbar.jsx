import { useState } from "react";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated) return;

  return (
    <nav className="bg-blue-100 h-14 w-full px-6 py-3 fixed">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold text-blue-800">
          School Vaccination Portal
        </div>

        {/* Hamburger Menu (for small screens) */}
        <button
          className="md:hidden text-blue-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Links (visible on md+ screens) */}
        <div className="hidden md:flex items-center gap-4 text-blue-700 font-medium">
          <a href="/dashboard" className="hover:text-blue-900 transition">
            Dashboard
          </a>
          <a href="/students" className="hover:text-blue-900 transition">
            Students
          </a>
          <a
            href="/vaccination-drives"
            className="hover:text-blue-900 transition"
          >
            Vaccination Drives
          </a>
          <button
            onClick={logout}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Collapsible Links (for mobile screens) */}
      {menuOpen && (
        <div className="mt-3 flex flex-col gap-2 md:hidden text-blue-700 font-medium">
          <a href="/dashboard" className="hover:text-blue-900 transition">
            Dashboard
          </a>
          <a href="/students" className="hover:text-blue-900 transition">
            Students
          </a>
          <a
            href="/vaccination-drives"
            className="hover:text-blue-900 transition"
          >
            Vaccination Drives
          </a>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
