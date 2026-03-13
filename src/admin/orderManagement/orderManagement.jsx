import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import FiltersBar from "./1-Filters-Bar";
import TableSection from "./2-TableSection";
import SlideOver from "./3-Slide-over";

// --- Mock Data ---
const ORDERS_DATA = [
  {
    id: "#ORD-2024001",
    customer: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fashion Street, Apt 4B\nNew York, NY 10001\nUnited States",
    date: "Jan 25, 2024",
    amount: 355.0,
    status: "processing",
    items: [
      {
        name: "Gradient Graphic T-Shirt",
        variant: "White | Large",
        price: 145.0,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80",
      },
      {
        name: "Classic Fit Jeans",
        variant: "Blue | 32",
        price: 210.0,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&q=80",
      },
    ],
    payment: { method: "Visa", last4: "4242" },
  },
  {
    id: "#ORD-2024002",
    customer: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Style Ave\nLos Angeles, CA 90001",
    date: "Jan 24, 2024",
    amount: 145.0,
    status: "delivered",
    items: [
      {
        name: "Polo Shirt",
        variant: "Navy | M",
        price: 145.0,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&q=80",
      },
    ],
    payment: { method: "Mastercard", last4: "1234" },
  },
  {
    id: "#ORD-2024003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 (555) 321-4321",
    address: "789 Trend Blvd\nChicago, IL 60601",
    date: "Jan 24, 2024",
    amount: 890.5,
    status: "pending",
    items: [
      {
        name: "Leather Jacket",
        variant: "Black | L",
        price: 450.0,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&q=80",
      },
      {
        name: "Sneakers",
        variant: "White | 10",
        price: 220.5,
        qty: 2,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80",
      },
    ],
    payment: { method: "PayPal", last4: "" },
  },
  {
    id: "#ORD-2024004",
    customer: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 555-5555",
    address: "123 Fashion St\nMiami, FL 33101",
    date: "Jan 23, 2024",
    amount: 120.0,
    status: "shipped",
    items: [
      {
        name: "Summer Dress",
        variant: "Floral | S",
        price: 120.0,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100&q=80",
      },
    ],
    payment: { method: "Visa", last4: "5555" },
  },
  {
    id: "#ORD-2024005",
    customer: "Alex Brown",
    email: "alex@example.com",
    phone: "+1 (555) 111-2222",
    address: "999 Couture Lane\nSeattle, WA 98101",
    date: "Jan 22, 2024",
    amount: 450.0,
    status: "cancelled",
    items: [
      {
        name: "Suit Jacket",
        variant: "Grey | 42R",
        price: 450.0,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&q=80",
      },
    ],
    payment: { method: "Amex", last4: "3000" },
  },
];

// --- Helper Component ---
const StatusBadge = ({ status }) => {
  const statusMap = {
    delivered: "badge-success",
    shipped: "badge-success",
    processing: "badge-warning",
    pending: "badge-warning",
    cancelled: "badge-danger",
  };
  return (
    <span className={`badge ${statusMap[status] || "badge-inactive"}`}>
      {status}
    </span>
  );
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
    if (isPanelOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPanelOpen]);

  // --- Handlers ---
  const openDetail = (order) => {
    setSelectedOrder(order);
    setIsPanelOpen(true);
  };

  const closePanel = () => setIsPanelOpen(false);

  // Derived State
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const subtotal =
    selectedOrder?.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    ) || 0;
  const shipping = 15.0;
  const discount = 20.0;

  return (
    <>
      <Helmet>
        <title>Order Management - SHOP.CO Admin</title>
      </Helmet>

      {/* Filters Bar */}
      <FiltersBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Table Section */}
      <TableSection
        filteredOrders={filteredOrders}
        openDetail={openDetail}
        StatusBadge={StatusBadge}
        TableSection={TableSection}
      />

      {/* Slide-over Overlay */}
      <SlideOver
        StatusBadge={StatusBadge}
        selectedOrder={selectedOrder}
        discount={discount}
        shipping={shipping}
        subtotal={subtotal}
        closePanel={closePanel}
        isPanelOpen={isPanelOpen}
      />
    </>
  );
};

export default OrderManagement;
