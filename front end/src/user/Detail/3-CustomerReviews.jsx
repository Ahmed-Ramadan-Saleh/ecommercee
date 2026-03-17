import React from "react";

const CustomerReviews = ({ REVIEWS, StarRating }) => {
  return (
    <section className="py-12 lg:py-16 bg-muted dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 reveal">
          <div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-primary">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={4.5} className="w-5 h-5" />
              <span className="text-secondary">Based on 3,247 reviews</span>
            </div>
          </div>
          <button className="hidden sm:block btn-secondary px-6 py-2 rounded-full text-sm font-medium">
            Write a Review
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Review Stats */}
          <div className="md:col-span-1 bg-surface rounded-2xl p-6 reveal shadow-sm">
            <div className="text-center">
              <p className="font-display text-5xl font-bold text-primary">
                4.5
              </p>
              <div className="flex justify-center mt-2">
                <StarRating rating={4.5} />
              </div>
              <p className="text-sm text-secondary mt-2">3,247 reviews</p>
            </div>
          </div>

          {/* Review List */}
          <div className="md:col-span-3 space-y-4">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-surface rounded-2xl p-6 reveal shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-primary">
                          {review.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <StarRating
                            rating={review.rating}
                            className="w-3 h-3"
                          />
                          {review.verified && (
                            <span className="text-xs text-green-600 flex items-center gap-1">
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                              </svg>
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-secondary">
                        {review.date}
                      </span>
                    </div>
                    <h5 className="font-medium mt-3 text-primary">
                      {review.title}
                    </h5>
                    <p className="text-sm text-secondary mt-2 leading-relaxed">
                      {review.text}
                    </p>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-line">
                      <button className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
