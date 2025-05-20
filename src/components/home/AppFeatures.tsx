import React from 'react';
import { Clock, Utensils, MapPin, CreditCard } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: <Clock className="h-8 w-8 text-pink-600" />,
    title: 'Fast Delivery',
    description: 'Get your food delivered in under 30 minutes',
  },
  {
    id: 2,
    icon: <Utensils className="h-8 w-8 text-teal-500" />,
    title: 'Local Restaurants',
    description: 'Support your neighborhood favorites',
  },
  {
    id: 3,
    icon: <MapPin className="h-8 w-8 text-orange-500" />,
    title: 'Live Tracking',
    description: 'Follow your order in real-time',
  },
  {
    id: 4,
    icon: <CreditCard className="h-8 w-8 text-purple-500" />,
    title: 'Secure Payments',
    description: 'Multiple safe payment options',
  },
];

const AppFeatures: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FoodSwift</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We make food delivery fast, easy, and reliable so you can focus on what matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow transform hover:-translate-y-1 duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;