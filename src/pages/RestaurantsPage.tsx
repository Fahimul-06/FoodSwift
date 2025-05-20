import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { restaurants, categories } from '../data/mockData';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import CategoryList from '../components/home/CategoryList';
import Button from '../components/ui/Button';

const RestaurantsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('1'); // Default to "All"
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: 0,
    maxDeliveryFee: 10,
    sortBy: 'recommended'
  });

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality is implemented in the filtering below
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'range' ? parseFloat(value) : value;
    
    setFilters({
      ...filters,
      [name]: newValue
    });
  };

  // Filter restaurants based on selected category and search term
  const filteredRestaurants = restaurants.filter(restaurant => {
    // Category filter
    if (activeCategory !== '1') {
      const category = categories.find(c => c.id === activeCategory);
      if (category && restaurant.cuisine !== category.name) return false;
    }

    // Search filter
    if (searchTerm && !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Rating filter
    if (restaurant.rating < filters.rating) return false;

    // Delivery fee filter (parse the string to get the numeric value)
    const deliveryFee = parseFloat(restaurant.deliveryFee.replace('$', ''));
    if (deliveryFee > filters.maxDeliveryFee) return false;

    return true;
  });

  // Sort restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (filters.sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'deliveryTime':
        // Sort by the first number in the delivery time range
        const aTime = parseInt(a.deliveryTime.split('-')[0]);
        const bTime = parseInt(b.deliveryTime.split('-')[0]);
        return aTime - bTime;
      case 'deliveryFee':
        const aFee = parseFloat(a.deliveryFee.replace('$', ''));
        const bFee = parseFloat(b.deliveryFee.replace('$', ''));
        return aFee - bFee;
      default: // recommended
        return b.rating - a.rating; // Default sort by rating
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Restaurants</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for restaurants or cuisines"
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-md focus:ring-pink-500 focus:border-pink-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="rounded-l-none"
          >
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="ml-2 flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} className="mr-1" />
            Filters
          </Button>
        </form>

        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.rating}
                    onChange={handleFilterChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">{filters.rating} ★</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Delivery Fee</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="maxDeliveryFee"
                    min="0"
                    max="10"
                    step="0.5"
                    value={filters.maxDeliveryFee}
                    onChange={handleFilterChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">${filters.maxDeliveryFee}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="deliveryTime">Fastest Delivery</option>
                  <option value="deliveryFee">Lowest Delivery Fee</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <CategoryList 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelectCategory={handleCategorySelect} 
        />
      </div>

      {/* Restaurant Grid */}
      {sortedRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
          <p className="text-gray-600">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;