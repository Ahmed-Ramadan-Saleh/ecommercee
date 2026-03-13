import React, { useEffect, useRef, useContext } from "react";
import { Helmet } from "react-helmet-async";
import DataContext from "../../Context/ThemeContext";
import Title from "./1-Title";
import StatsGrid from "./2-StatsGrid";
import TrafficChart from "./3-TrafficChart";
import LowStock from "./4-LowStock";
import RecentOrders from "./5-RecentOrders";

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
<Title/>

      {/* Stats Grid */}
<StatsGrid/>

      {/* Charts & Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Traffic Chart */}
        <TrafficChart chartRef={chartRef}/>

        {/* Low Stock Alerts */}
<LowStock LOW_STOCK_DATA={LOW_STOCK_DATA}/>
      </div>

      {/* Recent Orders - Responsive Table (Card Layout on Mobile) */}
<RecentOrders ORDERS_DATA={ORDERS_DATA} getStatusBadge={getStatusBadge}/>

    </>
  );
};

export default Dashboard;