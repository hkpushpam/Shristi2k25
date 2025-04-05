"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Home, FileText, Wallet, UserCircle, LogOut } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Smart Matcher",
    description: "Upload and compare documents using AI-powered similarity detection.",
    link: "/mydocument",
  },
  {
    title: "Account Center",
    description: "Manage profile, settings, privacy and terms from one place.",
    link: "/miscellenious",
  },
  {
    title: "Request Credits",
    description: "Request document comparison credits to continue using the service.",
    link: "/credits",
  },
  {
    title: "Dashboard Overview",
    description: "Overview of your document activity and usage statistics.",
    link: "/userdashboard",
  },
];

export default function CardHoverEffectDemo() {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 p-6 space-y-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-400">Admin Panel</h2>
        <nav className="space-y-4">
          <Link href="/admin" className="flex items-center gap-2 hover:text-blue-400">
            <Home size={18} /> Dashboard
          </Link>
          <Link href="/user" className="flex items-center gap-2 hover:text-blue-400">
            <FileText size={18} /> User
          </Link>
          <Link href="/creditscore" className="flex items-center gap-2 hover:text-blue-400">
            <Wallet size={18} /> Credit Credit
          </Link>
          <Link href="/help" className="flex items-center gap-2 hover:text-blue-400">
            <UserCircle size={18} /> Help
          </Link>
        </nav>
        <div className="pt-6 border-t border-slate-700">
          <button className="flex items-center gap-2 text-red-400 hover:underline">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold text-blue-400 mb-8">Credit- Score </h1>
        <div className="max-w-5xl mx-auto px-2">
          <HoverEffect items={projects} />
        </div>
      </main>
    </div>
  );
}
