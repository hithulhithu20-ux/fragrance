import React, { createContext, useState, useContext, useEffect } from 'react';
import useDebounce from "../hooks/useDebounce";
import api from '../hooks/api';

const AppContext = createContext();


export const AppProvider = ({ children }) => {
  // Pre-load the cart with 1 x "Oud de Prestige" to EXACTLY match the "1" badge in the reference image
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null); // Simulated active user state
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  // const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {

    const hasFilters =
      selectedCategories.length > 0 ||
      selectedBrands.length > 0 ||
      selectedRatings.length > 0 ||
      sortOption !== "default";

    if (hasFilters) return;
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/getProductMaster", {
          method: "GET",
          headers: {
            accept: "*/*",
            page: currentPage.toString(),
            pageSize: "20",
            productName: debouncedSearchQuery || "",
          },
        })

        const productArray = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [];

        const formattedProducts = productArray.map((item, index) => {
          let images = [];

          try {
            images =
              typeof item.images === "string"
                ? JSON.parse(item.images)
                : item.images || [];
          } catch {
            images = [];
          }

          const primaryImage =
            images.find((img) => img.isPrimary)?.imageUrl ||
            images[0]?.imageUrl ||
            "/no-image.png";


          return {
            id: item.productId || index + 1,

            name: item.productName || "No Name",

            brandId: item.brandID,

            brand: item.brandName || "Unknown Brand",

            categoryId: item.categoryId,

            category: item.categoryName || "General",

            type: item.productType || "Perfume",

            rating: Number(item.avgRating) || 0,

            reviews: Number(item.totalReviews) || 0,

            price: Number(item.price) || 0,

            discountPrice:
              Number(item.discountPrice) || Number(item.price) || 0,

            discount:
              item.price > 0 && item.discountPrice > 0
                ? Math.round(
                  ((item.price - item.discountPrice) / item.price) * 100
                )
                : 0,

            image: primaryImage,

            inStock: Number(item.stockQty) > 0,
          };
        });

        const categories = [
          ...new Map(
            productArray.map(item => [
              item.categoryId,
              {
                id: item.categoryId,
                name: item.categoryName || "General"
              }
            ])
          ).values()
        ];

        const brands = [
          ...new Map(
            productArray.map(item => [
              item.brandID,
              {
                id: item.brandID,
                name: item.brandName || "Unknown Brand"
              }
            ])
          ).values()
        ];


        setProducts(formattedProducts);
        // setAllProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
        setAllCategories(categories);
        setAllBrands(brands);

        // backend pagination info
        setTotalProducts(
          data.filterTotalCount ?? data.totalCount ?? 0
        );

      } catch (error) {
        console.error("Fetch Error:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [currentPage, debouncedSearchQuery]);


  useEffect(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.categoryId)
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brandId)
      );
    }

    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product =>
        product.rating >= Math.max(...selectedRatings)
      );
    }

    setFilteredProducts(filtered);

  }, [
    products,
    selectedCategories,
    selectedBrands,
    selectedRatings
  ]);


  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (sortOption === "default") {
        setProducts(filteredProducts);
        return;
      }

      try {
        const { data } = await api.post(
          "/api/getProductFilter",
          {
            brandIDs: selectedBrands.join(","),
            categoryIDs: selectedCategories.join(","),
            minPrice: 0,
            maxPrice: 0,
            pageNumber: currentPage,
            pageSize: 20,
            sortBy:
              sortOption === "priceLowHigh" ||
                sortOption === "priceHighLow"
                ? "price"
                : sortOption === "rating"
                  ? "rating"
                  : sortOption === "aToZ" || sortOption === "zToA"
                    ? "productName"
                    : "",

            sortType:
              sortOption === "priceLowHigh"
                ? "asc"
                : sortOption === "priceHighLow"
                  ? "desc"
                  : sortOption === "rating"
                    ? "desc"
                    : sortOption === "aToZ"
                      ? "asc"
                      : sortOption === "zToA"
                        ? "desc"
                        : "",

            ratingFilter:
              selectedRatings.length > 0
                ? Math.max(...selectedRatings)
                : 0,
          },
          {
            headers: {
              accept: "*/*",
            },
          }
        );


        const payload = {
          brandIDs: selectedBrands.join(","),
          categoryIDs: selectedCategories.join(","),
          minPrice: 0,
          maxPrice: 0,
          pageNumber: currentPage,
          pageSize: 20,
          sortBy: "",
          sortType: "",
          ratingFilter: 0
        };

        console.log("Filter Payload:", payload);



        const productArray = data.data || [];

        const formattedProducts = productArray.map((item, index) => {
          let images = [];

          try {
            images =
              typeof item.images === "string"
                ? JSON.parse(item.images)
                : item.images || [];
          } catch {
            images = [];
          }

          const primaryImage =
            images.find((img) => img.isPrimary)?.imageUrl ||
            images[0]?.imageUrl ||
            "/no-image.png";

          return {
            id: item.productId || index + 1,
            name: item.productName || "No Name",
            brandId: item.brandID,
            brand: item.brandName || "Unknown Brand",
            categoryId: item.categoryId,
            category: item.categoryName || "General",
            type: item.productType || "Perfume",
            rating: Number(item.avgRating) || 0,
            reviews: Number(item.totalReviews) || 0,
            price: Number(item.price) || 0,
            discountPrice:
              Number(item.discountPrice) ||
              Number(item.price) ||
              0,
            image: primaryImage,
            inStock: Number(item.stockQty) > 0,
          };
        });

        setProducts(formattedProducts);

        setTotalProducts(
          data.filterTotalCount ?? data.totalCount ?? 0
        );



      } catch (error) {
        console.error("Filter API Error:", error);
      }
    };

    fetchFilteredProducts();

  }, [
    sortOption,
    currentPage
  ]);


  // Cart operations
  const addToCart = (perfume) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === perfume.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === perfume.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...perfume, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQty = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Wishlist operations
  const toggleWishlist = (perfume) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === perfume.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== perfume.id);
      } else {
        return [...prevWishlist, perfume];
      }
    });
  };




  // Total cart items count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Total cart amount
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        totalProducts,
        products,
        cart,
        wishlist,
        searchQuery,
        setSearchQuery,
        user,
        searchFocused,
        setSearchFocused,
        currentPage,
        setCurrentPage,
        addToCart,
        removeFromCart,
        updateQty,
        toggleWishlist,
        cartCount,
        cartTotal,
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
        filteredProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
