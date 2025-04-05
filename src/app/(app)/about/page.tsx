"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 px-4 md:px-8 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-blue-400">About Smart Document Matcher</h1>
          <p className="text-lg text-slate-300">
            Understand our mission and how this platform helps you match documents smarter and faster.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold text-blue-300">What We Do</h2>
          <p className="text-slate-300 leading-relaxed">
            Smart Document Matcher is a web-based platform designed to compare and analyze text files for similarities.
            Whether  you are a student, researcher, or professional, our tool helps identify duplicate content, track changes,
            and spot patterns effortlessly.
          </p>
        </section>

        <section className="space-y-4 bg-slate-700/30 p-6 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-semibold text-blue-300">How It Works</h2>
          <ul className="list-disc pl-6 text-slate-300 space-y-1">
            <li>Upload your `.txt` files securely.</li>
            <li>Choose from comparison techniques like Cosine Similarity, Word Frequency, or Levenshtein Distance.</li>
            <li>Receive a detailed similarity report in seconds.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold text-blue-300">Why We Built It</h2>
          <p className="text-slate-300 leading-relaxed">
            We created this platform to reduce the burden of manual document comparison.
            By leveraging smart algorithms, our tool empowers users to detect overlaps and changes quickly, accurately, and securely.
          </p>
        </section>

        <section className="space-y-4 bg-slate-700/30 p-6 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-semibold text-blue-300">Who it is For</h2>
          <ul className="list-disc pl-6 text-slate-300 space-y-1">
            <li>Students and educators to detect plagiarism.</li>
            <li>Writers and editors to find reused content.</li>
            <li>Legal teams to compare contracts and policies.</li>
            <li>Researchers handling large text datasets.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold text-blue-300">Privacy & Security</h2>
          <p className="text-slate-300 leading-relaxed">
            Your data is safe with us. All uploads are encrypted and deleted after processing.
            We never store your content without consent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-3xl font-semibold text-blue-300">Get in Touch</h2>
          <p className="text-slate-300">Have questions or feedback?</p>
          <ul className="text-slate-300">
            <li>
              Email:{" "}
              <a href="mailto:support@yourapp.com" className="text-blue-400 hover:underline">
                support@yourapp.com
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/yourapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                github.com/yourapp
              </a>
            </li>
          </ul>
        </section>

        <div className="text-center">
          <Link href="/" className="inline-block mt-8 text-blue-400 hover:underline text-lg">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
