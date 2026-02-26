import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import "./wishlist.css"; // Assuming you have a CSS file for specific animations if needed

const Wishlist = () => {
  // Mock Data State
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Gradient Graphic T-Shirt",
      price: 145,
      originalPrice: 160,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      color: "White",
      size: "Large",
      inStock: true,
    },
    {
      id: 2,
      name: "Classic Fit Jeans",
      price: 215,
      originalPrice: 240,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
      color: "Blue",
      size: "32",
      inStock: true,
    },
    {
      id: 3,
      name: "Premium Cotton Hoodie",
      price: 195,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
      color: "Black",
      size: "XL",
      inStock: false,
    },
    {
      id: 4,
      name: "Polo with Tipping Details",
      price: 180,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1625910513413-5fc4f64f0a28?w=400&q=80",
      color: "Navy",
      size: "M",
      inStock: true,
    },
  ]);

  // Handlers
  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const moveToCart = (item) => {
    console.log("Moving to cart:", item);
    // Add logic to add item to cart context/state here
    removeFromWishlist(item.id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <>
      <Helmet>
        <title>My Wishlist - SHOP.CO</title>
      </Helmet>
      
      <div className="bg-texture">


        {/* Breadcrumb */}
        <div className="bg-[#F0F0ED] py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center text-sm text-[#8A8A8A] mb-4" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-[#C45C3E] transition-colors">Home</Link>
              <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <span className="text-[#1A1A1A]">Wishlist</span>
            </nav>
            <div className="flex items-center justify-between">
              <h1 className="font-display text-3xl lg:text-4xl font-bold">
                My Wishlist
                <span className="text-gray-400 text-2xl lg:text-3xl font-normal ml-2">
                  ({wishlistItems.length} Items)
                </span>
              </h1>
              {wishlistItems.length > 0 && (
                <button 
                  onClick={clearWishlist}
                  className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors hidden sm:block"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {wishlistItems.length === 0 ? (
              // Empty State
              <div className="text-center py-16 lg:py-24 animate-fade-in">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-bold mb-2">Your wishlist is empty</h2>
                <p className="text-gray-500 mb-8">Save your favorite items so you can find them easily later.</p>
                <Link 
                  to="/category" 
                  className="btn-primary inline-flex px-8 py-3 rounded-full text-sm font-semibold"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              // Grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden group relative flex flex-col animate-fade-up"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square bg-[#F0F0ED] overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    
                      {/* Remove Button (Top Right) */}
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors z-10"
                        aria-label="Remove from wishlist"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Out of Stock Overlay */}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <Link to={`/detail/${item.id}`} className="block">
                        <h3 className="font-medium text-base mb-1 hover:text-[#C45C3E] transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                      </Link>
                      
                      <p className="text-xs text-gray-400 mb-2">
                        Color: <span className="text-gray-600">{item.color}</span> | Size: <span className="text-gray-600">{item.size}</span>
                      </p>

                      <div className="flex items-center gap-2 mb-4 mt-auto">
                        <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                        )}
                      </div>

                      <button 
                        onClick={() => moveToCart(item)}
                        disabled={!item.inStock}
                        className={`w-full py-3 rounded-full text-sm font-semibold transition-colors ${
                          item.inStock 
                          ? 'bg-[#1A1A1A] text-white hover:bg-[#C45C3E]' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {item.inStock ? 'Move to Cart' : 'Notify Me'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </>
  );
};

export default Wishlist;