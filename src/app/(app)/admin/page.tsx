'use client';

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";


const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>

        {/* Admin Actions */}
        <section className="space-y-6">
          
        </section>

        {/* Divider */}
        <hr className="my-10" />

        {/* Example Admin Controls */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <Button className="w-full">View All Users</Button>
          <Button className="w-full">Add New Item</Button>
          <Button className="w-full">Generate Report</Button>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
