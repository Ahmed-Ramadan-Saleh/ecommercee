import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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
      
      <div className="bg-texture px-4">

        {/* Breadcrumb */}
        <div className="bg-muted dark:bg-gray-900 py-8 lg:py-12 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center text-sm text-secondary mb-4" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-industrial-red transition-colors">Home</Link>
              <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <span className="text-primary">Wishlist</span>
            </nav>
            <div className="flex items-center justify-between">
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-primary">
                My Wishlist
                <span className="text-secondary text-2xl lg:text-3xl font-normal ml-2">
                  ({wishlistItems.length} Items)
                </span>
              </h1>
              {wishlistItems.length > 0 && (
                <button 
                  onClick={clearWishlist}
                  className="text-sm font-medium text-secondary hover:text-red-500 transition-colors hidden sm:block"
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
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-bold mb-2 text-primary">Your wishlist is empty</h2>
                <p className="text-secondary mb-8">Save your favorite items so you can find them easily later.</p>
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
                    className="bg-surface rounded-2xl border border-line overflow-hidden group relative flex flex-col animate-fade-up shadow-sm"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square bg-muted overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    
                      {/* Remove Button (Top Right) */}
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-3 right-3 w-10 h-10 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-red-50 dark:hover:bg-red-900/30 text-secondary hover:text-red-500 transition-colors z-10"
                        aria-label="Remove from wishlist"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Out of Stock Overlay */}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-surface text-primary px-4 py-2 rounded-full text-sm font-semibold">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <Link to={`/detail/${item.id}`} className="block">
                        <h3 className="font-medium text-base mb-1 hover:text-industrial-red transition-colors line-clamp-1 text-primary">
                          {item.name}
                        </h3>
                      </Link>
                      
                      <p className="text-xs text-secondary mb-2">
                        Color: <span className="text-primary">{item.color}</span> | Size: <span className="text-primary">{item.size}</span>
                      </p>

                      <div className="flex items-center gap-2 mb-4 mt-auto">
                        <span className="font-bold text-lg text-primary">${item.price.toFixed(2)}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-secondary line-through">${item.originalPrice.toFixed(2)}</span>
                        )}
                      </div>

                      <button 
                        onClick={() => moveToCart(item)}
                        disabled={!item.inStock}
                        className={`w-full py-3 rounded-full text-sm font-semibold transition-colors ${
                          item.inStock 
                          ? 'bg-industrial-dark dark:bg-industrial-red text-white hover:opacity-90' 
                          : 'bg-muted text-secondary cursor-not-allowed'
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