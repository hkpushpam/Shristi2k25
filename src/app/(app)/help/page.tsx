import React from "react";
import { Mail, Phone, Info } from "lucide-react";

const faqs = [
  {
    question: "How do I reset a user password?",
    answer: "Go to the Users tab, select the user, and click on 'Reset Password'. An email will be sent to the user."
  },
  {
    question: "Can I assign roles to new admins?",
    answer: "Yes, when adding a new admin, select their role from the dropdown options before saving."
  },
  {
    question: "How do I view system logs?",
    answer: "Navigate to the 'Logs' section from the sidebar. You can filter logs by date and type."
  },
];

export default function HelpPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Help & Support</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-gray-100 rounded-lg p-4 shadow-sm">
              <summary className="font-medium cursor-pointer">
                {faq.question}
              </summary>
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Need Further Assistance?</h2>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex items-center gap-4">
            <Mail className="text-blue-500" />
            <div>
              <p className="font-medium">Email Support</p>
              <p className="text-gray-600">admin-support@example.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-green-500" />
            <div>
              <p className="font-medium">Phone Support</p>
              <p className="text-gray-600">+91-9876543210</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-sm text-gray-500 text-center">
        <Info className="inline-block mr-1 mb-1" size={16} />
        Admin Panel v1.0 | For internal use only
      </section>
    </div>
  );
}
