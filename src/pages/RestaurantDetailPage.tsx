import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, DollarSign, Info } from 'lucide-react';
import { restaurants, menuItems } from '../data/mockData';
import MenuItemCard from '../components/restaurants/MenuItemCard';
import Button from '../components/ui/Button';

const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [headerBg, setHeaderBg] = useState(false);

  const restaurant = restaurants.find(r => r.id === id);
  const menu = menuItems[id || ''] || [];

  // Get unique categories from menu items
  const menuCategories = Array.from(new Set(menu.map(item => item.category)));

  // Set first category as active by default
  useEffect(() => {
    if (menuCategories.length > 0 && !activeCategory) {
      setActiveCategory(menuCategories[0]);
    }
  }, [menuCategories, activeCategory]);

  // Track scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setHeaderBg(window.scrollY > 250);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter menu items by active category
  const filteredMenuItems = activeCategory
    ? menu.filter(item => item.category === activeCategory)
    : menu;

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h2>
        <p className="text-gray-600 mb-8">The restaurant you're looking for doesn't exist or has been removed.</p>
        <Button variant="primary" as="a" href="/restaurants">
          Browse Restaurants
        </Button>
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Restaurant Header Image */}
      <div
        className="h-64 md:h-80 w-full bg-center bg-cover relative"
        style={{
          backgroundImage: `url(${restaurant.image})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Sticky Category Nav */}
      <div
        className={`sticky top-16 md:top-20 z-20 w-full transition-all duration-300 ${
          headerBg ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h1 
              className={`font-bold ${
                headerBg ? 'text-gray-900 text-xl' : 'text-transparent'
              } transition-all duration-300`}
            >
              {restaurant.name}
            </h1>
            <div className="overflow-x-auto hide-scrollbar">
              <div className="flex space-x-4">
                {menuCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                      activeCategory === category
                        ? 'bg-pink-600 text-white'
                        : headerBg
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Restaurant Info */}
        <div className="bg-white rounded-lg shadow-md p-6 -mt-12 relative z-10 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
          <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mb-4">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400 mr-1" fill="#facc15" />
              <span><strong>{restaurant.rating.toFixed(1)}</strong> (200+ ratings)</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center">
              <DollarSign size={16} className="mr-1" />
              <span>Delivery fee: {restaurant.deliveryFee}</span>
            </div>
            <div className="flex items-center">
              <Info size={16} className="mr-1" />
              <span>Min. order: {restaurant.minimumOrder}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-700 flex items-center">
            <Info size={16} className="text-gray-400 mr-2 flex-shrink-0" />
            <p>
              This restaurant offers contactless delivery. 
              <button className="text-pink-600 font-medium ml-1 hover:text-pink-700 focus:outline-none">
                Learn more
              </button>
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{activeCategory || 'Menu'}</h2>
          {filteredMenuItems.map((item) => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              restaurantId={restaurant.id}
              restaurantName={restaurant.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;