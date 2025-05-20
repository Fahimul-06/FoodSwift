import React, { useState } from 'react';
import Hero from '../components/home/Hero';
import FeaturedRestaurants from '../components/home/FeaturedRestaurants';
import AppFeatures from '../components/home/AppFeatures';
import CategoryList from '../components/home/CategoryList';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import { restaurants, categories } from '../data/mockData';

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('1'); // Default to "All"

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // Filter restaurants based on selected category
  const filteredRestaurants = activeCategory === '1' 
    ? restaurants 
    : restaurants.filter(restaurant => {
        const category = categories.find(c => c.id === activeCategory);
        return category && restaurant.cuisine === category.name;
      });

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Restaurants */}
      <FeaturedRestaurants restaurants={restaurants.filter(r => r.featured)} />

      {/* App Features */}
      <AppFeatures />

      {/* Browse By Category */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          
          <CategoryList 
            categories={categories} 
            activeCategory={activeCategory} 
            onSelectCategory={handleCategorySelect} 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Promotion */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Get the FoodSwift App</h2>
              <p className="text-white/90 mb-6 max-w-md">
                Download our mobile app for a better experience. Order food, track delivery in real time, and get exclusive app-only deals.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-black rounded-lg px-4 py-2 flex items-center hover:bg-gray-900 transition-colors">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide"><path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 11h18"/><path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6v0Z"/><path d="m22 22-1.5-1.5"/></svg>
                  </span>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a href="#" className="bg-black rounded-lg px-4 py-2 flex items-center hover:bg-gray-900 transition-colors">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide"><path d="M13 11.5H8M21 13v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h1m9.8 9H12m4.8 0a2.5 2.5 0 0 1 0-5H18m-1.2 5a2.5 2.5 0 0 0 0-5H15"/></svg>
                  </span>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 inline-block transform rotate-3">
                <div className="bg-black rounded-xl overflow-hidden border-[8px] border-black w-56 h-auto">
                  <img 
                    src="https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="FoodSwift Mobile App" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;