import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Sidebar from './Sidebar';
import Main from './Main';

export default function Home() {
  const {
    products,
    cart,
    wishlist,
    searchQuery,
    addToCart,
    toggleWishlist,
    cartCount,
    currentPage,
    setCurrentPage,
    totalProducts,
    selectedCategories,
    selectedBrands,
    selectedRatings,
    sortOption,
    setSelectedCategories,
    setSelectedBrands,
    setSelectedRatings,
    setSortOption,
    allCategories,
    allBrands,
    filteredProducts
  } = useApp();


  // Initialise selectedCategories with empty array to view all products on initial load
  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [selectedRatings, setSelectedRatings] = useState([]);
  // const [selectedBrands, setSelectedBrands] = useState([]);
  //  const [sortOption, setSortOption] = useState('default');
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);




  // const categoriesList = [
  //   ...new Map(products.map(product => [product.categoryId,
  //   {
  //     id: product.categoryId,
  //     name: product.category
  //   }
  //   ])).values()];

  // const brandsList = [
  //   ...new Map(
  //     products.map(product => [
  //       product.brandId,
  //       {
  //         id: product.brandId,
  //         name: product.brand
  //       }
  //     ])
  //   ).values()
  // ];



  // Multi-select toggle helper functions
  const handleToggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };


  const handleToggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
    setCurrentPage(1);
  };

  const handleToggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const handleToggleOutOfStock = () => {
    setIncludeOutOfStock((prev) => !prev);
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedRatings([]);
    setSelectedBrands([]);
    setIncludeOutOfStock(false);
    setCurrentPage(1);
  };

  // Tag removal helper
  const handleRemoveFilter = (filter) => {
    if (filter === 'all') {
      handleClearAll();
      return;
    }
    if (filter.type === 'category') {
      setSelectedCategories((prev) => prev.filter((c) => c !== filter.value));
    } else if (filter.type === 'brand') {
      setSelectedBrands((prev) => prev.filter((b) => b !== filter.value));
    } else if (filter.type === 'rating') {
      setSelectedRatings((prev) => prev.filter((r) => r !== filter.value));
    } else if (filter.type === 'outOfStock') {
      setIncludeOutOfStock(false);
    }
    setCurrentPage(1);
  };

  // Compile active tags list to display in Main.jsx
  const activeFilters = [];
  selectedCategories.forEach((id) => {
  const category = allCategories.find(c => c.id === id);

  activeFilters.push({
    type: "category",
    value: id,
    label: category?.name || id
  });
});

  selectedBrands.forEach((brandId) => {
    const brand = allBrands.find(b => b.id === brandId);

    activeFilters.push({
      type: 'brand',
      value: brandId,
      label: brand?.name || brandId
    });
  });
  selectedRatings.forEach((rating) => {
    activeFilters.push({ type: 'rating', value: rating, label: `${rating} Star` });
  });
  if (includeOutOfStock) {
    activeFilters.push({ type: 'outOfStock', value: true, label: 'Include Out Of Stock' });
  }

  // Count out of stock items in the dataset
  const outOfStockCount = products.filter((p) => !p.inStock).length;



  let filteredProduct = filteredProducts.filter((product) => {
    if (!includeOutOfStock && !product.inStock) {
      return false;
    }

    return true;
  });


  

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 bg-[#F9F9F9] min-h-screen" id="fragrance-catalog">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT: Filter Sidebar */}
        <Sidebar
          categories={allCategories}
          brandsList={allBrands}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          selectedRatings={selectedRatings}
          onToggleRating={handleToggleRating}
          selectedBrands={selectedBrands}
          onToggleBrand={handleToggleBrand}
          includeOutOfStock={includeOutOfStock}
          onToggleOutOfStock={handleToggleOutOfStock}
          onClearAll={handleClearAll}
          outOfStockCount={outOfStockCount}
        />

        {/* RIGHT: Main Details Grid */}
        
        <Main
          products={filteredProduct}
          totalProductsCount={totalProducts}
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          sortOption={sortOption}
          onSortChange={setSortOption}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />

      </div>
    </div>
  );
}
