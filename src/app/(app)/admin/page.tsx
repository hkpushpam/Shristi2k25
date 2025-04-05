"use client";
import { TrendingUp, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Users, Home, LogOut,  } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 p-6 space-y-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-400">Admin Panel</h2>
        <nav className="space-y-4">
          <Link href="/admin1" className="flex items-center gap-2 hover:text-blue-400">
            <Home size={18} /> Dashboard
          </Link>
          <Link href="/user" className="flex items-center gap-2 hover:text-blue-400">
            <Users size={18} /> Users
          </Link>
          
    <Link href="/creditscore" className="flex items-center gap-2 hover:text-blue-400">
  <TrendingUp size={18} /> Credit Score
</Link>

<Link href="/admin/Help" className="flex items-center gap-2 hover:text-blue-400">
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
          <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-blue-400">Total Users</h2>
            <p className="text-3xl font-bold mt-2">1,204</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-blue-400">Reports Reviewed</h2>
            <p className="text-3xl font-bold mt-2">87</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-blue-400">System Health</h2>
            <p className="mt-2 text-green-400 font-semibold">✔ All Systems Operational</p>
          </div>
        </section>

        {/* Admin Activity Logs */}
        <section className="bg-slate-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Recent Admin Actions</h2>
          <ul className="space-y-3 text-slate-300">
            <li>🛡️ Suspended user <strong>john_doe</strong> for policy violation</li>
            <li>📊 Exported analytics report <strong>Q1_2025.pdf</strong></li>
            <li>⚙ Updated platform settings</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
