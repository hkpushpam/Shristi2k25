"use client";

import { useEffect, useState } from "react";
import { TrendingUp, HelpCircle, FileText, Home, LogOut } from "lucide-react";
import Link from "next/link";

type CreditRequest = {
  _id: string;
  user: { name: string };
  credits: number;
  status: string;
};

export default function CreditScorePage() {
  const [creditRequests, setCreditRequests] = useState<CreditRequest[]>([]);

  useEffect(() => {
    fetch("/api/creditRequest/allRequest")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCreditRequests(data);
        }
      })
      .catch((err) => console.error("Error fetching credit requests:", err));
  }, []);

  const handleApprove = async (requestId: string) => {
    try {
      const res = await fetch("/api/creaditRequst/ApproveRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId }),
      });

      if (res.ok) {
        setCreditRequests((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: "Approved" } : req
          )
        );
      }
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  const handleCancel = async (requestId: string) => {
    try {
      const res = await fetch("/api/creaditRequest/cancelRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId }),
      });

      if (res.ok) {
        setCreditRequests((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: "Cancelled" } : req
          )
        );
      }
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

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
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold text-blue-400 mb-8">Credit Requests</h1>

        <div className="space-y-4">
          {creditRequests.map((req) => (
            <div
              key={req._id}
              className="bg-slate-800 p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-white">
                  {req.user?.name || "Unknown User"}
                </p>
                <p className="text-slate-400 text-sm">
                  Requested {req.credits} credits — Status:{" "}
                  <span
                    className={`${
                      req.status === "Approved"
                        ? "text-green-400"
                        : req.status === "Cancelled"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>
              </div>

              {req.status === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleCancel(req._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
