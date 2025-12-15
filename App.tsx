import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import ConnectWoo from './pages/ConnectWoo';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Apps from './pages/Apps';
import Themes from './pages/Themes';
import Settings from './pages/Settings';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  
  // Determine page title based on path
  let title = 'Dashboard';
  if (location.pathname.includes('orders')) title = 'Orders';
  if (location.pathname.includes('products')) title = 'Products';
  if (location.pathname.includes('connect')) title = 'Migrations';
  if (location.pathname.includes('customers')) title = 'Customers';
  if (location.pathname.includes('settings')) title = 'Store Settings';
  if (location.pathname.includes('apps')) title = 'Apps & Extensions';
  if (location.pathname.includes('themes')) title = 'Online Store';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={title} />
        <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/connect" element={<ConnectWoo />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;