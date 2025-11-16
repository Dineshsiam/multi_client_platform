import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-sm">
        SaaS <span className="text-pink-500">Dashboard</span>
      </h1>
      <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-lg">
        Manage your users, analytics, and reports all in one elegant, modern
        dashboard.
      </p>
      <div className="mt-10 space-x-4">
        <Link
          to="/signup"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow transition"
        >
          🚀 Get Started
        </Link>
        <Link
          to="/login"
          className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
