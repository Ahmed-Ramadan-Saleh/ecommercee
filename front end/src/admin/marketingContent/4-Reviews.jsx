import React from "react";

const Reviews = ({
  setReviewFilter,
  reviewFilter,
  reviews,
  filteredReviews,
  StarRating,
  approveReview,
  deleteReview,
}) => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        {/* Added flex-wrap for small screens */}
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "approved"].map((filter) => (
            <button
              key={filter}
              onClick={() => setReviewFilter(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
                reviewFilter === filter
                  ? "bg-industrial-dark text-white"
                  : "bg-surface border border-line text-secondary hover:bg-muted"
              }`}
            >
              {filter}{" "}
              {filter === "pending" &&
                `(${reviews.filter((r) => r.status === "pending").length})`}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {filteredReviews.map((r) => (
          <div
            key={r.id}
            className="bg-surface rounded-xl border border-line p-4 md:p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                  {r.user.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-primary">{r.user}</p>
                  <p className="text-xs text-secondary">
                    Reviewed {r.product} • {r.date}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 ml-2">
                <StarRating rating={r.rating} />
              </div>
            </div>
            <p className="text-primary text-sm mb-4">{r.text}</p>
            <div className="flex justify-end gap-3 border-t border-line pt-4">
              {r.status === "pending" && (
                <button
                  onClick={() => approveReview(r.id)}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => deleteReview(r.id)}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
