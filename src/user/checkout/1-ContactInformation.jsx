import React from "react";

const ContactInformation = ({ formData, handleInputChange }) => {
  return (
    <div className="bg-surface rounded-2xl border border-line p-6 shadow-sm animate-fade-up">
      <h2 className="font-display text-xl font-semibold mb-6 text-primary">
        Contact Information
      </h2>
      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="form-input w-full px-4 py-3 rounded-xl"
          placeholder="you@example.com"
        />
        <label className="block mt-4 text-sm font-medium text-primary mb-2">
          Telephone
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="form-input w-full px-4 py-3 rounded-xl"
          placeholder="you@example.com"
        />
      </div>
    </div>
  );
};

export default ContactInformation;
