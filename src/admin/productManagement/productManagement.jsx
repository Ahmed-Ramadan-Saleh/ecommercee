import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./productManagement.css"; // Assuming CSS is here

// --- Helper Component ---
const StatusBadge = ({ stock }) => {
  if (stock === 0) return <span className="badge badge-danger">Out of Stock</span>;
  if (stock < 10) return <span className="badge badge-warning">Low Stock</span>;
  return <span className="badge badge-success">In Stock</span>;
};

const ProductManagement = () => {
  // --- State ---
  const [products, setProducts] = useState([
    { id: 1, name: "Gradient Graphic T-Shirt", sku: "SKU-TS-001", price: 145, discount: 0, category: "T-Shirts", style: "Casual", stock: 86, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80" },
    { id: 2, name: "Polo with Tipping Details", sku: "SKU-PL-002", price: 180, discount: 0, category: "Polo Shirts", style: "Smart Casual", stock: 45, image: "https://images.unsplash.com/photo-1625910513413-5fc4f64f0a28?w=100&q=80" },
    { id: 3, name: "Classic Fit Jeans", sku: "SKU-JN-003", price: 215, discount: 20, category: "Jeans", style: "Casual", stock: 5, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&q=80" },
    { id: 4, name: "Premium Cotton Hoodie", sku: "SKU-HD-004", price: 195, discount: 0, category: "Hoodies", style: "Gym", stock: 0, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&q=80" },
    { id: 5, name: "Vertical Striped Shirt", sku: "SKU-SH-005", price: 212, discount: 15, category: "Shirts", style: "Formal", stock: 120, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&q=80" },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Search/Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // --- Effects ---
  
  // Handle body scroll lock
  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isPanelOpen]);

  // --- Handlers ---

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const openPanel = (isEdit = false, product = null) => {
    setEditMode(isEdit);
    setSelectedProduct(product);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setSelectedProduct(null);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Derived State: Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    
    let matchesStatus = true;
    if (statusFilter === "in_stock") matchesStatus = p.stock > 10;
    if (statusFilter === "low_stock") matchesStatus = p.stock > 0 && p.stock <= 10;
    if (statusFilter === "out_of_stock") matchesStatus = p.stock === 0;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      <Helmet>
        <title>Product Management - SHOP.CO Admin</title>
      </Helmet>

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
          <div className="flex items-center gap-3 p-6 border-b border-white/10">
            <div className="w-10 h-10 bg-[#C45C3E] rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <div><span className="font-bold text-white text-lg">SHOP.CO</span><p className="text-xs text-gray-500">Admin Panel</p></div>
          </div>
          <nav className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Menu</p>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>Dashboard</a>
            <a href="#" className="sidebar-link active"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>Products</a>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>Orders</a>
            
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 mt-6">Catalog</p>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>Categories</a>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>Brands</a>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 lg:px-8 h-16">
              <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 -ml-2" onClick={toggleSidebar} aria-label="Toggle menu">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
                <h1 className="text-lg font-semibold">Products</h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="btn-secondary px-4 py-2 text-sm rounded-lg font-medium border border-gray-200 hover:bg-gray-50">Export</button>
                <button
                  onClick={() => openPanel(false)}
                  className="bg-[#1A1A1A] text-white px-4 py-2 text-sm rounded-lg font-medium hover:bg-[#C45C3E] transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                  Add Product
                </button>
              </div>
            </div>
            {/* Filters */}
            <div className="px-6 lg:px-8 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 max-w-xs">
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400"
                />
              </div>
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none text-gray-600"
              >
                <option value="all">All Categories</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Polo Shirts">Polo Shirts</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none text-gray-600"
              >
                <option value="all">All Status</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </header>

          {/* Table */}
          <main className="p-6 lg:p-8">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{p.name}</p>
                              <p className="text-xs text-gray-400">{p.style}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 font-mono">{p.sku}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <span className="font-medium">${p.price.toFixed(2)}</span>
                            {p.discount > 0 && (
                              <span className="text-xs text-gray-400 line-through ml-1">
                                ${(p.price * (1 + p.discount / 100)).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{p.category}</td>
                        <td className="px-6 py-4 text-sm font-medium">{p.stock}</td>
                        <td className="px-6 py-4"><StatusBadge stock={p.stock} /></td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button 
                              onClick={() => openPanel(true, p)}
                              className="action-btn edit-btn" 
                              title="Edit"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                            </button>
                            <button className="action-btn" title="Duplicate">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                            </button>
                            <button 
                              onClick={() => deleteProduct(p.id)}
                              className="action-btn danger" 
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Slide-over Overlay */}
      <div 
        className={`slide-over-overlay ${isPanelOpen ? "open" : ""}`} 
        onClick={closePanel} 
      />

      {/* Add/Edit Product Panel */}
      <div className={`slide-over-panel ${isPanelOpen ? "open" : ""}`}>
        <div className="flex flex-col h-full">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 className="text-lg font-semibold">{editMode ? 'Edit Product' : 'Add New Product'}</h2>
            <button onClick={closePanel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Panel Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); closePanel(); }}>
              {/* General Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">General Info</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    defaultValue={selectedProduct?.name || ""}
                    className="form-input w-full px-4 py-2.5 rounded-lg bg-gray-50"
                    placeholder="e.g. Gradient Graphic T-Shirt"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    className="form-input w-full px-4 py-2.5 rounded-lg bg-gray-50"
                    placeholder="Write a description..."
                  />
                </div>
              </div>

              {/* Media */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Media</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
                    <img src={selectedProduct?.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80"} className="w-full h-full object-cover" alt="Product" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </div>
                  </div>
                  <div className="col-span-1 aspect-square image-upload-box rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                    <span className="text-xs font-medium">Add</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Pricing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Price ($)</label>
                    <input type="number" defaultValue={selectedProduct?.price || ""} className="form-input w-full px-4 py-2.5 rounded-lg bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                    <input type="number" defaultValue={selectedProduct?.discount || 0} className="form-input w-full px-4 py-2.5 rounded-lg bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                    <input type="text" defaultValue={selectedProduct?.sku || ""} className="form-input w-full px-4 py-2.5 rounded-lg bg-gray-50 font-mono text-sm" />
                  </div>
                </div>
              </div>

              {/* Organization */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Organization</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select defaultValue={selectedProduct?.category || ""} className="form-input w-full px-4 py-2.5 rounded-lg bg-gray-50">
                      <option value="">Select Category</option>
                      <option value="T-Shirts">T-Shirts</option>
                      <option value="Jeans">Jeans</option>
                      <option value="Polo Shirts">Polo Shirts</option>
                      <option value="Hoodies">Hoodies</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dress Style</label>
                    <select defaultValue={selectedProduct?.style || ""} className="form-input w-full px-4 py-2.5 rounded-lg bg-gray-50">
                      <option value="">Select Style</option>
                      <option value="Casual">Casual</option>
                      <option value="Formal">Formal</option>
                      <option value="Party">Party</option>
                      <option value="Gym">Gym</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Inventory */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Inventory</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input type="number" defaultValue={selectedProduct?.stock || 0} className="form-input w-full px-4 py-2.5 rounded-lg bg-gray-50" />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Panel Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
            <button
              onClick={closePanel}
              className="px-6 py-2.5 text-sm font-medium rounded-lg border border-gray-200 hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-2.5 text-sm font-medium rounded-lg bg-[#1A1A1A] text-white hover:bg-[#C45C3E] transition-colors">
              Save Product
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={toggleSidebar} />
      )}
    </>
  );
};

export default ProductManagement;