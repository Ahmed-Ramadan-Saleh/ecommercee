import React from "react";

const ProductDetail = ({
  toggleAccordion,
  isAdding,
  handleAddToCart,
  handleQuantity,
  quantity,
  selectedSize,
  SIZES,
  setSelectedColor,
  COLORS,
  selectedColor,
  StarRating,
  setMainImage,
  PRODUCT_IMAGES,
  mainImage,
  setSelectedSize,
  activeAccordion,
}) => {
  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4 animate-fade-up">
            <div className="aspect-square bg-muted rounded-3xl overflow-hidden relative">
              <img
                src={mainImage}
                alt="Product"
                className="w-full h-full object-cover cursor-zoom-in"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-industrial-red text-white text-sm font-medium rounded-full">
                -40%
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {PRODUCT_IMAGES.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square bg-muted rounded-xl overflow-hidden border-2 transition-colors ${mainImage === img ? "border-industrial-dark dark:border-white" : "border-transparent"}`}
                >
                  <img
                    src={img.replace("w=800", "w=200")}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div
            className="space-y-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2 text-primary">
                One Life Graphic T-Shirt
              </h1>
              <div className="flex items-center gap-3">
                <StarRating rating={4.5} />
                <span className="text-sm text-secondary">
                  4.5 (3.2k Reviews)
                </span>
                <span className="text-sm text-green-600 font-medium">
                  In Stock
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">$260</span>
              <span className="text-xl text-secondary line-through">$300</span>
              <span className="px-2 py-1 bg-industrial-red/10 text-industrial-red text-sm font-medium rounded">
                -40%
              </span>
            </div>

            <p className="text-secondary leading-relaxed">
              This graphic t-shirt turns heads with its bold "One Life" design.
              Made from premium 100% organic cotton for ultimate comfort and
              style. Perfect for casual outings or making a statement.
            </p>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-primary">Color</span>
                <span className="text-sm text-secondary">
                  {selectedColor.name}
                </span>
              </div>
              <div className="flex gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor.id === color.id ? "border-industrial-dark dark:border-white ring-2 ring-offset-2 ring-industrial-dark dark:ring-white" : "border-transparent"}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-primary">Size</span>
                <button className="text-sm text-industrial-red hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => size.available && setSelectedSize(size)}
                    disabled={!size.available}
                    className={`w-12 h-12 border rounded-lg font-medium text-sm transition-colors
                          ${selectedSize.id === size.id ? "bg-industrial-dark text-white border-industrial-dark" : "border-line hover:border-primary text-primary"}
                          ${!size.available ? "opacity-40 cursor-not-allowed line-through" : ""}`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border border-line rounded-full">
                <button
                  onClick={() => handleQuantity(-1)}
                  className="w-12 h-12 flex items-center justify-center rounded-l-full text-primary hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="w-12 text-center font-medium text-primary">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantity(1)}
                  className="w-12 h-12 flex items-center justify-center rounded-r-full text-primary hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`btn-primary flex-1 px-8 py-3 rounded-full font-semibold relative z-10 transition-colors ${isAdding ? "!bg-green-600" : ""}`}
              >
                {isAdding ? "Added!" : "Add to Cart"}
              </button>
            </div>

            {/* Info Cards */}
            <div className="space-y-3 pt-4 border-t border-line">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                <svg
                  className="w-6 h-6 text-industrial-red"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <div>
                  <p className="font-medium text-sm text-primary">
                    Free Shipping
                  </p>
                  <p className="text-xs text-secondary">On orders over $100</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Accordion */}
        <div className="mt-12 lg:mt-16 border-t border-line pt-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                id: "desc-content",
                title: "Product Details",
                content:
                  "Premium quality graphic t-shirt made from 100% organic cotton. Features a bold 'One Life' design printed with eco-friendly inks. Relaxed fit, true to size.",
              },
              {
                id: "ship-content",
                title: "Shipping Info",
                content:
                  "We offer fast and reliable shipping options. Standard delivery takes 3-5 business days. Express shipping available at checkout.",
              },
              {
                id: "return-content",
                title: "Returns",
                content:
                  "Not satisfied? No problem! We offer free returns within 30 days of purchase. Items must be unworn with tags attached.",
              },
            ].map((section) => (
              <div key={section.id} className="lg:col-span-1 reveal">
                <button
                  onClick={() => toggleAccordion(section.id)}
                  className="w-full flex items-center justify-between py-4 border-b border-line text-left"
                >
                  <span className="font-display text-xl font-semibold text-primary">
                    {section.title}
                  </span>
                  <svg
                    className={`w-5 h-5 text-primary transition-transform ${activeAccordion === section.id ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${activeAccordion === section.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="py-4 text-secondary">{section.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
