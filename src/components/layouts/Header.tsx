import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // Track scroll position to change header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-pink-600 font-bold text-2xl">FoodSwift</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-pink-600 ${
                location.pathname === '/' ? 'text-pink-600' : isScrolled ? 'text-gray-900' : 'text-gray-800'
              }`}
            >
              Home
            </Link>
            <Link
              to="/restaurants"
              className={`text-sm font-medium transition-colors hover:text-pink-600 ${
                location.pathname === '/restaurants' ? 'text-pink-600' : isScrolled ? 'text-gray-900' : 'text-gray-800'
              }`}
            >
              Restaurants
            </Link>
            <Link
              to="/orders"
              className={`text-sm font-medium transition-colors hover:text-pink-600 ${
                location.pathname === '/orders' ? 'text-pink-600' : isScrolled ? 'text-gray-900' : 'text-gray-800'
              }`}
            >
              My Orders
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-full transition-colors ${
                isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
              }`}
              aria-label="Search"
            >
              <Search size={20} className={isScrolled ? 'text-gray-800' : 'text-gray-800'} />
            </button>

            <Link
              to="/cart"
              className={`p-2 rounded-full transition-colors relative ${
                isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
              }`}
              aria-label="Cart"
            >
              <ShoppingBag size={20} className={isScrolled ? 'text-gray-800' : 'text-gray-800'} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button
                  className={`flex items-center space-x-1 p-2 rounded-full ${
                    isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
                  }`}
                >
                  <User size={20} className={isScrolled ? 'text-gray-800' : 'text-gray-800'} />
                  <span className={`text-sm font-medium ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
                    {user?.name}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                  <div className="py-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Orders
                    </Link>
                    <Link to="/addresses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Addresses
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="primary"
                  size="sm"
                  className={isScrolled ? 'bg-pink-600' : 'bg-pink-600'}
                >
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full transition-colors"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? (
                <X size={24} className={isScrolled ? 'text-gray-800' : 'text-gray-800'} />
              ) : (
                <Menu size={24} className={isScrolled ? 'text-gray-800' : 'text-gray-800'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/restaurants"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Restaurants
            </Link>
            <Link
              to="/orders"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              My Orders
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;