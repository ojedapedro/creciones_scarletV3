import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="font-display font-bold text-xl text-scarlet-900 tracking-wide">
              Creaciones Scarlet
            </span>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              Moda femenina moderna y fresca. Nos dedicamos a resaltar tu belleza con diseños exclusivos y confección de alta calidad.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button className="hover:text-scarlet-600 transition-colors">Sobre Nosotros</button></li>
              <li><button className="hover:text-scarlet-600 transition-colors">Política de Envíos</button></li>
              <li><button className="hover:text-scarlet-600 transition-colors">Guía de Tallas</button></li>
              <li><button className="hover:text-scarlet-600 transition-colors">Preguntas Frecuentes</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-scarlet-600 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Creaciones Scarlet. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;