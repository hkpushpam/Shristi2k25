"use client";

import { useEffect, useState } from "react";
import { TrendingUp, HelpCircle, Users, Home, LogOut, User } from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const userGrowthData = [
  { name: "Jan", users: 200 },
  { name: "Feb", users: 350 },
  { name: "Mar", users: 500 },
  { name: "Apr", users: 650 },
  { name: "May", users: 820 },
  { name: "Jun", users: 1000 },
  { name: "Jul", users: 1204 },
];

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [topUser, setTopUser] = useState<{ name: string; email: string; credits: number } | null>(
    null
  );

  useEffect(() => {
    // Get total users
    fetch("/api/user/total")
      .then((res) => res.json())
      .then((data) => setTotalUsers(data.total))
      .catch((err) => console.error("Error fetching total users:", err));

    // Get top user
    fetch("/api/user/topUser")
      .then((res) => res.json())
      .then((data) => setTopUser(data))
      .catch((err) => console.error("Error fetching top user:", err));
  }, []);

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
      <main className="flex-1 p-6 md:p-10 space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-300">Welcome back, Admin!</h1>
            <p className="text-slate-400">Here is an overview of your platform activity.</p>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Users */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-blue-400">Total Users</h2>
            <p className="text-3xl font-bold mt-2">
              {totalUsers !== null ? totalUsers : "Loading..."}
            </p>
          </div>

          {/* Top User */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-blue-400">Top User</h2>
            {topUser ? (
              <div className="mt-2">
                <p className="text-xl font-bold flex items-center gap-2">
                  <User size={18} /> {topUser.name}
                </p>
                <p className="text-sm text-slate-400">{topUser.email}</p>
                <p className="mt-1 text-green-400 font-semibold">{topUser.credits} credits</p>
              </div>
            ) : (
              <p className="text-slate-400 mt-2">Loading...</p>
            )}
          </div>
        </section>

        {/* Chart */}
        <section className="bg-slate-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-blue-400 mb-4">User Growth Over Time</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}
