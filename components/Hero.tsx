import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative bg-scarlet-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-scarlet-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-scarlet-100 text-scarlet-600 text-sm font-semibold mb-4 animate-fade-in-up">
                <Sparkles size={16} />
                <span>Nueva Colección 2024</span>
              </div>
              <h1 className="text-4xl tracking-tight font-display font-bold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Tu estilo,</span>{' '}
                <span className="block text-scarlet-600 xl:inline">tu esencia única.</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Diseños exclusivos confeccionados pensando en la mujer moderna. 
                Descubre nuestra nueva colección fresca y juvenil que resalta tu belleza natural.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                <div className="rounded-md shadow">
                  <button
                    onClick={onShopNow}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-scarlet-600 hover:bg-scarlet-700 md:py-4 md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-scarlet-300/50"
                  >
                    Ver Colección <ArrowRight className="ml-2" size={20} />
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#contact"
                    className="w-full flex items-center justify-center px-8 py-3 border border-scarlet-200 text-base font-medium rounded-full text-scarlet-700 bg-white hover:bg-scarlet-50 md:py-4 md:text-lg transition-all duration-300"
                  >
                    Contáctanos
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative">
           <img
            className="absolute inset-0 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
            alt="Woman fashion"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-scarlet-50 to-transparent lg:via-scarlet-50/20"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;