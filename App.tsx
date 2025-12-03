import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import AppointmentForm from './components/AppointmentForm';
import GeminiChat from './components/GeminiChat';
import Footer from './components/Footer';
import { Product, CartItem, View } from './types';

function App() {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <>
            <Hero onShopNow={() => setCurrentView(View.CATALOG)} />
            <ProductGrid addToCart={addToCart} />
          </>
        );
      case View.CATALOG:
        return <ProductGrid addToCart={addToCart} />;
      case View.APPOINTMENTS:
        return <AppointmentForm />;
      default:
        return <Hero onShopNow={() => setCurrentView(View.CATALOG)} />;
    }
  };

  return (
    <div className="min-h-screen bg-scarlet-50 flex flex-col font-sans">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        toggleCart={() => setIsCartOpen(true)}
      />
      
      <div className="flex-grow">
        {renderContent()}
      </div>

      <Footer />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <GeminiChat />
    </div>
  );
}

export default App;