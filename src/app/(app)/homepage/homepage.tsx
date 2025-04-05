// app/page.tsx
export default function Home() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-white to-gray-100 text-gray-800">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to <span className="text-blue-600">DocMatcher</span>
          </h1>
  
          <p className="text-lg md:text-xl text-gray-600">
            Upload and compare documents using powerful algorithms like Cosine Similarity and Levenshtein Distance.
          </p>
  
          <div className="flex gap-4 justify-center">
            <a
              href="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-2xl hover:bg-blue-50 transition"
            >
              Register
            </a>
          </div>
  
          <div className="mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Try a quick demo</h2>
            <p className="text-sm text-gray-500 mb-4">* This is just a static preview.</p>
            <div className="p-4 bg-white rounded-xl shadow-md text-left space-y-2 text-sm">
              <p><strong>Document A:</strong> "Machine learning is amazing!"</p>
              <p><strong>Document B:</strong> "AI and machine learning are transforming the world."</p>
              <p><strong>Similarity Score:</strong> 84%</p>
            </div>
          </div>
        </div>
      </main>
    )
  }
  