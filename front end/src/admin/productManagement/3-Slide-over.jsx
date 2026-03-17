import React from "react";

const SlideOver = ({ closePanel, isPanelOpen, selectedProduct, editMode }) => {
  return (
    <>
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
          <div
            className="flex flex-col h-full"
            key={selectedProduct?.id || "new"}
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-line sticky top-0 bg-surface z-10">
              <h2 className="text-lg font-semibold text-primary">
                {editMode ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={closePanel}
                className="p-2 hover:bg-muted rounded-lg transition-colors text-secondary hover:text-primary"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <form
                className="space-y-6 md:space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  closePanel();
                }}
              >
                {/* General Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                    General Info
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.name || ""}
                      className="form-input w-full px-4 py-3 rounded-xl"
                      placeholder="e.g. Gradient Graphic T-Shirt"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      Description
                    </label>
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
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Media
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    <div className="col-span-1 aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
                      <img
                        src={
                          selectedProduct?.image ||
                          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80"
                        }
                        className="w-full h-full object-cover"
                        alt="Product"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="col-span-1 aspect-square border-2 border-dashed border-line rounded-lg flex flex-col items-center justify-center text-secondary hover:text-primary hover:border-primary cursor-pointer transition-colors">
                      <svg
                        className="w-6 h-6 mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-xs font-medium">Add</span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Pricing
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        Base Price ($)
                      </label>
                      <input
                        type="number"
                        defaultValue={selectedProduct?.price || ""}
                        className="form-input w-full px-4 py-3 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        defaultValue={selectedProduct?.discount || 0}
                        className="form-input w-full px-4 py-3 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        SKU
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedProduct?.sku || ""}
                        className="form-input w-full px-4 py-3 rounded-xl font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Organization */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Organization
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        Category
                      </label>
                      <select
                        defaultValue={selectedProduct?.category || ""}
                        className="form-input w-full px-4 py-3 rounded-xl"
                      >
                        <option value="">Select Category</option>
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Polo Shirts">Polo Shirts</option>
                        <option value="Hoodies">Hoodies</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        Dress Style
                      </label>
                      <select
                        defaultValue={selectedProduct?.style || ""}
                        className="form-input w-full px-4 py-3 rounded-xl"
                      >
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
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Inventory
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        defaultValue={selectedProduct?.stock || 0}
                        className="form-input w-full px-4 py-3 rounded-xl"
                      />
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

export default SlideOver;
