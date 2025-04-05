"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-800 text-white py-12 px-4 md:px-8 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-4">About Smart Document Matcher</h1>
          <p className="text-lg text-slate-300">
            Understand our mission and how this platform helps you match documents smarter and faster.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
          <p className="text-slate-300">
            Smart Document Matcher is a web-based platform designed to compare and analyze text files for similarities. Whether you're a student, researcher, or professional, our tool helps identify duplicate content, track changes, and spot patterns effortlessly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
          <ul className="list-disc pl-6 text-slate-300 space-y-1">
            <li>Upload your `.txt` files securely.</li>
            <li>Choose from comparison techniques like Cosine Similarity, Word Frequency, or Levenshtein Distance.</li>
            <li>Receive a detailed similarity report in seconds.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Why We Built It</h2>
          <p className="text-slate-300">
            We created this platform to reduce the burden of manual document comparison. By leveraging smart algorithms, our tool empowers users to detect overlaps and changes quickly, accurately, and securely.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Who It's For</h2>
          <ul className="list-disc pl-6 text-slate-300 space-y-1">
            <li>Students and educators to detect plagiarism.</li>
            <li>Writers and editors to find reused content.</li>
            <li>Legal teams to compare contracts and policies.</li>
            <li>Researchers handling large text datasets.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Privacy & Security</h2>
          <p className="text-slate-300">
            Your data is safe with us. All uploads are encrypted and deleted after processing. We never store your content without consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
          <p className="text-slate-300 mb-2">
            Have questions or feedback?
          </p>
          <ul className="text-slate-300">
            <li>Email: <a href="mailto:support@yourapp.com" className="text-blue-400 hover:underline">support@yourapp.com</a></li>
            <li>GitHub: <a href="https://github.com/yourapp" target="_blank" className="text-blue-400 hover:underline">github.com/yourapp</a></li>
          </ul>
        </section>

        <div className="text-center">
          <Link href="/" className="inline-block mt-6 text-blue-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 
