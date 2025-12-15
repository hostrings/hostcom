import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

const TopBar = ({ title }: { title: string }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search orders, products..." 
            className="pl-9 pr-4 py-2 bg-gray-100 border-none rounded-md text-sm w-64 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
        </div>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;