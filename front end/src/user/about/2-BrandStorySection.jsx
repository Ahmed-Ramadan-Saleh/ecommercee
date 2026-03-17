import React from "react";

const BrandStorySection = () => {
  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Composition */}
          <div className="relative animate-fade-up">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                alt="Fashion Store"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-2xl overflow-hidden shadow-xl z-20 border-4 border-white dark:border-gray-800">
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80"
                alt="Fabric Details"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Background */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-industrial-red/20 rounded-2xl z-0"></div>
          </div>

          {/* Text Content */}
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6 text-primary">
              Our Story
            </h2>
            <p className="text-secondary mb-4 leading-relaxed">
              Founded in 2020, SHOP.CO started as a small passion project by a
              group of fashion enthusiasts tired of the "fast fashion" cycle. We
              wanted to create a platform where quality, sustainability, and
              aesthetic meet.
            </p>
            <p className="text-secondary mb-6 leading-relaxed">
              Today, we partner with artisans and brands worldwide to bring you
              pieces that are not just clothes, but investments in style and
              sustainability. Every item in our collection is hand-picked to
              ensure it meets our strict standards for fabric quality, ethical
              production, and timeless design.
            </p>

            <div className="flex gap-8 mt-8 pt-8 border-t border-line">
              <div>
                <p className="font-display text-3xl font-bold text-industrial-red">
                  12K+
                </p>
                <p className="text-sm text-secondary mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-industrial-red">
                  200+
                </p>
                <p className="text-sm text-secondary mt-1">Global Brands</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-industrial-red">
                  15+
                </p>
                <p className="text-sm text-secondary mt-1">Countries Served</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;
