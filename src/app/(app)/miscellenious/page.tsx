"use client";

import { useState } from "react";

const tabs = ["Profile", "Settings", "Terms", "Privacy"];

export default function AccountCenterPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-10">
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
            <h2 className="text-xl font-semibold mb-2">Update Profile</h2>
            <div>
              <label className="block text-slate-300 mb-1">Email</label>
              <input
                type="email"
                defaultValue="user@example.com"
                className="w-full p-2 rounded bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">New Password</label>
              <input type="password" className="w-full p-2 rounded bg-slate-800 text-white" />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
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
              {/* Insert full legal terms here */}
            </p>
          </>
        )}

        {activeTab === "Privacy" && (
          <>
            <h2 className="text-xl font-semibold mb-2">Privacy Policy</h2>
            <p className="text-slate-300 text-sm">
              We value your privacy. Uploaded documents are encrypted and deleted post-processing.
              No personal data is shared with third parties...
              {/* Add real policy here */}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
