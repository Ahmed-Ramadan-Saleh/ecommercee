import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import TabsNavigation from "./1-TabsNavigation";
import ThemeSettings from "./2-ThemeSettings";
import ShippingSettings from "./3-ShippingSettings";
import StoreDetails from "./4-StoreDetails";

const AppearanceSettings = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState("theme");

  // Theme Settings State
  const [primaryColor, setPrimaryColor] = useState("#C45C3E");
  const [textColor, setTextColor] = useState("#1A1A1A");
  const [bgColor, setBgColor] = useState("#FAFAF7");

  // Shipping Data State
  const [shippingRates, setShippingRates] = useState([
    {
      id: 1,
      name: "Standard Shipping",
      condition: "5-7 Business Days",
      cost: 4.99,
    },
    {
      id: 2,
      name: "Express Shipping",
      condition: "2-3 Business Days",
      cost: 9.99,
    },
    {
      id: 3,
      name: "Next Day Delivery",
      condition: "1 Business Day",
      cost: 14.99,
    },
    {
      id: 4,
      name: "Free Standard Shipping",
      condition: "Orders over $100",
      cost: 0.0,
    },
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

      {/* Tabs Navigation */}
      <TabsNavigation setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Main Container - Centers content */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Theme Settings */}
        {activeTab === "theme" && (
          <ThemeSettings
            handleHexInput={handleHexInput}
            handleColorChange={handleColorChange}
            setBgColor={setBgColor}
            bgColor={bgColor}
            setTextColor={setTextColor}
            textColor={textColor}
            setPrimaryColor={setPrimaryColor}
            primaryColor={primaryColor}
          />
        )}

        {/* Shipping Settings */}
        {activeTab === "shipping" && (
<ShippingSettings shippingRates={shippingRates}/>
        )}

        {/* Store Details */}
        {activeTab === "store" && (
<StoreDetails/>
        )}
      </div>
    </>
  );
};

export default AppearanceSettings;
