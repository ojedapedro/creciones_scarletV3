import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { ShoppingBag, Star, Filter } from 'lucide-react';

interface ProductGridProps {
  addToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = useMemo(() => {
    const allCategories = PRODUCTS.map(p => p.category);
    return ['Todas', ...Array.from(new Set(allCategories))];
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todas') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-white py-12" id="catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            Nuestra Colección
          </h2>
          <p className="mt-4 text-gray-500">
            Piezas confeccionadas con amor y las mejores telas.
          </p>

          {/* Category Filter */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-scarlet-600 text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-scarlet-100 hover:text-scarlet-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
              <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden bg-gray-200 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-80 w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <Star size={16} className="text-yellow-400 fill-current" />
                </div>
                {/* Quick Add Overlay */}
                 <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center bg-gradient-to-t from-black/50 to-transparent">
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-white text-scarlet-600 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-scarlet-50 transition-colors flex items-center gap-2"
                    >
                        <ShoppingBag size={18} /> Agregar
                    </button>
                 </div>
              </div>
              
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-xs font-semibold text-scarlet-500 uppercase tracking-wide">{product.category}</p>
                        <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 font-display leading-tight mb-2">
                    {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
            <div className="text-center py-20">
                <Filter className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-4 text-gray-500">No hay productos en esta categoría por ahora.</p>
                <button 
                    onClick={() => setSelectedCategory('Todas')}
                    className="mt-4 text-scarlet-600 font-medium hover:underline"
                >
                    Ver todos los productos
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;