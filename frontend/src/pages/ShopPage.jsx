// src/pages/Shop.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ChevronRight, 
  Star, 
  SlidersHorizontal,
  X,
  Filter,
  ChevronDown,
  Check,
  ShoppingCart,
  Heart,
  Eye,
  Grid3x3,
  List,
  TrendingUp,
  Clock,
  DollarSign,
  Star as StarIcon,
  Package,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [selectedRating, setSelectedRating] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  // Filter options data
  const categories = [
    { name: 'Electronics', count: 2345, icon: '📱' },
    { name: 'Fashion', count: 5678, icon: '👕' },
    { name: 'Home & Living', count: 1234, icon: '🏠' },
    { name: 'Books', count: 3456, icon: '📚' },
    { name: 'Sports', count: 890, icon: '⚽' },
    { name: 'Gaming', count: 456, icon: '🎮' },
    { name: 'Audio', count: 789, icon: '🎧' },
    { name: 'Accessories', count: 2345, icon: '💎' }
  ];

  const brands = [
    'Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'LG', 'Bose', 'Dyson'
  ];

  const ratings = [5, 4, 3, 2, 1];

  // All products data
  const allProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 159999,
      originalPrice: 169999,
      rating: 4.9,
      reviews: 3456,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
      category: "Electronics",
      inStock: true,
      onSale: true,
      discount: 6,
      isNew: true
    },
    {
      id: 2,
      name: "Sony WH-1000XM5",
      brand: "Sony",
      price: 24999,
      originalPrice: 39999,
      rating: 4.8,
      reviews: 2341,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
      category: "Audio",
      inStock: true,
      onSale: true,
      discount: 38,
      isNew: false
    },
    {
      id: 3,
      name: "Nike Air Max Pulse",
      brand: "Nike",
      price: 11999,
      originalPrice: 15999,
      rating: 4.7,
      reviews: 4567,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      category: "Fashion",
      inStock: true,
      onSale: true,
      discount: 25,
      isNew: true
    },
    {
      id: 4,
      name: "MacBook Pro M3",
      brand: "Apple",
      price: 199999,
      originalPrice: 219999,
      rating: 4.9,
      reviews: 2345,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      category: "Electronics",
      inStock: true,
      onSale: false,
      discount: 0,
      isNew: true
    },
    {
      id: 5,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      price: 139999,
      originalPrice: 149999,
      rating: 4.7,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
      category: "Electronics",
      inStock: true,
      onSale: false,
      discount: 0,
      isNew: true
    },
    {
      id: 6,
      name: "LG OLED C3 65\"",
      brand: "LG",
      price: 189999,
      originalPrice: 229999,
      rating: 4.8,
      reviews: 3456,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      category: "Electronics",
      inStock: false,
      onSale: true,
      discount: 17,
      isNew: false
    },
    {
      id: 7,
      name: "Adidas Ultraboost",
      brand: "Adidas",
      price: 13999,
      originalPrice: 18999,
      rating: 4.8,
      reviews: 7890,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
      category: "Fashion",
      inStock: true,
      onSale: true,
      discount: 26,
      isNew: false
    },
    {
      id: 8,
      name: "Bose QuietComfort",
      brand: "Bose",
      price: 22999,
      originalPrice: 29999,
      rating: 4.9,
      reviews: 5678,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      category: "Audio",
      inStock: true,
      onSale: false,
      discount: 0,
      isNew: false
    },
    {
      id: 9,
      name: "Dyson V15 Detect",
      brand: "Dyson",
      price: 54999,
      originalPrice: 74999,
      rating: 4.9,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400",
      category: "Home & Living",
      inStock: true,
      onSale: true,
      discount: 27,
      isNew: false
    },
    {
      id: 10,
      name: "The Psychology of Money",
      brand: "Publisher",
      price: 499,
      originalPrice: 799,
      rating: 4.8,
      reviews: 12345,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
      category: "Books",
      inStock: true,
      onSale: true,
      discount: 38,
      isNew: false
    },
    {
      id: 11,
      name: "PS5 Console",
      brand: "Sony",
      price: 54999,
      originalPrice: 59999,
      rating: 4.9,
      reviews: 8765,
      image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400",
      category: "Gaming",
      inStock: false,
      onSale: false,
      discount: 0,
      isNew: true
    },
    {
      id: 12,
      name: "Apple Watch Series 9",
      brand: "Apple",
      price: 45999,
      originalPrice: 59999,
      rating: 4.8,
      reviews: 3452,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
      category: "Accessories",
      inStock: true,
      onSale: true,
      discount: 23,
      isNew: true
    }
  ];

  // Filter products based on selections
  const filteredProducts = allProducts.filter(product => {
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    
    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    
    // Price filter
    if (product.price < priceRange.min || product.price > priceRange.max) {
      return false;
    }
    
    // Rating filter
    if (selectedRating && product.rating < selectedRating) {
      return false;
    }
    
    // Stock filter
    if (inStockOnly && !product.inStock) {
      return false;
    }
    
    // On sale filter
    if (onSaleOnly && !product.onSale) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  // Get filter counts
  const getFilterCount = () => {
    let count = 0;
    if (selectedCategories.length) count += selectedCategories.length;
    if (selectedBrands.length) count += selectedBrands.length;
    if (selectedRating) count++;
    if (inStockOnly) count++;
    if (onSaleOnly) count++;
    if (priceRange.min > 0 || priceRange.max < 200000) count++;
    return count;
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 200000 });
    setSelectedRating(null);
    setInStockOnly(false);
    setOnSaleOnly(false);
  };

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full text-left font-semibold text-gray-800"
        >
          <span>{title}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && <div className="mt-3 space-y-2">{children}</div>}
      </div>
    );
  };

  const ProductCard = ({ product }) => (
    <div 
      className={`group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${viewMode === 'list' ? 'flex' : ''}`}
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.discount > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              New
            </span>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-all duration-400 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-white p-2 rounded-full hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110">
            <Eye className="w-4 h-4" />
          </button>
          <button className="bg-white p-2 rounded-full hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110">
            <Heart className="w-4 h-4" />
          </button>
          <button className="bg-white p-2 rounded-full hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className={`p-4 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
        <div>
          <p className="text-xs text-emerald-600 font-semibold mb-1">{product.brand}</p>
          <h3 className="font-bold text-gray-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-emerald-600">Rs. {product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          {!product.inStock && (
            <span className="text-xs text-red-500 mt-1 block">Out of Stock</span>
          )}
        </div>
        
        {viewMode === 'list' && (
          <button className="mt-4 w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
            Add to Cart
            <ShoppingCart className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {viewMode === 'grid' && (
        <div className="p-4 pt-0">
          <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop Collection</h1>
          <p className="text-white/80">Explore our premium collection of products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-emerald-600" />
                  Filters
                </h3>
                {getFilterCount() > 0 && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              {/* Active Filters */}
              {getFilterCount() > 0 && (
                <div className="mb-4 flex flex-wrap gap-2 pb-4 border-b border-gray-200">
                  {selectedCategories.map(cat => (
                    <span key={cat} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      {cat}
                      <button onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedBrands.map(brand => (
                    <span key={brand} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      {brand}
                      <button onClick={() => setSelectedBrands(selectedBrands.filter(b => b !== brand))}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedRating && (
                    <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      {selectedRating}+ Stars
                      <button onClick={() => setSelectedRating(null)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
              
              {/* Categories Filter */}
              <FilterSection title="Categories">
                {categories.map(category => (
                  <label key={category.name} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => {
                          if (selectedCategories.includes(category.name)) {
                            setSelectedCategories(selectedCategories.filter(c => c !== category.name));
                          } else {
                            setSelectedCategories([...selectedCategories, category.name]);
                          }
                        }}
                        className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                      />
                      <span className="text-gray-700 group-hover:text-emerald-600 transition-colors">
                        {category.icon} {category.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">({category.count.toLocaleString()})</span>
                  </label>
                ))}
              </FilterSection>
              
              {/* Price Range Filter */}
              <FilterSection title="Price Range">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Min</label>
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Min"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Max</label>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 200000 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              </FilterSection>
              
              {/* Brands Filter */}
              <FilterSection title="Brands" defaultOpen={false}>
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => {
                        if (selectedBrands.includes(brand)) {
                          setSelectedBrands(selectedBrands.filter(b => b !== brand));
                        } else {
                          setSelectedBrands([...selectedBrands, brand]);
                        }
                      }}
                      className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                    />
                    <span className="text-gray-700 group-hover:text-emerald-600 transition-colors">{brand}</span>
                  </label>
                ))}
              </FilterSection>
              
              {/* Rating Filter */}
              <FilterSection title="Customer Rating" defaultOpen={false}>
                {ratings.map(rating => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating === selectedRating ? null : rating)}
                      className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                    />
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-gray-600 text-sm ml-1">& up</span>
                    </div>
                  </label>
                ))}
              </FilterSection>
              
              {/* Other Filters */}
              <FilterSection title="Other Filters" defaultOpen={false}>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={() => setInStockOnly(!inStockOnly)}
                    className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span className="text-gray-700">In Stock Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={() => setOnSaleOnly(!onSaleOnly)}
                    className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span className="text-gray-700">On Sale</span>
                </label>
              </FilterSection>
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {getFilterCount() > 0 && (
                    <span className="bg-emerald-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {getFilterCount()}
                    </span>
                  )}
                </button>
                
                {/* Results Count */}
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-gray-800">{sortedProducts.length}</span> products
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 px-3 transition-colors ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 px-3 transition-colors ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-sm">Sort by: </span>
                    <span className="font-medium">
                      {sortBy === 'featured' && 'Featured'}
                      {sortBy === 'price-low-high' && 'Price: Low to High'}
                      {sortBy === 'price-high-low' && 'Price: High to Low'}
                      {sortBy === 'rating' && 'Top Rated'}
                      {sortBy === 'newest' && 'Newest First'}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {isSortDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsSortDropdownOpen(false)}></div>
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
                        {[
                          { value: 'featured', label: 'Featured' },
                          { value: 'newest', label: 'Newest First' },
                          { value: 'price-low-high', label: 'Price: Low to High' },
                          { value: 'price-high-low', label: 'Price: High to Low' },
                          { value: 'rating', label: 'Top Rated' }
                        ].map(option => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setIsSortDropdownOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${sortBy === option.value ? 'text-emerald-600 font-medium' : 'text-gray-700'}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Products Grid/List */}
            {sortedProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={clearAllFilters}
                  className="text-emerald-600 font-semibold hover:text-emerald-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              {/* Same filter content as desktop sidebar */}
              {/* Reuse the same filter components here */}
              <p className="text-gray-500 text-center py-8">Filter options would appear here</p>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Shop;