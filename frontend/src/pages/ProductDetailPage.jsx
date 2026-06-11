import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Check,
  AlertCircle,
  Copy,
  CheckCircle,
  Zap,
  Package,
  Clock,
  MessageCircle,
  ThumbsUp,
  Award,
  TrendingUp,
  Eye,
  Truck as DeliveryTruck,
  Phone,
  MapPin,
  CreditCard,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Gift,
  X
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Mock product data - in real app, fetch from API
  const product = {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    brand: "Sony",
    brandLogo: "https://upload.wikimedia.org/wikipedia/commons/d/da/Sony_logo.svg",
    price: 24999,
    originalPrice: 39999,
    discount: 38,
    rating: 4.8,
    reviews: 2341,
    description: "Experience unparalleled noise cancellation with the Sony WH-1000XM5. These premium headphones feature industry-leading noise cancellation technology, exceptional sound quality, and all-day comfort. Perfect for travel, work, or relaxation.",
    longDescription: `
      The Sony WH-1000XM5 represents the pinnacle of wireless headphone technology. 
      Building on the legendary success of the XM series, these headphones offer the most 
      advanced noise cancellation ever created, combined with stunning sound quality 
      and premium comfort.

      Key innovations include the new Integrated Processor V1, which unlocks the full 
      potential of the HD Noise Cancelling Processor QN1. Together, they control eight 
      microphones, resulting in unprecedented noise cancellation across all frequencies.

      The newly developed 30mm driver unit with a carbon fiber composite dome brings 
      you incredibly natural vocals and deep, punchy bass. With Sony's DSEE Extreme 
      upscaling technology, you'll hear compressed music in stunning near hi-res quality.
    `,
    features: [
      "Industry-leading noise cancellation with Auto NC Optimizer",
      "30mm carbon fiber composite dome drivers for exceptional clarity",
      "Up to 30 hours battery life with quick charging (3 hours playback from 3 min charge)",
      "Advanced microphone system for crystal clear calls",
      "Multipoint connection to pair with two devices simultaneously",
      "Speak-to-chat technology automatically pauses music when you speak",
      "Premium soft fit leather for ultimate comfort",
      "LDAC for high-resolution wireless audio"
    ],
    specifications: {
      "Brand": "Sony",
      "Model": "WH-1000XM5",
      "Color": "Black/Silver",
      "Form Factor": "Over Ear",
      "Connectivity": "Bluetooth 5.2, 3.5mm jack",
      "Battery Life": "30 hours",
      "Charging Time": "3 hours (quick charge: 3min = 3hrs playback)",
      "Weight": "250g",
      "Warranty": "2 years",
      "Included": "Headphones, Carrying case, USB-C cable, Audio cable, Documentation"
    },
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800"
    ],
    colors: [
      { name: "Black", code: "#1a1a1a", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400" },
      { name: "Silver", code: "#c0c0c0", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" }
    ],
    sizes: ["One Size"],
    inStock: true,
    sku: "WH-1000XM5-BLK",
    categories: ["Electronics", "Audio", "Headphones"],
    tags: ["wireless", "noise-cancelling", "premium", "sony"],
    delivery: {
      free: true,
      estimated: "2-3 business days",
      returnPolicy: "7 days easy returns"
    },
    warranty: "2 years brand warranty",
    seller: "Sony Authorized Store",
    sellerRating: 4.9,
    sellerReviews: 12345
  };

  // Related products
  const relatedProducts = [
    {
      id: 2,
      name: "Apple AirPods Pro 2",
      price: 24999,
      originalPrice: 29999,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400"
    },
    {
      id: 3,
      name: "Bose QuietComfort 45",
      price: 22999,
      originalPrice: 29999,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"
    },
    {
      id: 4,
      name: "Sennheiser Momentum 4",
      price: 27999,
      originalPrice: 34999,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400"
    },
    {
      id: 5,
      name: "JBL Live 660NC",
      price: 12999,
      originalPrice: 17999,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400"
    }
  ];

  // Recently viewed products (from localStorage)
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    // Save to recently viewed
    const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const filtered = recent.filter(item => item.id !== product.id);
    const updated = [{ id: product.id, name: product.name, price: product.price, image: product.images[0] }, ...filtered].slice(0, 8);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    setRecentlyViewed(updated);
  }, [product.id]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
    // Add to cart logic here
  };

  const handleBuyNow = () => {
    // Add to cart and proceed to checkout
    navigate('/checkout');
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.name} on SajiloMart!`;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  const ThumbnailImage = ({ src, index }) => (
    <button
      onClick={() => setSelectedImage(index)}
      className={`relative rounded-lg overflow-hidden border-2 transition-all ${
        selectedImage === index ? 'border-emerald-500 shadow-lg scale-105' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <img src={src} alt={`Product ${index + 1}`} className="w-20 h-20 object-cover" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-emerald-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-emerald-600">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/category/electronics" className="hover:text-emerald-600">Electronics</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800 font-medium">{product.name.substring(0, 50)}...</span>
          </div>
        </div>
      </div>

      {/* Added to Cart Notification */}
      {showAddedToCart && (
        <div className="fixed top-24 right-4 z-50 animate-slide-in-left">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            <div>
              <p className="font-semibold">Added to Cart!</p>
              <p className="text-sm opacity-90">{quantity} × {product.name}</p>
            </div>
            <button onClick={() => navigate('/cart')} className="bg-white text-emerald-600 px-3 py-1 rounded-lg text-sm font-semibold ml-4">
              View Cart
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg group">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  -{product.discount}% OFF
                </div>
              )}
              
              {/* Wishlist Button */}
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <ThumbnailImage key={idx} src={img} index={idx} />
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                  {product.brand}
                </span>
                {product.inStock ? (
                  <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> In Stock
                  </span>
                ) : (
                  <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">Out of Stock</span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-800">{product.rating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <Link to="#reviews" className="text-emerald-600 hover:underline">
                  {product.reviews.toLocaleString()} customer reviews
                </Link>
                <span className="text-gray-400">|</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-600">Best Seller</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-100 py-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-emerald-600">Rs. {product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm font-semibold">
                      Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">Inclusive of all taxes</p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Color: <span className="text-emerald-600">{selectedColor?.name || product.colors[0].name}</span></h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-12 h-12 rounded-full transition-all ${
                        selectedColor?.name === color.name || (!selectedColor && color === product.colors[0])
                          ? 'ring-2 ring-emerald-500 ring-offset-2 scale-110'
                          : 'hover:scale-105'
                      }`}
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: color.code }}></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && product.sizes[0] !== "One Size" && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Size</h3>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2 rounded-lg border-2 transition-all ${
                        selectedSize === size
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                          : 'border-gray-300 hover:border-emerald-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-4 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="px-4 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">{product.inStock ? `${10} items available` : 'Out of stock'}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 bg-white border-2 border-emerald-600 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white transition-all hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Buy Now
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="px-5 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Delivery & Service Info */}
            <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
              <div className="flex items-start gap-3">
                <DeliveryTruck className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Free Delivery</p>
                  <p className="text-sm text-gray-600">Estimated delivery in {product.delivery.estimated}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Easy Returns</p>
                  <p className="text-sm text-gray-600">{product.delivery.returnPolicy}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Warranty</p>
                  <p className="text-sm text-gray-600">{product.warranty}</p>
                </div>
              </div>
            </div>

            {/* SKU & Categories */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>SKU: {product.sku}</p>
              <p>Categories: {product.categories.map((cat, i) => (
                <Link key={i} to={`/category/${cat.toLowerCase()}`} className="text-emerald-600 hover:underline ml-1">
                  {cat}{i < product.categories.length - 1 ? ',' : ''}
                </Link>
              ))}</p>
              <p>Tags: {product.tags.map((tag, i) => (
                <Link key={i} to={`/tag/${tag}`} className="text-emerald-600 hover:underline ml-1">
                  #{tag}{i < product.tags.length - 1 ? ',' : ''}
                </Link>
              ))}</p>
            </div>
          </div>
        </div>

        {/* Product Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 overflow-x-auto">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'reviews', label: `Reviews (${product.reviews})` },
                { id: 'shipping', label: 'Shipping & Returns' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 font-semibold transition-all relative ${
                    activeTab === tab.id
                      ? 'text-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.longDescription}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-3 font-semibold text-gray-800 w-1/3 border-b border-gray-100">
                          {key}
                        </td>
                        <td className="px-6 py-3 text-gray-600 border-b border-gray-100">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Rating Summary */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-emerald-600">{product.rating}</div>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Based on {product.reviews} reviews</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5,4,3,2,1].map(rating => (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-sm w-8">{rating}★</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-500">{Math.floor(Math.random() * 1000)}</span>
                        </div>
                      ))}
                    </div>
                    <button className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
                      Write a Review
                    </button>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[1,2,3].map((_, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Verified Buyer</p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">2 days ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">Amazing product! The noise cancellation is incredible and the sound quality is top-notch. Battery life is great too.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <ThumbsUp className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Helpful (45)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping & Returns Tab */}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div className="bg-emerald-50 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <Truck className="w-6 h-6 text-emerald-600" />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Shipping Information</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Free shipping on orders above Rs. 1000</li>
                        <li>• Estimated delivery: {product.delivery.estimated}</li>
                        <li>• Express delivery available at checkout</li>
                        <li>• International shipping available</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <RotateCcw className="w-6 h-6 text-orange-600" />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Return & Exchange Policy</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• {product.delivery.returnPolicy}</li>
                        <li>• Easy pickup from your doorstep</li>
                        <li>• Full refund or exchange within 7 days</li>
                        <li>• Customer support available 24/7 for returns</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">You May Also Like</h2>
            <Link to="/shop" className="text-emerald-600 font-semibold hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(related => (
              <Link key={related.id} to={`/product/${related.id}`} className="group">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img src={related.image} alt={related.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">{related.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(related.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({related.reviews})</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-emerald-600">Rs. {related.price.toLocaleString()}</span>
                      {related.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">Rs. {related.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 1 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {recentlyViewed.filter(item => item.id !== product.id).slice(0, 6).map(item => (
                <Link key={item.id} to={`/product/${item.id}`} className="group">
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-2">
                      <p className="text-xs font-medium text-gray-800 line-clamp-1">{item.name}</p>
                      <p className="text-sm font-bold text-emerald-600">Rs. {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowShareModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Share this product</h3>
              <button onClick={() => setShowShareModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <button onClick={() => handleShare('facebook')} className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="w-12 h-12 bg-[#1877f2] rounded-full flex items-center justify-center text-white">
                  <FaFacebook className="w-6 h-6" />
                </div>
                <span className="text-xs">Facebook</span>
              </button>
              <button onClick={() => handleShare('twitter')} className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="w-12 h-12 bg-[#1da1f2] rounded-full flex items-center justify-center text-white">
                  <FaTwitter className="w-6 h-6" />
                </div>
                <span className="text-xs">Twitter</span>
              </button>
              <button onClick={() => handleShare('copy')} className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white">
                  <Copy className="w-6 h-6" />
                </div>
                <span className="text-xs">Copy Link</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-xs">WhatsApp</span>
              </button>
            </div>
            {copied && (
              <div className="bg-emerald-50 text-emerald-600 text-center py-2 rounded-lg text-sm">
                Link copied to clipboard!
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
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

export default ProductDetail;