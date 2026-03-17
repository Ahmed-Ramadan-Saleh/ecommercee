import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ActionBar from "./1-Action-Bar";
import TableSection from "./2-Table-Section";
import SlideOver from "./3-Slide-over";

// --- Helper Component ---
const StatusBadge = ({ stock }) => {
  if (stock === 0)
    return <span className="badge badge-danger">Out of Stock</span>;
  if (stock < 10) return <span className="badge badge-warning">Low Stock</span>;
  return <span className="badge badge-success">In Stock</span>;
};

const ProductManagement = () => {
  // --- State ---
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Gradient Graphic T-Shirt",
      sku: "SKU-TS-001",
      price: 145,
      discount: 0,
      category: "T-Shirts",
      style: "Casual",
      stock: 86,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80",
    },
    {
      id: 2,
      name: "Polo with Tipping Details",
      sku: "SKU-PL-002",
      price: 180,
      discount: 0,
      category: "Polo Shirts",
      style: "Smart Casual",
      stock: 45,
      image:
        "https://images.unsplash.com/photo-1625910513413-5fc4f64f0a28?w=100&q=80",
    },
    {
      id: 3,
      name: "Classic Fit Jeans",
      sku: "SKU-JN-003",
      price: 215,
      discount: 20,
      category: "Jeans",
      style: "Casual",
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&q=80",
    },
    {
      id: 4,
      name: "Premium Cotton Hoodie",
      sku: "SKU-HD-004",
      price: 195,
      discount: 0,
      category: "Hoodies",
      style: "Gym",
      stock: 0,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&q=80",
    },
    {
      id: 5,
      name: "Vertical Striped Shirt",
      sku: "SKU-SH-005",
      price: 212,
      discount: 15,
      category: "Shirts",
      style: "Formal",
      stock: 120,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&q=80",
    },
  ]);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Search/Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
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

  const openPanel = (isEdit = false, product = null) => {
    setEditMode(isEdit);
    setSelectedProduct(product);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    // Delay clearing product to allow animation to finish
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Derived State
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;

    let matchesStatus = true;
    if (statusFilter === "in_stock") matchesStatus = p.stock > 10;
    if (statusFilter === "low_stock")
      matchesStatus = p.stock > 0 && p.stock <= 10;
    if (statusFilter === "out_of_stock") matchesStatus = p.stock === 0;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      <Helmet>
        <title>Product Management - SHOP.CO Admin</title>
      </Helmet>

      {/* Action Bar */}
      <ActionBar
        openPanel={openPanel}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
        setCategoryFilter={setCategoryFilter}
        categoryFilter={categoryFilter}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Table Section - Card Layout on Mobile */}
      <TableSection
        filteredProducts={filteredProducts}
        StatusBadge={StatusBadge}
        openPanel={openPanel}
        deleteProduct={deleteProduct}
        TableSection={TableSection}
      />

      {/* Slide-over Overlay */}
      <SlideOver
        closePanel={closePanel}
        isPanelOpen={isPanelOpen}
        selectedProduct={selectedProduct}
        editMode={editMode}
      />
    </>
  );
};

export default ProductManagement;
