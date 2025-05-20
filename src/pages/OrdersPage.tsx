import React, { useState, useEffect } from 'react';
import { Package, Map } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface OrderItem {
  id: string;
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
  special_instructions?: string;
}

interface Order {
  id: string;
  restaurant_id: string;
  restaurant_name: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  total: number;
  created_at: string;
  estimated_delivery_time: string;
  items?: OrderItem[];
}

const OrdersPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('current');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchOrders();
    }
  }, [isAuthenticated, user, activeTab]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Filter orders based on active tab
      const filteredOrders = ordersData.filter(order => {
        if (activeTab === 'current') {
          return ['pending', 'confirmed', 'preparing', 'out_for_delivery'].includes(order.status);
        } else {
          return ['delivered', 'cancelled'].includes(order.status);
        }
      });

      setOrders(filteredOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-lg">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Package size={24} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Found</h2>
          <p className="text-gray-600 mb-8">
            You need to be logged in to view your orders.
          </p>
          <Button
            variant="primary"
            as={Link}
            to="/login?redirect=orders"
            fullWidth
          >
            Login to View Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'current'
              ? 'text-pink-600 border-b-2 border-pink-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('current')}
        >
          Current Orders
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'past'
              ? 'text-pink-600 border-b-2 border-pink-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Order History
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">
          <p>{error}</p>
          <Button
            variant="outline"
            onClick={fetchOrders}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Package size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">
            {activeTab === 'current'
              ? "You don't have any ongoing orders at the moment."
              : "You haven't placed any orders yet."}
          </p>
          <Button
            variant="primary"
            as={Link}
            to="/restaurants"
            size="sm"
          >
            Browse Restaurants
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Order header */}
              <div className="p-4 bg-gray-50 border-b flex flex-wrap justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</span>
                  <h3 className="font-semibold text-gray-800">{order.restaurant_name}</h3>
                </div>
                <div className="flex items-center">
                  {order.status === 'out_for_delivery' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      On the way
                    </span>
                  )}
                  {order.status === 'delivered' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                      Delivered
                    </span>
                  )}
                  {order.status === 'preparing' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                      Preparing
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Order items */}
              <div className="p-4">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <div>
                      <span className="font-medium">{item.quantity}x</span> {item.name}
                      {item.special_instructions && (
                        <p className="text-sm text-gray-500 ml-6">Note: {item.special_instructions}</p>
                      )}
                    </div>
                    <div className="text-gray-700">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}

                <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Order tracking (for current orders) */}
              {activeTab === 'current' && (
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Estimated delivery by</p>
                      <p className="font-medium">
                        {new Date(order.estimated_delivery_time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Map size={16} />}
                    >
                      Track Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Reorder option (for past orders) */}
              {activeTab === 'past' && order.status === 'delivered' && (
                <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Delivered on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    Order Again
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;