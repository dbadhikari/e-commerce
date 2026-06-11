import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Heart, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  Settings,
  Package,
  Grid3x3,
  Award,
  Truck,
  CreditCard,
  Bell,
  HelpCircle,
  UserCircle,
  ClipboardList,
  Shield,
  Star,
  Gift
} from 'lucide-react';
import { logout } from '../redux/slices/authSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios'
import ThemeToggle from './ThemeToggle';


const BACKEND_API = import.meta.env.VITE_BACKEND_API;
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const { user, isAuthenticated, token } = useSelector((state) => state.user);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to SajiloMart!", read: false },
    { id: 2, text: "Flash sale ends tonight!", read: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock cart and wishlist - replace with actual Redux state
  const cartItemCount = 3;
  const wishlistCount = 2;

  const categories = [
    { name: 'Electronics', icon: '📱', description: 'Latest gadgets & devices' },
    { name: 'Fashion', icon: '👕', description: 'Trendy clothing & accessories' },
    { name: 'Home & Living', icon: '🏠', description: 'Furniture & decor' },
    { name: 'Books', icon: '📚', description: 'Books & stationery' },
    { name: 'Sports', icon: '⚽', description: 'Sports equipment & gear' },
    { name: 'Toys', icon: '🎮', description: 'Games & toys' },
    { name: 'Groceries', icon: '🥬', description: 'Fresh groceries' },
    { name: 'Beauty', icon: '💄', description: 'Beauty & personal care' }
  ];

  const userMenuItems = [
    { icon: UserCircle, label: 'My Profile', link: '/profile', color: 'text-emerald-600' },
    { icon: Package, label: 'My Orders', link: '/orders', color: 'text-blue-600' },
    { icon: ClipboardList, label: 'My Reviews', link: '/reviews', color: 'text-purple-600' },
    { icon: Heart, label: 'Wishlist', link: '/wishlist', color: 'text-red-600' },
    { icon: Shield, label: 'Account Security', link: '/security', color: 'text-orange-600' },
    { icon: Settings, label: 'Settings', link: '/settings', color: 'text-gray-600' }
  ];

  const quickLinks = [
    { name: 'Today\'s Deals', icon: '🔥', link: '/offers', color: 'from-red-500 to-orange-500' },
    { name: 'New Arrivals', icon: '✨', link: '/new-arrivals', color: 'from-purple-500 to-pink-500' },
    { name: 'Best Sellers', icon: '⭐', link: '/best-sellers', color: 'from-yellow-500 to-amber-500' },
    { name: 'Flash Sales', icon: '⚡', link: '/flash-sales', color: 'from-blue-500 to-cyan-500' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
      if (isCategoriesOpen && !event.target.closest('.categories-menu')) {
        setIsCategoriesOpen(false);
      }
      if (showNotifications && !event.target.closest('.notifications-menu')) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen, isCategoriesOpen, showNotifications]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
      setIsCategoriesOpen(false);
    }
  };

  const getCategoryLink = (categoryName) => `/shop?category=${encodeURIComponent(categoryName)}`;

  const handleLogout = async() => {
   const req=await axios.get(`${BACKEND_API}/UserRoute/logout`,{withCredentials:true}) 
    dispatch(logout());
    toast.success('Logged out successfully!');
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Top Announcement Bar with Marquee effect */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-slate-950 dark:to-gray-900 text-white text-sm py-2.5 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 transform -skew-x-12"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Truck className="w-4 h-4 animate-bounce" />
            <span className="font-semibold">Free shipping</span>
            <span>on orders above Rs. 1000</span>
            <span className="hidden sm:inline">•</span>
            <CreditCard className="w-4 h-4" />
            <span>Easy EMI available</span>
            <span className="hidden sm:inline">•</span>
            <Gift className="w-4 h-4" />
            <span>Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded">WELCOME20</span> for 20% off</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`bg-white/95 dark:bg-slate-950/92 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800 transition-all duration-300 sticky top-0 z-50 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3 lg:gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-1.5 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  Sajilo<span className="text-emerald-600">Mart</span>
                </span>
                {isAuthenticated && (
                  <div className="text-xs text-emerald-600 hidden md:block">
                    Welcome back!
                  </div>
                )}
              </div>
            </Link>

            {/* Airbnb-style Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 justify-center categories-menu">
              <div className="relative w-full max-w-xl">
                <div className="flex items-center rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="hidden lg:flex min-w-36 items-center gap-2 px-5 py-3 text-left hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Grid3x3 className="w-4 h-4 text-emerald-600" />
                    <span>
                      <span className="block text-xs font-bold text-gray-800 leading-tight">Categories</span>
                      <span className="block text-xs text-gray-500 leading-tight">Explore all</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <div className="hidden lg:block h-8 w-px bg-gray-200 dark:bg-slate-700" />

                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search products"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent pl-5 lg:pl-4 pr-14 py-3 outline-none text-sm"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-2 rounded-full hover:shadow-lg transition-all hover:scale-105"
                      aria-label="Search"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isCategoriesOpen && (
                  <div className="absolute left-1/2 top-full mt-3 w-[min(92vw,560px)] -translate-x-1/2 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-3 z-50 border border-gray-100 dark:border-slate-700 animate-fade-in-down">
                    <div className="px-2 pb-3">
                      <p className="text-sm font-bold text-gray-900">Shop by category</p>
                      <p className="text-xs text-gray-500">Pick a department and keep browsing.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {categories.map((cat) => (
                        <Link
                          key={cat.name}
                          to={getCategoryLink(cat.name)}
                          onClick={() => setIsCategoriesOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/30 rounded-2xl transition-all group"
                        >
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-50 dark:bg-slate-800 text-xl group-hover:bg-white dark:group-hover:bg-slate-950 group-hover:scale-105 transition-all">
                            {cat.icon}
                          </span>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm truncate">{cat.name}</div>
                            <div className="text-xs text-gray-500 truncate">{cat.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 mt-3 pt-3 px-2">
                      <Link
                        to="/all-categories"
                        onClick={() => setIsCategoriesOpen(false)}
                        className="text-emerald-600 text-sm font-semibold hover:underline"
                      >
                        View all categories
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </form>

              {/* Navigation Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              <ThemeToggle />

              <Link
                to="/add-product"
                className="hidden xl:inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:hover:border-emerald-700"
              >
                <Package className="h-4 w-4" />
                Add Product
              </Link>

              {/* Notifications - Only for logged in users */}
              {isAuthenticated && (
                <div className="relative notifications-menu">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5 md:w-6 md:h-6" />
                    {unreadNotificationsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl py-2 z-50 border border-gray-100 animate-fade-in-up">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-bold text-gray-800">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-8 text-center text-gray-500">
                            <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No notifications</p>
                          </div>
                        ) : (
                          notifications.map(notif => (
                            <div key={notif.id} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-emerald-50' : ''}`}>
                              <p className="text-sm text-gray-700">{notif.text}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                <Heart className="w-5 h-5 md:w-6 md:h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative user-menu">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                  aria-label="User menu"
                >
                  <User className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl py-2 z-50 border border-gray-100 animate-fade-in-up">
                    {isAuthenticated && user ? (
                      <>
                        {/* User Info Section */}
                        <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-2xl">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                              {user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-800">{user?.name || 'User'}</p>
                              <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                              <p className="text-xs text-emerald-600 mt-1">{getGreeting()}! 👋</p>
                            </div>
                          </div>
                          {user?.isPremium && (
                            <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full inline-flex">
                              <Star className="w-3 h-3 fill-emerald-600" />
                              Premium Member
                            </div>
                          )}
                        </div>
                        
                        {/* Menu Items */}
                        <div className="py-2">
                          {userMenuItems.map((item) => (
                            <Link
                              key={item.label}
                              to={item.link}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-emerald-50 transition-colors group"
                            >
                              <item.icon className={`w-4 h-4 ${item.color}`} />
                              <span className="flex-1">{item.label}</span>
                              <ChevronDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                        </div>
                        
                        {/* Order Stats */}
                        <div className="px-4 py-3 border-t border-b border-gray-100 bg-gray-50">
                          <div className="flex justify-between text-sm">
                            <div className="text-center">
                              <div className="font-bold text-emerald-600">12</div>
                              <div className="text-gray-600 text-xs">Orders</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-emerald-600">₹25,430</div>
                              <div className="text-gray-600 text-xs">Total Spent</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-emerald-600">🌟</div>
                              <div className="text-gray-600 text-xs">Silver Member</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-semibold"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <div className="p-4">
                        <div className="text-center mb-4">
                          <UserCircle className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                          <h3 className="font-bold text-gray-800">Welcome Guest!</h3>
                          <p className="text-sm text-gray-500 mt-1">Sign in for better experience</p>
                        </div>
                        <Link
                          to="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block w-full text-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all mb-2"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block w-full text-center border-2 border-emerald-600 text-emerald-600 py-2.5 rounded-xl font-semibold hover:bg-emerald-50 transition-all"
                        >
                          Create Account
                        </Link>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                            <HelpCircle className="w-3 h-3" />
                            <Link to="/help" className="hover:text-emerald-600">Need Help?</Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <form onSubmit={handleSearch} className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[73px] bg-white z-40 overflow-y-auto animate-slide-in">
            <div className="p-4 space-y-6">
              {/* User Info - Mobile */}
              {isAuthenticated && user && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{user?.name || 'User'}</p>
                      <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Categories Section */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Grid3x3 className="w-5 h-5 text-emerald-600" />
                  All Categories
                </h3>
                <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={getCategoryLink(cat.name)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-slate-900 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <span className="text-sm font-medium">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">⚡ Quick Links</h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`p-3 bg-gradient-to-r ${link.color} text-white rounded-xl hover:shadow-lg transition-all text-center font-semibold text-sm`}
                    >
                      <span className="mr-1">{link.icon}</span>
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Help Links */}
              <div className="pt-4 border-t border-gray-100">
                <div className="space-y-2">
                  <Link to="/help" className="flex items-center gap-2 p-2 text-gray-600 hover:text-emerald-600">
                    <HelpCircle className="w-4 h-4" /> Help Center
                  </Link>
                  <Link to="/contact" className="flex items-center gap-2 p-2 text-gray-600 hover:text-emerald-600">
                    <User className="w-4 h-4" /> Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
