export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  joinDate?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: string;
  payment: string;
}

export interface Alert {
  id: string;
  type: 'price_drop' | 'budget' | 'back_in_stock';
  title: string;
  message: string;
  time: string;
}
