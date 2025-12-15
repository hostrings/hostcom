import React, { useState, useEffect } from 'react';
import { generateThemes } from '../services/dataService';
import { Theme } from '../types';
import { Palette, Check, Layout, Monitor } from 'lucide-react';

const Themes = () => {
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    setThemes(generateThemes());
  }, []);

  const activateTheme = (id: string) => {
    setThemes(themes.map(t => ({ ...t, active: t.id === id })));
  };

  const activeTheme = themes.find(t => t.active);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Online Store Themes</h2>
            <p className="text-gray-500 text-sm mt-1">Control your storefront design. Fully compatible with standard WooCommerce themes.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
            Visit Storefront
        </button>
      </div>

      {/* Current Theme */}
      {activeTheme && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="md:w-2/3 h-64 md:h-auto bg-gray-100 relative overflow-hidden group">
                <img src={activeTheme.thumbnail} alt={activeTheme.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100">Customize</button>
                </div>
            </div>
            <div className="p-8 md:w-1/3 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">Current Theme</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{activeTheme.name}</h3>
                <p className="text-gray-500 text-sm mb-6">Version {activeTheme.version} by {activeTheme.author}</p>
                <div className="space-y-3">
                    <button className="w-full bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center justify-center gap-2">
                        <Palette size={16} /> Customize Design
                    </button>
                    <button className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50">
                        Edit Code
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Theme Library */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Theme Library</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.filter(t => !t.active).map(theme => (
                <div key={theme.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col h-full">
                    <div className="h-48 bg-gray-100 relative group overflow-hidden">
                         <img src={theme.thumbnail} alt={theme.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-white">Preview</button>
                         </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-900">{theme.name}</h4>
                                <p className="text-xs text-gray-500">by {theme.author}</p>
                            </div>
                        </div>
                        <div className="mt-auto pt-4 flex gap-2">
                            <button 
                                onClick={() => activateTheme(theme.id)}
                                className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            ))}
             <div className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center p-8 hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer min-h-[300px]">
                <div className="bg-gray-100 p-4 rounded-full mb-3">
                    <Layout className="text-gray-400" size={24} />
                </div>
                <h3 className="font-medium text-gray-900">Add Theme</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Upload a .zip file of any standard WooCommerce theme</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;