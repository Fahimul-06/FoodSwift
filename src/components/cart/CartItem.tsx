import React from 'react';
import { Trash, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="flex items-start py-4 border-b border-gray-200">
      {/* Image */}
      {item.image && (
        <div className="flex-shrink-0 w-16 h-16 mr-4 bg-gray-100 rounded-md overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Details */}
      <div className="flex-grow">
        <h4 className="text-gray-900 font-medium">{item.name}</h4>
        <p className="text-gray-500 text-sm mt-1">
          ${item.price.toFixed(2)} x {item.quantity}
        </p>

        {item.specialInstructions && (
          <p className="text-gray-500 text-xs mt-1 italic">
            Note: {item.specialInstructions}
          </p>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center mt-2">
          <button
            onClick={handleDecrease}
            className="text-gray-500 hover:text-gray-700 p-1"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="mx-2 text-gray-800 font-medium">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            className="text-gray-500 hover:text-gray-700 p-1"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Price and Remove */}
      <div className="flex flex-col items-end ml-4">
        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
        
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-500 p-1 mt-2"
          aria-label="Remove item"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;