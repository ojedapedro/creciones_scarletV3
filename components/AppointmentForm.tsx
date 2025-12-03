import React, { useState } from 'react';
import { Calendar, Clock, User, MessageSquare, Send } from 'lucide-react';
import { STORE_PHONE_NUMBER } from '../constants';

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    reason: 'Prueba de Vestido'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hola Creaciones Scarlet 👋, me gustaría agendar una cita.%0A%0A👤 *Nombre:* ${formData.name}%0A📅 *Fecha:* ${formData.date}%0A⏰ *Hora:* ${formData.time}%0A👗 *Motivo:* ${formData.reason}`;
    
    window.open(`https://wa.me/${STORE_PHONE_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-scarlet-100 flex flex-col md:flex-row">
        
        {/* Visual Side */}
        <div className="md:w-1/2 bg-scarlet-600 p-10 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-scarlet-700 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10">
                <h3 className="text-3xl font-display font-bold mb-4">Agenda tu Visita</h3>
                <p className="mb-6 text-scarlet-100">
                    Ven a nuestro taller para una atención personalizada. Te ayudaremos a encontrar el ajuste perfecto o diseñar esa prenda soñada.
                </p>
                <div className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Calendar size={16} />
                    </div>
                    <span>Lunes a Sábado</span>
                </div>
                 <div className="flex items-center gap-3 text-sm font-medium mt-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Clock size={16} />
                    </div>
                    <span>9:00 AM - 7:00 PM</span>
                </div>
            </div>
        </div>

        {/* Form Side */}
        <div className="md:w-1/2 p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg border p-2.5 focus:ring-scarlet-500 focus:border-scarlet-500"
                  placeholder="Tu nombre"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="pl-10 block w-full border-gray-300 rounded-lg border p-2.5 focus:ring-scarlet-500 focus:border-scarlet-500"
                    />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="pl-10 block w-full border-gray-300 rounded-lg border p-2.5 focus:ring-scarlet-500 focus:border-scarlet-500"
                    />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Motivo de la visita</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MessageSquare size={18} className="text-gray-400" />
                </div>
                <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="pl-10 block w-full border-gray-300 rounded-lg border p-2.5 focus:ring-scarlet-500 focus:border-scarlet-500"
                >
                    <option value="Prueba de Vestido">Prueba de Vestido</option>
                    <option value="Diseño a Medida">Diseño a Medida</option>
                    <option value="Asesoría de Imagen">Asesoría de Imagen</option>
                    <option value="Ajustes y Arreglos">Ajustes y Arreglos</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <Send size={18} />
              Agendar en WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;