import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '../../types';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, restaurantId, restaurantName }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(
      {
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity,
        image: item.image,
        specialInstructions: specialInstructions || undefined
      },
      restaurantId,
      restaurantName
    );
    
    // Reset after adding to cart
    setQuantity(1);
    setSpecialInstructions('');
    setShowOptions(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Item image */}
        <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Item details */}
        <div className="p-4 md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.category}</p>
              </div>
              <div className="font-semibold text-gray-900">${item.price.toFixed(2)}</div>
            </div>

            <p className="text-gray-700 mt-2 text-sm">{item.description}</p>

            {/* Tags */}
            <div className="mt-2 flex gap-2">
              {item.vegetarian && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Vegetarian
                </span>
              )}
              {item.popular && (
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
            </div>
          </div>

          {/* Add to cart section */}
          <div className="mt-4">
            {!showOptions ? (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => setShowOptions(true)}
                className="mt-2 transition-transform hover:scale-105"
              >
                Add to Cart
              </Button>
            ) : (
              <div className="border-t pt-3 mt-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center border rounded-md">
                    <button 
                      onClick={handleDecrement}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button 
                      onClick={handleIncrement}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="font-semibold">${(item.price * quantity).toFixed(2)}</span>
                </div>

                <div className="mb-3">
                  <label htmlFor={`instructions-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    id={`instructions-${item.id}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Any special requests?"
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowOptions(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={handleAddToCart}
                    className="flex-1"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;