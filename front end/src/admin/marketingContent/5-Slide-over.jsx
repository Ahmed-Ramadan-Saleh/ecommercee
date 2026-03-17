import React from "react";

const SlideOver = ({ toggleCouponPanel, isCouponPanelOpen }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${isCouponPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleCouponPanel}
      />

      {/* Add Coupon Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-surface shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isCouponPanelOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-line">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">
                Create Promo Code
              </h2>
              <button
                onClick={toggleCouponPanel}
                className="p-2 hover:bg-muted rounded-lg transition-colors text-secondary hover:text-primary"
              >
                <svg
                  className="w-5 h-5"
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
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                toggleCouponPanel();
              }}
            >
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Code Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. SUMMER20"
                  className="form-input w-full px-4 py-3 rounded-lg uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Discount Type
                  </label>
                  <select className="form-input w-full px-4 py-3 rounded-lg">
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    placeholder="20"
                    className="form-input w-full px-4 py-3 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  className="form-input w-full px-4 py-3 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Usage Limit
                </label>
                <input
                  type="number"
                  placeholder="Leave blank for unlimited"
                  className="form-input w-full px-4 py-3 rounded-lg"
                />
              </div>
            </form>
          </div>
          <div className="p-6 border-t border-line bg-muted flex justify-end gap-3 sticky bottom-0">
            <button
              onClick={toggleCouponPanel}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-line hover:bg-surface transition-colors text-primary w-full sm:w-auto"
            >
              Cancel
            </button>
            <button className="btn-primary px-4 py-2 text-sm rounded-lg w-full sm:w-auto">
              Create Code
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideOver;
