import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [msg, setMsg] = useState("");
  const [all, setAll] = useState([]);

  // ✅ Safely get the saved user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ✅ Fetch messages safely
  const fetchMessages = async () => {
    if (!user || !user._id) {
      console.warn("⚠️ User not logged in or missing _id");
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${user._id}`
      );
      setAll(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching messages:", err);
    }
  };

  // ✅ Send new message
  const sendMessage = async () => {
    if (!msg.trim()) return;
    if (!user || !user._id) {
      alert("Please log in before sending messages!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/messages", {
        userId: user._id,
        message: msg,
      });
      setMsg("");
      fetchMessages();
    } catch (err) {
      console.error("❌ Error sending message:", err);
    }
  };

  // Load all messages on component mount
  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-pink-600 text-center mb-4">
          💌 Love Notes Dashboard
        </h1>

        <textarea
          className="border-2 border-pink-400 rounded-lg w-full p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Write a sweet message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          rows={3}
        />

        <button
          onClick={sendMessage}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold w-full mt-3 py-2 rounded-lg transition-all"
        >
          Send 💞
        </button>

        <div className="mt-6 max-h-80 overflow-y-auto space-y-2">
          {all.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No messages yet — send your first love note 💕
            </p>
          ) : (
            all.map((m) => (
              <div
                key={m._id}
                className="p-3 rounded-xl bg-pink-50 border border-pink-200 text-gray-800 shadow-sm"
              >
                {m.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
