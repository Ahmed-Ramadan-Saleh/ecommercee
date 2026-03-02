import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

// --- Mock Data ---
const CUSTOMERS_DATA = [
  { id: 1, name: "John Doe", initials: "JD", email: "john.doe@example.com", joined: "Jan 15, 2023", orders: 24, ltv: 4250.00, status: "active" },
  { id: 2, name: "Sarah Smith", initials: "SS", email: "sarah.smith@example.com", joined: "Feb 20, 2023", orders: 5, ltv: 890.50, status: "active" },
  { id: 3, name: "Mike Johnson", initials: "MJ", email: "mike.j@example.com", joined: "Mar 10, 2023", orders: 1, ltv: 145.00, status: "inactive" },
  { id: 4, name: "Emily Davis", initials: "ED", email: "emily.d@example.com", joined: "Apr 05, 2023", orders: 12, ltv: 1500.00, status: "active" },
  { id: 5, name: "Alex Brown", initials: "AB", email: "alex.b@example.com", joined: "May 12, 2023", orders: 8, ltv: 980.00, status: "active" },
];

const CustomerManagement = () => {
  // --- State ---
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Handlers ---

  const openDetail = (customer) => {
    setSelectedCustomer(customer);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    // Optional: delay clearing customer to allow close animation
    // setTimeout(() => setSelectedCustomer(null), 300);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Derived state for stats
  const aov = selectedCustomer ? (selectedCustomer.ltv / selectedCustomer.orders).toFixed(0) : 0;

  return (
    <>
      <Helmet>
        <title>Customer Management - SHOP.CO Admin</title>
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
            <a href="#" className="sidebar-link active"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>Customers</a>
            
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 mt-6">Settings</p>
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
                <h1 className="text-lg font-semibold">Customers</h1>
              </div>
            </div>
            {/* Filters */}
            <div className="px-6 lg:px-8 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 max-w-xs">
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input type="text" placeholder="Search customers..." className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400" />
              </div>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none text-gray-600">
                <option>All Time</option>
                <option>Last 30 Days</option>
              </select>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none text-gray-600">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
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
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Joined</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lifetime Value</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CUSTOMERS_DATA.map((c) => (
                      <tr 
                        key={c.id} 
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                        onClick={() => openDetail(c)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C45C3E] to-[#A84A30] flex items-center justify-center text-white text-sm font-bold">{c.initials}</div>
                            <div>
                              <p className="font-medium text-sm">{c.name}</p>
                              <p className="text-xs text-gray-400">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-500">{c.joined}</td>
                        <td className="px-6 py-4 text-sm font-medium">{c.orders}</td>
                        <td className="px-6 py-4 text-sm font-medium">${c.ltv.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`badge badge-${c.status}`}>{c.status}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-sm text-[#C45C3E] hover:underline font-medium">View Profile</button>
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

      {/* Customer Detail Panel */}
      <div className={`slide-over-panel ${isPanelOpen ? "open" : ""}`}>
        {selectedCustomer && (
          <div className="flex flex-col h-full">
            {/* Panel Header */}
            <div className="p-6 border-b border-gray-200 bg-gray-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C45C3E]/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C45C3E] to-[#A84A30] flex items-center justify-center text-white text-xl font-bold">
                    {selectedCustomer.initials}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{selectedCustomer.name}</h2>
                    <p className="text-sm text-gray-500">{selectedCustomer.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Customer since {selectedCustomer.joined.split(",")[0]}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white rounded-lg transition-colors relative z-10" onClick={closePanel}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100 text-center">
              <div className="py-4 px-2">
                <p className="text-xl font-bold">{selectedCustomer.orders}</p>
                <p className="text-xs text-gray-500">Total Orders</p>
              </div>
              <div className="py-4 px-2">
                <p className="text-xl font-bold text-[#C45C3E]">${selectedCustomer.ltv.toFixed(0)}</p>
                <p className="text-xs text-gray-500">Lifetime Value</p>
              </div>
              <div className="py-4 px-2">
                <p className="text-xl font-bold">${aov}</p>
                <p className="text-xs text-gray-500">Avg. Order Value</p>
              </div>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact Information</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span>123 Fashion St, New York, NY</span>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Orders</h3>
                  <a href="#" className="text-xs font-medium text-[#C45C3E] hover:underline">View All</a>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                  <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="font-mono text-sm">#ORD-2024001</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$355.00</p>
                      <p className="text-xs text-gray-400">Jan 25, 2024</p>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="font-mono text-sm">#ORD-2023012</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$180.00</p>
                      <p className="text-xs text-gray-400">Dec 15, 2023</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Written */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Recent Reviews</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                    <span className="text-xs text-gray-500">on "Gradient Graphic T-Shirt"</span>
                  </div>
                  <p className="text-sm text-gray-600">"Amazing quality! The fabric feels premium and the fit is perfect."</p>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
              <button className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-white transition-colors">Send Email</button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg bg-[#1A1A1A] text-white hover:bg-[#C45C3E] transition-colors">View Full Profile</button>
            </div>
          </div>
        )}
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

export default CustomerManagement;