import React from 'react';

export default function Sidebar({
  categories = [],
  brandsList = [],
  selectedCategories = [],
  onToggleCategory,
  selectedRatings = [],
  onToggleRating,
  selectedBrands = [],
  onToggleBrand,
  includeOutOfStock = false,
  onToggleOutOfStock,
  onClearAll,
  outOfStockCount
}) {


  const renderStars = (count) => {
    return (
      <span className="flex items-center text-[#F1C40F] space-x-0.5 mr-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3.5 h-3.5 ${
              i < count ? 'fill-current text-[#C5A880]' : 'text-neutral-200 fill-neutral-200'
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
          </svg>
        ))}
      </span>
    );
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6 font-sans select-none text-left">
      
      {/* 1. FRAGRANCE CARD */}
      <div className="bg-white rounded-2xl border border-neutral-200/70 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[12px] font-extrabold tracking-wider text-neutral-800 uppercase">
            Fragrance
          </h3>
          <button
            onClick={onClearAll}
            className="text-[10px] text-neutral-400 hover:text-[#C5A880] transition-colors underline uppercase tracking-wider font-semibold"
          >
            Clear The Filter
          </button>
        </div>
        <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
          {categories.map((category) => {
            const isChecked = selectedCategories.includes(category.id);
            return (
              <label
                key={category.id}
                className="flex items-center space-x-3 text-[13.5px] font-semibold text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleCategory(category.id)}
                  className="w-4 h-4 rounded border-neutral-300 text-neutral-800 focus:ring-neutral-800 cursor-pointer accent-[#C5A880]"
                />
                <span>{category.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. FILTER BY RATING */}
      <div className="bg-white rounded-2xl border border-neutral-200/70 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] space-y-4">
        <h3 className="text-[12px] font-extrabold tracking-wider text-neutral-800 uppercase">
          Filter By Rating
        </h3>
        <div className="space-y-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const isChecked = selectedRatings.includes(rating);
            return (
              <label
                key={rating}
                className="flex items-center text-[13.5px] font-semibold text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleRating(rating)}
                  className="w-4 h-4 rounded border-neutral-300 text-neutral-800 focus:ring-neutral-800 cursor-pointer mr-3 accent-[#C5A880]"
                />
                {renderStars(rating)}
                <span className="text-[12px] text-neutral-400 font-medium">({rating} Star)</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. AVAILABILITY */}
      <div className="bg-white rounded-2xl border border-neutral-200/70 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] space-y-4">
        <h3 className="text-[12px] font-extrabold tracking-wider text-neutral-800 uppercase">
          Availability
        </h3>
        <div>
          <label className="flex items-center space-x-3 text-[13.5px] font-semibold text-neutral-600 hover:text-neutral-900 transition-colors py-1 cursor-pointer">
            <input
              type="checkbox"
              checked={includeOutOfStock}
              onChange={onToggleOutOfStock}
              className="w-4 h-4 rounded border-neutral-300 text-neutral-800 focus:ring-neutral-800 cursor-pointer accent-[#C5A880]"
            />
            <span>Include out of Stock({outOfStockCount})</span>
          </label>
        </div>
      </div>

      {/* 4. BRANDS */}
      <div className="bg-white rounded-2xl border border-neutral-200/70 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] space-y-4">
        <h3 className="text-[12px] font-extrabold tracking-wider text-neutral-800 uppercase">
          Brands
        </h3>
        <div className="space-y-1">
          {brandsList.map((brand) => {
            const isChecked = selectedBrands.includes(brand.id);
            return (
              <label
                key={brand.id}
                className="flex items-center space-x-3 text-[13.5px] font-semibold text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleBrand(brand.id)}
                  className="w-4 h-4 rounded border-neutral-300 text-neutral-800 focus:ring-neutral-800 cursor-pointer accent-[#C5A880]"
                />
                <span>{brand.name}</span>
              </label>
            );
          })}
        </div>
        <div className="pt-1.5 border-t border-neutral-100">
          <button
            onClick={() => alert("Showing all high-end fragrance houses!")}
            className="text-[11px] text-neutral-400 hover:text-[#C5A880] transition-colors font-bold uppercase tracking-wider"
          >
            View More +
          </button>
        </div>
      </div>

    </aside>
  );
}
