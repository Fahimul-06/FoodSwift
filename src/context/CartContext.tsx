import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
}

interface CartContextType extends CartState {
  addToCart: (item: Omit<CartItem, 'id'>, restaurantId: string, restaurantName: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: CartItem; restaurantId: string; restaurantName: string } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'INITIALIZE_CART'; payload: CartState };

const initialState: CartState = {
  items: [],
  restaurantId: null,
  restaurantName: null,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if ordering from a different restaurant
      if (state.restaurantId && state.restaurantId !== action.payload.restaurantId) {
        return {
          items: [action.payload.item],
          restaurantId: action.payload.restaurantId,
          restaurantName: action.payload.restaurantName,
        };
      }

      // Check if item already exists
      const existingItemIndex = state.items.findIndex(item => item.menuItemId === action.payload.item.menuItemId);

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + action.payload.item.quantity,
        };

        return {
          ...state,
          items: newItems,
        };
      }

      // Add new item
      return {
        items: [...state.items, action.payload.item],
        restaurantId: action.payload.restaurantId,
        restaurantName: action.payload.restaurantName,
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.itemId),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return initialState;

    case 'INITIALIZE_CART':
      return action.payload;

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'INITIALIZE_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(state));
    } else {
      localStorage.removeItem('cart');
    }
  }, [state]);

  const addToCart = (
    item: Omit<CartItem, 'id'>,
    restaurantId: string,
    restaurantName: string
  ) => {
    const newItem: CartItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9), // Generate a simple unique ID
    };

    dispatch({
      type: 'ADD_ITEM',
      payload: { item: newItem, restaurantId, restaurantName },
    });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};