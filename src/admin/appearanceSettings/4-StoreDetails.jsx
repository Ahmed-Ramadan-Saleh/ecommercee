import React from "react";

const StoreDetails = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-surface rounded-xl border border-line p-4 sm:p-6 shadow-sm">
        <h3 className="font-semibold text-primary mb-6">Store Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Store Name
            </label>
            <input
              type="text"
              defaultValue="SHOP.CO"
              className="form-input w-full px-4 py-3 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Contact Email
            </label>
            <input
              type="email"
              defaultValue="support@shop.co"
              className="form-input w-full px-4 py-3 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Address
            </label>
            <textarea
              rows={3}
              className="form-input w-full px-4 py-3 rounded-xl resize-none"
              defaultValue="123 Fashion Street, New York, NY 10001"
            />
          </div>
          <div className="pt-4">
            <button className="btn-primary px-6 py-2 rounded-lg text-sm font-semibold w-full sm:w-auto">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
