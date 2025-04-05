

"use client";

import Link from "next/link";
import { Bell, LogOut, Settings, FileText, Home } from "lucide-react";

import Navbar from "@/components/Navbar";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}

       <Navbar />
      <aside className="w-64 bg-slate-800 p-6 space-y-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-400">Dashboard</h2>
        <nav className="space-y-4">
          <Link href="/dashboard" className="flex items-center gap-2 hover:text-blue-400">
            <Home size={18} /> Home
          </Link>
          <Link href="/dashboard/documents" className="flex items-center gap-2 hover:text-blue-400">
            <FileText size={18} /> My Documents
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-2 hover:text-blue-400">
            <Settings size={18} /> Settings
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
            <h1 className="text-3xl font-bold text-blue-300">Welcome back, User!</h1>
            <p className="text-slate-400">Here is your document activity summary.</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2">
            <Bell size={16} /> Notifications
          </button>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-blue-400">Documents Uploaded</h2>
            <p className="text-3xl font-bold mt-2">42</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-blue-400">Comparisons Run</h2>
            <p className="text-3xl font-bold mt-2">85</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-blue-400">Last Login</h2>
            <p className="mt-2 text-slate-300">April 5, 2025</p>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="bg-slate-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-slate-300">
            <li>✅ Compared <strong>Report_V1.txt</strong> with <strong>Report_V2.txt</strong></li>
            <li>📄 Uploaded <strong>ResearchNotes.txt</strong></li>
            <li>⚙️ Changed settings</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
