import React, { useState } from 'react';
import { Store, CreditCard, Truck, Globe, Bell, Lock, Users, Save } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'tax', label: 'Tax', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: Users },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Settings Navigation */}
      <div className="w-full md:w-64 flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Store Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                    <input type="text" defaultValue="My Hostcom Store" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                    <input type="email" defaultValue="support@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Store Address</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postcode / ZIP</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country / State</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>United States (US) - California</option>
                        <option>United Kingdom (UK)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Currency Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option>United States Dollar ($)</option>
                            <option>Euro (€)</option>
                            <option>British Pound (£)</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency Position</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option>Left ($100)</option>
                            <option>Right (100$)</option>
                        </select>
                    </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'payments' && (
             <div className="space-y-6">
                 <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-start gap-3">
                    <CreditCard className="text-indigo-600 mt-1" />
                    <div>
                        <h4 className="font-bold text-indigo-900">Hostcom Payments</h4>
                        <p className="text-sm text-indigo-800">Powered by Stripe. Lowest rates, integrated directly into your dashboard.</p>
                        <button className="mt-2 bg-indigo-600 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-indigo-700">Complete Setup</button>
                    </div>
                 </div>

                 <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Active Payment Methods</h3>
                 <div className="space-y-3">
                    {['Direct Bank Transfer', 'Check Payments', 'Cash on Delivery'].map(method => (
                        <div key={method} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <span className="font-medium text-gray-700">{method}</span>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="toggle" id={method} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                <label htmlFor={method} className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                        </div>
                    ))}
                 </div>
                 <p className="text-sm text-gray-500 mt-4">Installing more payment gateways (like PayPal, Square) can be done via the <strong>Apps</strong> section.</p>
             </div>
          )}

           {activeTab !== 'general' && activeTab !== 'payments' && (
               <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                   <div className="p-4 bg-gray-50 rounded-full mb-3">
                       <Lock size={24} className="text-gray-400" />
                   </div>
                   <p>Settings for {tabs.find(t => t.id === activeTab)?.label} are managed by the core Hostcom engine.</p>
               </div>
           )}

        </div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-colors">
                <Save size={18} /> Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;