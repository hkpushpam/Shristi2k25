"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function RequestCreditModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [credits, setCredits] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔗 Replace with actual API request logic
    console.log("Credit Request Sent:", { credits, reason });

    // Reset form and close
    setCredits("");
    setReason("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold text-blue-300 mb-4">Request Credit</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-1">Number of Credits</label>
            <input
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 text-white"
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
