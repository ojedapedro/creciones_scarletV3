import { Product } from './types';

export const STORE_PHONE_NUMBER = "51999999999"; // Example WhatsApp number

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vestido Floral de Verano",
    price: 45.00,
    category: "Vestidos",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
    description: "Vestido ligero con estampado floral, ideal para días soleados."
  },
  {
    id: 2,
    name: "Blusa de Seda Escarlata",
    price: 32.50,
    category: "Blusas",
    image: "https://images.unsplash.com/photo-1551163943-3f6a29e39426?q=80&w=800&auto=format&fit=crop",
    description: "Elegancia pura en color rojo escarlata, suave al tacto."
  },
  {
    id: 3,
    name: "Pantalón Palazzo Chic",
    price: 55.00,
    category: "Pantalones",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    description: "Corte amplio y moderno para una silueta estilizada."
  },
  {
    id: 4,
    name: "Conjunto Casual Urbano",
    price: 65.00,
    category: "Conjuntos",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    description: "Top y pantalón a juego para un look despreocupado pero chic."
  },
  {
    id: 5,
    name: "Falda Midi Plisada",
    price: 38.00,
    category: "Faldas",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop",
    description: "Movimiento y estilo en cada paso. Color pastel suave."
  },
  {
    id: 6,
    name: "Chaqueta Denim Reciclada",
    price: 70.00,
    category: "Abrigos",
    image: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=800&auto=format&fit=crop",
    description: "Moda sostenible con un toque rebelde y juvenil."
  },
  {
    id: 7,
    name: "Vestido de Noche Elegante",
    price: 89.99,
    category: "Vestidos",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    description: "Perfecto para ocasiones especiales, con un corte sofisticado."
  },
  {
    id: 8,
    name: "Blazer Moderno",
    price: 62.00,
    category: "Abrigos",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    description: "El complemento ideal para elevar cualquier outfit casual."
  }
];

export const CHAT_SUGGESTIONS = [
  "¿Qué me pongo para una boda de día? ☀️",
  "Busco algo casual pero chic 👖",
  "¿Cómo agendo una cita? 📅",
  "Quiero un outfit para la oficina 💼"
];

export const AI_SYSTEM_INSTRUCTION = `
Eres Scarlet, la asistente virtual experta en moda de la tienda "Creaciones Scarlet".
Tu tono es amigable, juvenil, "chic" y profesional. Te encanta la moda y ayudar a las clientas a sentirse hermosas.
Ayudas a las clientas a:
1. Elegir combinaciones de ropa basadas en los productos de la tienda (menciona los productos por su nombre si son relevantes).
2. Dar consejos sobre estilos para eventos (bodas, fiestas, casual).
3. Explicar telas y cuidados.
4. Responder dudas sobre la ubicación o cómo agendar citas (recuérdales usar la sección de citas de la web).
Tus respuestas deben ser breves, con emojis ✨ y muy útiles.
Si te preguntan por precios específicos que no conoces, sugiéreles ver el catálogo o contactar por WhatsApp.
`;