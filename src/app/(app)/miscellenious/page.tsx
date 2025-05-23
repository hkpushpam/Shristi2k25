/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LogOut,
  FileText,
  Home,
  Wallet,
  UserCircle,
} from "lucide-react";
import RequestCreditModal from "@/components/RequestCreditModal";

export default function UserDashboard() {
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");

  const [email, setEmail] = useState("user@example.com");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const tabs = ["Profile", "Settings", "Terms", "Privacy"];

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

  const handleChangePassword = async () => {
    try {
      const response = await fetch("/api/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
          oldPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password changed successfully!");
        setNewPassword("");
        setOldPassword("");
      } else {
        alert(data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred while changing password.");
    }
  };

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
        <h1 className="text-3xl font-bold text-blue-400 mb-6">Account Center</h1>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-700 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-t-lg ${
                activeTab === tab
                  ? "bg-slate-800 text-blue-400 font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-xl space-y-6">
          {activeTab === "Profile" && (
            <>
              <h2 className="text-xl font-semibold mb-2">Change Password</h2>
              <div>
                <label className="block text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded bg-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 rounded bg-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Old Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-2 rounded bg-slate-800 text-white"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
              >
                Save Changes
              </button>
            </>
          )}

          {activeTab === "Settings" && (
            <>
              <h2 className="text-xl font-semibold mb-2">Settings</h2>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" defaultChecked />
                <span>Enable email notifications</span>
              </label>
              <div>
                <label className="block text-slate-300 mt-4 mb-2">Theme</label>
                <select className="w-full p-2 rounded bg-slate-800 text-white">
                  <option>Dark</option>
                  <option>Light</option>
                  <option>System</option>
                </select>
              </div>
              <div className="pt-4">
                <h2 className="text-red-400 text-lg font-semibold mb-2">Danger Zone</h2>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                  Delete Account
                </button>
              </div>
            </>
          )}

          {activeTab === "Terms" && (
            <>
              <h2 className="text-xl font-semibold mb-2">Terms & Conditions</h2>
              <p className="text-slate-300 text-sm">
                These terms govern your use of the Smart Document Matcher. By accessing this
                platform, you agree to our usage policy, including...
              </p>
            </>
          )}

          {activeTab === "Privacy" && (
            <>
              <h2 className="text-xl font-semibold mb-2">Privacy Policy</h2>
              <p className="text-slate-300 text-sm">
                We value your privacy. Uploaded documents are encrypted and deleted
                post-processing. No personal data is shared with third parties...
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
