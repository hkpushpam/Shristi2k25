/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, HelpCircle, Users, Home, LogOut } from "lucide-react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch users from API
    fetch("/api/allUser")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const toggleStatus = async (user: any) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active";
    const userId = user.id || user._id;

    // Optimistically update UI
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        (u.id || u._id) === userId
          ? { ...u, status: newStatus }
          : u
      )
    );

    // Send POST request to update activity status
    try {
      await fetch(`/api/userActivity/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error("Error updating user status:", err);
      // Optional: rollback UI if needed
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 p-6 space-y-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-400">Admin Panel</h2>
        <nav className="space-y-4">
          <Link href="/admin" className="flex items-center gap-2 hover:text-blue-400">
            <Home size={18} /> Dashboard
          </Link>
          <Link href="/user" className="flex items-center gap-2 hover:text-blue-400">
            <Users size={18} /> Users
          </Link>
          <Link href="/creditscore" className="flex items-center gap-2 hover:text-blue-400">
            <TrendingUp size={18} /> Credit Score
          </Link>
          <Link href="/help" className="flex items-center gap-2 hover:text-blue-400">
            <HelpCircle size={18} /> Help
          </Link>
        </nav>
        <div className="pt-6 border-t border-slate-700">
          <button className="flex items-center gap-2 text-red-400 hover:underline">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold text-blue-400 mb-4">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700 text-sm">
              <thead className="bg-slate-700 text-slate-300">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Name</th>
                  <th className="px-4 py-2 text-left font-medium">Credit Left</th>
                  <th className="px-4 py-2 text-left font-medium">Email</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {users.map((user: any) => (
                  <tr key={user.id || user._id} className="hover:bg-slate-700 transition">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.credits ?? 0} credits</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleStatus(user)}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition ${
                          user.status === "Active"
                            ? "bg-green-400/10 text-green-400 hover:bg-green-400/20"
                            : "bg-red-400/10 text-red-400 hover:bg-red-400/20"
                        }`}
                      >
                        {user.status || "Inactive"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
