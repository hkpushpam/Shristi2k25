"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LogOut,
  FileText,
  Home,
  Wallet,
  UserCircle,
  PlusCircle,
  Eye,
  Trash2,
  X,
} from "lucide-react";
import RequestCreditModal from "@/components/RequestCreditModal";

export default function UserDashboard() {
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const documents = [
    {
      name: "Report_Q1_2025.pdf",
      uploaded: "April 1, 2025",
    },
    {
      name: "Analysis_Draft.docx",
      uploaded: "March 28, 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 p-6 space-y-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-400">User-Dashboard</h2>
        <nav className="space-y-4">
          <Link href="/userdashboard" className="flex items-center gap-2 hover:text-blue-400">
            <Home size={18} /> Home
          </Link>
          <Link href="/mydocument" className="flex items-center gap-2 hover:text-blue-400">
            <FileText size={18} /> My Documents
          </Link>
          <button
            onClick={() => setShowCreditModal(true)}
            className="flex items-center gap-2 hover:text-blue-400 text-left w-full"
          >
            <Wallet size={18} /> Request Credit
          </button>
          <Link href="/miscellenious" className="flex items-center gap-2 hover:text-blue-400">
            <UserCircle size={18} /> My Profile
          </Link>
        </nav>
        <div className="pt-6 border-t border-slate-700">
          <button className="flex items-center gap-2 text-red-400 hover:underline">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Request Credit Modal */}
      <RequestCreditModal open={showCreditModal} onClose={() => setShowCreditModal(false)} />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-300">My Documents</h1>
            <p className="text-slate-400">Manage your uploaded files and run comparisons.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <PlusCircle size={18} /> Upload Document
          </button>
        </header>

        {/* Document List */}
        <section className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-slate-800 p-4 rounded-xl flex items-center justify-between shadow-sm hover:bg-slate-700 transition"
            >
              <div className="flex items-center gap-4">
                <FileText size={24} className="text-blue-400" />
                <div>
                  <p className="font-semibold text-white">{doc.name}</p>
                  <p className="text-slate-400 text-sm">Uploaded on {doc.uploaded}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="text-blue-400 hover:underline flex items-center gap-1">
                  <Eye size={16} /> View
                </button>
                <button className="text-blue-400 hover:underline flex items-center gap-1">
                  🔁 Compare
                </button>
                <button className="text-red-400 hover:underline flex items-center gap-1">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Upload Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-lg relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold text-blue-300 mb-4">Upload Document</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                }}
                className="space-y-4"
              >
                <input
                  type="file"
                  accept=".txt"
                  className="block w-full text-sm text-slate-200 file:mr-4 file:py-2 file:px-4
                             file:rounded-lg file:border-0
                             file:bg-blue-600 file:text-white
                             hover:file:bg-blue-700"
                />
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
