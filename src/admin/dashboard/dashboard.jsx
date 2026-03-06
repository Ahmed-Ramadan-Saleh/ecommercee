import React, { useEffect, useRef, useContext } from "react";
import { Helmet } from "react-helmet-async";
import DataContext from "../../Context/ThemeContext";

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
  return <span className={`badge ${map[status] || 'badge-inactive'}`}>{status}</span>;
};

const Dashboard = () => {
  const { Theme } = useContext(DataContext);
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

    // Dynamic Colors based on Theme
    const isDark = Theme === 'dark';
    const gridColor = isDark ? '#2A2A2A' : '#E8E8E5';
    const textColor = isDark ? '#A1A1A1' : '#8A8A8A';
    const visitorsColor = isDark ? '#FFFFFF' : '#1A1A1A'; 
    const salesColor = '#C45C3E'; 

    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw labels
    ctx.fillStyle = textColor;
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
    drawLine(CHART_DATA.visitors, visitorsColor, true);
    // Draw sales (front layer)
    drawLine(CHART_DATA.sales, salesColor, true);

    // Draw points
    CHART_DATA.sales.forEach((val, i) => {
      const x = padding + (chartWidth / (CHART_DATA.sales.length - 1)) * i;
      const y = padding + chartHeight - (val / maxVal) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = salesColor;
      ctx.fill();
    });

  }, [Theme]); 

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - SHOP.CO</title>
      </Helmet>
      
      {/* Title */}
      <div className="mb-8 animate-fade-up">
        <h1 className="text-2xl font-bold text-primary">Dashboard Overview</h1>
        <p className="text-sm text-secondary mt-1">Track your store's performance and metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-surface rounded-xl border border-line p-6 shadow-sm animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-industrial-red/10 dark:bg-industrial-red/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-industrial-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
              12.5%
            </span>
          </div>
          <p className="text-sm text-secondary mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-primary">$45,231.89</p>
        </div>

        {/* Orders */}
        <div className="bg-surface rounded-xl border border-line p-6 shadow-sm animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
              8.2%
            </span>
          </div>
          <p className="text-sm text-secondary mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-primary">1,205</p>
        </div>

        {/* Visitors */}
        <div className="bg-surface rounded-xl border border-line p-6 shadow-sm animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <span className="flex items-center text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
              3.1%
            </span>
          </div>
          <p className="text-sm text-secondary mb-1">Total Visitors</p>
          <p className="text-2xl font-bold text-primary">45,231</p>
        </div>

        {/* Conversion */}
        <div className="bg-surface rounded-xl border border-line p-6 shadow-sm animate-fade-up" style={{ animationDelay: "0.25s" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
              1.2%
            </span>
          </div>
          <p className="text-sm text-secondary mb-1">Conversion Rate</p>
          <p className="text-2xl font-bold text-primary">2.67%</p>
        </div>
      </div>

      {/* Charts & Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-line p-4 md:p-6 shadow-sm animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-primary">Traffic Overview</h2>
              <p className="text-sm text-secondary">Visitors vs Sales (Last 7 days)</p>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-2 text-secondary">
                <span className="w-3 h-3 rounded-full bg-industrial-red"></span> Sales
              </span>
              <span className="flex items-center gap-2 text-secondary">
                <span className="w-3 h-3 rounded-full bg-gray-800 dark:bg-white"></span> Visitors
              </span>
            </div>
          </div>
          {/* Responsive Height: h-48 on mobile, h-64 on desktop */}
          <canvas ref={chartRef} id="traffic-chart" className="w-full h-48 md:h-64" />
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-surface rounded-xl border border-line p-4 md:p-6 shadow-sm animate-fade-up" style={{ animationDelay: "0.35s" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-primary">Low Stock Alerts</h2>
            <span className="text-xs font-medium bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">4 Items</span>
          </div>
          <div className="space-y-4">
            {LOW_STOCK_DATA.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-primary truncate">{item.name}</p>
                  <p className="text-xs text-secondary">{item.stock} items left</p>
                </div>
                <span className={`badge ${item.stock <= 3 ? 'badge-danger' : 'badge-warning'}`}>
                  {item.stock <= 3 ? 'Critical' : 'Low'}
                </span>
              </div>
            ))}
          </div>
          <a href="#" className="block text-center text-sm font-medium text-industrial-red hover:text-industrial-red-hover mt-6 pt-4 border-t border-line transition-colors">
            View All Products
          </a>
        </div>
      </div>

      {/* Recent Orders - Responsive Table (Card Layout on Mobile) */}
      <div className="bg-surface rounded-xl border border-line overflow-hidden shadow-sm animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-line">
          <h2 className="font-semibold text-primary">Recent Orders</h2>
          <a href="#" className="text-sm font-medium text-industrial-red hover:text-industrial-red-hover transition-colors">View All Orders</a>
        </div>
        
        {/* Table: Block on Mobile, Table on Desktop */}
        <table className="w-full">
          <thead className="hidden sm:table-header-group bg-muted text-xs font-semibold text-secondary uppercase tracking-wider">
            <tr>
              <th className="text-left px-6 py-3">Order ID</th>
              <th className="text-left px-6 py-3">Customer</th>
              <th className="text-left px-6 py-3">Products</th>
              <th className="text-left px-6 py-3">Amount</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-right px-6 py-3">Action</th>
            </tr>
          </thead>
          
          <tbody className="block sm:table-row-group divide-y sm:divide-y-0 divide-line">
            {ORDERS_DATA.map((order) => (
              <tr key={order.id} className="block sm:table-row hover:bg-muted/50 transition-colors last:border-0 p-4 sm:p-0 mb-4 sm:mb-0 border border-line sm:border-0 rounded-xl sm:rounded-none shadow-sm sm:shadow-none">
                
                {/* Order ID */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">Order ID</span>
                  <span className="font-medium text-primary">{order.id}</span>
                </td>

                {/* Customer */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                   <span className="sm:hidden text-xs font-medium text-secondary">Customer</span>
                   <div className="text-right sm:text-left">
                    <p className="text-sm font-medium text-primary">{order.customer}</p>
                    <p className="text-xs text-secondary">{order.email}</p>
                   </div>
                </td>

                {/* Products */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">Products</span>
                  <span className="text-secondary">{order.products}</span>
                </td>

                {/* Amount */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">Amount</span>
                  <span className="font-medium text-primary">${order.amount.toFixed(2)}</span>
                </td>

                {/* Status */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                  <span className="sm:hidden text-xs font-medium text-secondary">Status</span>
                  {getStatusBadge(order.status)}
                </td>

                {/* Action */}
                <td className="flex justify-end items-center pt-2 sm:table-cell sm:px-6 sm:py-4 text-right">
                  <button className="text-sm text-industrial-red hover:underline font-medium">View</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
};

export default Dashboard;