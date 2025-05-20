import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-pink-500 to-pink-700 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute -top-24 -left-40 w-96 h-96 rounded-full bg-white"></div>
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white"></div>
        <div className="absolute bottom-10 left-1/4 w-48 h-48 rounded-full bg-white"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Delicious Food, Delivered Fast
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl mx-auto">
            Order from your favorite restaurants and have food delivered straight to your door in minutes.
          </p>

          {/* Search form */}
          <div className="bg-white rounded-full shadow-lg p-1 flex items-center max-w-xl mx-auto">
            <div className="px-3 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Enter your delivery address"
              className="flex-grow py-3 px-2 bg-transparent text-gray-800 outline-none"
            />
            <button className="bg-pink-600 text-white font-medium rounded-full px-6 py-3 hover:bg-pink-700 transition-colors">
              Find Food
            </button>
          </div>

          {/* Featured cuisines */}
          <div className="mt-10">
            <h3 className="text-lg font-medium mb-4">Popular cuisines</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Pizza', 'Sushi', 'Burgers', 'Chinese', 'Mexican', 'Healthy', 'Desserts'].map((cuisine) => (
                <Link
                  key={cuisine}
                  to={`/restaurants?cuisine=${cuisine}`}
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  {cuisine}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;