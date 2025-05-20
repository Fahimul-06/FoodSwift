import { Restaurant, MenuItem, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'All' },
  { id: '2', name: 'Fast Food' },
  { id: '3', name: 'Asian' },
  { id: '4', name: 'Italian' },
  { id: '5', name: 'Healthy' },
  { id: '6', name: 'Desserts' },
  { id: '7', name: 'Breakfast' },
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Delight',
    cuisine: 'Fast Food',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    deliveryTime: '15-25 min',
    deliveryFee: '$2.99',
    minimumOrder: '$10.00',
    featured: true
  },
  {
    id: '2',
    name: 'Sushi Paradise',
    cuisine: 'Asian',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    deliveryTime: '25-35 min',
    deliveryFee: '$3.99',
    minimumOrder: '$15.00',
    featured: true
  },
  {
    id: '3',
    name: 'Pizza Italia',
    cuisine: 'Italian',
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.3,
    deliveryTime: '20-30 min',
    deliveryFee: '$1.99',
    minimumOrder: '$12.00'
  },
  {
    id: '4',
    name: 'Green Bowl',
    cuisine: 'Healthy',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.6,
    deliveryTime: '15-25 min',
    deliveryFee: '$2.49',
    minimumOrder: '$10.00'
  },
  {
    id: '5',
    name: 'Sweet Treats',
    cuisine: 'Desserts',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    deliveryTime: '15-25 min',
    deliveryFee: '$2.99',
    minimumOrder: '$8.00'
  },
  {
    id: '6',
    name: 'Morning Cafe',
    cuisine: 'Breakfast',
    image: 'https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.4,
    deliveryTime: '15-25 min',
    deliveryFee: '$1.99',
    minimumOrder: '$8.00'
  }
];

export const menuItems: Record<string, MenuItem[]> = {
  '1': [
    {
      id: '101',
      name: 'Classic Cheeseburger',
      description: 'Juicy beef patty with melted cheese, lettuce, tomato, and special sauce',
      price: 8.99,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Burgers',
      popular: true
    },
    {
      id: '102',
      name: 'Bacon Deluxe Burger',
      description: 'Beef patty topped with crispy bacon, cheddar cheese, and BBQ sauce',
      price: 10.99,
      image: 'https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Burgers'
    },
    {
      id: '103',
      name: 'Crispy Chicken Sandwich',
      description: 'Crispy fried chicken breast with lettuce, mayo, and pickles',
      price: 9.49,
      image: 'https://images.pexels.com/photos/5474836/pexels-photo-5474836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Chicken'
    },
    {
      id: '104',
      name: 'French Fries',
      description: 'Crispy golden fries seasoned with salt',
      price: 3.99,
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Sides',
      vegetarian: true
    },
    {
      id: '105',
      name: 'Chocolate Milkshake',
      description: 'Rich and creamy chocolate milkshake topped with whipped cream',
      price: 4.99,
      image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Drinks',
      vegetarian: true
    },
    {
      id: '106',
      name: 'Onion Rings',
      description: 'Golden-fried onion rings with dipping sauce',
      price: 4.49,
      image: 'https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Sides',
      vegetarian: true
    }
  ],
  '2': [
    {
      id: '201',
      name: 'California Roll',
      description: 'Crab, avocado, and cucumber roll with sesame seeds',
      price: 6.99,
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Rolls',
      popular: true,
      vegetarian: true
    },
    {
      id: '202',
      name: 'Salmon Nigiri',
      description: 'Fresh salmon slices over pressed vinegar rice',
      price: 5.99,
      image: 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Nigiri'
    },
    {
      id: '203',
      name: 'Spicy Tuna Roll',
      description: 'Spicy tuna and cucumber roll with spicy mayo',
      price: 7.99,
      image: 'https://images.pexels.com/photos/2098007/pexels-photo-2098007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Rolls'
    },
    {
      id: '204',
      name: 'Miso Soup',
      description: 'Traditional Japanese soup with tofu, seaweed, and green onions',
      price: 3.49,
      image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Soups',
      vegetarian: true
    },
    {
      id: '205',
      name: 'Edamame',
      description: 'Steamed soybean pods with sea salt',
      price: 4.49,
      image: 'https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Appetizers',
      vegetarian: true
    }
  ]
};