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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
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
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>Products</a>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>Orders</a>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>Customers</a>
            
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 mt-6">Marketing</p>
            <a href="#" className="sidebar-link active"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>Marketing Center</a>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>Settings</a>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 lg:px-8 h-16">
              <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 -ml-2" onClick={toggleSidebar}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
                <h1 className="text-lg font-semibold">Marketing Center</h1>
              </div>
            </div>
            {/* Tabs */}
            <div className="px-6 lg:px-8 bg-white border-t border-gray-100 flex overflow-x-auto">
              {[
                { id: "coupons", label: "Promo Codes" },
                { id: "homepage", label: "Homepage" },
                { id: "reviews", label: "Reviews" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </header>

          {/* Content Area */}
          <main className="p-6 lg:p-8">
            
            {/* Tab 1: Promo Codes */}
            {activeTab === "coupons" && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-gray-500">Manage discount codes for your store.</p>
                  <button
                    onClick={toggleCouponPanel}
                    className="bg-[#1A1A1A] text-white px-4 py-2 text-sm rounded-lg font-medium hover:bg-[#C45C3E] transition-colors"
                  >
                    Create Promo Code
                  </button>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Code</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Discount</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Uses</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Expiry</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map(c => (
                        <tr key={c.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-mono font-medium">{c.code}</td>
                          <td className="px-6 py-4 text-sm">{c.discount}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{c.uses}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{c.expiry}</td>
                          <td className="px-6 py-4">
                            <span className={`badge badge-${c.status}`}>{c.status}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => deleteCoupon(c.id)}
                              className="text-sm text-gray-500 hover:text-red-500 font-medium"
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
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold mb-4">Hero Banner</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center border-2 border-dashed border-gray-200 hover:border-[#C45C3E] transition-colors cursor-pointer">
                      <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" className="w-full h-48 object-cover rounded-md mb-3" alt="Hero" />
                      <button className="text-sm font-medium text-[#C45C3E]">Change Image</button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                        <input type="text" defaultValue="FIND CLOTHES THAT MATCHES YOUR STYLE" className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtext</label>
                        <textarea rows={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400" defaultValue="Browse through our curated collection..." />
                      </div>
                      <button className="bg-[#1A1A1A] text-white px-4 py-2 text-sm rounded-lg font-medium hover:bg-[#C45C3E] transition-colors">Save Changes</button>
                    </div>
                  </div>
                </div>
                
                {/* Product Selection */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold mb-4">Product Collections</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* New Arrivals */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Arrivals (Max 4)</label>
                      <div className="border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50">
                        <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=50&q=80" className="w-full h-full object-cover" alt="" />
                            </div>
                            <span className="text-sm">Gradient T-Shirt</span>
                          </div>
                          <button className="text-gray-400 hover:text-red-500">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                          </button>
                        </div>
                        <button className="w-full mt-2 py-2 border border-dashed border-gray-200 text-sm text-gray-500 hover:border-gray-400 rounded">+ Add Product</button>
                      </div>
                    </div>
                    {/* Top Selling */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Top Selling (Max 4)</label>
                      <div className="border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50">
                         <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=50&q=80" className="w-full h-full object-cover" alt="" />
                            </div>
                            <span className="text-sm">Essential Crew Tee</span>
                          </div>
                          <button className="text-gray-400 hover:text-red-500">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                          </button>
                        </div>
                        <button className="w-full mt-2 py-2 border border-dashed border-gray-200 text-sm text-gray-500 hover:border-gray-400 rounded">+ Add Product</button>
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
                  <div className="flex gap-2">
                    {["all", "pending", "approved"].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setReviewFilter(filter)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg capitalize ${
                          reviewFilter === filter 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {filter} {filter === "pending" && `(${reviews.filter(r => r.status === 'pending').length})`}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredReviews.map(r => (
                    <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">{r.user.charAt(0)}</div>
                          <div>
                            <p className="font-medium">{r.user}</p>
                            <p className="text-xs text-gray-400">Reviewed {r.product} • {r.date}</p>
                          </div>
                        </div>
                        <StarRating rating={r.rating} />
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{r.text}</p>
                      <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                        {r.status === 'pending' && (
                          <button 
                            onClick={() => approveReview(r.id)}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                          >
                            Approve
                          </button>
                        )}
                        <button 
                          onClick={() => deleteReview(r.id)}
                          className="px-4 py-2 text-sm font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Slide-over Overlay */}
      <div 
        className={`slide-over-overlay ${isCouponPanelOpen ? "open" : ""}`} 
        onClick={toggleCouponPanel} 
      />

      {/* Add Coupon Panel */}
      <div className={`slide-over-panel ${isCouponPanelOpen ? "open" : ""}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create Promo Code</h2>
              <button onClick={toggleCouponPanel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toggleCouponPanel(); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code Name</label>
                <input type="text" placeholder="e.g. SUMMER20" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none bg-white">
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input type="number" placeholder="20" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input type="date" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                <input type="number" placeholder="Leave blank for unlimited" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none" />
              </div>
            </form>
          </div>
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button
              onClick={toggleCouponPanel}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-white"
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-lg bg-[#1A1A1A] text-white hover:bg-[#C45C3E] transition-colors">
              Create Code
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={toggleSidebar} />
      )}
    </>
  );
};

export default MarketingContent;