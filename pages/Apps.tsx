import React, { useState, useEffect } from 'react';
import { generatePlugins } from '../services/dataService';
import { Plugin } from '../types';
import { Search, CreditCard, Search as SearchIcon, Truck, Zap, Mail, Repeat, ToggleRight, ToggleLeft, DownloadCloud, Box } from 'lucide-react';

const Apps = () => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  
  useEffect(() => {
    setPlugins(generatePlugins());
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard': return <CreditCard className="text-purple-600" size={24} />;
      case 'Search': return <SearchIcon className="text-orange-600" size={24} />;
      case 'Truck': return <Truck className="text-blue-600" size={24} />;
      case 'Zap': return <Zap className="text-green-600" size={24} />;
      case 'Mail': return <Mail className="text-yellow-600" size={24} />;
      case 'Repeat': return <Repeat className="text-indigo-600" size={24} />;
      default: return <Box className="text-gray-600" size={24} />;
    }
  };

  const togglePlugin = (id: string) => {
    setPlugins(plugins.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Apps & Extensions</h2>
            <p className="text-gray-500 text-sm mt-1">Manage WooCommerce-compatible plugins directly from the Hostcom core.</p>
        </div>
        <div className="relative">
             <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
             <input 
                 type="text" 
                 placeholder="Search installed apps..." 
                 className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm w-64 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
             />
         </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white flex justify-between items-center shadow-lg">
        <div>
            <h3 className="text-lg font-bold mb-1">Hostcom App Store</h3>
            <p className="text-indigo-100 text-sm">Browse thousands of WooCommerce-compatible extensions and themes.</p>
        </div>
        <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors shadow-sm">
            Browse Marketplace
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plugins.map((plugin) => (
            <div key={plugin.id} className={`bg-white p-6 rounded-xl border transition-all ${plugin.active ? 'border-indigo-200 shadow-sm' : 'border-gray-200 opacity-75'}`}>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                        {getIcon(plugin.icon)}
                    </div>
                    <button onClick={() => togglePlugin(plugin.id)} className="text-indigo-600 focus:outline-none">
                        {plugin.active ? <ToggleRight size={32} className="text-indigo-600" /> : <ToggleLeft size={32} className="text-gray-300" />}
                    </button>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{plugin.name}</h3>
                <p className="text-xs text-gray-500 mb-4 h-10 overflow-hidden">{plugin.description}</p>
                
                <div className="flex items-center justify-between text-xs pt-4 border-t border-gray-100">
                    <span className="text-gray-500">v{plugin.version} by <span className="font-medium text-gray-700">{plugin.author}</span></span>
                    <span className={`px-2 py-0.5 rounded-full ${plugin.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {plugin.active ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>
        ))}
        
        {/* Placeholder for Add New */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer group">
            <div className="bg-gray-100 p-4 rounded-full mb-3 group-hover:bg-white">
                <DownloadCloud className="text-gray-400 group-hover:text-indigo-500" size={24} />
            </div>
            <h3 className="font-medium text-gray-900">Upload Plugin</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Upload a .zip file of any standard WooCommerce plugin</p>
        </div>
      </div>
    </div>
  );
};

export default Apps;