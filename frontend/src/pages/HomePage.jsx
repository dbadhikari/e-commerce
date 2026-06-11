import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Star, 
  TrendingUp, 
  Clock, 
  Truck, 
  Shield, 
  ArrowRight,
  Heart,
  Eye,
  ShoppingCart,
  ChevronLeft,
  Gift,
  Sparkles,
  Zap,
  Flame,
  Mail,
  Phone,
  Headphones,
  Laptop,
  Shirt,
  Home,
  BookOpen,
  Gamepad2,
  Coffee,
  Watch,
  Gem,
  Tag,
  Percent,
  Award,
  ThumbsUp,
  CreditCard,
  RotateCcw,
  Smartphone,
  Tv,
  Speaker,
  Camera
} from 'lucide-react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  // Hero Slider Data
  const heroSlides = [
    {
      id: 1,
      title: "Premium Quality",
      subtitle: "Summer Collection 2024",
      description: "Discover the latest trends with up to 40% off on selected items",
      cta: "Shop Now",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
      gradient: "from-[#1a1a2e] to-[#16213e]"
    },
    {
      id: 2,
      title: "Tech Fest 2024",
      subtitle: "Latest Gadgets",
      description: "Up to 50% off on electronics & accessories",
      cta: "Explore Deals",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600",
      gradient: "from-[#0f2027] to-[#203a43]"
    },
    {
      id: 3,
      title: "Home Makeover",
      subtitle: "Transform Your Space",
      description: "Minimalist designs starting from just Rs. 999",
      cta: "Shop Collection",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600",
      gradient: "from-[#134e5e] to-[#71b280]"
    }
  ];

  // Premium Categories with icons
  const categories = [
    { name: "Electronics", icon: <Smartphone className="w-8 h-8" />, items: "2,345 items", color: "from-blue-600 to-blue-700", gradient: "from-blue-50 to-blue-100" },
    { name: "Fashion", icon: <Shirt className="w-8 h-8" />, items: "5,678 items", color: "from-rose-600 to-rose-700", gradient: "from-rose-50 to-rose-100" },
    { name: "Home & Living", icon: <Home className="w-8 h-8" />, items: "1,234 items", color: "from-emerald-600 to-emerald-700", gradient: "from-emerald-50 to-emerald-100" },
    { name: "Books", icon: <BookOpen className="w-8 h-8" />, items: "3,456 items", color: "from-purple-600 to-purple-700", gradient: "from-purple-50 to-purple-100" },
    { name: "Gaming", icon: <Gamepad2 className="w-8 h-8" />, items: "890 items", color: "from-indigo-600 to-indigo-700", gradient: "from-indigo-50 to-indigo-100" },
    { name: "Audio", icon: <Headphones className="w-8 h-8" />, items: "1,234 items", color: "from-orange-600 to-orange-700", gradient: "from-orange-50 to-orange-100" },
    { name: "Watches", icon: <Watch className="w-8 h-8" />, items: "567 items", color: "from-cyan-600 to-cyan-700", gradient: "from-cyan-50 to-cyan-100" },
    { name: "Accessories", icon: <Gem className="w-8 h-8" />, items: "2,345 items", color: "from-pink-600 to-pink-700", gradient: "from-pink-50 to-pink-100" }
  ];

  // Flash Sale Products
  const flashSaleProducts = [
    {
      id: 1,
      name: "Sony WH-1000XM5",
      brand: "Sony",
      price: 24999,
      originalPrice: 39999,
      discount: 38,
      rating: 4.9,
      reviews: 2341,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
      badge: "Flash Sale",
      sold: 1234
    },
    {
      id: 2,
      name: "Apple Watch Series 9",
      brand: "Apple",
      price: 45999,
      originalPrice: 59999,
      discount: 23,
      rating: 4.8,
      reviews: 3452,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
      badge: "Limited",
      sold: 892
    },
    {
      id: 3,
      name: "Nike Air Max Pulse",
      brand: "Nike",
      price: 11999,
      originalPrice: 15999,
      discount: 25,
      rating: 4.7,
      reviews: 4567,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      badge: "Hot Deal",
      sold: 2345
    },
    {
      id: 4,
      name: "Dyson V15 Detect",
      brand: "Dyson",
      price: 54999,
      originalPrice: 74999,
      discount: 27,
      rating: 4.9,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400",
      badge: "Best Seller",
      sold: 567
    }
  ];

  // New Arrivals
  const newArrivals = [
    {
      id: 5,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 159999,
      originalPrice: 169999,
      rating: 4.9,
      reviews: 3456,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
      isNew: true,
      featured: true
    },
    {
      id: 6,
      name: "MacBook Pro M3",
      brand: "Apple",
      price: 199999,
      originalPrice: 219999,
      rating: 4.8,
      reviews: 2345,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      isNew: true,
      featured: true
    },
    {
      id: 7,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      price: 139999,
      originalPrice: 149999,
      rating: 4.7,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
      isNew: true,
      featured: true
    },
    {
      id: 8,
      name: "Sony A7 IV Camera",
      brand: "Sony",
      price: 249999,
      originalPrice: 279999,
      rating: 4.9,
      reviews: 2345,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
      isNew: true,
      featured: true
    }
  ];

  // Top Rated Products
  const topRated = [
    {
      id: 9,
      name: "Bose QuietComfort",
      brand: "Bose",
      price: 22999,
      originalPrice: 29999,
      rating: 4.9,
      reviews: 5678,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      badge: "Top Rated"
    },
    {
      id: 10,
      name: "LG OLED C3 65\"",
      brand: "LG",
      price: 189999,
      originalPrice: 229999,
      rating: 4.8,
      reviews: 3456,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      badge: "Editors Pick"
    },
    {
      id: 11,
      name: "Adidas Ultraboost",
      brand: "Adidas",
      price: 13999,
      originalPrice: 18999,
      rating: 4.8,
      reviews: 7890,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
      badge: "Trending"
    }
  ];

  // Deals of the Day
  const dealsOfDay = [
    {
      id: 12,
      name: "JBL Flip 6 Speaker",
      price: 8999,
      originalPrice: 12999,
      discount: 31,
      soldPercentage: 75,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"
    },
    {
      id: 13,
      name: "Canon EOS R50",
      price: 84999,
      originalPrice: 99999,
      discount: 15,
      soldPercentage: 60,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400"
    },
    {
      id: 14,
      name: "DJI Mini 3 Pro",
      price: 78999,
      originalPrice: 98999,
      discount: 20,
      soldPercentage: 45,
      image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=400"
    }
  ];

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = {};
    Object.keys(sectionRefs.current).forEach((key) => {
      observers[key] = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [key]: true }));
            }
          });
        },
        { threshold: 0.1 }
      );
      if (sectionRefs.current[key]) {
        observers[key].observe(sectionRefs.current[key]);
      }
    });

    return () => {
      Object.values(observers).forEach(observer => observer.disconnect());
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const ProductCard = ({ product, featured = false }) => (
    <div 
      className={`group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${featured ? 'border-2 border-emerald-200' : ''}`}
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
              🔥 {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              ✨ New Arrival
            </span>
          )}
          {product.discount && (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              -{product.discount}% OFF
            </span>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-all duration-400 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-white p-3 rounded-full hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110 shadow-lg">
            <Eye className="w-5 h-5" />
          </button>
          <button className="bg-white p-3 rounded-full hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110 shadow-lg">
            <Heart className="w-5 h-5" />
          </button>
          <button className="bg-white p-3 rounded-full hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110 shadow-lg">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
        
        {/* Featured Flag */}
        {featured && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-lg rotate-12 shadow-lg">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="mb-2">
          <p className="text-xs text-emerald-600 font-semibold mb-1">{product.brand}</p>
          <h3 className="font-bold text-gray-800 text-lg line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
          </div>
          {product.sold && (
            <span className="text-xs text-green-600">❤️ {product.sold.toLocaleString()} sold</span>
          )}
        </div>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-emerald-600">Rs. {product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        
        <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 group">
          <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Slider Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-[600px] md:h-[700px]">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-85`}></div>
              <img 
                src={slide.image} 
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <div className="animate-slide-up">
                    <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                      <Sparkles className="w-4 h-4" />
                      Limited Time Offer
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight animate-slide-up animation-delay-100">
                      {slide.title}
                    </h1>
                    <p className="text-2xl md:text-3xl font-bold mb-3 animate-slide-up animation-delay-200">
                      {slide.subtitle}
                    </p>
                    <p className="text-lg mb-8 opacity-95 animate-slide-up animation-delay-300">
                      {slide.description}
                    </p>
                    <button className="group bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2 animate-slide-up animation-delay-400">
                      {slide.cta} 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Slider Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/40 transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/40 transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          
          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide 
                    ? 'w-12 h-2 bg-white' 
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Truck className="w-8 h-8" />, title: "Free Shipping", desc: "On orders above Rs. 1000" },
              { icon: <RotateCcw className="w-8 h-8" />, title: "Easy Returns", desc: "7 days return policy" },
              { icon: <Shield className="w-8 h-8" />, title: "Secure Payment", desc: "100% secure transactions" },
              { icon: <Headphones className="w-8 h-8" />, title: "24/7 Support", desc: "Dedicated customer service" }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                <div className="bg-emerald-50 p-3 rounded-2xl group-hover:bg-emerald-600 transition-colors group-hover:scale-110 duration-300">
                  <div className="text-emerald-600 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-800">{feature.title}</p>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Premium Design */}
      <section 
        ref={el => sectionRefs.current.categories = el}
        className={`py-20 transition-all duration-1000 transform ${isVisible.categories ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Shop by Category</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">Explore Our Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover products from top categories curated just for you</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to={`/category/${category.name.toLowerCase()}`}
                className={`group bg-gradient-to-br ${category.gradient} rounded-2xl p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300`}
              >
                <div className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.items}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section - Premium */}
      <section className="py-20 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
            <div className="flex items-center gap-4 mb-6 lg:mb-0">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-2xl shadow-lg animate-pulse">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Flash Sale</h2>
                <p className="text-gray-600">Limited time offers - Don't miss out!</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex gap-3">
                <div className="bg-gray-900 text-white px-4 py-3 rounded-xl text-center min-w-[70px] shadow-lg">
                  <div className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
                  <div className="text-xs uppercase tracking-wider">Days</div>
                </div>
                <div className="text-3xl font-bold text-gray-800">:</div>
                <div className="bg-gray-900 text-white px-4 py-3 rounded-xl text-center min-w-[70px] shadow-lg">
                  <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs uppercase tracking-wider">Hours</div>
                </div>
                <div className="text-3xl font-bold text-gray-800">:</div>
                <div className="bg-gray-900 text-white px-4 py-3 rounded-xl text-center min-w-[70px] shadow-lg">
                  <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs uppercase tracking-wider">Mins</div>
                </div>
                <div className="text-3xl font-bold text-gray-800">:</div>
                <div className="bg-gray-900 text-white px-4 py-3 rounded-xl text-center min-w-[70px] shadow-lg">
                  <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs uppercase tracking-wider">Secs</div>
                </div>
              </div>
              <Link to="/flash-sale" className="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all whitespace-nowrap">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section - Premium */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 h-[450px] group cursor-pointer">
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-20 text-white">
              <div className="animate-float">
                <Tag className="w-16 h-16 mb-6 opacity-80" />
                <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Mega<br />Summer Sale</h2>
                <p className="text-xl mb-2">Up to <span className="font-bold text-3xl">70% OFF</span></p>
                <p className="text-lg mb-8 opacity-90">+ Extra 10% cashback on prepaid orders</p>
                <button className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center gap-2">
                  Grab Deal <Zap className="w-5 h-5" />
                </button>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200" 
              alt="Sale Banner"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section 
        ref={el => sectionRefs.current.newArrivals = el}
        className={`py-20 bg-gray-50 transition-all duration-1000 transform ${isVisible.newArrivals ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Just Dropped</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">New Arrivals</h2>
            </div>
            <Link to="/new-arrivals" className="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} featured={product.featured} />
            ))}
          </div>
        </div>
      </section>

      {/* Deals of the Day */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Percent className="w-6 h-6" />
                  <span className="font-semibold tracking-wider">LIMITED TIME</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Deals of the Day</h2>
                <p className="opacity-90 mt-2">Grab them before they're gone!</p>
              </div>
              <div className="flex gap-3">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl text-center min-w-[80px]">
                  <div className="text-2xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs text-white/80">Hours</div>
                </div>
                <div className="text-white text-2xl font-bold">:</div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl text-center min-w-[80px]">
                  <div className="text-2xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs text-white/80">Mins</div>
                </div>
                <div className="text-white text-2xl font-bold">:</div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl text-center min-w-[80px]">
                  <div className="text-2xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs text-white/80">Secs</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dealsOfDay.map((deal) => (
                <div key={deal.id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                  <div className="relative h-64 overflow-hidden">
                    <img src={deal.image} alt={deal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${deal.soldPercentage}%` }}></div>
                      </div>
                      <p className="text-white text-xs mt-2">{deal.soldPercentage}% Sold</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-800 mb-2">{deal.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-emerald-600">Rs. {deal.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-400 line-through">Rs. {deal.originalPrice.toLocaleString()}</span>
                    </div>
                    <button className="w-full border-2 border-emerald-600 text-emerald-600 py-2 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white transition-all">
                      Shop Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-6 h-6 text-emerald-600" />
                <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Customer Favorites</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Top Rated Products</h2>
            </div>
            <Link to="/top-rated" className="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
            <p className="text-gray-300 mb-8">Subscribe to get special offers, free giveaways, and exclusive deals.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/10 text-white placeholder-gray-400 border border-white/20"
              />
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;