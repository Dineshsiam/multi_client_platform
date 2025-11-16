import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/login`, form);
      localStorage.setItem("saas_token", res.data.token);
      localStorage.setItem("saas_user", JSON.stringify(res.data.user));
      setMsg("✅ Login successful! Redirecting...");
      setTimeout(() => window.location.replace("/dashboard"), 700);
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Login error");
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Illustration Section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-500 to-pink-400 text-white items-center justify-center p-10">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg opacity-90">
            Access your personalized SaaS dashboard, track reports, and view
            insights in one place.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl transition hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
            Login to Your Account
          </h2>
          <form onSubmit={submit} className="space-y-4">
            <input
              required
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              required
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
              Login
            </button>
          </form>
          {msg && (
            <p className="mt-4 text-sm text-center text-red-600">{msg}</p>
          )}

          <p className="mt-6 text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
