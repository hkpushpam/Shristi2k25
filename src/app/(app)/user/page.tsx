"use client";

import { TrendingUp, HelpCircle, Users, Home, LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      creditLeft: 25,
      email: "john@example.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      creditLeft: 10,
      email: "jane@example.com",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Alice Johnson",
      creditLeft: 40,
      email: "alice@example.com",
      status: "Active",
    },
  ];

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
