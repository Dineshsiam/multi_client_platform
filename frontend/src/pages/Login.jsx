import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/users/login", data);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    alert("Logged in!");
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          placeholder="Email"
          className="border p-2"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="border p-2"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button className="bg-pink-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
