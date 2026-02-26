import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./orderManagement.css"; // Assuming CSS is here

// --- Mock Data ---
const ORDERS_DATA = [
  {
    id: "#ORD-2024001",
    customer: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fashion Street, Apt 4B\nNew York, NY 10001\nUnited States",
    date: "Jan 25, 2024",
    amount: 355.00,
    status: "processing",
    items: [
      { name: "Gradient Graphic T-Shirt", variant: "White | Large", price: 145.00, qty: 1, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80" },
      { name: "Classic Fit Jeans", variant: "Blue | 32", price: 210.00, qty: 1, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&q=80" }
    ],
    payment: { method: "Visa", last4: "4242" }
  },
  {
    id: "#ORD-2024002",
    customer: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Style Ave\nLos Angeles, CA 90001",
    date: "Jan 24, 2024",
    amount: 145.00,
    status: "delivered",
    items: [
      { name: "Polo Shirt", variant: "Navy | M", price: 145.00, qty: 1, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&q=80" }
    ],
    payment: { method: "Mastercard", last4: "1234" }
  },
  {
    id: "#ORD-2024003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 (555) 321-4321",
    address: "789 Trend Blvd\nChicago, IL 60601",
    date: "Jan 24, 2024",
    amount: 890.50,
    status: "pending",
    items: [
      { name: "Leather Jacket", variant: "Black | L", price: 450.00, qty: 1, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&q=80" },
      { name: "Sneakers", variant: "White | 10", price: 220.50, qty: 2, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80" }
    ],
    payment: { method: "PayPal", last4: "" }
  },
  {
    id: "#ORD-2024004",
    customer: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 555-5555",
    address: "123 Fashion St\nMiami, FL 33101",
    date: "Jan 23, 2024",
    amount: 120.00,
    status: "shipped",
    items: [
      { name: "Summer Dress", variant: "Floral | S", price: 120.00, qty: 1, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100&q=80" }
    ],
    payment: { method: "Visa", last4: "5555" }
  },
  {
    id: "#ORD-2024005",
    customer: "Alex Brown",
    email: "alex@example.com",
    phone: "+1 (555) 111-2222",
    address: "999 Couture Lane\nSeattle, WA 98101",
    date: "Jan 22, 2024",
    amount: 450.00,
    status: "cancelled",
    items: [
      { name: "Suit Jacket", variant: "Grey | 42R", price: 450.00, qty: 1, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&q=80" }
    ],
    payment: { method: "Amex", last4: "3000" }
  },
];

// --- Helper Component ---
const StatusBadge = ({ status }) => {
  return <span className={`badge badge-${status}`}>{status}</span>;
};

const OrderManagement = () => {
  // --- State ---
  const [orders] = useState(ORDERS_DATA);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // --- Effects ---
  
  // Handle body scroll lock when panel is open
  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isPanelOpen]);

  // --- Handlers ---

  const openDetail = (order) => {
    setSelectedOrder(order);
    setIsPanelOpen(true);
  };

  const closePanel = () => setIsPanelOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Derived State: Filtered Orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate totals for the panel
  const subtotal = selectedOrder?.items.reduce((sum, item) => sum + (item.price * item.qty), 0) || 0;
  const shipping = 15.00;
  const discount = 20.00; // Mock discount

  return (
    <>
      <Helmet>
        <title>Order Management - SHOP.CO Admin</title>
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
            <a href="#" className="sidebar-link active"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>Orders</a>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>Customers</a>
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
                <h1 className="text-lg font-semibold">Orders</h1>
              </div>
              <button className="bg-[#1A1A1A] text-white px-4 py-2 text-sm rounded-lg font-medium hover:bg-[#C45C3E] transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                Export
              </button>
            </div>
            {/* Filters */}
            <div className="px-6 lg:px-8 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 max-w-xs">
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input
                  type="text"
                  placeholder="Search Order ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400"
                />
              </div>
              <input
                type="date"
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none text-gray-600"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none text-gray-600"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
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
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr
                          key={order.id}
                          onClick={() => openDetail(order)}
                          className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4 font-medium text-sm">{order.id}</td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium">{order.customer}</p>
                            <p className="text-xs text-gray-400">{order.email}</p>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 font-medium text-sm">${order.amount.toFixed(2)}</td>
                          <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-sm text-[#C45C3E] hover:underline font-medium">View Details</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-gray-500">No orders found.</td>
                      </tr>
                    )}
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

      {/* Order Detail Panel */}
      <div className={`slide-over-panel ${isPanelOpen ? "open" : ""}`}>
        {selectedOrder && (
          <div className="flex flex-col h-full">
            {/* Panel Header */}
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Order {selectedOrder.id}</h2>
                <button onClick={closePanel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{selectedOrder.date} at 10:30 AM</span>
                <StatusBadge status={selectedOrder.status} />
              </div>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Status Update Actions */}
              <div className="bg-gray-50 p-4 rounded-xl flex flex-wrap gap-3 items-center">
                <span className="text-sm font-medium text-gray-700">Update Status:</span>
                <div className="flex gap-2 flex-wrap">
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 hover:bg-gray-100">Processing</button>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1A1A1A] text-white hover:bg-[#C45C3E] transition-colors">Mark Shipped</button>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-600 text-white hover:bg-green-700">Mark Delivered</button>
                </div>
              </div>

              {/* Customer & Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Customer</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="font-semibold">{selectedOrder.customer}</p>
                    <p className="text-sm text-gray-500 mt-1">{selectedOrder.email}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Shipping Address</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-800 whitespace-pre-line">{selectedOrder.address}</p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Order Items</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex p-4 gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.variant}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">${item.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-400">x{item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Payment</h3>
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-900 rounded flex items-center justify-center text-white text-xs font-bold">
                      {selectedOrder.payment.method === 'Visa' ? 'VISA' : selectedOrder.payment.method.substring(0,4).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{selectedOrder.payment.method} ending in {selectedOrder.payment.last4 || '****'}</p>
                      <p className="text-xs text-gray-400">Paid on {selectedOrder.date}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Order Summary</h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Subtotal</span> <span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Shipping</span> <span>${shipping.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Discount</span> <span className="text-green-600">-${discount.toFixed(2)}</span></div>
                    <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-base">
                      <span>Total</span> <span>${(subtotal + shipping - discount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between sticky bottom-0">
              <button className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-white transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                Print Invoice
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg bg-[#1A1A1A] text-white hover:bg-[#C45C3E] transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={toggleSidebar} />
      )}
    </>
  );
};

export default OrderManagement;