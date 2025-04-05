export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md h-screen p-6">
      {/* Logo Section */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
        <span className="text-xl font-semibold text-gray-800">Admin Panel</span>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-4 text-gray-600">
        <a href="/admin" className="flex items-center space-x-3 hover:text-purple-600">
          <span>🏠</span>
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-3 hover:text-purple-600">
          <span>👥</span>
          <span>Users</span>
        </a>
        <a href="/admin/creditscore" className="flex items-center space-x-3 hover:text-purple-600">
  <span>💳</span>
  <span>Credit Score</span>
</a>

        <a href="#" className="flex items-center space-x-3 hover:text-purple-600">
          <span>❓</span>
          <span>Help</span>
        </a>
        
      </nav>
    </aside>
  );
}