"use client";
import React from "react";
import { TrendingUp, Mail, Phone, Info, HelpCircle, Settings, Users, Home } from "lucide-react";

const users = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  creditLeft: Math.floor(Math.random() * 19) + 1,
  status: i % 3 === 0 ? "Inactive" : "Active",
}));

export default function UsersPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold text-blue-400">Admin Panel</h2>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer">
            <Home size={18} /> Dashboard
          </div>
          <div className="flex items-center gap-3 text-white font-semibold bg-slate-700 px-2 py-1 rounded">
            <Users size={18} /> Users
          </div>
          <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer">
            <TrendingUp size={18} /> Credit Score
          </div>
          <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer">
            <HelpCircle size={18} /> Help
          </div>
        </nav>
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
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-700 transition">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.creditLeft} credits</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-400/10 text-green-400"
                            : "bg-red-400/10 text-red-400"
                        }`}
                      >
                        {user.status}
                      </span>
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
