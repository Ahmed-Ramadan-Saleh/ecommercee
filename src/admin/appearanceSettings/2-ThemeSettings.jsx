import React from "react";

const ThemeSettings = ({
  handleHexInput,
  handleColorChange,
  setBgColor,
  bgColor,
  setTextColor,
  textColor,
  setPrimaryColor,
  primaryColor,
}) => {
  return (
    <div className="animate-fade-in">
      {/* Branding */}
      <div className="bg-surface rounded-xl border border-line p-4 sm:p-6 shadow-sm mb-8">
        <h3 className="font-semibold text-primary mb-6">Branding</h3>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Logo */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Store Logo
            </label>
            <div className="border-2 border-dashed border-line rounded-xl p-6 text-center hover:border-industrial-red transition-colors cursor-pointer bg-muted">
              <img
                src="https://via.placeholder.com/160x40?text=SHOP.CO"
                alt="Logo"
                className="h-10 mx-auto mb-3 object-contain filter dark:invert"
              />
              <p className="text-sm text-secondary">PNG, SVG (Max 2MB)</p>
              <button className="mt-3 text-sm font-medium text-industrial-red hover:underline">
                Upload New Logo
              </button>
            </div>
          </div>
          {/* Favicon */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Favicon
            </label>
            <div className="border-2 border-dashed border-line rounded-xl p-6 text-center hover:border-industrial-red transition-colors cursor-pointer bg-muted">
              <img
                src="https://via.placeholder.com/32x32?text=S"
                alt="Favicon"
                className="w-8 h-8 mx-auto mb-3 rounded"
              />
              <p className="text-sm text-secondary">ICO, PNG (32x32px)</p>
              <button className="mt-3 text-sm font-medium text-industrial-red hover:underline">
                Upload Favicon
              </button>
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
              <p className="font-medium text-sm text-primary">
                Primary / Accent Color
              </p>
              <p className="text-xs text-secondary mt-1">
                Used for buttons, links, and highlights
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="shadow-sm border border-line rounded-lg overflow-hidden w-10 h-10">
                <input
                  type="color"
                  id="primary-color"
                  value={primaryColor}
                  onChange={handleColorChange(setPrimaryColor)}
                  className="w-12 h-12 cursor-pointer border-none"
                />
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
              <p className="text-xs text-secondary mt-1">
                Main text and headings
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="shadow-sm border border-line rounded-lg overflow-hidden w-10 h-10">
                <input
                  type="color"
                  id="text-color"
                  value={textColor}
                  onChange={handleColorChange(setTextColor)}
                  className="w-12 h-12 cursor-pointer border-none"
                />
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
              <p className="font-medium text-sm text-primary">
                Background Color
              </p>
              <p className="text-xs text-secondary mt-1">
                Main page background
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="shadow-sm border border-line rounded-lg overflow-hidden w-10 h-10">
                <input
                  type="color"
                  id="bg-color"
                  value={bgColor}
                  onChange={handleColorChange(setBgColor)}
                  className="w-12 h-12 cursor-pointer border-none"
                />
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
  );
};

export default ThemeSettings;
