import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

// --- Helper Component: StarRating ---
const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className="w-4 h-4"
        fill={i < rating ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const MarketingContent = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState("coupons");
  const [isCouponPanelOpen, setIsCouponPanelOpen] = useState(false);
  
  // Data State
  const [coupons, setCoupons] = useState([
    { id: 1, code: "FIRST20", discount: "20%", uses: 1250, expiry: "Dec 31, 2024", status: "active" },
    { id: 2, code: "SUMMER50", discount: "50%", uses: 45, expiry: "Aug 31, 2024", status: "active" },
    { id: 3, code: "FLASH10", discount: "10%", uses: 100, expiry: "Jan 01, 2024", status: "expired" }
  ]);

  const [reviews, setReviews] = useState([
    { id: 1, product: "Gradient T-Shirt", user: "Sarah M.", rating: 5, text: "Amazing quality! The fabric feels premium.", date: "2 days ago", status: "approved" },
    { id: 2, product: "Classic Jeans", user: "Mike T.", rating: 4, text: "Good fit but slightly long.", date: "1 day ago", status: "pending" },
    { id: 3, product: "Polo Shirt", user: "Jenny L.", rating: 5, text: "Perfect for summer!", date: "3 days ago", status: "pending" }
  ]);

  const [reviewFilter, setReviewFilter] = useState("all");

  // --- Handlers ---

  const toggleCouponPanel = () => setIsCouponPanelOpen(!isCouponPanelOpen);

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  const approveReview = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: "approved" } : r));
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  // Filtered Reviews
  const filteredReviews = reviews.filter(r => {
    if (reviewFilter === "pending") return r.status === "pending";
    if (reviewFilter === "approved") return r.status === "approved";
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Marketing & Content - SHOP.CO Admin</title>
      </Helmet>

      {/* Tabs Navigation - Scrollable on mobile */}
      <div className="mb-6 border-b border-line overflow-x-auto">
        <nav className="-mb-px flex space-x-6 min-w-max" aria-label="Tabs">
          {[
            { id: "coupons", label: "Promo Codes" },
            { id: "homepage", label: "Homepage" },
            { id: "reviews", label: "Reviews" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-industrial-red text-industrial-red"
                  : "border-transparent text-secondary hover:text-primary hover:border-line"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab 1: Promo Codes */}
      {activeTab === "coupons" && (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-secondary hidden sm:block">Manage discount codes for your store.</p>
            <button
              onClick={toggleCouponPanel}
              className="btn-primary px-4 py-2 text-sm rounded-lg font-medium w-full sm:w-auto"
            >
              Create Promo Code
            </button>
          </div>
          <div className="bg-surface rounded-xl border border-line overflow-hidden shadow-sm">
            
            {/* Responsive Table: Card on Mobile, Table on Desktop */}
            <table className="w-full">
              <thead className="hidden sm:table-header-group bg-muted border-b border-line">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">Code</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">Discount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">Uses</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">Expiry</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-secondary uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="block sm:table-row-group divide-y sm:divide-y-0 divide-line">
                {coupons.map(c => (
                  <tr key={c.id} className="block sm:table-row hover:bg-muted/50 transition-colors p-4 sm:p-0 mb-4 sm:mb-0 border border-line sm:border-0 rounded-xl sm:rounded-none shadow-sm sm:shadow-none">
                    
                    {/* Code */}
                    <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                      <span className="sm:hidden text-xs font-medium text-secondary">Code</span>
                      <span className="font-mono font-medium text-primary">{c.code}</span>
                    </td>
                    
                    {/* Discount */}
                    <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                      <span className="sm:hidden text-xs font-medium text-secondary">Discount</span>
                      <span className="text-primary">{c.discount}</span>
                    </td>
                    
                    {/* Uses */}
                    <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                      <span className="sm:hidden text-xs font-medium text-secondary">Uses</span>
                      <span className="text-secondary">{c.uses}</span>
                    </td>
                    
                    {/* Expiry */}
                    <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                      <span className="sm:hidden text-xs font-medium text-secondary">Expiry</span>
                      <span className="text-secondary">{c.expiry}</span>
                    </td>
                    
                    {/* Status */}
                    <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                       <span className="sm:hidden text-xs font-medium text-secondary">Status</span>
                       <span className={`badge ${c.status === 'active' ? 'badge-success' : 'badge-inactive'}`}>{c.status}</span>
                    </td>
                    
                    {/* Actions */}
                    <td className="flex justify-end items-center pt-2 sm:table-cell sm:px-6 sm:py-4 text-right">
                      <button 
                        onClick={() => deleteCoupon(c.id)}
                        className="text-sm text-secondary hover:text-red-500 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Homepage Settings */}
      {activeTab === "homepage" && (
        <div className="space-y-8 animate-fade-in">
          {/* Hero Section */}
          <div className="bg-surface rounded-xl border border-line p-4 md:p-6 shadow-sm">
            <h3 className="font-semibold text-primary mb-4">Hero Banner</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted rounded-lg p-4 text-center border-2 border-dashed border-line hover:border-industrial-red transition-colors cursor-pointer">
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" className="w-full h-48 object-cover rounded-md mb-3" alt="Hero" />
                <button className="text-sm font-medium text-industrial-red hover:underline">Change Image</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Headline</label>
                  <input type="text" defaultValue="FIND CLOTHES THAT MATCHES YOUR STYLE" className="form-input w-full px-4 py-2 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Subtext</label>
                  <textarea rows={2} className="form-input w-full px-4 py-2 rounded-lg text-sm resize-none" defaultValue="Browse through our curated collection..." />
                </div>
                <button className="btn-primary px-4 py-2 text-sm rounded-lg font-medium w-full sm:w-auto">Save Changes</button>
              </div>
            </div>
          </div>
          
          {/* Product Selection */}
          <div className="bg-surface rounded-xl border border-line p-4 md:p-6 shadow-sm">
            <h3 className="font-semibold text-primary mb-4">Product Collections</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* New Arrivals */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">New Arrivals (Max 4)</label>
                <div className="border border-line rounded-lg p-3 space-y-2 bg-muted">
                  <div className="flex justify-between items-center bg-surface p-2 rounded border border-line">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=50&q=80" className="w-full h-full object-cover" alt="" />
                      </div>
                      <span className="text-sm text-primary">Gradient T-Shirt</span>
                    </div>
                    <button className="text-secondary hover:text-red-500 transition-colors">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                  <button className="w-full mt-2 py-2 border border-dashed border-line text-sm text-secondary hover:border-primary rounded transition-colors">+ Add Product</button>
                </div>
              </div>
              {/* Top Selling */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Top Selling (Max 4)</label>
                <div className="border border-line rounded-lg p-3 space-y-2 bg-muted">
                   <div className="flex justify-between items-center bg-surface p-2 rounded border border-line">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=50&q=80" className="w-full h-full object-cover" alt="" />
                      </div>
                      <span className="text-sm text-primary">Essential Crew Tee</span>
                    </div>
                    <button className="text-secondary hover:text-red-500 transition-colors">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                  <button className="w-full mt-2 py-2 border border-dashed border-line text-sm text-secondary hover:border-primary rounded transition-colors">+ Add Product</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Reviews */}
      {activeTab === "reviews" && (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            {/* Added flex-wrap for small screens */}
            <div className="flex gap-2 flex-wrap">
              {["all", "pending", "approved"].map(filter => (
                <button
                  key={filter}
                  onClick={() => setReviewFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
                    reviewFilter === filter 
                    ? 'bg-industrial-dark text-white' 
                    : 'bg-surface border border-line text-secondary hover:bg-muted'
                  }`}
                >
                  {filter} {filter === "pending" && `(${reviews.filter(r => r.status === 'pending').length})`}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {filteredReviews.map(r => (
              <div key={r.id} className="bg-surface rounded-xl border border-line p-4 md:p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">{r.user.charAt(0)}</div>
                    <div>
                      <p className="font-medium text-primary">{r.user}</p>
                      <p className="text-xs text-secondary">Reviewed {r.product} • {r.date}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <StarRating rating={r.rating} />
                  </div>
                </div>
                <p className="text-primary text-sm mb-4">{r.text}</p>
                <div className="flex justify-end gap-3 border-t border-line pt-4">
                  {r.status === 'pending' && (
                    <button 
                      onClick={() => approveReview(r.id)}
                      className="px-4 py-2 text-sm font-medium rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  <button 
                    onClick={() => deleteReview(r.id)}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide-over Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${isCouponPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleCouponPanel} 
      />

      {/* Add Coupon Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-surface shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isCouponPanelOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-line">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">Create Promo Code</h2>
              <button onClick={toggleCouponPanel} className="p-2 hover:bg-muted rounded-lg transition-colors text-secondary hover:text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toggleCouponPanel(); }}>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Code Name</label>
                <input type="text" placeholder="e.g. SUMMER20" className="form-input w-full px-4 py-3 rounded-lg uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Discount Type</label>
                  <select className="form-input w-full px-4 py-3 rounded-lg">
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Value</label>
                  <input type="number" placeholder="20" className="form-input w-full px-4 py-3 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Expiry Date</label>
                <input type="date" className="form-input w-full px-4 py-3 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Usage Limit</label>
                <input type="number" placeholder="Leave blank for unlimited" className="form-input w-full px-4 py-3 rounded-lg" />
              </div>
            </form>
          </div>
          <div className="p-6 border-t border-line bg-muted flex justify-end gap-3 sticky bottom-0">
            <button
              onClick={toggleCouponPanel}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-line hover:bg-surface transition-colors text-primary w-full sm:w-auto"
            >
              Cancel
            </button>
            <button className="btn-primary px-4 py-2 text-sm rounded-lg w-full sm:w-auto">
              Create Code
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketingContent;