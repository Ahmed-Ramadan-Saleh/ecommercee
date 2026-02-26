import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "./dashboard.css"; // Assuming CSS is here

// --- Data Constants ---
const ORDERS_DATA = [
  { id: '#ORD-2024012', customer: 'Sarah Johnson', email: 'sarah@email.com', products: 'T-Shirt, Jeans', amount: 189.00, status: 'Delivered' },
  { id: '#ORD-2024013', customer: 'Mike Peters', email: 'mike@email.com', products: 'Polo Shirt', amount: 89.00, status: 'Processing' },
  { id: '#ORD-2024014', customer: 'Emma Wilson', email: 'emma@email.com', products: 'Hoodie, Cap', amount: 145.00, status: 'Shipped' },
  { id: '#ORD-2024015', customer: 'James Brown', email: 'james@email.com', products: 'Sneakers', amount: 220.00, status: 'Pending' },
  { id: '#ORD-2024016', customer: 'Lisa Anderson', email: 'lisa@email.com', products: 'Dress, Belt', amount: 310.00, status: 'Cancelled' },
];

const LOW_STOCK_DATA = [
  { name: 'Gradient T-Shirt', stock: 3, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80' },
  { name: 'Classic Jeans', stock: 5, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&q=80' },
  { name: 'Summer Dress', stock: 2, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100&q=80' },
  { name: 'Leather Belt', stock: 8, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&q=80' },
];

const CHART_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  sales: [1200, 1900, 1500, 2100, 2400, 1800, 2200],
  visitors: [4500, 5200, 4800, 6100, 5500, 4900, 5800]
};

// --- Helper Functions ---
const getStatusBadge = (status) => {
  const map = {
    'Delivered': 'badge-success',
    'Shipped': 'badge-success',
    'Processing': 'badge-warning',
    'Pending': 'badge-warning',
    'Cancelled': 'badge-danger'
  };
  return <span className={`badge ${map[status] || 'badge-muted'}`}>{status}</span>;
};

const Dashboard = () => {
  // --- State ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chartRef = useRef(null);

  // --- Chart Drawing Logic ---
  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Find max value
    const maxVal = Math.max(...CHART_DATA.visitors) * 1.2;

    // Draw grid lines
    ctx.strokeStyle = '#F0F0ED';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw labels
    ctx.fillStyle = '#8A8A8A';
    ctx.font = '11px DM Sans';
    ctx.textAlign = 'center';
    CHART_DATA.labels.forEach((label, i) => {
      const x = padding + (chartWidth / (CHART_DATA.labels.length - 1)) * i;
      ctx.fillText(label, x, height - 10);
    });

    // Helper function to draw line
    const drawLine = (data, color, fill = false) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';

      data.forEach((val, i) => {
        const x = padding + (chartWidth / (data.length - 1)) * i;
        const y = padding + chartHeight - (val / maxVal) * chartHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      
      if (fill) {
        ctx.lineTo(width - padding, padding + chartHeight);
        ctx.lineTo(padding, padding + chartHeight);
        ctx.closePath();
        ctx.fillStyle = color + '15'; // Add opacity
        ctx.fill();
      }
      
      ctx.stroke();
    };

    // Draw visitors (back layer)
    drawLine(CHART_DATA.visitors, '#1A1A1A', true);
    // Draw sales (front layer)
    drawLine(CHART_DATA.sales, '#C45C3E', true);

    // Draw points
    CHART_DATA.sales.forEach((val, i) => {
      const x = padding + (chartWidth / (CHART_DATA.sales.length - 1)) * i;
      const y = padding + chartHeight - (val / maxVal) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#C45C3E';
      ctx.fill();
    });

    // Resize handler
    const handleResize = () => {
      // Simple debounce logic or re-draw
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.scale(dpr, dpr);
      // Re-draw logic would go here to update on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []); // Empty dependency array means this runs once on mount

  // --- Handlers ---
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - SHOP.CO</title>
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
            <a href="#" className="sidebar-link active"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>Dashboard</a>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>Orders</a>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>Products</a>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>Customers</a>
            
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 mt-6">Analytics</p>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>Reports</a>
            <a href="#" className="sidebar-link"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>Settings</a>
          </nav>
          
          {/* User Profile Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">AD</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@shop.co</p>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Logout">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 lg:px-8 h-16">
              <button className="lg:hidden p-2 -ml-2" onClick={toggleSidebar} aria-label="Toggle menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
              
              <div className="hidden lg:flex items-center text-sm">
                <span className="text-[#8A8A8A]">Admin</span>
                <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                <span className="font-medium">Dashboard</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none ml-2 text-sm w-48" aria-label="Search" />
                </div>
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Notifications">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#C45C3E] rounded-full"></span>
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6 lg:p-8">
            {/* Title */}
            <div className="mb-8 animate-fade-up">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-sm text-gray-500 mt-1">Track your store's performance and metrics</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Revenue */}
              <div className="stat-card bg-white rounded-xl border border-gray-200 p-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#C45C3E]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#C45C3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                    12.5%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold">$45,231.89</p>
              </div>

              {/* Orders */}
              <div className="stat-card bg-white rounded-xl border border-gray-200 p-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                  </div>
                  <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                    8.2%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                <p className="text-2xl font-bold">1,205</p>
              </div>

              {/* Visitors */}
              <div className="stat-card bg-white rounded-xl border border-gray-200 p-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <span className="flex items-center text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                    3.1%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">Total Visitors</p>
                <p className="text-2xl font-bold">45,231</p>
              </div>

              {/* Conversion */}
              <div className="stat-card bg-white rounded-xl border border-gray-200 p-6 animate-fade-up" style={{ animationDelay: "0.25s" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                  </div>
                  <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                    1.2%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold">2.67%</p>
              </div>
            </div>

            {/* Charts & Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Traffic Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-semibold text-gray-900">Traffic Overview</h2>
                    <p className="text-sm text-gray-500">Visitors vs Sales (Last 7 days)</p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#C45C3E]"></span> Sales
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#1A1A1A]"></span> Visitors
                    </span>
                  </div>
                </div>
                <canvas ref={chartRef} id="traffic-chart" />
              </div>

              {/* Low Stock Alerts */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-up" style={{ animationDelay: "0.35s" }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-gray-900">Low Stock Alerts</h2>
                  <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded-full">4 Items</span>
                </div>
                <div className="space-y-4">
                  {LOW_STOCK_DATA.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.stock} items left</p>
                      </div>
                      <span className={`badge ${item.stock <= 3 ? 'badge-danger' : 'badge-warning'}`}>
                        {item.stock <= 3 ? 'Critical' : 'Low'}
                      </span>
                    </div>
                  ))}
                </div>
                <a href="#" className="block text-center text-sm font-medium text-[#C45C3E] hover:text-[#A84A30] mt-6 pt-4 border-t border-gray-100 transition-colors">
                  View All Products
                </a>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Recent Orders</h2>
                <a href="#" className="text-sm font-medium text-[#C45C3E] hover:text-[#A84A30] transition-colors">View All Orders</a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-6 py-3">Order ID</th>
                      <th className="text-left px-6 py-3">Customer</th>
                      <th className="text-left px-6 py-3 hidden sm:table-cell">Products</th>
                      <th className="text-left px-6 py-3">Amount</th>
                      <th className="text-left px-6 py-3">Status</th>
                      <th className="text-right px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS_DATA.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0">
                        <td className="px-6 py-4 font-medium text-sm">{order.id}</td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium">{order.customer}</p>
                          <p className="text-xs text-gray-400">{order.email}</p>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell text-sm text-gray-600">{order.products}</td>
                        <td className="px-6 py-4 font-medium text-sm">${order.amount.toFixed(2)}</td>
                        <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-sm text-[#C45C3E] hover:underline font-medium">View</button>
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

      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Dashboard;