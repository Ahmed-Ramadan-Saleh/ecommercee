import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

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
  const statusMap = {
    delivered: "badge-success",
    shipped: "badge-success",
    processing: "badge-warning",
    pending: "badge-warning",
    cancelled: "badge-danger"
  };
  return <span className={`badge ${statusMap[status] || 'badge-inactive'}`}>{status}</span>;
};

const OrderManagement = () => {
  // --- State ---
  const [orders] = useState(ORDERS_DATA);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // --- Effects ---
  useEffect(() => {
    if (isPanelOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isPanelOpen]);

  // --- Handlers ---
  const openDetail = (order) => {
    setSelectedOrder(order);
    setIsPanelOpen(true);
  };

  const closePanel = () => setIsPanelOpen(false);

  // Derived State
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const subtotal = selectedOrder?.items.reduce((sum, item) => sum + (item.price * item.qty), 0) || 0;
  const shipping = 15.00;
  const discount = 20.00;

  return (
    <>
      <Helmet>
        <title>Order Management - SHOP.CO Admin</title>
      </Helmet>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input pl-10 pr-4 py-2 rounded-lg w-full"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-input px-4 py-2 rounded-lg w-full sm:w-40"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

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
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Order ID</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Customer</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Date</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Amount</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          {/* Body - Stacked on Mobile */}
          <tbody className="block sm:table-row-group divide-y sm:divide-y-0 divide-line">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="block sm:table-row hover:bg-muted/50 transition-colors cursor-pointer 
                             /* Card styling for mobile */
                             p-4 sm:p-0 mb-4 sm:mb-0 border border-line sm:border-0 rounded-xl sm:rounded-none shadow-sm sm:shadow-none"
                  onClick={() => openDetail(order)}
                >
                  
                  {/* Cell 1: Order ID */}
                  <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                    <span className="sm:hidden text-xs font-medium text-secondary">Order ID</span>
                    <span className="font-medium text-primary">{order.id}</span>
                  </td>

                  {/* Cell 2: Customer */}
                  <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                    <span className="sm:hidden text-xs font-medium text-secondary">Customer</span>
                    <div className="text-right sm:text-left">
                      <p className="text-sm font-medium text-primary">{order.customer}</p>
                      <p className="text-xs text-secondary">{order.email}</p>
                    </div>
                  </td>

                  {/* Cell 3: Date */}
                  <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                    <span className="sm:hidden text-xs font-medium text-secondary">Date</span>
                    <span className="text-secondary">{order.date}</span>
                  </td>

                  {/* Cell 4: Amount */}
                  <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                    <span className="sm:hidden text-xs font-medium text-secondary">Amount</span>
                    <span className="font-medium text-primary">${order.amount.toFixed(2)}</span>
                  </td>

                  {/* Cell 5: Status */}
                  <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                    <span className="sm:hidden text-xs font-medium text-secondary">Status</span>
                    <StatusBadge status={order.status} />
                  </td>

                  {/* Cell 6: Actions */}
                  <td className="flex justify-end items-center pt-2 sm:table-cell sm:px-6 sm:py-4 text-right">
                    <button className="text-sm text-industrial-red hover:underline font-medium">View Details</button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-12 text-secondary block">
                  No orders found matching your criteria.
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

      {/* Order Detail Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-surface shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {selectedOrder && (
          <div className="flex flex-col h-full">
            {/* Panel Header */}
            <div className="p-4 md:p-6 border-b border-line sticky top-0 bg-surface z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-primary">Order {selectedOrder.id}</h2>
                <button onClick={closePanel} className="p-2 hover:bg-muted rounded-lg transition-colors text-secondary hover:text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary">{selectedOrder.date} at 10:30 AM</span>
                <StatusBadge status={selectedOrder.status} />
              </div>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              {/* Status Update Actions */}
              <div className="bg-muted p-4 rounded-xl flex flex-wrap gap-3 items-center">
                <span className="text-sm font-medium text-primary w-full sm:w-auto">Update Status:</span>
                <div className="flex gap-2 flex-wrap">
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border border-line hover:bg-muted transition-colors text-primary">Processing</button>
                  <button className="btn-primary px-3 py-1.5 text-xs rounded-lg">Mark Shipped</button>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">Mark Delivered</button>
                </div>
              </div>

              {/* Customer & Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">Customer</h3>
                  <div className="bg-muted rounded-xl p-4">
                    <p className="font-semibold text-primary">{selectedOrder.customer}</p>
                    <p className="text-sm text-secondary mt-1">{selectedOrder.email}</p>
                    <p className="text-sm text-secondary">{selectedOrder.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">Shipping Address</h3>
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm text-primary whitespace-pre-line">{selectedOrder.address}</p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">Order Items</h3>
                <div className="border border-line rounded-xl overflow-hidden divide-y divide-line">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex p-4 gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-primary">{item.name}</p>
                        <p className="text-xs text-secondary">{item.variant}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm text-primary">${item.price.toFixed(2)}</p>
                        <p className="text-xs text-secondary">x{item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">Payment</h3>
                  <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-6 bg-industrial-dark rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {selectedOrder.payment.method === 'Visa' ? 'VISA' : selectedOrder.payment.method.substring(0,4).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">{selectedOrder.payment.method} ending in {selectedOrder.payment.last4 || '****'}</p>
                      <p className="text-xs text-secondary">Paid on {selectedOrder.date}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">Order Summary</h3>
                  <div className="bg-muted rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-secondary"><span>Subtotal</span> <span className="text-primary">${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-secondary"><span>Shipping</span> <span className="text-primary">${shipping.toFixed(2)}</span></div>
                    <div className="flex justify-between text-secondary"><span>Discount</span> <span className="text-green-600">-${discount.toFixed(2)}</span></div>
                    <div className="border-t border-line pt-2 mt-2 flex justify-between font-bold text-base">
                      <span className="text-primary">Total</span> <span className="text-primary">${(subtotal + shipping - discount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-4 border-t border-line bg-muted flex justify-between gap-3 sticky bottom-0">
              <button className="px-4 py-2 text-sm font-medium rounded-lg border border-line hover:bg-surface transition-colors flex items-center gap-2 text-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                <span className="hidden sm:inline">Print Invoice</span>
                <span className="sm:hidden">Print</span>
              </button>
              <button className="btn-primary px-4 py-2 text-sm rounded-lg flex-1 sm:flex-none text-center">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderManagement;