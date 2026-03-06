import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const AppearanceSettings = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState("theme");

  // Theme Settings State
  const [primaryColor, setPrimaryColor] = useState("#C45C3E");
  const [textColor, setTextColor] = useState("#1A1A1A");
  const [bgColor, setBgColor] = useState("#FAFAF7");

  // Shipping Data State
  const [shippingRates, setShippingRates] = useState([
    { id: 1, name: "Standard Shipping", condition: "5-7 Business Days", cost: 4.99 },
    { id: 2, name: "Express Shipping", condition: "2-3 Business Days", cost: 9.99 },
    { id: 3, name: "Next Day Delivery", condition: "1 Business Day", cost: 14.99 },
    { id: 4, name: "Free Standard Shipping", condition: "Orders over $100", cost: 0.00 },
  ]);

  // --- Handlers ---

  const handleColorChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleHexInput = (setter) => (e) => {
    let value = e.target.value;
    if (value && !value.startsWith("#")) {
      value = "#" + value;
    }
    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
      setter(value.toUpperCase());
    }
  };

  return (
    <>
      <Helmet>
        <title>Settings - SHOP.CO Admin</title>
      </Helmet>
      
      {/* Tabs Navigation - Scrolls on mobile if needed */}
      <div className="mb-6 border-b border-line overflow-x-auto">
        <nav className="-mb-px flex space-x-6 min-w-max" aria-label="Tabs">
          {[
            { id: "theme", label: "Theme Settings" },
            { id: "shipping", label: "Shipping" },
            { id: "store", label: "Store Details" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-industrial-red text-industrial-red"
                  : "border-transparent text-secondary hover:text-primary hover:border-line"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Container - Centers content */}
      <div className="max-w-4xl mx-auto space-y-8">
  
        {/* Theme Settings */}
        {activeTab === "theme" && (
          <div className="animate-fade-in">
            {/* Branding */}
            <div className="bg-surface rounded-xl border border-line p-4 sm:p-6 shadow-sm mb-8">
              <h3 className="font-semibold text-primary mb-6">Branding</h3>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {/* Logo */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Store Logo</label>
                  <div className="border-2 border-dashed border-line rounded-xl p-6 text-center hover:border-industrial-red transition-colors cursor-pointer bg-muted">
                    <img src="https://via.placeholder.com/160x40?text=SHOP.CO" alt="Logo" className="h-10 mx-auto mb-3 object-contain filter dark:invert" />
                    <p className="text-sm text-secondary">PNG, SVG (Max 2MB)</p>
                    <button className="mt-3 text-sm font-medium text-industrial-red hover:underline">Upload New Logo</button>
                  </div>
                </div>
                {/* Favicon */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Favicon</label>
                  <div className="border-2 border-dashed border-line rounded-xl p-6 text-center hover:border-industrial-red transition-colors cursor-pointer bg-muted">
                    <img src="https://via.placeholder.com/32x32?text=S" alt="Favicon" className="w-8 h-8 mx-auto mb-3 rounded" />
                    <p className="text-sm text-secondary">ICO, PNG (32x32px)</p>
                    <button className="mt-3 text-sm font-medium text-industrial-red hover:underline">Upload Favicon</button>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Colors */}
            <div className="bg-surface rounded-xl border border-line p-4 sm:p-6 shadow-sm">
              <h3 className="font-semibold text-primary mb-6">Color Scheme</h3>
              <div className="space-y-6">
                
                {/* Primary Color - Stacks on mobile */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="mb-2 md:mb-0">
                    <p className="font-medium text-sm text-primary">Primary / Accent Color</p>
                    <p className="text-xs text-secondary mt-1">Used for buttons, links, and highlights</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="shadow-sm border border-line rounded-lg overflow-hidden w-10 h-10">
                      <input type="color" id="primary-color" value={primaryColor} onChange={handleColorChange(setPrimaryColor)} className="w-12 h-12 cursor-pointer border-none" />
                    </div>
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={handleHexInput(setPrimaryColor)}
                      className="form-input w-24 sm:w-28 px-3 py-2 rounded-lg font-mono text-sm uppercase text-center"
                    />
                  </div>
                </div>
  
                {/* Text Color - Stacks on mobile */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-line pt-6">
                  <div className="mb-2 md:mb-0">
                    <p className="font-medium text-sm text-primary">Text Color</p>
                    <p className="text-xs text-secondary mt-1">Main text and headings</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="shadow-sm border border-line rounded-lg overflow-hidden w-10 h-10">
                      <input type="color" id="text-color" value={textColor} onChange={handleColorChange(setTextColor)} className="w-12 h-12 cursor-pointer border-none" />
                    </div>
                    <input
                      type="text"
                      value={textColor}
                      onChange={handleHexInput(setTextColor)}
                      className="form-input w-24 sm:w-28 px-3 py-2 rounded-lg font-mono text-sm uppercase text-center"
                    />
                  </div>
                </div>
  
                {/* Background Color - Stacks on mobile */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-line pt-6">
                  <div className="mb-2 md:mb-0">
                    <p className="font-medium text-sm text-primary">Background Color</p>
                    <p className="text-xs text-secondary mt-1">Main page background</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="shadow-sm border border-line rounded-lg overflow-hidden w-10 h-10">
                      <input type="color" id="bg-color" value={bgColor} onChange={handleColorChange(setBgColor)} className="w-12 h-12 cursor-pointer border-none" />
                    </div>
                    <input
                      type="text"
                      value={bgColor}
                      onChange={handleHexInput(setBgColor)}
                      className="form-input w-24 sm:w-28 px-3 py-2 rounded-lg font-mono text-sm uppercase text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
  
        {/* Shipping Settings */}
        {activeTab === "shipping" && (
          <div className="animate-fade-in">
            <div className="bg-surface rounded-xl border border-line overflow-hidden shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-line gap-4">
                <div>
                  <h3 className="font-semibold text-primary">Shipping Rates</h3>
                  <p className="text-sm text-secondary mt-1">Configure shipping options for checkout</p>
                </div>
                <button className="btn-primary px-4 py-2 text-sm rounded-lg font-medium w-full sm:w-auto">Add Rate</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">Name</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">Condition</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">Cost</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-secondary uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingRates.map((rate) => (
                      <tr key={rate.id} className="border-b border-line last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-sm text-primary">{rate.name}</td>
                        <td className="px-6 py-4 text-sm text-secondary">{rate.condition}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-primary">{rate.cost === 0 ? "Free" : `$${rate.cost.toFixed(2)}`}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-sm text-secondary hover:text-primary mr-3 font-medium transition-colors">Edit</button>
                          <button className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
  
        {/* Store Details */}
        {activeTab === "store" && (
          <div className="animate-fade-in">
            <div className="bg-surface rounded-xl border border-line p-4 sm:p-6 shadow-sm">
              <h3 className="font-semibold text-primary mb-6">Store Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Store Name</label>
                  <input type="text" defaultValue="SHOP.CO" className="form-input w-full px-4 py-3 rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Contact Email</label>
                  <input type="email" defaultValue="support@shop.co" className="form-input w-full px-4 py-3 rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Address</label>
                  <textarea rows={3} className="form-input w-full px-4 py-3 rounded-xl resize-none" defaultValue="123 Fashion Street, New York, NY 10001" />
                </div>
                <div className="pt-4">
                   <button className="btn-primary px-6 py-2 rounded-lg text-sm font-semibold w-full sm:w-auto">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        )}
  
      </div>
    </>
  );
};

export default AppearanceSettings;