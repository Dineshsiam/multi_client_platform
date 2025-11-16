import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const API = process.env.REACT_APP_API_BASE || "http://localhost:5000";

function KPI({ title, value, icon }) {
  return (
    <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-md flex-1 border border-gray-100">
      <div className="text-sm text-gray-500 flex items-center gap-2">
        <span className="text-indigo-600 text-lg">{icon}</span> {title}
      </div>
      <div className="text-3xl font-bold mt-2 text-gray-800">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [reports, setReports] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("saas_token");

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchMetrics();
      fetchReports();
    }
  }, [token]);

  // ✅ Metrics API (keep dashboard/metrics if your backend has it)
  const fetchMetrics = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/dashboard/metrics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKpis(res.data.kpis);
    } catch (err) {
      console.error("Metrics fetch failed:", err.message);
    }
  }, [token]);

  // ✅ Reports API (use /api/reports instead of /api/dashboard/reports)
  const fetchReports = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (err) {
      console.error("Reports fetch failed:", err.message);
    }
  }, [token]);

  // ✅ Create a new report
  async function createReport(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/api/reports`,
        { title, value: content.length }, // or replace 'value' with another number field
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReports((prev) => [res.data, ...prev]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Report creation failed:", err.message);
    }
  }

  // ✅ Delete report
  async function deleteReport(id) {
    try {
      await axios.delete(`${API}/api/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        📈 Dashboard Overview
      </h1>

      {/* KPI Section */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPI
          title="Total Users"
          icon="👥"
          value={kpis ? kpis.totalUsers : "—"}
        />
        <KPI
          title="Active Users"
          icon="🔥"
          value={kpis ? kpis.activeUsers : "—"}
        />
        <KPI
          title="New (30d)"
          icon="🆕"
          value={kpis ? kpis.recentUsers : "—"}
        />
        <KPI
          title="Revenue (est.)"
          icon="💰"
          value={kpis ? `$${kpis.revenue}` : "—"}
        />
      </section>

      {/* Create Report */}
      <section className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          📝 Create a Report
        </h2>
        <form onSubmit={createReport} className="space-y-3">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Report title"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Short description"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-400"
            rows={3}
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition">
            Create Report
          </button>
        </form>
      </section>

      {/* Reports List */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          📄 My Reports
        </h2>
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="text-gray-500">No reports yet</div>
          ) : (
            reports.map((r) => (
              <div
                key={r._id}
                className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow flex justify-between border border-gray-100"
              >
                <div>
                  <div className="font-bold text-indigo-600">{r.title}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(r.createdAt).toLocaleString()}
                  </div>
                  <p className="mt-2 text-gray-700">
                    {r.value ? `Value: ${r.value}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => deleteReport(r._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
