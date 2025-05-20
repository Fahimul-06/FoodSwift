import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../../types';
import RestaurantCard from '../restaurants/RestaurantCard';

interface FeaturedRestaurantsProps {
  restaurants: Restaurant[];
}

const FeaturedRestaurants: React.FC<FeaturedRestaurantsProps> = ({ restaurants }) => {
  // Get featured restaurants or just use a subset
  const featuredRestaurants = restaurants.filter(r => r.featured).slice(0, 4);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Restaurants</h2>
          <Link
            to="/restaurants"
            className="flex items-center text-pink-600 font-medium hover:text-pink-700 transition-colors"
          >
            View all
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;