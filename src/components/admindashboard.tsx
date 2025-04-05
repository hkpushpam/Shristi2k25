"use client";

import React from "react";
import { Home, Users, Settings, BarChart2 } from "lucide-react";

const NavItem = ({ icon, label }) => (
  <div className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);

const Widget = ({ title, value }) => (
  <div className="bg-white rounded-2xl p-4 shadow-md">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <NavItem icon={<Home size={18} />} label="Dashboard" />
          <NavItem icon={<Users size={18} />} label="Users" />
          <NavItem icon={<BarChart2 size={18} />} label="Analytics" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
          <div className="text-gray-500">Welcome, Admin</div>
        </header>

        {/* Dashboard Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Widget title="Total Users" value="1,245" />
          <Widget title="Active Sessions" value="87" />
          <Widget title="New Signups" value="32" />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
