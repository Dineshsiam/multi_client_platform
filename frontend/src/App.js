import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function Navbar() {
  // Retrieve token and user data from localStorage
  const token = localStorage.getItem("saas_token");
  const userRaw = localStorage.getItem("saas_user");

  // ✅ Safe parse — prevents crash when localStorage is corrupted or undefined
  let user = null;
  try {
    if (userRaw && userRaw !== "undefined" && userRaw !== "null") {
      user = JSON.parse(userRaw);
    }
  } catch (e) {
    console.error("Invalid JSON in localStorage for saas_user:", e);
    user = null;
  }

  // Logout function — clears localStorage and redirects to login
  function logout() {
    localStorage.removeItem("saas_token");
    localStorage.removeItem("saas_user");
    window.location.href = "/login";
  }

  return (
    <nav className="backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">
          <Link to="/">
            SaaS<span className="text-pink-500">Hub</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-gray-700 font-medium">
          <Link className="hover:text-indigo-600 transition" to="/">
            Home
          </Link>

          {token && (
            <Link className="hover:text-indigo-600 transition" to="/dashboard">
              Dashboard
            </Link>
          )}

          {!token && (
            <>
              <Link className="hover:text-indigo-600 transition" to="/login">
                Login
              </Link>
              <Link className="hover:text-indigo-600 transition" to="/signup">
                Sign Up
              </Link>
            </>
          )}

          {token && (
            <button
              onClick={logout}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Greeting */}
        <div className="ml-4 text-sm text-gray-600 italic">
          {user ? `👋 Hi, ${user.name}` : ""}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <footer className="bg-gray-900 text-gray-300 text-center py-4 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-indigo-400 font-semibold">SaaS Hub</span> — All
        rights reserved.
      </footer>
    </div>
  );
}
