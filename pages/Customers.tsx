import React, { useState, useEffect } from 'react';
import { generateCustomers } from '../services/dataService';
import { Customer } from '../types';
import { Search, Mail, MapPin, Calendar, ArrowUpRight } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCustomers(generateCustomers(25));
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
            <div className="flex gap-3">
                 <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Name, email, or city" 
                        className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm w-64 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>
            </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Orders</th>
                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Spent</th>
                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Last Active</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading ? (
                        <tr><td colSpan={6} className="p-8 text-center text-gray-500">Loading customers...</td></tr>
                    ) : (
                        customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <img src={customer.avatar_url} alt="" className="w-10 h-10 rounded-full bg-gray-200" />
                                        <div>
                                            <div className="font-semibold text-gray-900">{customer.first_name} {customer.last_name}</div>
                                            <div className="text-xs text-gray-400">@{customer.username}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail size={14} className="text-gray-400" />
                                        {customer.email}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin size={14} className="text-gray-400" />
                                        {customer.billing.city}, {customer.billing.country}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {customer.orders_count} orders
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="text-sm font-bold text-gray-900">${customer.total_spent}</div>
                                    <div className="text-xs text-gray-400">Lifetime value</div>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <div className="text-sm text-gray-500">{new Date(customer.date_created).toLocaleDateString()}</div>
                                    <button className="opacity-0 group-hover:opacity-100 text-xs text-indigo-600 font-medium flex items-center justify-end w-full gap-1 mt-1">
                                        View Profile <ArrowUpRight size={12}/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Customers;