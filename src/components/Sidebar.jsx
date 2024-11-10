import React from 'react';
import { LayoutDashboard, Briefcase, LineChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">HireBridge</h1>
        <nav className="space-y-2">
          <Link
            to="/"
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive('/') ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/drives"
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive('/drives') ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <Briefcase size={20} />
            <span>Drives</span>
          </Link>
          <Link
            to="/skills"
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive('/skills') ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <LineChart size={20} />
            <span>Skills</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}