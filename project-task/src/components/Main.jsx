import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FiHeart, FiChevronDown } from 'react-icons/fi';

export default function Main({
  products = [],
  totalProductsCount,
  activeFilters = [],
  onRemoveFilter,
  sortOption = 'default',
  onSortChange,
  addToCart,
  toggleWishlist,
  wishlist = []
}) {
  const { currentPage, setCurrentPage, } = useApp();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  const sortLabels = {
    default: 'Default Sorting',
    priceHighLow: 'Price High To Low',
    priceLowHigh: 'Price Low To High',
    rating: 'Customer Rating',
    aToZ: 'A to Z',
    zToA: 'Z to A'
  };

  // Close sorting dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sortRef]);

  const handleSortSelect = (option) => {
    onSortChange(option);
    setIsSortOpen(false);
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Pagination calculations
  // const productsPerPage = 12;
  const totalPages = Math.ceil(totalProductsCount / 20);
  // const startIndex = (currentPage - 1) * 20;
  // const endIndex = startIndex + 20;
  //  const currentPageProducts = products.slice(startIndex, endIndex);
  const currentPageProducts = products;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const catalogElement = document.getElementById('fragrance-catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const renderStars = (rating) => {
    return (
      <span className="flex items-center text-[#C5A880] space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3.5 h-3.5 ${i < rating ? 'fill-current text-[#C5A880]' : 'text-neutral-200 fill-neutral-200'
              }`}
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
          </svg>
        ))}
      </span>
    );
  };

  const ProductCard = ({ product }) => {
    const hasDiscount = product.discount > 0;
    const inWishlist = isProductInWishlist(product.id);
    return (
      <div
        className="group bg-white rounded-2xl border border-neutral-200/60 p-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative flex flex-col justify-between"
      >
        {/* 1. Image Container */}
        <div className="aspect-[4/5] bg-[#ECECEC] rounded-xl flex items-center justify-center overflow-hidden relative p-4 group-hover:opacity-95 transition-all">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />

          {/* 20% off Tag (top-left) */}
          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-[#FFF9E6] text-[#B4966E] border border-[#F5EAD2] text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-sm">
              {product.discount}% off
            </span>
          )}

          {/* Wishlist Heart Icon (top-right) */}
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm border border-neutral-200/40 hover:scale-105 transition-all cursor-pointer"
            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <FiHeart
              size={15}
              className={`transition-colors duration-200 ${inWishlist ? 'fill-red-500 stroke-red-500 text-red-500' : 'text-neutral-500 hover:text-red-500'
                }`}
            />
          </button>
        </div>

        {/* 2. Rating & Details */}
        <div className="mt-3.5 space-y-1">
          {/* Rating stars & review count */}
          <div className="flex items-center space-x-1.5">
            {renderStars(product.rating)}
            <span className="text-[11px] text-neutral-400 font-semibold font-sans">
              ({product.reviews})
            </span>
          </div>

          {/* Title & Type */}
          <h4 className="font-serif text-sm font-semibold text-neutral-800 tracking-wide truncate">
            {product.name}
          </h4>
          <p className="text-[11.5px] text-neutral-400 font-semibold tracking-wide font-sans">
            {product.type}
          </p>
        </div>

        {/* 3. Pricing & Cart Action */}
        <div className="mt-2.5">
          {/* Price Row */}
          <div className="flex items-baseline text-left font-sans select-none">
            {hasDiscount ? (
              <>
                <span className="text-[12px] text-neutral-400 line-through mr-2 font-medium">
                  Đ {product.price.toFixed(2)}
                </span>
                <span className="text-sm font-extrabold text-neutral-800">
                  Đ {product.discountPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-sm font-extrabold text-neutral-800">
                Đ {product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="w-full mt-4 py-2 border border-neutral-300 rounded-full text-neutral-800 text-[11px] font-extrabold tracking-wider uppercase bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 cursor-pointer shadow-sm"
          >
            Add To Cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 space-y-6 font-sans text-left select-none">

      {/* HEADER SECTION: Title, Count, Active Tags, Sort Dropdown */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-100 pb-5 gap-4">

        {/* Left Side Info */}
        <div className="space-y-2">
          <h2 className="text-3xl font-serif text-neutral-800 tracking-wider">
            Fragrance
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {/* <span className="text-[12px] text-neutral-400 font-semibold uppercase tracking-wider">
              Showing {startIndex + 1} - {Math.min(endIndex, products.length)} Of {products.length} Items
            </span> */}

            {/* Active Pill Tags */}
            <div className="flex flex-wrap items-center gap-1.5 ml-2">
              {activeFilters.map((filter, index) => (
                <button
                  key={`${filter.type}-${index}`}
                  onClick={() => onRemoveFilter(filter)}
                  className="flex items-center space-x-1.5 px-3 py-1 border border-neutral-300 rounded-md text-[11px] font-bold text-neutral-600 hover:border-neutral-800 hover:text-neutral-800 bg-white transition-all shadow-sm"
                >
                  <span className="text-[9px] text-neutral-400">✕</span>
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Luxury Sorting Dropdown */}
        <div ref={sortRef} className="relative self-start md:self-auto z-30">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center justify-between w-52 px-4 py-2 bg-white border border-neutral-300 rounded-xl text-[12.5px] font-bold text-neutral-700 hover:border-neutral-800 transition-colors shadow-sm cursor-pointer"
          >
            <span>{sortLabels[sortOption]}</span>
            <FiChevronDown className={`ml-2 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} size={16} />
          </button>

          {/* Sorting Dropdown Options Overlay */}
          {isSortOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden py-1.5 animate-dropdownSlide">
              {Object.entries(sortLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => handleSortSelect(key)}
                  className={`w-full text-left px-4 py-2 text-[12.5px] transition-colors cursor-pointer ${sortOption === key
                      ? 'bg-neutral-50 text-[#C5A880] font-extrabold'
                      : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 font-medium'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* PRODUCT GRID & BANNER SECTION */}
      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200/50 p-12 text-center text-neutral-400 space-y-3">
          <svg className="w-12 h-12 mx-auto text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 15h8" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
          <p className="text-sm font-medium">No perfumes found matching your selected filters.</p>
          <button
            onClick={() => onRemoveFilter('all')}
            className="text-[11px] font-extrabold uppercase tracking-widest text-[#C5A880] underline hover:text-[#B4966E]"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">

          {/* Main Grid: Shows first 8 products (or all if < 8) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentPageProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Elegant Dilka Center Banner (Displayed on Page 1) */}
          {currentPage === 1 && (
            <div className="w-full rounded-[2.5rem] overflow-hidden shadow-lg border border-neutral-200/55 hover:shadow-xl transition-all duration-500 hover:scale-[1.005]">
              <img
                src="/dilka_center_banner.png"
                alt="Dilka Center Perfumes Collection"
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Bottom Grid: Shows remaining items (index 8 to 12) */}
          {currentPageProducts.length > 8 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentPageProducts.slice(8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* PAGINATION PANEL - Aligned to bottom-right exactly like screenshot */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 pt-6">
              {/* Left Arrow Chevron */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="w-9 h-9 border border-neutral-200 flex items-center justify-center font-bold text-xs text-neutral-400 hover:border-neutral-800 hover:text-neutral-800 disabled:opacity-30 disabled:hover:border-neutral-200 disabled:hover:text-neutral-400 transition-all rounded cursor-pointer bg-white"
              >
                &lt;
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 border flex items-center justify-center font-bold text-xs transition-all rounded cursor-pointer ${isActive
                        ? 'bg-black border-black text-white font-extrabold'
                        : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-800 hover:text-neutral-800'
                      }`}
                  >
                    {String(pageNum).padStart(2, '0')}
                  </button>
                );
              })}

              {/* Right Arrow Chevron */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="w-9 h-9 border border-neutral-200 flex items-center justify-center font-bold text-xs text-neutral-400 hover:border-neutral-800 hover:text-neutral-800 disabled:opacity-30 disabled:hover:border-neutral-200 disabled:hover:text-neutral-400 transition-all rounded cursor-pointer bg-white"
              >
                &gt;
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
