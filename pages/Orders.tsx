import React, { useState, useEffect } from 'react';
import { generateOrders } from '../services/dataService';
import { Order, OrderStatus } from '../types';
import { Filter, Download, Eye, X, MapPin, CreditCard, Package, Calendar } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setOrders(generateOrders(50));
      setLoading(false);
    }, 800);
  }, []);

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.COMPLETED: return 'bg-green-100 text-green-800 border-green-200';
      case OrderStatus.PROCESSING: return 'bg-green-50 text-green-600 border-green-100'; // WooCommerce styling often uses green for processing too
      case OrderStatus.ON_HOLD: return 'bg-orange-100 text-orange-800 border-orange-200';
      case OrderStatus.PENDING: return 'bg-gray-100 text-gray-600 border-gray-200';
      case OrderStatus.CANCELLED: return 'bg-gray-100 text-gray-500 border-gray-200 line-through';
      case OrderStatus.REFUNDED: return 'bg-gray-100 text-gray-600 border-gray-200';
      case OrderStatus.FAILED: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-4 relative">
      {/* Header Actions */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 flex items-center gap-2">
                <Filter size={16} /> Filter
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 flex items-center gap-2">
                <Download size={16} /> Export CSV
            </button>
        </div>
        <div className="text-sm text-gray-500">
            Synced via <span className="font-semibold text-indigo-600">WC-API Hook</span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Order</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">Loading orders...</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedOrder(order)}>
                    <td className="py-4 px-6">
                        <div className="font-semibold text-indigo-600">#{order.id}</div>
                        <div className="text-xs text-gray-400">{order.customerName}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                        {new Date(order.date_created).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusStyle(order.status)} uppercase tracking-wide`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                        <div className="text-sm text-gray-900">{order.billing.first_name} {order.billing.last_name}</div>
                        <div className="text-xs text-gray-500">{order.billing.email}</div>
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                        ${order.total} <span className="text-gray-400 font-normal text-xs">for {order.items_count} items</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                        className="text-gray-400 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50 transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal (Slide-over style) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedOrder(null)}></div>
            <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-slide-in-right overflow-hidden">
                
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            Order #{selectedOrder.id} 
                            <span className={`px-2 py-0.5 rounded text-xs border ${getStatusStyle(selectedOrder.status)}`}>{selectedOrder.status}</span>
                        </h2>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                            <Calendar size={12} /> {new Date(selectedOrder.date_created).toLocaleString()} • IP: {selectedOrder.customer_ip_address}
                        </p>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    
                    {/* Items */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Items ({selectedOrder.items_count})</h3>
                        <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 overflow-hidden">
                            {selectedOrder.line_items.map((item) => (
                                <div key={item.id} className="p-4 flex gap-4 items-center">
                                    <img src={item.image} alt="" className="w-12 h-12 rounded-md object-cover border border-gray-200" />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                        <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-900">${item.total}</div>
                                        <div className="text-xs text-gray-500">Qty: {item.quantity} × ${parseFloat(item.total)/item.quantity}</div>
                                    </div>
                                </div>
                            ))}
                            <div className="p-4 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                                <span className="font-medium text-gray-900">Total</span>
                                <span className="font-bold text-xl text-indigo-600">${selectedOrder.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Details Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Billing */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <CreditCard size={14}/> Billing
                            </h3>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-700 space-y-1">
                                <p className="font-medium text-gray-900">{selectedOrder.billing.first_name} {selectedOrder.billing.last_name}</p>
                                <p>{selectedOrder.billing.company}</p>
                                <p>{selectedOrder.billing.address_1}</p>
                                <p>{selectedOrder.billing.address_2}</p>
                                <p>{selectedOrder.billing.city}, {selectedOrder.billing.state} {selectedOrder.billing.postcode}</p>
                                <p>{selectedOrder.billing.country}</p>
                                <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                                    <p className="flex items-center gap-2"><span className="w-4">✉</span> {selectedOrder.billing.email}</p>
                                    <p className="flex items-center gap-2"><span className="w-4">📞</span> {selectedOrder.billing.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Shipping */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <MapPin size={14}/> Shipping
                            </h3>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-700 space-y-1">
                                <p className="font-medium text-gray-900">{selectedOrder.shipping.first_name} {selectedOrder.shipping.last_name}</p>
                                <p>{selectedOrder.shipping.company}</p>
                                <p>{selectedOrder.shipping.address_1}</p>
                                <p>{selectedOrder.shipping.address_2}</p>
                                <p>{selectedOrder.shipping.city}, {selectedOrder.shipping.state} {selectedOrder.shipping.postcode}</p>
                                <p>{selectedOrder.shipping.country}</p>
                            </div>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 flex gap-3 items-start">
                        <Package className="text-blue-600 mt-0.5" size={18} />
                        <div>
                            <h4 className="text-sm font-bold text-blue-900">Platform Sync</h4>
                            <p className="text-xs text-blue-800 mt-1">
                                This order was created on {selectedOrder.platform} and synchronized via REST API hooks. 
                                Payment verified via {selectedOrder.payment_method_title}.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3 justify-end">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Refund
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 shadow-sm">
                        Process Order
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Orders;