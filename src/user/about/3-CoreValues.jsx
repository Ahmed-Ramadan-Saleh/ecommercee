import React from "react";

const CoreValues = ({ coreValues }) => {
  return (
    <section className="py-16 lg:py-24 bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4 text-primary">
            Why Choose Us
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Our commitment to excellence is reflected in our core values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <div
              key={value.title}
              className="bg-surface p-8 rounded-2xl border border-line hover:shadow-xl transition-all duration-300 animate-fade-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-industrial-red/10 dark:bg-industrial-red/20 rounded-xl flex items-center justify-center mb-6 text-industrial-red group-hover:bg-industrial-red group-hover:text-white transition-colors">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={value.icon}
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-3 text-primary">
                {value.title}
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
