import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/signup`, form);
      localStorage.setItem("saas_token", res.data.token);
      localStorage.setItem("saas_user", JSON.stringify(res.data.user));
      setMsg("🎉 Account created! Redirecting...");
      setTimeout(() => (window.location.href = "/dashboard"), 800);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error creating account");
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-pink-400 to-indigo-500 text-white items-center justify-center p-10">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">Join Our Platform</h1>
          <p className="text-lg opacity-90">
            Create an account to start managing your SaaS reports and insights
            effortlessly.
          </p>
        </div>
      </div>

      {/* Signup Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl transition hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
            Create Account
          </h2>
          <form onSubmit={submit} className="space-y-4">
            <input
              required
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
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
              Sign Up
            </button>
          </form>
          {msg && (
            <p className="mt-4 text-sm text-center text-red-600">{msg}</p>
          )}

          <p className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
