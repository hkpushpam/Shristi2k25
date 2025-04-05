"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function RequestCreditModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [credits, setCredits] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch("/api/creditRequest/requestCredit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credits: Number(credits),
          reason,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Credit request submitted successfully!");
        setCredits("");
        setReason("");
        onClose();
      } else {
        alert(data.message || "Failed to submit request");
      }
    } catch (error) {
      console.error("Request Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
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
              min={1}
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
              disabled={loading}
              className={`px-4 py-2 rounded-lg ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
