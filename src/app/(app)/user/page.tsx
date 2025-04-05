/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { TrendingUp, HelpCircle, Users, Home, LogOut } from "lucide-react";
import Link from "next/link";

const initialUsers = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  creditLeft: Math.floor(Math.random() * 19) + 1,
  status: i % 3 === 0 ? "Inactive" : "Active",
}));

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);

  const toggleStatus = (id: any) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
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
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-700 transition">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.creditLeft} credits</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition ${
                          user.status === "Active"
                            ? "bg-green-400/10 text-green-400 hover:bg-green-400/20"
                            : "bg-red-400/10 text-red-400 hover:bg-red-400/20"
                        }`}
                      >
                        {user.status}
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
