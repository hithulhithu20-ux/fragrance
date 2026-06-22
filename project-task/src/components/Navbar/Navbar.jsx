import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FiChevronDown,
  FiMenu,
  FiSearch,
  FiX,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiLogOut,
} from 'react-icons/fi';

export default function Navbar() {
  const {
    products = [],
    wishlist = [],
    searchQuery,
    setSearchQuery,
    user,
    searchFocused,
    setSearchFocused,
    addToCart,
    cartCount,
  } = useApp();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const searchContainerRef = useRef(null);

  const safeProducts = Array.isArray(products) ? products : [];

  const handleDropdownOpen = (type) => {
    setActiveDropdown(type);
  };

  const handleDropdownClose = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSearchFocused]);



  // SAFE SEARCH FILTER
  const filteredProducts = safeProducts.filter((item) => {
    const name = (
      item?.name ||
      item?.productName ||
      item?.ProductName ||
      ''
    ).toLowerCase();

    const brand = (
      item?.brand ||
      item?.brandName ||
      item?.BrandName ||
      ''
    ).toLowerCase();

    const type = (
      item?.type ||
      item?.category ||
      item?.productType ||
      ''
    ).toLowerCase();

    const query = searchQuery.toLowerCase();

    return (
      name.includes(query) ||
      brand.includes(query) ||
      type.includes(query)
    );
  });

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const getProductImage = (product) => {
    return (
      product?.image ||
      product?.imageUrl ||
      product?.productImage ||
      'https://via.placeholder.com/300x400?text=No+Image'
    );
  };

  const getProductName = (product) => {
    return (
      product?.name ||
      product?.productName ||
      product?.ProductName ||
      'Unknown Product'
    );
  };

  const getProductBrand = (product) => {
    return (
      product?.brand ||
      product?.brandName ||
      product?.BrandName ||
      'Unknown Brand'
    );
  };

  const getProductType = (product) => {
    return (
      product?.type ||
      product?.category ||
      product?.productType ||
      'Perfume'
    );
  };

  const getProductPrice = (product) => {
    return (
      product?.price ||
      product?.sellingPrice ||
      product?.mrp ||
      0
    );
  };

  return (
    <header className="relative w-full z-40 font-sans bg-[#E5E5E5] px-4 py-3 md:px-8 border-b border-neutral-300 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <div
          className="flex items-center select-none flex-shrink-0 cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        >
          <svg
            className="w-16 h-12 text-black"
            viewBox="0 0 100 64"
            fill="none"
          >
            <path
              d="M12 8H36C52 8 60 18 60 32C60 46 52 56 36 56H12V8Z"
              stroke="currentColor"
              strokeWidth="8"
            />
            <path
              d="M24 20H34C40 20 44 24 44 32C44 40 40 44 34 44H24V20Z"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              d="M72 18C66 12 56 12 50 18C42 26 42 38 50 46C56 52 66 52 72 46"
              stroke="currentColor"
              strokeWidth="8"
            />
          </svg>
        </div>

        {/* CENTER */}
        <div
          className="hidden lg:flex flex-col flex-1 max-w-3xl mx-8 border border-[#B8B8B8] rounded-xl p-2 bg-[#DCDCDC]/50 relative"
          onMouseLeave={handleDropdownClose}
        >
          {/* SEARCH */}
          <div
            className="relative w-full"
            ref={searchContainerRef}
          >
            <div className="relative flex items-center border border-[#B0B0B0] rounded-lg px-3 py-1.5 bg-[#E2E2E2]">
              <FiSearch
                className="text-neutral-500 mr-2"
                size={17}
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search For Perfumes"
                className="w-full bg-transparent text-sm text-neutral-800 placeholder-neutral-500 focus:outline-none"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchFocused(false);
                  }}
                >
                  <FiX size={16} />
                </button>
              )}
            </div>

            {/* SEARCH DROPDOWN */}
            {searchFocused && searchQuery && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-neutral-200 shadow-2xl rounded-lg max-h-80 overflow-y-auto z-50 py-2">
                {filteredProducts.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-neutral-500">
                    No fragrances found matching "{searchQuery}"
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-100">
                    {filteredProducts.map((product, index) => (
                      <div
                        key={product?.id || index}
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-neutral-50 transition-colors cursor-pointer"
                        onClick={() => setSearchFocused(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={getProductImage(product)}
                            alt={getProductName(product)}
                            className="w-8 h-10 object-cover border border-neutral-200 bg-white"
                          />

                          <div>
                            <h4 className="text-xs font-semibold text-neutral-800">
                              {getProductName(product)}
                            </h4>

                            <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
                              {getProductBrand(product)} •{' '}
                              {getProductType(product)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-semibold">
                            ${getProductPrice(product)}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                              setSearchFocused(false);
                            }}
                            className="px-2.5 py-1 bg-neutral-900 text-white text-[9px] font-bold uppercase"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* NAVIGATION */}
          <div className="w-full flex items-center justify-start space-x-7 px-2 pt-2.5 pb-0.5 text-[13.5px] font-semibold text-neutral-800">
            <div
              className="relative py-0.5"
              onMouseEnter={() => handleDropdownOpen('him')}
            >
              <button className="flex items-center space-x-1 hover:text-[#C5A880]">
                <span>For Him</span>
                <FiChevronDown size={14} />
              </button>
            </div>

            <div
              className="relative py-0.5"
              onMouseEnter={() => handleDropdownOpen('her')}
            >
              <button className="flex items-center space-x-1 hover:text-[#C5A880]">
                <span>For Her</span>
                <FiChevronDown size={14} />
              </button>
            </div>

            <div
              className="relative py-0.5"
              onMouseEnter={() => handleDropdownOpen('products')}
            >
              <button className="flex items-center space-x-1 hover:text-[#C5A880]">
                <span>Products</span>
                <FiChevronDown size={14} />
              </button>
            </div>

            <a href="#story">Story</a>
            <a href="#about">About</a>

            <span className="text-neutral-400 cursor-not-allowed">
              Help
            </span>
          </div>

          <NavDropdown
            type={activeDropdown}
            isOpen={activeDropdown !== null}
            onClose={handleDropdownClose}
            products={safeProducts}
            addToCart={addToCart}
          />
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex items-center text-neutral-800 flex-shrink-0">

          {user ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5">
                <div className="w-6 h-6 rounded-full bg-[#C5A880] text-white flex items-center justify-center text-[10px] font-bold">
                  {user.avatar}
                </div>

                <span className="text-[13px] font-semibold">
                  {user.name?.split(' ')[0]}
                </span>
              </div>

              <button >
                <FiLogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <button
                className="flex items-center"
              >
                <FiUser size={18} className="mr-1.5" />
                <span>Register</span>
              </button>

              <span className="px-3">|</span>

              <button >
                Sign In
              </button>
            </div>
          )}

          <span className="px-3">|</span>

          <button
            className="relative p-1"
          >
            <FiHeart size={20} />

            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C5A880] text-white text-[8px] rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <span className="px-3">|</span>

          <button
            className="relative p-1"
          >
            <FiShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* MOBILE */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            className="relative p-1.5"
          >
            <FiShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-black text-white text-[8px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button >
            <FiMenu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

function NavDropdown({
  type,
  isOpen,
  onClose,
  products = [],
  addToCart,
}) {
  if (!isOpen) return null;

  let filteredProducts = [];

  if (type === 'him') {
    filteredProducts = products.slice(0, 3);
  } else if (type === 'her') {
    filteredProducts = products.slice(3, 6);
  } else {
    filteredProducts = products.slice(0, 4);
  }

  return (
    <div
      className="absolute left-0 right-0 top-full mt-2.5 w-full bg-white shadow-2xl border border-neutral-200 rounded-xl py-6 px-8 z-40"
      onMouseLeave={onClose}
    >
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 grid grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product?.id || index}
              className="group flex flex-col justify-between p-2.5 hover:bg-neutral-50 rounded-lg"
            >
              <div className="flex space-x-3">
                <div className="w-14 h-18 flex-shrink-0 bg-white border border-neutral-100 rounded overflow-hidden">
                  <img
                    src={
                      product?.image ||
                      product?.imageUrl ||
                      product?.productImage ||
                      'https://via.placeholder.com/300x400?text=No+Image'
                    }
                    alt={
                      product?.name ||
                      product?.productName ||
                      'Product'
                    }
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-serif text-xs font-semibold">
                    {product?.name ||
                      product?.productName ||
                      'Unknown Product'}
                  </h4>

                  <p className="text-[9px] text-neutral-400 uppercase">
                    {product?.brand ||
                      product?.brandName ||
                      'Unknown Brand'}
                  </p>

                  <p className="text-xs font-semibold">
                    $
                    {product?.price ||
                      product?.sellingPrice ||
                      product?.mrp ||
                      0}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="mt-3 w-full py-1 border border-neutral-900 text-[9px] font-bold uppercase hover:bg-neutral-900 hover:text-white rounded"
              >
                Quick Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}