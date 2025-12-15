import React, { useState, useEffect } from 'react';
import { generateProducts } from '../services/dataService';
import { Product } from '../types';
import { Search, Plus, Filter, MoreHorizontal, Edit2, AlertCircle, CheckCircle } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(generateProducts(30));
  }, []);

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by name, SKU, etc." 
                        className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm w-80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                </div>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors">All</button>
                    <button className="px-3 py-1.5 text-xs font-medium bg-white text-gray-500 rounded-md hover:bg-gray-50 border border-gray-200">Published</button>
                    <button className="px-3 py-1.5 text-xs font-medium bg-white text-gray-500 rounded-md hover:bg-gray-50 border border-gray-200">Drafts</button>
                </div>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 shadow-sm transition-all hover:shadow">
                <Plus size={18} /> Add Product
            </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase w-16">Image</th>
                        <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">Product</th>
                        <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">Stock</th>
                        <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">Price</th>
                        <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">Categories</th>
                        <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">Date</th>
                        <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="py-3 px-6">
                                <div className="h-10 w-10 rounded bg-gray-100 border border-gray-200 overflow-hidden relative">
                                    <img src={product.images[0]?.src} alt={product.images[0]?.alt} className="h-full w-full object-cover" />
                                    {product.on_sale && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-[10px] text-center font-bold">SALE</div>
                                    )}
                                </div>
                            </td>
                            <td className="py-3 px-6">
                                <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                                <div className="text-xs text-gray-400 font-mono">SKU: {product.sku}</div>
                            </td>
                            <td className="py-3 px-6">
                                {product.stock_status === 'instock' ? (
                                    <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                                        <CheckCircle size={14} /> 
                                        In Stock ({product.stock_quantity})
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
                                        <AlertCircle size={14} /> 
                                        Out of Stock
                                    </div>
                                )}
                            </td>
                            <td className="py-3 px-6">
                                {product.on_sale ? (
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 line-through">${product.regular_price}</span>
                                        <span className="text-sm font-bold text-gray-900">${product.sale_price}</span>
                                    </div>
                                ) : (
                                    <span className="text-sm font-medium text-gray-900">${product.regular_price}</span>
                                )}
                            </td>
                            <td className="py-3 px-6">
                                <div className="flex flex-wrap gap-1">
                                    {product.categories.map((cat, idx) => (
                                        <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                                            {cat.name}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="py-3 px-6 text-xs text-gray-500">
                                {new Date(product.date_created).toLocaleDateString()}
                                <div className={`text-[10px] capitalize ${product.status === 'publish' ? 'text-green-600' : 'text-amber-600'}`}>
                                    {product.status}
                                </div>
                            </td>
                            <td className="py-3 px-6 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Products;