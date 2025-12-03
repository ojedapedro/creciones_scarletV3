import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Scissors } from 'lucide-react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  cartCount: number;
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, cartCount, toggleCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const prevCartCount = useRef(cartCount);

  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timer);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  const navItems = [
    { label: 'Inicio', view: View.HOME },
    { label: 'Colección', view: View.CATALOG },
    { label: 'Agendar Cita', view: View.APPOINTMENTS },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-scarlet-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer gap-2"
            onClick={() => setCurrentView(View.HOME)}
          >
            <div className="bg-scarlet-500 text-white p-1.5 rounded-lg">
                <Scissors size={20} />
            </div>
            <span className="font-display font-bold text-xl text-scarlet-900 tracking-wide">
              Creaciones Scarlet
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setCurrentView(item.view)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentView === item.view
                    ? 'text-scarlet-600 border-b-2 border-scarlet-500'
                    : 'text-gray-500 hover:text-scarlet-500'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Cart Button */}
            <button 
              onClick={toggleCart}
              className={`relative p-2 text-gray-400 hover:text-scarlet-500 transition-all duration-300 transform ${animateCart ? 'scale-125 text-scarlet-600' : ''}`}
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-scarlet-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
             <button 
              onClick={toggleCart}
              className={`relative p-2 text-gray-400 hover:text-scarlet-500 transition-all duration-300 transform ${animateCart ? 'scale-125 text-scarlet-600' : ''}`}
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-scarlet-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-scarlet-500 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-scarlet-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setCurrentView(item.view);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                   currentView === item.view
                    ? 'text-scarlet-600 bg-scarlet-50'
                    : 'text-gray-500 hover:text-scarlet-500 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;