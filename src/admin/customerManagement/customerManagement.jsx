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

  // --- Handlers ---
  const openDetail = (customer) => {
    setSelectedCustomer(customer);
    setIsPanelOpen(true);
  };

  const closePanel = () => setIsPanelOpen(false);

  const aov = selectedCustomer ? (selectedCustomer.ltv / selectedCustomer.orders).toFixed(0) : 0;

  return (
    <>
      <Helmet>
        <title>Customer Management - SHOP.CO Admin</title>
      </Helmet>
      
      {/* Table Section */}
      <div className="bg-surface rounded-xl border border-line overflow-hidden shadow-sm">
        
        {/* 
           Responsive Table Strategy:
           1. Mobile (< sm): 'block' display turns table into a stack of cards.
           2. Desktop (>= sm): 'table' display shows standard table.
        */}
        <table className="w-full">
          
          {/* Desktop Header - Hidden on Mobile */}
          <thead className="hidden sm:table-header-group bg-muted border-b border-line">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Customer</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Joined</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Orders</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Lifetime Value</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          {/* Body - Stacked on Mobile */}
          <tbody className="block sm:table-row-group divide-y sm:divide-y-0 divide-line">
            {CUSTOMERS_DATA.map((c) => (
              <tr 
                key={c.id} 
                className="block sm:table-row hover:bg-muted/50 transition-colors cursor-pointer 
                           /* Card styling for mobile */
                           p-4 sm:p-0 mb-4 sm:mb-0 border border-line sm:border-0 rounded-xl sm:rounded-none shadow-sm sm:shadow-none bg-surface"
                onClick={() => openDetail(c)}
              >
                
                {/* Cell 1: Customer (Spans full width on mobile) */}
                <td className="block sm:table-cell pb-3 sm:pb-0 sm:px-6 sm:py-4 w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-industrial-red to-[#A84A30] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{c.initials}</div>
                    <div>
                      <p className="font-medium text-sm text-primary">{c.name}</p>
                      <p className="text-xs text-secondary">{c.email}</p>
                    </div>
                  </div>
                </td>

                {/* Cell 2: Joined (Flex row on mobile: Label - Value) */}
                <td className="flex justify-between items-center py-2 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">Joined</span>
                  <span className="text-primary">{c.joined}</span>
                </td>

                {/* Cell 3: Orders */}
                <td className="flex justify-between items-center py-2 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">Orders</span>
                  <span className="font-medium text-primary">{c.orders}</span>
                </td>

                {/* Cell 4: LTV */}
                <td className="flex justify-between items-center py-2 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">LTV</span>
                  <span className="font-semibold text-primary">${c.ltv.toFixed(2)}</span>
                </td>

                {/* Cell 5: Status */}
                <td className="flex justify-between items-center py-2 sm:table-cell sm:px-6 sm:py-4">
                  <span className="sm:hidden text-xs font-medium text-secondary">Status</span>
                  <span className={`badge ${c.status === 'active' ? 'badge-success' : 'badge-inactive'}`}>
                    {c.status}
                  </span>
                </td>

                {/* Cell 6: Actions */}
                <td className="flex justify-end items-center pt-3 sm:pt-0 sm:table-cell sm:px-6 sm:py-4 text-right">
                  <button className="text-sm text-industrial-red hover:underline font-medium">View Profile</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slide-over Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${isPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closePanel}
      />

      {/* Customer Detail Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-surface shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {selectedCustomer && (
          <div className="flex flex-col h-full">
            {/* Panel Header */}
            <div className="p-4 md:p-6 border-b border-line bg-muted relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-industrial-red/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-industrial-red to-[#A84A30] flex items-center justify-center text-white text-lg md:text-xl font-bold">
                    {selectedCustomer.initials}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-primary">{selectedCustomer.name}</h2>
                    <p className="text-sm text-secondary">{selectedCustomer.email}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-surface rounded-lg transition-colors relative z-10 text-secondary hover:text-primary" onClick={closePanel}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 divide-x divide-line border-b border-line text-center">
              <div className="py-3 md:py-4 px-2">
                <p className="text-lg md:text-xl font-bold text-primary">{selectedCustomer.orders}</p>
                <p className="text-[10px] md:text-xs text-secondary">Total Orders</p>
              </div>
              <div className="py-3 md:py-4 px-2">
                <p className="text-lg md:text-xl font-bold text-industrial-red">${selectedCustomer.ltv.toFixed(0)}</p>
                <p className="text-[10px] md:text-xs text-secondary">Lifetime Value</p>
              </div>
              <div className="py-3 md:py-4 px-2">
                <p className="text-lg md:text-xl font-bold text-primary">${aov}</p>
                <p className="text-[10px] md:text-xs text-secondary">Avg. Order Value</p>
              </div>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">Contact Information</h3>
                <div className="bg-muted rounded-xl p-4 space-y-3 text-sm text-primary">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <span className="break-all">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span>123 Fashion St, New York, NY</span>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider">Recent Orders</h3>
                  <a href="#" className="text-xs font-medium text-industrial-red hover:underline">View All</a>
                </div>
                <div className="border border-line rounded-xl overflow-hidden divide-y divide-line">
                  <div className="p-3 flex items-center justify-between hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="font-mono text-sm text-primary">#ORD-2024001</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">$355.00</p>
                      <p className="text-xs text-secondary">Jan 25, 2024</p>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="font-mono text-sm text-primary">#ORD-2023012</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">$180.00</p>
                      <p className="text-xs text-secondary">Dec 15, 2023</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Written */}
              <div>
                <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">Recent Reviews</h3>
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                    <span className="text-xs text-secondary">on "Gradient Graphic T-Shirt"</span>
                  </div>
                  <p className="text-sm text-primary">"Amazing quality! The fabric feels premium and the fit is perfect."</p>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-4 border-t border-line bg-muted flex justify-end gap-3 sticky bottom-0">
              <button className="px-4 py-2 text-sm font-medium rounded-lg border border-line hover:bg-surface transition-colors text-primary">Send Email</button>
              <button className="btn-primary px-4 py-2 text-sm rounded-lg">View Full Profile</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerManagement;