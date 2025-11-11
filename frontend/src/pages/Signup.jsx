import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/users/register", data);
    alert("Registered successfully!");
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Signup</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Name"
          className="border p-2"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
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
        <button className="bg-pink-500 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
