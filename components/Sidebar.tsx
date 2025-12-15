import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ShoppingCart, Users, Settings, Database, ArrowRightLeft, Palette, Box, Globe, Puzzle } from 'lucide-react';

const Sidebar = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-gray-200 text-gray-900'
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col sticky top-0">
      <div className="p-4 flex items-center gap-2 border-b border-gray-200/50">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">H</div>
        <span className="font-bold text-gray-800 text-lg tracking-tight">Hostcom</span>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3 mt-4">Store</div>
        <NavLink to="/" className={navClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>
        <NavLink to="/orders" className={navClass}>
          <ShoppingCart size={18} />
          Orders
          <span className="ml-auto bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">3k+</span>
        </NavLink>
        <NavLink to="/products" className={navClass}>
          <ShoppingBag size={18} />
          Products
        </NavLink>
        <NavLink to="/customers" className={navClass}>
          <Users size={18} />
          Customers
        </NavLink>

        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3 mt-6">Sales Channels</div>
        <NavLink to="/themes" className={navClass}>
          <Palette size={18} />
          Online Store
        </NavLink>
        <NavLink to="/connect" className={navClass}>
          <ArrowRightLeft size={18} />
          Migrations
        </NavLink>

        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3 mt-6">Apps & Extensions</div>
        <NavLink to="/apps" className={navClass}>
          <Puzzle size={18} />
          Installed Apps
        </NavLink>

        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3 mt-6">Configuration</div>
        <NavLink to="/settings" className={navClass}>
          <Settings size={18} />
          Settings
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@hostcom.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;