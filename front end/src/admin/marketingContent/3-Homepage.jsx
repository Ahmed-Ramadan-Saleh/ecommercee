import React from "react";

const Homepage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-surface rounded-xl border border-line p-4 md:p-6 shadow-sm">
        <h3 className="font-semibold text-primary mb-4">Hero Banner</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-muted rounded-lg p-4 text-center border-2 border-dashed border-line hover:border-industrial-red transition-colors cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"
              className="w-full h-48 object-cover rounded-md mb-3"
              alt="Hero"
            />
            <button className="text-sm font-medium text-industrial-red hover:underline">
              Change Image
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Headline
              </label>
              <input
                type="text"
                defaultValue="FIND CLOTHES THAT MATCHES YOUR STYLE"
                className="form-input w-full px-4 py-2 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Subtext
              </label>
              <textarea
                rows={2}
                className="form-input w-full px-4 py-2 rounded-lg text-sm resize-none"
                defaultValue="Browse through our curated collection..."
              />
            </div>
            <button className="btn-primary px-4 py-2 text-sm rounded-lg font-medium w-full sm:w-auto">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Product Selection */}
      <div className="bg-surface rounded-xl border border-line p-4 md:p-6 shadow-sm">
        <h3 className="font-semibold text-primary mb-4">Product Collections</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* New Arrivals */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              New Arrivals (Max 4)
            </label>
            <div className="border border-line rounded-lg p-3 space-y-2 bg-muted">
              <div className="flex justify-between items-center bg-surface p-2 rounded border border-line">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-muted rounded overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=50&q=80"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <span className="text-sm text-primary">Gradient T-Shirt</span>
                </div>
                <button className="text-secondary hover:text-red-500 transition-colors">
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <button className="w-full mt-2 py-2 border border-dashed border-line text-sm text-secondary hover:border-primary rounded transition-colors">
                + Add Product
              </button>
            </div>
          </div>
          {/* Top Selling */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Top Selling (Max 4)
            </label>
            <div className="border border-line rounded-lg p-3 space-y-2 bg-muted">
              <div className="flex justify-between items-center bg-surface p-2 rounded border border-line">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-muted rounded overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=50&q=80"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <span className="text-sm text-primary">
                    Essential Crew Tee
                  </span>
                </div>
                <button className="text-secondary hover:text-red-500 transition-colors">
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <button className="w-full mt-2 py-2 border border-dashed border-line text-sm text-secondary hover:border-primary rounded transition-colors">
                + Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
