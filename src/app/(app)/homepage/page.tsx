
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-white max-w-2xl space-y-6"
      >
        <h1 className="text-5xl font-extrabold leading-tight drop-shadow-md">
          Smart Document Matcher 🔍
        </h1>
        <p className="text-lg text-white/80">
          Upload, compare, and find similarities between documents using intelligent algorithms.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login">
            <Button variant="secondary" className="text-indigo-700 font-semibold">
              Get Started
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
