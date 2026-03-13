import React from "react";

const ShippingAddress = ({ handleInputChange, formData }) => {
  return (
    <div
      className="bg-surface rounded-2xl border border-line p-6 shadow-sm animate-fade-up"
      style={{ animationDelay: "0.1s" }}
    >
      <h2 className="font-display text-xl font-semibold mb-6 text-primary">
        Shipping Address
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="form-input w-full px-4 py-3 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="form-input w-full px-4 py-3 rounded-xl"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-primary mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="form-input w-full px-4 py-3 rounded-xl"
            placeholder="Street and Number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="form-input w-full px-4 py-3 rounded-xl"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="form-input w-full px-4 py-3 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              ZIP
            </label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              required
              className="form-input w-full px-4 py-3 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
