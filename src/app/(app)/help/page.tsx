"use client";

import { TrendingUp, HelpCircle, Users, Home, LogOut, Mail, Phone, Info } from "lucide-react";
import Link from "next/link";

// Sample FAQs for Help section
const faqs = [
  {
    question: "How do I reset a user's password?",
    answer: "You can reset a user's password from the Users section by selecting 'Reset Password'.",
  },
  {
    question: "How to update credit scores manually?",
    answer: "Go to the Credit Score section, select a user, and use the 'Update Credits' button.",
  },
  {
    question: "Can users delete their accounts?",
    answer: "Yes, users have the option to delete their accounts from their settings.",
  },
];

export default function AdminDashboard() {
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
        <div className="max-w-4xl mx-auto rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-blue-400">Help & Support</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-slate-300">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-slate-700 rounded-lg p-4 shadow-sm text-slate-200"
                >
                  <summary className="font-medium cursor-pointer text-white hover:text-blue-400 transition">
                    {faq.question}
                  </summary>
                  <p className="text-slate-300 mt-2">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-slate-300">
              Need Further Assistance?
            </h2>
            <div className="bg-slate-700 rounded-lg shadow p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="text-blue-400" />
                <div>
                  <p className="font-medium text-white">Email Support</p>
                  <p className="text-slate-300">admin-support@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-green-400" />
                <div>
                  <p className="font-medium text-white">Phone Support</p>
                  <p className="text-slate-300">+91-9876543210</p>
                </div>
              </div>
            </div>
          </section>

          <section className="text-sm text-slate-400 text-center">
            <Info className="inline-block mr-1 mb-1 text-slate-500" size={16} />
            Admin Panel v1.0 | For internal use only
          </section>
        </div>
      </div>
    </div>
  );
}
