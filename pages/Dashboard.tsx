import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, ShoppingCart, DollarSign, Package, Sparkles } from 'lucide-react';
import { generateBusinessInsights } from '../services/geminiService';
import { StoreStats } from '../types';

const data = [
  { name: 'Mon', sales: 4000, orders: 240 },
  { name: 'Tue', sales: 3000, orders: 198 },
  { name: 'Wed', sales: 5000, orders: 350 },
  { name: 'Thu', sales: 2780, orders: 150 },
  { name: 'Fri', sales: 6890, orders: 480 },
  { name: 'Sat', sales: 8390, orders: 600 },
  { name: 'Sun', sales: 7490, orders: 520 },
];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {change > 0 ? '+' : ''}{change}%
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const [insight, setInsight] = useState<string>('Analyzing your store data with Gemini AI...');
  const [stats, setStats] = useState<StoreStats>({
    totalRevenue: 37550,
    totalOrders: 2538,
    averageOrderValue: 74.50,
    activeProducts: 450,
    growthRate: 12.5
  });

  useEffect(() => {
    // Simulate AI loading
    const loadInsight = async () => {
      const result = await generateBusinessInsights(stats);
      setInsight(result);
    };
    loadInsight();
  }, []);

  return (
    <div className="space-y-6">
      {/* AI Insight Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
        <div className="flex items-start gap-4">
          <div className="bg-white p-2 rounded-full shadow-sm">
            <Sparkles className="text-indigo-600" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-indigo-900 mb-1">Hostcom Intelligence</h2>
            <div className="text-indigo-800 text-sm leading-relaxed whitespace-pre-line">
              {insight}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$37,550" change={12.5} icon={DollarSign} color="bg-blue-500" />
        <StatCard title="Total Orders" value="2,538" change={8.2} icon={ShoppingCart} color="bg-indigo-500" />
        <StatCard title="Avg. Order Value" value="$74.50" change={-2.4} icon={TrendingUp} color="bg-purple-500" />
        <StatCard title="Active Products" value="450" change={0} icon={Package} color="bg-orange-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-96">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                cursor={{fill: '#f9fafb'}}
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-96">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Volume</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip 
                 contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={3} dot={{fill: '#8b5cf6', strokeWidth: 2}} activeDot={{r: 8}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;