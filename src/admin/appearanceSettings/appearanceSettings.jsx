import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const AppearanceSettings = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState("theme");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Theme Settings State
  const [primaryColor, setPrimaryColor] = useState("#C45C3E");
  const [textColor, setTextColor] = useState("#1A1A1A");
  const [bgColor, setBgColor] = useState("#FAFAF7");

  // Shipping Data State
  const [shippingRates, setShippingRates] = useState([
    { id: 1, name: "Standard Shipping", condition: "5-7 Business Days", cost: 4.99 },
    { id: 2, name: "Express Shipping", condition: "2-3 Business Days", cost: 9.99 },
    { id: 3, name: "Next Day Delivery", condition: "1 Business Day", cost: 14.99 },
    { id: 4, name: "Free Standard Shipping", condition: "Orders over $100", cost: 0.00 },
  ]);

  // --- Handlers ---

  // Generic handler for color inputs
  const handleColorChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Validate hex format for text inputs syncing with color
  const handleHexInput = (setter) => (e) => {
    let value = e.target.value;
    // Ensure hash
    if (value && !value.startsWith("#")) {
      value = "#" + value;
    }
    // Basic validation (allow typing)
    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
      setter(value.toUpperCase());
    }
  };

  // Sidebar toggle
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Helmet>
        <title>Settings - SHOP.CO Admin</title>
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
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>Marketing</a>
            
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 mt-6">System</p>
            <a href="#" className="sidebar-link active"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>Settings</a>
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
                <h1 className="text-lg font-semibold">Settings</h1>
              </div>
              <button className="bg-[#1A1A1A] text-white px-4 py-2 text-sm rounded-lg font-medium hover:bg-[#C45C3E] transition-colors">Save All Changes</button>
            </div>
            
            {/* Tabs */}
            <div className="px-6 lg:px-8 bg-white border-t border-gray-100 flex overflow-x-auto">
              {["theme", "shipping", "store"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                >
                  {tab === "theme" ? "Theme Settings" : tab === "shipping" ? "Shipping" : "Store Details"}
                </button>
              ))}
            </div>
          </header>

          {/* Content Area */}
          <main className="p-6 lg:p-8">
            
            {/* Theme Settings */}
            {activeTab === "theme" && (
              <div className="max-w-3xl space-y-8 animate-fade-in">
                {/* Branding */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold mb-6">Branding</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Logo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#C45C3E] transition-colors cursor-pointer bg-gray-50">
                        <img src="https://via.placeholder.com/160x40?text=SHOP.CO" alt="Logo" className="h-10 mx-auto mb-3 object-contain" />
                        <p className="text-sm text-gray-500">PNG, SVG (Max 2MB)</p>
                        <button className="mt-3 text-sm font-medium text-[#C45C3E] hover:underline">Upload New Logo</button>
                      </div>
                    </div>
                    {/* Favicon */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#C45C3E] transition-colors cursor-pointer bg-gray-50">
                        <img src="https://via.placeholder.com/32x32?text=S" alt="Favicon" className="w-8 h-8 mx-auto mb-3 rounded" />
                        <p className="text-sm text-gray-500">ICO, PNG (32x32px)</p>
                        <button className="mt-3 text-sm font-medium text-[#C45C3E] hover:underline">Upload Favicon</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold mb-6">Color Scheme</h3>
                  <div className="space-y-6">
                    {/* Primary Color */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Primary / Accent Color</p>
                        <p className="text-xs text-gray-400 mt-1">Used for buttons, links, and highlights</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="color-input-wrapper shadow-sm border rounded-lg overflow-hidden w-10 h-10">
                          <input type="color" id="primary-color" value={primaryColor} onChange={handleColorChange(setPrimaryColor)} className="w-12 h-12 cursor-pointer border-none" />
                        </div>
                        <input
                          type="text"
                          value={primaryColor}
                          onChange={handleHexInput(setPrimaryColor)}
                          className="form-input w-28 px-3 py-2 rounded-lg bg-gray-50 font-mono text-sm uppercase"
                        />
                      </div>
                    </div>

                    {/* Text Color */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                      <div>
                        <p className="font-medium text-sm">Text Color</p>
                        <p className="text-xs text-gray-400 mt-1">Main text and headings</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="color-input-wrapper shadow-sm border rounded-lg overflow-hidden w-10 h-10">
                          <input type="color" id="text-color" value={textColor} onChange={handleColorChange(setTextColor)} className="w-12 h-12 cursor-pointer border-none" />
                        </div>
                        <input
                          type="text"
                          value={textColor}
                          onChange={handleHexInput(setTextColor)}
                          className="form-input w-28 px-3 py-2 rounded-lg bg-gray-50 font-mono text-sm uppercase"
                        />
                      </div>
                    </div>

                    {/* Background Color */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                      <div>
                        <p className="font-medium text-sm">Background Color</p>
                        <p className="text-xs text-gray-400 mt-1">Main page background</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="color-input-wrapper shadow-sm border rounded-lg overflow-hidden w-10 h-10">
                          <input type="color" id="bg-color" value={bgColor} onChange={handleColorChange(setBgColor)} className="w-12 h-12 cursor-pointer border-none" />
                        </div>
                        <input
                          type="text"
                          value={bgColor}
                          onChange={handleHexInput(setBgColor)}
                          className="form-input w-28 px-3 py-2 rounded-lg bg-gray-50 font-mono text-sm uppercase"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Settings */}
            {activeTab === "shipping" && (
              <div className="max-w-4xl animate-fade-in">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div>
                      <h3 className="font-semibold">Shipping Rates</h3>
                      <p className="text-sm text-gray-500 mt-1">Configure shipping options for checkout</p>
                    </div>
                    <button className="bg-[#1A1A1A] text-white px-4 py-2 text-sm rounded-lg font-medium hover:bg-[#C45C3E] transition-colors">Add Rate</button>
                  </div>
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Condition</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Cost</th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shippingRates.map((rate) => (
                        <tr key={rate.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-sm">{rate.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{rate.condition}</td>
                          <td className="px-6 py-4 text-sm font-semibold">{rate.cost === 0 ? "Free" : `$${rate.cost.toFixed(2)}`}</td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-sm text-gray-500 hover:text-gray-700 mr-3 font-medium">Edit</button>
                            <button className="text-sm text-red-500 hover:text-red-700 font-medium">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Store Details */}
            {activeTab === "store" && (
              <div className="max-w-3xl animate-fade-in">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold mb-6">Store Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                      <input type="text" defaultValue="SHOP.CO" className="form-input w-full px-4 py-2.5 rounded-lg bg-gray-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                      <input type="email" defaultValue="support@shop.co" className="form-input w-full px-4 py-2.5 rounded-lg bg-gray-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea rows={3} className="form-input w-full px-4 py-2.5 rounded-lg bg-gray-50" defaultValue="123 Fashion Street, New York, NY 10001" />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default AppearanceSettings;