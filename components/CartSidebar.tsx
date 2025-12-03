import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_PHONE_NUMBER } from '../constants';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    let message = "Hola Creaciones Scarlet 👋, quiero realizar el siguiente pedido:%0A%0A";
    cart.forEach(item => {
      message += `▪️ ${item.quantity}x ${item.name} ($${item.price})%0A`;
    });
    message += `%0A💰 *Total:* $${total.toFixed(2)}`;
    
    window.open(`https://wa.me/${STORE_PHONE_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className={`fixed inset-0 overflow-hidden z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      
      <div className={`absolute inset-y-0 right-0 pl-10 max-w-full flex transform transition-transform duration-500 sm:duration-700 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900 font-display">Tu Pedido</h2>
                <div className="ml-3 h-7 flex items-center">
                  <button onClick={onClose} className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="mt-8">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-4 text-gray-500">Tu carrito está vacío.</p>
                  </div>
                ) : (
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li key={item.id} className="py-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-center object-cover" />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <div className="flex items-center border rounded-lg">
                                <button 
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                                    disabled={item.quantity <= 1}
                                >-</button>
                                <span className="px-2 text-gray-900 font-medium">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                                >+</button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="font-medium text-scarlet-600 hover:text-scarlet-500 flex items-center gap-1"
                            >
                              <Trash2 size={16} /> Eliminar
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">El envío se calcula al confirmar por WhatsApp.</p>
              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  Completar Pedido por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;