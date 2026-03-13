import React from "react";
import { Link } from "react-router-dom";

const BrowsebyStyle = ({ STYLE_CATEGORIES }) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 reveal">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary">
            Browse by Dress Style
          </h2>
          <p className="text-secondary mt-2">Find your perfect look</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STYLE_CATEGORIES.map((category, index) => {
            const heights = [
              "aspect-[3/4]",
              "aspect-[4/5] lg:row-span-2",
              "aspect-[4/5] lg:row-span-2",
              "aspect-[3/4]",
            ];
            return (
              <Link
                to="/category"
                key={category.name}
                className={`${heights[index]} rounded-2xl overflow-hidden block reveal relative group`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 flex items-end p-6">
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrowsebyStyle;
