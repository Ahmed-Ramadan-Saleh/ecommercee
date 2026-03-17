import React from "react";

const TabsNavigation = ({setActiveTab, activeTab}) => {
  return (
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
  );
};

export default TabsNavigation;
