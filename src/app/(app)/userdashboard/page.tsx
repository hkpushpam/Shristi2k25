"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LogOut,
  FileText,
  Home,
  Wallet,
  UserCircle,
} from "lucide-react";
import RequestCreditModal from "@/components/RequestCreditModal";
import { signOut } from "next-auth/react";

export default function UserDashboard() {
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [documentCount, setDocumentCount] = useState(0);
  const [creditLeft, setCreditLeft] = useState(0);
  const [lastLogin, setLastLogin] = useState("");

  useEffect(() => {
    // Fetch document count
    const fetchDocuments = async () => {
      try {
        const res = await fetch("/api/user/totalDocument");
        const data = await res.json();
        setDocumentCount(data.total || 0);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    // Fetch session data (credit left and last login)
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const sessionData = await res.json();
        setCreditLeft(sessionData.user?.credit_left || 0);
        const lastLoginDate = sessionData.user?.lastLogin
          ? new Date(sessionData.user.lastLogin).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "N/A";
        setLastLogin(lastLoginDate);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchDocuments();
    fetchSession();
  }, []);

  async function handleLogout() {
    console.log("Logging out...");
      try {
        await signOut({ callbackUrl: "/" });
      } catch (error) {
        console.error("Error during logout:", error);
      }
  }

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
          <button className="flex items-center gap-2 text-red-400 hover:underline" onClick={() => handleLogout()}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Request Credit Modal */}
      <RequestCreditModal open={showCreditModal} onClose={() => setShowCreditModal(false)} />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-300">Welcome back, User!</h1>
            <p className="text-slate-400">Here is your document activity summary.</p>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-blue-400">Documents Uploaded</h2>
            <p className="text-3xl font-bold mt-2">{documentCount}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-blue-400">Credit Left</h2>
            <p className="text-3xl font-bold mt-2">{creditLeft}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-blue-400">Last Login</h2>
            <p className="mt-2 text-slate-300">{lastLogin}</p>
          </div>
        </section>

       </main>
    </div>
  );
}
