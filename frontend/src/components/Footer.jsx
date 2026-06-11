import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  Truck,
  RefreshCw,
  Shield,
  Award
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube
} from "react-icons/fa";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', link: '/about' },
    { name: 'Contact Us', link: '/contact' },
    { name: 'FAQs', link: '/faqs' },
    { name: 'Privacy Policy', link: '/privacy' },
    { name: 'Terms & Conditions', link: '/terms' },
    { name: 'Return Policy', link: '/returns' }
  ];

  const categories = [
    { name: 'Electronics', link: '/category/electronics' },
    { name: 'Fashion', link: '/category/fashion' },
    { name: 'Home & Living', link: '/category/home-living' },
    { name: 'Books', link: '/category/books' },
    { name: 'Sports', link: '/category/sports' },
    { name: 'Groceries', link: '/category/groceries' }
  ];

const socialIcons = [
  { Icon: FaFacebookF, link: 'https://facebook.com', color: 'hover:bg-blue-600' },
  { Icon: FaTwitter, link: 'https://twitter.com', color: 'hover:bg-blue-400' },
  { Icon: FaInstagram, link: 'https://instagram.com', color: 'hover:bg-pink-600' },
  { Icon: FaYoutube, link: 'https://youtube.com', color: 'hover:bg-red-600' }
];

  const features = [
    { Icon: Truck, title: 'Free Shipping', desc: 'On orders above Rs. 1000' },
    { Icon: RefreshCw, title: 'Easy Returns', desc: '7 days return policy' },
    { Icon: Shield, title: 'Secure Payment', desc: '100% secure transactions' },
    { Icon: Award, title: 'Quality Guarantee', desc: 'Best quality products' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="bg-emerald-600/20 p-3 rounded-xl group-hover:bg-emerald-600 transition-colors">
                  <feature.Icon className="w-6 h-6 text-emerald-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-1.5 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Sajilo<span className="text-emerald-500">Mart</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Your one-stop destination for all your shopping needs. Quality products, best prices, and exceptional service.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+977 9800000000</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>support@sajilomart.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>9:00 AM - 9:00 PM, Daily</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-emerald-500 mt-1"></div>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.link} 
                    className="text-gray-400 hover:text-emerald-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Shop by Category
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-emerald-500 mt-1"></div>
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.link} 
                    className="text-gray-400 hover:text-emerald-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Stay Connected
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-emerald-500 mt-1"></div>
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form className="mb-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105">
                  Subscribe
                </button>
              </div>
            </form>
            <div className="flex gap-3">
              {socialIcons.map(({ Icon, link, color }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gray-800 p-2 rounded-full transition-all hover:scale-110 ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Secure payments with:</span>
              <div className="flex gap-2">
                <CreditCard className="w-8 h-8 text-gray-400" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Esewa_Logo.png/800px-Esewa_Logo.png" alt="eSewa" className="h-6" />
              </div>
            </div>
            <div className="text-sm text-gray-500">
              © {currentYear} SajiloMart. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;