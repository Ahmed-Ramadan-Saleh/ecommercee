import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

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

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Search/Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // --- Effects ---
  useEffect(() => {
    if (isPanelOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isPanelOpen]);

  // --- Handlers ---

  const openPanel = (isEdit = false, product = null) => {
    setEditMode(isEdit);
    setSelectedProduct(product);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    // Delay clearing product to allow animation to finish
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Derived State
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

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pl-10 pr-4 py-2 rounded-lg w-full"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="form-input px-4 py-2 rounded-lg w-full sm:w-40"
            >
              <option value="all">All Categories</option>
              <option value="T-Shirts">T-Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Polo Shirts">Polo Shirts</option>
              <option value="Hoodies">Hoodies</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input px-4 py-2 rounded-lg w-full sm:w-40"
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={() => openPanel(false)}
          className="btn-primary px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap w-full sm:w-auto"
        >
          Add Product
        </button>
      </div>

      {/* Table Section - Card Layout on Mobile */}
      <div className="bg-surface rounded-xl border border-line overflow-hidden shadow-sm">
        
        <table className="w-full">
          {/* Desktop Header */}
          <thead className="hidden sm:table-header-group bg-muted border-b border-line">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Product</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">SKU</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Price</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Category</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Stock</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          {/* Body - Stacked on Mobile */}
          <tbody className="block sm:table-row-group divide-y sm:divide-y-0 divide-line">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p.id} className="block sm:table-row hover:bg-muted/50 transition-colors 
                                           p-4 sm:p-0 mb-4 sm:mb-0 border border-line sm:border-0 rounded-xl sm:rounded-none shadow-sm sm:shadow-none">
                  
                  {/* Product Info */}
                  <td className="block sm:table-cell py-2 sm:px-6 sm:py-4 w-full">
                    <div className="flex justify-between items-start sm:block">
                       <span className="sm:hidden text-xs font-medium text-secondary mb-1">Product</span>
                       <div className="flex items-center gap-3">
                         <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                           <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                         </div>
                         <div>
                           <p className="font-medium text-sm text-primary">{p.name}</p>
                           <p className="text-xs text-secondary">{p.style}</p>
                         </div>
                       </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                    <span className="sm:hidden text-xs font-medium text-secondary">SKU</span>
                    <span className="text-secondary font-mono">{p.sku}</span>
                  </td>

                  {/* Price */}
                  <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                    <span className="sm:hidden text-xs font-medium text-secondary">Price</span>
                    <div className="text-right sm:text-left">
                      <span className="font-medium text-primary">${p.price.toFixed(2)}</span>
                      {p.discount > 0 && (
                        <span className="text-xs text-secondary line-through ml-1">
                          ${(p.price * (1 + p.discount / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                    <span className="sm:hidden text-xs font-medium text-secondary">Category</span>
                    <span className="text-secondary">{p.category}</span>
                  </td>

                  {/* Stock */}
                  <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                    <span className="sm:hidden text-xs font-medium text-secondary">Stock</span>
                    <span className="font-medium text-primary">{p.stock}</span>
                  </td>

                  {/* Status */}
                  <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                    <span className="sm:hidden text-xs font-medium text-secondary">Status</span>
                    <StatusBadge stock={p.stock} />
                  </td>

                  {/* Actions */}
                  <td className="flex justify-end items-center pt-2 sm:table-cell sm:px-6 sm:py-4 text-right">
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => openPanel(true, p)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-secondary hover:text-primary" 
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                      </button>
                      <button 
                        onClick={() => deleteProduct(p.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-secondary hover:text-red-600" 
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-12 text-secondary block">
                  No products found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Slide-over Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${isPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closePanel} 
      />

      {/* Add/Edit Product Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-surface shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* 
           FIX APPLIED:
           1. Changed condition from 'selectedProduct &&' to 'isPanelOpen &&'.
           2. Added 'key' to the inner div. This ensures the form resets completely 
              when switching between "Add" (null) and "Edit" (object).
        */}
        {isPanelOpen && (
          <div className="flex flex-col h-full" key={selectedProduct?.id || 'new'}>
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-line sticky top-0 bg-surface z-10">
              <h2 className="text-lg font-semibold text-primary">{editMode ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={closePanel} className="p-2 hover:bg-muted rounded-lg transition-colors text-secondary hover:text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <form className="space-y-6 md:space-y-8" onSubmit={(e) => { e.preventDefault(); closePanel(); }}>
                {/* General Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">General Info</h3>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Product Name</label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.name || ""}
                      className="form-input w-full px-4 py-3 rounded-xl"
                      placeholder="e.g. Gradient Graphic T-Shirt"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Description</label>
                    <textarea
                      rows={4}
                      className="form-input w-full px-4 py-3 rounded-xl resize-none"
                      placeholder="Write a description..."
                      defaultValue={selectedProduct?.description || ""}
                    />
                  </div>
                </div>

                {/* Media */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Media</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    <div className="col-span-1 aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
                      <img src={selectedProduct?.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80"} className="w-full h-full object-cover" alt="Product" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      </div>
                    </div>
                    <div className="col-span-1 aspect-square border-2 border-dashed border-line rounded-lg flex flex-col items-center justify-center text-secondary hover:text-primary hover:border-primary cursor-pointer transition-colors">
                      <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                      <span className="text-xs font-medium">Add</span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Pricing</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Base Price ($)</label>
                      <input type="number" defaultValue={selectedProduct?.price || ""} className="form-input w-full px-4 py-3 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Discount (%)</label>
                      <input type="number" defaultValue={selectedProduct?.discount || 0} className="form-input w-full px-4 py-3 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">SKU</label>
                      <input type="text" defaultValue={selectedProduct?.sku || ""} className="form-input w-full px-4 py-3 rounded-xl font-mono text-sm" />
                    </div>
                  </div>
                </div>

                {/* Organization */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Organization</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Category</label>
                      <select defaultValue={selectedProduct?.category || ""} className="form-input w-full px-4 py-3 rounded-xl">
                        <option value="">Select Category</option>
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Polo Shirts">Polo Shirts</option>
                        <option value="Hoodies">Hoodies</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Dress Style</label>
                      <select defaultValue={selectedProduct?.style || ""} className="form-input w-full px-4 py-3 rounded-xl">
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
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Inventory</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Quantity</label>
                      <input type="number" defaultValue={selectedProduct?.stock || 0} className="form-input w-full px-4 py-3 rounded-xl" />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Panel Footer */}
            <div className="p-4 md:p-6 border-t border-line bg-muted flex justify-end gap-3 sticky bottom-0">
              <button
                onClick={closePanel}
                className="px-6 py-2.5 text-sm font-medium rounded-lg border border-line hover:bg-surface transition-colors text-primary w-full sm:w-auto"
              >
                Cancel
              </button>
              <button className="btn-primary px-6 py-2.5 text-sm rounded-lg w-full sm:w-auto text-center">
                Save Product
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductManagement;