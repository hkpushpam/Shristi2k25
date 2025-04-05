import React from "react";
import { TrendingUp} from "lucide-react";
import { Mail, Phone, Info, HelpCircle, Settings, Users, Home } from "lucide-react";

const faqs = [
  {
    question: "How do I reset a user password?",
    answer:
      "Go to the Users tab, select the user, and click on 'Reset Password'. An email will be sent to the user.",
  },
  {
    question: "Can I assign roles to new admins?",
    answer:
      "Yes, when adding a new admin, select their role from the dropdown options before saving.",
  },
  {
    question: "How do I view system logs?",
    answer:
      "Navigate to the 'Logs' section from the sidebar. You can filter logs by date and type.",
  },
];

export default function HelpPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold text-blue-400">Admin Panel</h2>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer">
            <Home size={18} /> Dashboard
          </div>
          <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer">
            <Users size={18} /> Users
          </div>
          <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer">
            <TrendingUp size={18} /> Credit Score
          </div>
          <div className="flex items-center gap-3 text-white font-semibold">
            <HelpCircle size={18} /> Help
          </div>
          
        </nav>
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
