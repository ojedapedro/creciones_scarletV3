export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum View {
  HOME = 'HOME',
  CATALOG = 'CATALOG',
  APPOINTMENTS = 'APPOINTMENTS',
  ABOUT = 'ABOUT'
}