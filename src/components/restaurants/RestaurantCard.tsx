import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, DollarSign } from 'lucide-react';
import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { id, name, image, cuisine, rating, deliveryTime, deliveryFee, minimumOrder, featured } = restaurant;

  return (
    <Link to={`/restaurant/${id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          {/* Restaurant Image */}
          <div className="h-48 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
              Featured
            </div>
          )}

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white text-sm font-bold px-2 py-1 rounded-md shadow-sm flex items-center">
            <Star size={14} className="text-yellow-400 mr-1" fill="#facc15" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-1 text-lg group-hover:text-pink-600 transition-colors">
            {name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{cuisine}</p>

          <div className="flex items-center justify-between text-sm text-gray-700 mt-3">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{deliveryTime}</span>
            </div>
            <div className="flex items-center">
              <DollarSign size={14} className="mr-1" />
              <span>Min. {minimumOrder}</span>
            </div>
            <div>
              <span className="font-medium">{deliveryFee}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;